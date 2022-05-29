import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import fetch from "cross-fetch";
import express from "express";
import config from "./config.json";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

var x = 0;

const port = new SerialPort({
  baudRate: config.transducer.baudrate,
  path: config.transducer.port,
  dataBits: 8,
  autoOpen: true,
  lock: true,
});

const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

parser.on("data", (data) => {
  setTimeout(() => {
    const StringData = String(data || "0");
    const parsedData = StringData.replace(/[^0-9.]/g, "");
    if (/-/g.test(StringData)) {
      x = parseInt(`-${parsedData}`);
    } else {
      x = parseInt(`${parsedData}`);
    }
  }, 1000);
});

app.get("/", async (req, res) => {
  const data = await fetch("http://localhost:9998", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      camera: config.camera,
    }),
  });

  const resultJson = await data.json();

  res.json({
    images: resultJson.image,
    weight: x,
  });
});

port.on("open", () => {
  app.listen(config.server.port, () => {
    console.log("server started and loaded serial port");
  });
});
