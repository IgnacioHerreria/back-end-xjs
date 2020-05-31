// ============================
//  PORT
// ============================
process.env.PORT = process.env.PORT || 3000;

const ENV_DEV = "DEV";
const DB_SCHEMA = "fisioterapia";

process.env.NODE_ENV = process.env.NODE_ENV || ENV_DEV;

let URL_DB = "";

// if (process.env.NODE_ENV === ENV_DEV) {
//   URL_DB = "mongodb://localhost:27017/";
// } else {
URL_DB =
  "mongodb+srv://admin-bears:PgMsTWJwBMv20niH@cluster0-yuqvu.mongodb.net/";
// }

process.env.URL_DB = URL_DB + DB_SCHEMA;
