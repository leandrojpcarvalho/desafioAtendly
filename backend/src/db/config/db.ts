import { SqliteDialect } from "@sequelize/sqlite3";
import type { Options } from "@sequelize/core";

const config: Options<SqliteDialect> = {
  dialect: SqliteDialect,
  storage: ":memory:",
  pool: { max: 1, idle: Infinity, maxUses: Infinity },
};

export default config;
