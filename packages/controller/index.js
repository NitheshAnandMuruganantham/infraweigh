const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const express = require("express");
const config = require("./config.json");
const cors = require("cors");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");

ffmpeg.setFfmpegPath(ffmpegPath);

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

var x = 0;

const port = new SerialPort({
  baudRate: config.transducer.baudrate,
  path: config.transducer.port,
  dataBits: 8,
  autoOpen: true,
  lock: true,
});

port.on("error", () => {
  process.exit(1);
});

port.on("close", () => {
  process.exit(1);
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

app.get("/", (req, res) => {
  try {
    ffmpeg(req.query.url)
      .inputOptions(["-rtsp_transport", "tcp"])
      .outputOptions(["-frames:v 1", "-vf", "scale=320:240"])
      .format("image2")
      .pipe(res);
  } catch (err) {
    res.status(500).json({
      error: "something went wrong !",
    });
  }
});

app.get("/weight", (req, res) => {
  if (port.closed) {
    res.status(500).json({
      error: "serial device error",
    });
  } else {
    res.send({
      weight: x,
    });
  }
});

port.on("open", () => {
  app.listen(9999, () => {
    console.log("server started and loaded serial port");
  });
});
