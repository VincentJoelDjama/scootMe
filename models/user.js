'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      Booking,
    }) {
      this.hasMany(Booking , {
        foreignKey: 'customerId',
        as: 'booking_cst'
      } )
      this.hasMany(Booking,  {
        foreignKey: 'driverId',
        as: 'booking_drv'
      } )
    }
  }
  User.init({

    firstname: {
      type: DataTypes.STRING,

    },

    lastname: {
      type: DataTypes.STRING,

    },

    email: {
      type: DataTypes.STRING,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN
    },

    password: {
      type: DataTypes.STRING,

    },

    mobile: {
      type: DataTypes.INTEGER,
    },

    address: {
      type: DataTypes.STRING,

    },
    /*  isAdmin: true, */

    picture: {
      type: DataTypes.STRING,
      defaultValue: "./uploads/profile/random-user.png",
    }
  }, {
    sequelize,

    modelName: 'User',
  });
  return User;
};