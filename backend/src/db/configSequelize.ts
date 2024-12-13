import { Sequelize } from "@sequelize/core";
import config from "./config/db";

const sequelize = new Sequelize(config);

export default sequelize;
