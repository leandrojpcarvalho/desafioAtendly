import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import { IUserModel } from "../../../../shared/interfaces/User.interface";
import sequelize from "../configSequelize";
class UserModelSequelize
  extends Model<
    InferAttributes<UserModelSequelize>,
    InferCreationAttributes<UserModelSequelize>
  >
  implements IUserModel
{
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;
  declare password: string;
}

UserModelSequelize.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    underscored: true,
  }
);

export default UserModelSequelize;
