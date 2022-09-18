require("dotenv").config({ path: `${__dirname}/../.env` });

// Basic db connection object
const connection = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const dbConfig = {
  connection,
  client: process.env.DB_CLIENT,
  migrations: { stub: "./stubs/migration.stub" },
  seeds: { stub: "./stubs/seed.stub" },
};

module.exports = dbConfig;
