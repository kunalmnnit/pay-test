require("dotenv").config();
const express = require("express");
const con = require("./db");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
  })
);
app.get("/api/token", (req, res) => {
  const { shop } = req.query;
  con.connect(function (err) {
    con.query(
      "Select access_token from partpay.secret where shopname=?",
      shop,
      function (err, result, fields) {
        if (err) {
          console.log(err);
          res.status(500).send(err.message);
        }
        if (result) {
          console.log("result - " + result);
          res.status(200).send(result[0]);
        }
        if (fields) console.log(fields);
      }
    );
  });
});

app.post("/webhook", (req, res) => {
  // Handle the webhook request here
  console.log(req.body);
  res.status(200).send("Webhook received");
});

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});
