import { QueryInterface } from "sequelize";
import { IUserModel } from "../../../../shared/interfaces/User.interface";
import { ServiceHelpers } from "../../utils";

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          email: "a@a.com",
          password: ServiceHelpers.getHashedPassword("123456"),
          name: "a",
        },
        {
          email: "c@c.com",
          password: ServiceHelpers.getHashedPassword("123456"),
          name: "c",
        },
        {
          email: "b@b.com",
          password: ServiceHelpers.getHashedPassword("123456"),
          name: "b",
        },
      ],
      {}
    );
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("users", {});
  },
};
