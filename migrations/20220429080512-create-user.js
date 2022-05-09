'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: false,
        trim: true,
      },

      lastname: {
        type: Sequelize.STRING,
        allowNull: false,
        trim: true
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
          notNull: true,
          is: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        },
      },

      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          // is: /^(?=.*\d).{4,8}$/
        }
      },

      mobile: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      address: {
        type: Sequelize.STRING,

      },
      /*  isAdmin: true, */

      picture: {
        type: Sequelize.STRING,
        defaultValue: "./uploads/profile/random-user.png"
      },

      isAdmin: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
  
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};