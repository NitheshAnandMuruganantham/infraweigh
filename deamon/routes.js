"use strict";
const client = require("./client.js");
module.exports = function (app, opts) {
  app.get("/weight", (req, res) => {
    res.json({
      weighbridge_id: "1250bd67-143b-450d-b478-e523b01d7de3",
      weight: 3950,
    });
  });
};
