'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('contacts', 'owner', {
      type: Sequelize.INTEGER,
      allowNull: true  // временно допускаем null
    });

    await queryInterface.changeColumn('contacts', 'owner', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('contacts', 'owner');
  }
};
