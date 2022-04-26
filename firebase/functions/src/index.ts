import * as functions from "firebase-functions";
import fetch from "cross-fetch";
import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client";
import * as Admin from "firebase-admin";
import { hashSync } from "bcrypt";
import { Request } from "firebase-functions";
import { warn } from "firebase-functions/logger";

const admin = Admin.initializeApp();

let headers: any = [];
headers["x-hasura-admin-secret"] = `${process.env.API_KEY}`;
headers["Content-Type"] = "application/json";

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.HASURA_GRAPHQL_ENDPOINT,
    headers,
    fetch,
  }),
  cache: new InMemoryCache(),
});

const applyMiddleware = (req: Request, res: any, next: any) => {
  if (
    process.env.API_KEY &&
    req.headers.authorization === process.env.API_KEY
  ) {
    next(req, res);
  } else {
    res.status(403).send("Unauthorized");
    return;
  }
};

export const genUser = functions.https.onRequest((req, res) =>
  applyMiddleware(req, res, (req: any, res: any) => {
    const data = req.body.event.data.new;
    admin
      .auth()
      .createUser({
        uid: data.id,
        email: data.email,
        password: data.password,
        emailVerified: true,
      })
      .then(async (user) => {
        await admin.auth().setCustomUserClaims(data.id, {
          "https://hasura.io/jwt/claims": {
            "x-hasura-allowed-roles": [data.role],
            "x-hasura-default-role": data.role,
            "x-hasura-tenent-id": data.tenent_id,
            "x-hasura-user-id": data.id,
            "x-hasura-weighbridge-id": data.weighbridge_id,
          },
        });
        await client.mutate({
          mutation: gql`
            mutation ($where: user_bool_exp!, $set: user_set_input) {
              update_user(where: $where, _set: $set) {
                affected_rows
              }
            }
          `,
          variables: {
            where: {
              id: {
                _eq: data.id,
              },
            },
            set: {
              password: hashSync(data.password, 10),
              synced: true,
            },
          },
        });
        res.status(200).json({
          message: "User created",
          user: user,
          synced: true,
        });
      })
      .catch(async (error) => {
        warn(error);
        client.mutate({
          mutation: gql`
            mutation ($where: user_bool_exp!) {
              delete_user(where: $where) {
                returning {
                  id
                }
              }
            }
          `,
          variables: {
            where: {
              id: {
                _eq: data.id,
              },
            },
          },
        });
        res.status(400).json({
          message: error.message,
        });
      });
  })
);

export const genAdmin = functions.https.onRequest((req, res) =>
  applyMiddleware(req, res, (req: any, res: any) => {
    const data = req.body.event.data.new;
    admin
      .auth()
      .createUser({
        uid: data.id,
        email: data.email,
        phoneNumber: data.phone,
        emailVerified: true,
      })
      .then(async (user) => {
        await admin.auth().setCustomUserClaims(data.id, {
          "https://hasura.io/jwt/claims": {
            "x-hasura-allowed-roles": ["admin"],
            "x-hasura-default-role": "admin",
          },
        });
        await client.mutate({
          mutation: gql`
            mutation ($where: user_bool_exp!, $set: user_set_input) {
              update_user(where: $where, _set: $set) {
                affected_rows
              }
            }
          `,
          variables: {
            where: {
              id: {
                _eq: data.id,
              },
            },
            set: {
              synced: true,
            },
          },
        });
        res.status(200).json({
          message: "User created",
          user: user,
          synced: true,
        });
      })
      .catch(async (error) => {
        console.log(error);
        client.mutate({
          mutation: gql`
            mutation ($where: user_bool_exp!) {
              delete_user(where: $where) {
                returning {
                  id
                }
              }
            }
          `,
          variables: {
            where: {
              id: {
                _eq: data.id,
              },
            },
          },
        });
        res.status(400).json({
          message: error.message,
        });
      });
  })
);

export const delUser = functions.https.onRequest((req, res) =>
  applyMiddleware(req, res, (req: any, res: any) => {
    admin
      .auth()
      .deleteUser(req.body.event.data.old.id)
      .then(() => {
        res.status(200).json({
          message: "User deleted",
        });
      });
  })
);

export const updateUser = functions.https.onRequest((req, res) =>
  applyMiddleware(req, res, async (req: any, res: any) => {
    try {
      const data = req.body.event.data.new;
      await admin.auth().updateUser(data.id, {
        email: data.email,
        password: data.password,
      });

      // eslint-disable-next-line prefer-const
      let claims: any = (await admin.auth().getUser(data.id)).customClaims;
      claims["x-hasura-weighbridge-id"] = {
        "x-hasura-allowed-roles": [data.role],
        "x-hasura-default-role": data.role,
        "x-hasura-user-id": data.id,
        "x-hasura-weighbridge-id": data.weighbridge_id,
      };

      admin
        .auth()
        .setCustomUserClaims(data.id, claims)
        .then(() => {
          res.status(200).json({
            message: "User updated",
          });
        });
    } catch (error: any) {
      console.log(error);
      res.status(400).json({
        message: error.message || "",
      });
    }
  })
);

export const genBill = functions.https.onRequest((req, res) =>
  applyMiddleware(req, res, async (req: any, res: any) => {
    const billData = await client.query({
      query: gql`
        query ($billByPkId: uuid!) {
          bill_by_pk(id: $billByPkId) {
            id
            vehicle_number
            created_at
            charges
            scale_weight
            photos
            customer_3 {
              id
              name
              company_address
              company_name
              gst_in
              metadata
              email
              phone
            }
            customer_3 {
              id
              name
              company_address
              company_name
              gst_in
              email
              phone
              metadata
            }
            photos
            second_weight
            tare_weight
            tenent {
              id
              email
              phone
              metadata
              name
            }
            reference_bill_id
            vehicle {
              name
              id
              manufacturer
            }
            customer {
              id
              name
              company_address
              company_name
              gst_in
              metadata
              email
              phone
            }
            material {
              name
              id
              hsn
            }
            paid_by
            weighbridge {
              display_name
              id
              address
              pin_code
              phone
              logo
              metadata
              mail
              name
            }
          }
        }
      `,
      variables: {
        billByPkId: req.body.event.data.new.id,
      },
    });

    await admin
      .firestore()
      .doc(`bills/${req.body.event.data.new.id}`)
      .set(billData.data.bill_by_pk);
    // if (polishedBillData.customer_2) {
    //    await firestore
    //      .doc(`messages/${req.body.event.data.new.id}`)
    //      .set({
    //        message: `Hi ${polishedBillData.customer_2.name}, Your bill is generated. Please pay the bill.`,
    //        to: polishedBillData.customer_2.email,

    //      });
    // }
    res.json({
      status: "success",
      id: req.body.event.data.new.id,
    });
  })
);
