import { UserCreation } from "../../../../shared/interfaces/User.interface";
import UserModelSequelize from "../../db/model/User.model";
import IModel from "../../interface/model.interface";

export default class UserModel
  implements IModel<UserCreation, UserModelSequelize>
{
  private model: typeof UserModelSequelize;

  private constructor(model: typeof UserModelSequelize) {
    this.model = model;
  }
  async create(model: UserCreation) {
    const user = await this.model.create(model);
    return user;
  }
  async findOne(model: Partial<UserModelSequelize>) {
    const user = await this.model.findOne({ where: model });
    return user;
  }

  static getInstance(model = UserModelSequelize) {
    return new UserModel(model);
  }
}
