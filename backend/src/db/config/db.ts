import type { Options } from "sequelize";

const config: Options = {
  dialect: "sqlite",
  host: "./db.sqlite",
};

export default config;
