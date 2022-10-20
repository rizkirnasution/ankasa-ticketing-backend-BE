const { Pool } = require("pg");
const {
  NODE_ENV,
  PGHOST,
  PGUSER,
  PGPASSWORD,
  PGDATABASE,
  PGPORT,
} = require("../utils/env");

const config = {
  host: PGHOST,
  user: PGUSER,
  password: PGPASSWORD,
  database: PGDATABASE,
  port: PGPORT,
};

if (NODE_ENV === "production") {
  config.ssl = {
    rejectUnauthorized: false,
  };
}

const db = new Pool(config);

db.connect((err) => {
  if (err) {
    console.log(err.message);
    process.exit(1);
  }
  console.log("Database connected successfully.");
});

module.exports = db;
