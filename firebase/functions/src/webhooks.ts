import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client";
import * as functions from "firebase-functions";
import fetch from "cross-fetch";
import * as crypto from "crypto";
export default functions.https.onRequest(async (request, response) => {
  const requestedBody = JSON.stringify(request.body);
  const receivedSignature = request.headers["x-razorpay-signature"];
  const expectedSignature = crypto
    .createHmac("sha256", process.env["RAZORPAY_HMAC_SECRET"] || "")
    .update(requestedBody)
    .digest("hex");

  if (receivedSignature === expectedSignature) {
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
    await gqlClient.mutate({
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
          paid:
            request.body.payload.order.entity.status === "paid" ? true : false,
          payment_initiated: true,
        },
        pkColumns: {
          id: request.body.payload.order.entity.receipt,
        },
      },
    });
    response.status(200).json({
      status: "ok",
    });
  } else {
    response.status(200).json({
      status: "invalid",
      message: "Invalid signature",
    });
  }
});
