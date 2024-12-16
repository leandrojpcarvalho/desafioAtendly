import { QueryInterface, DataTypes } from "sequelize";
import UserModelSequelize from "../model/User.model";

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable<UserModelSequelize>("users", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("users");
  },
};
