import type { Options } from "sequelize";
import "dotenv/config";

const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_PORT } = process.env;

const config: Options = {
  dialect: DB_NAME && DB_PASSWORD ? "mysql" : "sqlite",
  password: DB_PASSWORD,
  username: DB_USER,
  database: DB_NAME || "db",
  host: DB_HOST || "./db.sqlite",
  port: DB_PORT ? Number(DB_PORT) : undefined,
};

console.log(config);
export default config;
