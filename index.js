require("dotenv").config();
const express = require("express");
const request = require("request");
const crypto = require("crypto");
const con = require("./db");
const app = express();
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
// app.get("/install", (req, res) => {
//   const { shop, hmac, code, state } = req.query;

//   // Validate the request by checking the HMAC signature
//   if (!isValidRequest(req.query)) {
//     return res.status(400).send("Invalid request");
//   }

//   // Request an access token from Shopify
//   const accessTokenRequestUrl = `https://${shop}/admin/oauth/access_token`;
//   const accessTokenPayload = {
//     client_id: process.env.SHOPIFY_API_KEY,
//     client_secret: process.env.SHOPIFY_API_SECRET,
//     code,
//   };

//   request.post(
//     accessTokenRequestUrl,
//     { json: accessTokenPayload },
//     (err, accessTokenResponse, accessToken) => {
//       if (err) {
//         return res.status(500).send("Error during access token request");
//       }

//       // Store the access token in a secure location, such as a database or a secure cookie
//       saveAccessToken(shop, accessToken);

//       // Redirect the store owner to your app's main page
//       return res.redirect("/");
//     }
//   );
// });

// function isValidRequest(query) {
//   // Validate the request by checking the HMAC signature
//   const secret = process.env.SHOPIFY_API_SECRET;
//   const hmac = query.hmac;

//   // Remove the hmac parameter from the query
//   delete query.hmac;

//   // Sort the parameters alphabetically by key
//   const queryString = Object.keys(query)
//     .sort()
//     .map((key) => `${key}=${query[key]}`)
//     .join("&");

//   // Generate the HMAC signature
//   const generatedHmac = crypto
//     .createHmac("sha256", secret)
//     .update(queryString)
//     .digest("hex");

//   // Compare the generated HMAC signature with the HMAC signature from the query
//   return generatedHmac === hmac;
// }

// function saveAccessToken(shop, accessToken) {
//   // Store the access token in a secure location, such as a database
//   con.connect(function (err) {
//     con.query(
//       `INSERT INTO partpay.secret (shopname, access_token) VALUES ('${shop}', '${accessToken}'`,
//       function (err, result, fields) {
//         if (err) console.log(err);
//         if (result) console.log({ shopname: shop, access_token: accessToken });
//         if (fields) console.log(fields);
//       }
//     );
//   });
// }

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});
