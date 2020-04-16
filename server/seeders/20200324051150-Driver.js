'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('drivers', 
			[
				{
					full_name: 'Anti Covid',
					phone_number: '08324387984',
					createdAt: new Date(),
          			updatedAt: new Date()
				}
			], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('drivers', null, {});
  }
};
