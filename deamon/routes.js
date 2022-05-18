"use strict";
const config = require("./config.json");

module.exports = function (app, opts) {
  app.get("/weight", (req, res) => {
    res.json({
      weighbridge_id: config.weighbridge_id || null,
      weight: 3950,
    });
  });
};
