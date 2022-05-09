'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pick_up_longitude: {
        type: Sequelize.FLOAT
      },
      pick_up_latitude: {
        type: Sequelize.FLOAT
      },
      drop_of_longitude: {
        type: Sequelize.FLOAT
      },
      drop_of_latitude: {
        type: Sequelize.FLOAT
      },
      pick_up_time: {
        type: Sequelize.TIME
      },
      drop_of_time: {
        type: Sequelize.TIME
      },
      amount: {
        type: Sequelize.FLOAT
      },
      means_of_payment: {
        type: Sequelize.STRING
      },
      date_of_payment: {
        type: Sequelize.DATE
      },
      driver_feedback: {
        type: Sequelize.TEXT
      },
      customer_feedback: {
        type: Sequelize.TEXT
      },
      mark: {
        type: Sequelize.INTEGER
      },
     
     
      mark: {
        type:Sequelize.INTEGER,
      },
      customerId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references: {         // User belongsTo Company 1:1
          model: 'Users',
          key: 'id'
        }
      },
      driverId: {
        type: Sequelize.INTEGER,
        references: {         // User belongsTo Company 1:1
          model: 'Users',
          key: 'id'
        }
      },

      statusId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references: {         // User belongsTo Company 1:1
          model: 'Statuses',
          key: 'id'
        }
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
    await queryInterface.dropTable('Bookings');
  }
};