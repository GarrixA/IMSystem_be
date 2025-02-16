"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          id: "8dfe453c-b779-453c-b96e-afe656eeebab",
          categoryName: "Device",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "8efe453c-b779-453c-b96e-afe656eeebab",
          categoryName: "Furniture",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
