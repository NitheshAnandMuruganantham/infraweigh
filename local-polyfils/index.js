const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const image = require("./image");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.post("/:secret", (req, res) => {
  try {
    const body = req.body;
    const secret = req.params.secret;
    const token = jwt.sign(body, secret);
    res.json({
      token,
    });
  } catch {
    res.status(404).send("no payload or secret error");
  }
});
app.get("/dummy", (req, res) => {
  res.json({
    weight: 3950,
    image: [image(), image(), image(), image()],
  });
});

app.listen(3030, () => console.log(`local polyfills listening on ${3030}`));
