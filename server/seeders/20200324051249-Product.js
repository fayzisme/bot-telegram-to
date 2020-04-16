'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('products', 
			[
				{
					name: 'Tomkins Columbus',
					price: 395000,
					createdAt: new Date(),
          			updatedAt: new Date()
				},
				{
					name: 'Vans Old Skool',
					price: 190000,
					createdAt: new Date(),
          			updatedAt: new Date()
				},
				{
					name: 'Converse One Star Mason',
					price: 895000,
					createdAt: new Date(),
          			updatedAt: new Date()
				}
			], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('products', null, {});
  }
};
