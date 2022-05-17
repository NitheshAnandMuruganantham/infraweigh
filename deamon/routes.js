"use strict";
const client = require("./client.js");
module.exports = function (app, opts) {
  app.get("/weight", (req, res) => {
    res.json({
      weighbridge_id: "812801ef-817d-4dab-9845-3556879ad936",
      weight: 3950,
    });
  });
};
