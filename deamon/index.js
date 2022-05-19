#! /usr/bin/env node
"use strict";

// Pass configuration to application
require("./main.js")({
  port: 8000,
  host: "localhost",
});
