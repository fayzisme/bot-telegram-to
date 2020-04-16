'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('customers', 
			[
				{
					full_name: 'Jono Partono',
					username: 'jonton',
					email: 'jonoparno@email.com',
					phone_number: '08324232344',
					createdAt: new Date(),
          			updatedAt: new Date()
				}
			], {});
  },

  down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('customers', null, {});
  }
};
