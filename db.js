require("dotenv").config();
const mysql = require("mysql");

const con = mysql.createConnection({
  host: process.env.DB_ENDPOINT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: "3306",
});

// con.connect(function (err) {
//   if (err) throw err;

//   con.query("CREATE DATABASE IF NOT EXISTS partpay;");
//   con.query("USE partpay;");
//   con.query(
//     "CREATE TABLE IF NOT EXISTS secret(id int NOT NULL AUTO_INCREMENT, shopname varchar(255), access_token varchar(500),PRIMARY KEY(id));",
//     function (error, result, fields) {
//       console.log(result);
//       console.log(error);
//     }
//   );
//   con.end();
// });
//   console.log("Connected!");
//   con.end();

module.exports = con;
// export default con;
