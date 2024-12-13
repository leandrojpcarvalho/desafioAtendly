import { QueryInterface } from 'sequelize';

export default {
    up: async (queryInterface: QueryInterface) => {
        await queryInterface.bulkInsert(
            'people',           [
                {
                    email: "a@a.com",
                    password: "123456",
                    active: true,
                },
                {
                    email: "c@c.com",
                    password: "123456",
                    active: true,
                }
                ,
                {
                    email: "b@b.com",
                    password: "123456",
                    active: true,
                },

            ],
            {},
        );
    },

    down: async (queryInterface: QueryInterface) => {
        await queryInterface.bulkDelete('people', {});
    },
};