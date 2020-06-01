// ============================
//  PORT
// ============================
process.env.PORT = process.env.PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || ENV_DEV;

const ENV_DEV = "DEV";
const DB_SCHEMA = "fisioterapia";

if (process.env.NODE_ENV === ENV_DEV) {
  process.env.URI_MONGODB = "mongodb://localhost:27017/";
}
process.env.URI_MONGODB = process.env.URI_MONGODB + DB_SCHEMA;
