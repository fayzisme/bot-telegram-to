'use strict';
module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define('products', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {});
  products.associate = function(models) {
    products.hasMany(models.order_items, {
			foreignKey: 'product_id',
			onDelete: 'CASCADE'
		});
  };
  return products;
};