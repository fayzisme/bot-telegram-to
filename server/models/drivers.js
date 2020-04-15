'use strict';
module.exports = (sequelize, DataTypes) => {
  const drivers = sequelize.define('drivers', {
    full_name: DataTypes.STRING,
    phone_number: DataTypes.STRING
  }, {});
  drivers.associate = function(models) {
    drivers.hasMany(models.orders, {
      foreignKey: 'driver_id',
			onDelete: 'CASCADE'
    })
  };
  return drivers;
};