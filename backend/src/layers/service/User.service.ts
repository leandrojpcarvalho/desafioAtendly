import { StatusCodes } from "http-status-codes";
import { UserCreation } from "../../../../shared/interfaces/User.interface";
import UserModelSequelize from "../../db/model/User.model";
import IService from "../../interface/service.interface";
import UserModel from "../model/User.model";
import { ServiceHelpers } from "../../utils";

const { createResponse, bcryptValidation, createToken, getHashedPassword } =
  ServiceHelpers;

export default class UserService
  implements IService<UserCreation, UserModelSequelize>
{
  private modelInstance: UserModel;

  private constructor(model: UserModel) {
    this.modelInstance = model;
  }

  async create(user: UserCreation) {
    const { email } = user;

    const exists = await this.modelInstance.findOne({ email });
    if (exists) {
      return createResponse("O email ja esta cadastrado", StatusCodes.CONFLICT);
    }

    const newUser = { ...user, password: getHashedPassword(user.password) };
    await this.modelInstance.create(newUser);

    return createResponse(true, StatusCodes.CREATED);
  }

  async findOne({ email }: Partial<UserModelSequelize>) {
    const data = await this.modelInstance.findOne({ email });
    if (!data) {
      return createResponse("Usuario nao encontrado", StatusCodes.NOT_FOUND);
    }
    const { password, ...rest } = data.dataValues;
    return createResponse(rest, StatusCodes.OK);
  }

  async login(user: Partial<UserModelSequelize>) {
    const hasUser = await this.modelInstance.findOne(user);
    if (!hasUser || !user.password) {
      return createResponse(
        "Email e/ou senha estao errados",
        StatusCodes.UNAUTHORIZED
      );
    }
    const { password, ...rest } = hasUser;

    if (!bcryptValidation(password, user.password)) {
      return createResponse(
        "Email e/ou senha estao errados",
        StatusCodes.UNAUTHORIZED
      );
    }
    return createResponse(createToken(rest), StatusCodes.OK);
  }

  static getInstance(model = UserModel.getInstance()) {
    return new UserService(model);
  }
}
