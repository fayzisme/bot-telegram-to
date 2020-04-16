'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('OrderItems', 
				[
					{
						order_id: 1,
						product_id: 2,
						quantity: 1
					}
				], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('OrderItems', null, {});
  }
};
