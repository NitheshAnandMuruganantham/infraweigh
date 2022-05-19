"use strict";
const express = require("express");
const httpErrors = require("http-errors");
const path = require("path");
const pino = require("pino");
const pinoHttp = require("pino-http");
const cors = require("cors");

module.exports = function main(options, cb) {
  // Set default options
  const ready = cb || function () {};
  const opts = Object.assign(
    {
      // Default options
    },
    options
  );

  const logger = pino();

  // Server state
  let server;
  let serverStarted = false;
  let serverClosing = false;

  // Setup error handling
  function unhandledError(err) {
    // Log the errors
    logger.error(err);

    // Only clean up once
    if (serverClosing) {
      return;
    }
    serverClosing = true;

    // If server has started, close it down
    if (serverStarted) {
      server.close(function () {
        process.exit(1);
      });
    }
  }
  process.on("uncaughtException", unhandledError);
  process.on("unhandledRejection", unhandledError);

  // Create the express app
  const app = express();
  app.use(pinoHttp({ logger }));
  app.use(cors());
  require("./routes")(app, opts);

  // Common error handlers
  app.use(function fourOhFourHandler(req, res, next) {
    next(httpErrors(404, `Route not found: ${req.url}`));
  });
  app.use(function fiveHundredHandler(err, req, res, next) {
    if (err.status >= 500) {
      logger.error(err);
    }
    res.locals.name = "deamon";
    res.locals.error = err;
    res.status(err.status || 500).render("error");
  });

  // Start server
  server = app.listen(opts.port, opts.host, function (err) {
    if (err) {
      return ready(err, app, server);
    }

    // If some other error means we should close
    if (serverClosing) {
      return ready(new Error("Server was closed before it could start"));
    }

    serverStarted = true;
    const addr = server.address();
    logger.info(
      `Started at ${opts.host || addr.host || "localhost"}:${addr.port}`
    );
    ready(err, app, server);
  });
};
