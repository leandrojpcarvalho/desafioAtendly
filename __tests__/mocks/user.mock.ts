import UserModelSequelize from "../../backend/src/db/model/User.model";
import { ServiceHelpers } from "../../backend/src/utils";
import {
  IUserModel,
  UserCreation,
} from "../../shared/interfaces/User.interface";

const creationUser: UserCreation = {
  email: "a@a.com",
  name: "test",
  password: "123456",
};

const createdUser: UserModelSequelize = UserModelSequelize.build({
  ...creationUser,
  password: ServiceHelpers.getHashedPassword("123456"),
  id: 1,
});

const mocks = {
  createdUser,
  creationUser,
};

export default mocks;
