"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Borrowers",
      [
        {
          id: "9e555bd6-0f36-454a-a3d5-89edef4ff9d4",
          full_name: "Looking for it",
          national_id: "9023193",
          email: "390",
          phone_number: "7321",
          residance_address: "Myuas",
          assurer_name: "kf",
          assurer_contact: "0978",
          itemId: "9e555bd6-0f36-454a-a3d5-89edef4ff9d4",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Borrowers", null, {});
  },
};
