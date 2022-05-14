import * as functions from "firebase-functions";
import * as Admin from "firebase-admin";

const admin = Admin.initializeApp();

const applyMiddleware = (req: any, res: any, next: any) => {
  if (
    process.env["API_KEY"] &&
    req.headers.authorization === process.env["API_KEY"]
  ) {
    next(req, res);
  } else {
    res.status(403).send("Unauthorized");
    return;
  }
};

export const ping = functions.https.onRequest((request, response) =>
  applyMiddleware(request, response, () => {
    response.send("pong");
  })
);

export const genUser = functions.https.onRequest((req, res) =>
  applyMiddleware(req, res, (req: any, res: any) => {
    const data = req.body.event.data.new;
    const pass = () => {
      return `${
        Math.random().toString(36).slice(2) +
        Math.random().toString(36).toUpperCase().slice(2)
      }`;
    };
    admin
      .auth()
      .createUser({
        uid: data.id,
        email: data.email,
        password: pass(),
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

        res.status(200).json({
          message: "User created",
          user: user,
          synced: true,
        });
      })
      .catch((error) => {
        res.status(400).json({
          message: error.message || "",
        });
      });
  })
);

export const genAdmin = functions.https.onRequest((req, res) =>
  applyMiddleware(req, res, async (req: any, res: any) => {
    const pass = () => {
      return `${
        Math.random().toString(36).slice(2) +
        Math.random().toString(36).toUpperCase().slice(2)
      }`;
    };
    const data = req.body.event.data.new;
    await admin
      .auth()
      .createUser({
        uid: data.id,
        password: pass(),
        email: data.email,
        emailVerified: true,
      })
      .then(async (user) => {
        await admin.auth().setCustomUserClaims(data.id, {
          "https://hasura.io/jwt/claims": {
            "x-hasura-allowed-roles": ["admin"],
            "x-hasura-default-role": "admin",
            "x-hasura-user-id": data.id,
          },
        });

        res.status(200).json({
          message: "User created",
          user: user,
          synced: true,
        });
      })
      .catch(() => {
        res.status(400).json({
          message: "error",
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
      })
      .catch((error: any) => {
        res.status(400).json({
          message: error.message || "",
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
      });

      admin
        .auth()
        .setCustomUserClaims(data.id, {
          "x-hasura-weighbridge-id": {
            "x-hasura-allowed-roles": [data.role],
            "x-hasura-default-role": data.role,
            "x-hasura-tenent-id": data.tenent_id,
            "x-hasura-user-id": data.id,
            "x-hasura-weighbridge-id": data.weighbridge_id,
          },
        })
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
    fetch(process.env["HASURA_URL"] + "/v1/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Hasura-Admin-Secret": process.env["HASURA_ADMIN_SECRET"] || "",
      },
      body: JSON.stringify({
        query: `
            query ($billByPkId: uuid!) {
          bill_by_pk(id: $billByPkId) {
            id
            vehicle_number
            created_at
            second_weight
            tare_weight
            charges
            photos
            reference_bill_id
            second_weight
            tare_weight
            photos
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
            customer_2 {
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
            tenent {
              id
              email
              phone
              metadata
              name
            }
            vehicle {
              name
              id
              manufacturer
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
      }),
    }).then((response) => {
      response.json().then(async (data) => {
        const dt = data.data.bill_by_pk;
        if (dt.customer) {
          await admin
            .firestore()
            .doc(`messages/${req.body.event.data.new.id}-buyer`)
            .set({
              to: dt.customer.phone,
              body: `thank you for choosing ${
                dt.weighbridge.display_name || ""
              }!
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
            .doc(`mail/${req.body.event.data.new.id}-buyer`)
            .set({
              to: dt.customer.email,
              subject: `thanks for choosing ${dt.weighbridge.display_name}`,
              html: `thank you for choosing ${
                dt.weighbridge.display_name || ""
              }!
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
        }
        if (dt.customer_2) {
          await admin
            .firestore()
            .doc(`messages/${req.body.event.data.new.id}-seller`)
            .set({
              to: dt.customer_2.phone,
              body: `thank you for choosing ${
                dt.weighbridge.display_name || ""
              }!
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
            .doc(`mail/${req.body.event.data.new.id}-seller`)
            .set({
              to: dt.customer_2.email,
              subject: `thanks for choosing ${dt.weighbridge.display_name}`,
              html: `thank you for choosing ${
                dt.weighbridge.display_name || ""
              }!
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
        }
        if (dt.customer_3) {
          await admin
            .firestore()
            .doc(`messages/${req.body.event.data.new.id}-trader`)
            .set({
              to: dt.customer_3.phone,
              body: `thank you for choosing ${
                dt.weighbridge.display_name || ""
              }!
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
            .doc(`mail/${req.body.event.data.new.id}-trader`)
            .set({
              to: dt.customer_3.email,
              subject: `thanks for choosing ${dt.weighbridge.display_name}`,
              html: `thank you for choosing ${
                dt.weighbridge.display_name || ""
              }!
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
        }
        await admin
          .firestore()
          .doc(`bills/${req.body.event.data.new.id}`)
          .set(dt);
        res.json({
          status: "success",
          id: req.body.event.data.new.id,
        });
      });
    });
  })
);

export const genCustomer = functions.https.onRequest((req, res) =>
  applyMiddleware(req, res, async (req: any, res: any) => {
    const pass = () => {
      return `${
        Math.random().toString(36).slice(2) +
        Math.random().toString(36).toUpperCase().slice(2)
      }`;
    };
    const data = req.body.event.data.new;
    await admin
      .auth()
      .getUserByEmail(data.email)
      .then((user) => {
        if (user.uid) {
          res.status(200).json({
            message: "User exists",
            user: user,
            synced: true,
          });
        }
      })
      .catch(() => {
        admin
          .auth()
          .createUser({
            email: data.email,
            password: pass(),
            emailVerified: true,
          })
          .then(async (user) => {
            await admin.auth().setCustomUserClaims(user.uid, {
              "https://hasura.io/jwt/claims": {
                "x-hasura-allowed-roles": ["customer"],
                "x-hasura-default-role": "customer",
                "x-hasura-email": data.email,
                "x-hasura-phone": data.phone,
              },
            });

            res.status(200).json({
              message: "User created",
              user: user,
              synced: true,
            });
          })
          .catch((error) => {
            res.status(400).json({
              message: error.message || "",
            });
          });
      });
  })
);

export const updateCustomer = functions.https.onRequest((req, res) =>
  applyMiddleware(req, res, async (req: any, res: any) => {
    const pass = () => {
      return `${
        Math.random().toString(36).slice(2) +
        Math.random().toString(36).toUpperCase().slice(2)
      }`;
    };
    const data = req.body.event.data.new;

    const user = await admin
      .auth()
      .getUserByEmail(data.email)
      .then(() => {
        res.status(200).json({
          message: "User exists",
          user: user,
          synced: true,
        });
      })
      .catch(() => {
        admin
          .auth()
          .createUser({
            email: data.email,
            password: pass(),
            emailVerified: true,
          })
          .then(async (user) => {
            await admin.auth().setCustomUserClaims(user.uid, {
              "https://hasura.io/jwt/claims": {
                "x-hasura-allowed-roles": ["customer"],
                "x-hasura-default-role": "customer",
                "x-hasura-email": data.email,
                "x-hasura-phone": data.phone,
              },
            });

            res.status(200).json({
              message: "User created",
              user: user,
              synced: true,
            });
          })
          .catch((error) => {
            res.status(400).json({
              message: error.message || "",
            });
          });
      });
  })
);
