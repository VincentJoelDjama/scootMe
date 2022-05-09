'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'customerId',
        as: 'booking_cst'
      })
      this.belongsTo(models.User, {
        foreignKey: 'driverId',
        as: 'booking_drv'
      })
      this.belongsTo(models.Status, {
        foreignKey: 'statusId',
        as: 'booking_sta'
      })
    }
  }
  Booking.init({
    pick_up_longitude: DataTypes.FLOAT,
    pick_up_latitude: DataTypes.FLOAT,
    drop_of_longitude: DataTypes.FLOAT,
    drop_of_latitude: DataTypes.FLOAT,
    pick_up_time: DataTypes.TIME,
    drop_of_time: DataTypes.TIME,
    amount: DataTypes.FLOAT,    
    means_of_payment: DataTypes.STRING,
    date_of_payment: DataTypes.DATE,
    driver_feedback: DataTypes.TEXT,
    customer_feedback: DataTypes.TEXT,
    customerId: DataTypes.INTEGER,
    driverId:DataTypes.INTEGER,
    statusId: DataTypes.INTEGER,
    mark: DataTypes.INTEGER
  }, {
    sequelize,    
  
    modelName: 'Booking',
  });
  return Booking;
};