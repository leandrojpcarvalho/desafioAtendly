import { Sequelize } from "sequelize";
import config from "./config/db";

const sequelize = new Sequelize(config);

export default sequelize;
