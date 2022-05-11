'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('invoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      billingDate: {
        type: Sequelize.DATE
      },
      amount: {
        type: Sequelize.INTEGER
      },
      bookingId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: "Bookings",
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Invoices');
  }
};