import { Response } from "firebase-functions/v1";
import { Request } from "firebase-functions/v1/https";
import { gql, ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import fetch, { Headers } from "cross-fetch";
import { getBillDetails } from "./graphql/queries";

export const genBillHandler = (req: Request, res: Response, admin: any) => {
  let headers: any = [];
  headers["x-hasura-admin-secret"] = `${process.env["ADMIN_SECRET"]}`;
  headers["Content-Type"] = "application/json";
  const gqlClient = new ApolloClient({
    link: new HttpLink({
      uri: process.env["HASURA_URL"] + "/v1/graphql",
      headers,
      fetch,
    }),
    cache: new InMemoryCache(),
  });
  gqlClient
    .query({
      query: getBillDetails,
      variables: {
        billByPkId: req.body.event.data.new.id,
      },
    })
    .then(async (response) => {
      const dt: any = response.data.bill_by_pk;
      if (dt.customer) {
        sendMessageAndMail({
          admin,
          dt: {
            charges: dt.charges,
            vehicle: {
              name: dt.vehicle.name,
            },
            created_at: dt.created_at,
            email: dt.customer.email,
            material: dt.material,
            phone: dt.customer.phone,
            scale_weight: dt.scale_weight,
            second_weight: dt.second_weight,
            tare_weight: dt.tare_weight,
            weighbridge: dt.weighbridge,
            vehicle_number: dt.vehicle_number,
          },
          id: dt.id,
          prefix: "customer",
        });
      }
      if (dt.customer_2) {
        sendMessageAndMail({
          admin,
          dt: {
            charges: dt.charges,
            vehicle: {
              name: dt.vehicle.name,
            },
            created_at: dt.created_at,
            email: dt.customer_2.email,
            phone: dt.customer_2.phone,
            material: dt.material,
            scale_weight: dt.scale_weight,
            second_weight: dt.second_weight,
            tare_weight: dt.tare_weight,
            weighbridge: dt.weighbridge,
            vehicle_number: dt.vehicle_number,
          },
          id: dt.id,
          prefix: "customer",
        });
      }
      if (dt.customer_3) {
        sendMessageAndMail({
          admin,
          dt: {
            charges: dt.charges,
            vehicle: {
              name: dt.vehicle.name,
            },
            created_at: dt.created_at,
            email: dt.customer_3.email,
            phone: dt.customer_3.phone,
            material: dt.material,
            scale_weight: dt.scale_weight,
            second_weight: dt.second_weight,
            tare_weight: dt.tare_weight,
            weighbridge: dt.weighbridge,
            vehicle_number: dt.vehicle_number,
          },
          id: dt.id,
          prefix: "customer",
        });
      }
      await admin
        .firestore()
        .doc(`bills/${req.body.event.data.new.id}`)
        .set(dt);
      if (dt.paid_by === "cash") {
        gqlClient.mutate({
          mutation: gql`
            mutation updateBill(
              $pkColumns: bill_pk_columns_input!
              $set: bill_set_input
            ) {
              update_bill_by_pk(pk_columns: $pkColumns, _set: $set) {
                id
              }
            }
          `,
          variables: {
            set: {
              payment_initiated: true,
              paid: true,
            },
            pkColumns: {
              id: dt.id,
            },
          },
        });
      } else {
        var RazorPayHeaders = new Headers();
        RazorPayHeaders.append("Content-Type", "application/json");
        RazorPayHeaders.append(
          "Authorization",
          `${process.env["RAZORPAY_KEY"]}`
        );
        var raw = JSON.stringify({
          amount: parseInt(dt.charges.split("$")[1], 10) * 100,
          receipt: dt.id,
          currency: "INR",
          partial_payment: false,
          transfers: [
            {
              account: dt.tenent.razorpay_id,
              amount: parseInt(dt.charges.split("$")[1], 10) * 100,
              currency: "INR",
              notes: {
                branch: dt.weighbridge.name,
                name: dt.tenent.name,
              },
              on_hold: 0,
            },
          ],
        });

        await fetch("https://api.razorpay.com/v1/orders", {
          method: "POST",
          headers: RazorPayHeaders,
          body: raw,
          redirect: "follow",
        })
          .then((response) => response.json())
          .then((resp) => {
            gqlClient.mutate({
              mutation: gql`
                mutation updateBill(
                  $pkColumns: bill_pk_columns_input!
                  $set: bill_set_input
                ) {
                  update_bill_by_pk(pk_columns: $pkColumns, _set: $set) {
                    id
                  }
                }
              `,
              variables: {
                set: {
                  order_id: resp.id,
                  payment_initiated: true,
                },
                pkColumns: {
                  id: dt.id,
                },
              },
            });
          })
          .catch((error) => {
            admin.firestore().doc(`errors/${req.body.event.data.new.id}`).set({
              error: error,
            });
          });
      }
      res.json({
        status: "success",
        id: req.body.event.data.new.id,
      });
    });
};

const sendMessageAndMail = async ({
  dt,
  id,
  prefix,
  admin,
}: {
  id: string;
  dt: {
    charges: string;
    vehicle: {
      name: string;
    };
    phone: string;
    email: string;
    weighbridge: {
      display_name: string;
    };
    vehicle_number: string;
    material: {
      name: string;
    };
    created_at: string;
    scale_weight: string;
    tare_weight: string;
    second_weight: boolean;
  };
  prefix: string;
  admin: any;
}) => {
  await admin
    .firestore()
    .doc(`messages/${id}-${prefix}`)
    .set({
      to: dt.phone,
      body: `thank you for choosing ${dt.weighbridge.display_name || ""}!
          vehicle number: ${dt.vehicle_number}
          material: ${dt.material.name}
          time: ${new Date(dt.created_at).toLocaleString()}
          scale weight: ${dt.scale_weight}
          tare weight: ${dt.tare_weight || ""}
          net weight: ${
            dt.second_weight
              ? Math.abs(
                  parseInt(dt.tare_weight || "0", 10) -
                    parseInt(dt.scale_weight || "0", 10)
                )
              : ""
          }

          `,
    });
  await admin
    .firestore()
    .doc(`mail/${id}-${prefix}`)
    .set({
      to: dt.email,
      template: {
        name: "bill",
        data: {
          Weighbridge_name: dt.weighbridge.display_name,
          address: "",
          vehicle_number: dt.vehicle_number,
          material: dt.material.name,
          date: `${new Date(dt.created_at).toLocaleString()}`,
          vehicle: dt.vehicle.name,
          scale_weight: dt.scale_weight,
          tare_weight: dt.tare_weight || "",
          net_weight: `${
            dt.second_weight
              ? Math.abs(
                  parseInt(dt.tare_weight || "0", 10) -
                    parseInt(dt.scale_weight || "0", 10)
                )
              : ""
          }`,
          charges: dt.charges,
        },
      },
      subject: `thanks for choosing ${dt.weighbridge.display_name}`,
      html: `thank you for choosing ${dt.weighbridge.display_name || ""}!
          vehicle number: ${dt.vehicle_number}
          material: ${dt.material.name}
          time: ${new Date(dt.created_at).toLocaleString()}
          scale weight: ${dt.scale_weight}
          tare weight: ${dt.tare_weight || ""}
          net weight: ${
            dt.second_weight
              ? Math.abs(
                  parseInt(dt.tare_weight || "0", 10) -
                    parseInt(dt.scale_weight || "0", 10)
                )
              : ""
          }
          `,
    });
};
