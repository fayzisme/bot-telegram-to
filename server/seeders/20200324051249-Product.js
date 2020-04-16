'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('products', 
			[
				{
					name: 'Tomkins Columbus',
					price: 395000,
					description: `Menggunakan neat stitching dan eyelets
					Outsole kuat dan wet
					Material yang digunakan kulit sintetik
					Desain trendy dan modern
					Tersedia mulai ukuran 39 sampai 44`,
					createdAt: new Date(),
          			updatedAt: new Date()
				},
				{
					name: 'Vans Old Skool',
					price: 190000,
					description: `Materialnya terbuat dari kanvas kualitas terbaik
					Desain sepatu khas Vans yang unik dan berbeda
					Menggunakan teknik neat stitching
					Sole sepatu terbuat dari bahan karet
					Model slip on shoe yang nyaman`,
					createdAt: new Date(),
          			updatedAt: new Date()
				},
				{
					name: 'Converse One Star Mason',
					price: 895000,
					description: `Desain sporty yang keren
					Material sepatu terbuat dari upper premium
					Pada bagian dalam sepatu dilengkapi dengan bantalan empuk yang nyaman
					Teknik jahitan menggunakan neat stitching`,
					createdAt: new Date(),
          			updatedAt: new Date()
				}
			], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('products', null, {});
  }
};
