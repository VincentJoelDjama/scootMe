'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      invoice.belongsTo(models.Booking,
         {foreignKey: 'bookingId',
        as: 'invoice'}); // Will add a customerId attribute to Address to hold the primary key value for Customer.
      
    }
  }
  invoice.init({
    billingDate: DataTypes.DATE,
    amount: DataTypes.INTEGER,
    bookingId: DataTypes.INTEGER
  }, {
    sequelize,
   // paranoid:true,
    modelName: 'Invoice',
  });
  return invoice;
};