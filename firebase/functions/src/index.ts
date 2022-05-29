import * as functions from "firebase-functions";
import * as Admin from "firebase-admin";
import * as cors from "cors";
import razorPayHookFunction from "./webhooks";
import { genBillHandler } from "./genBill";

export const razorPayHook = razorPayHookFunction;

export const admin = Admin.initializeApp();
cors({ origin: true });
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

export const genTenent = functions.https.onRequest((request, response) =>
  applyMiddleware(request, response, () => {})
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
        await admin.auth().setCustomUserClaims(user.uid, {
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
  applyMiddleware(req, res, async (req: any, res: any) =>
    genBillHandler(req, res, admin)
  )
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
