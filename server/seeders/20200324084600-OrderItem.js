'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('order_items', 
				[
					{
						order_id: 1,
						product_id: 2,
						quantity: 1,
						createdAt: new Date(),
          				updatedAt: new Date()
					}
				], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('order_items', null, {});
  }
};
