'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('user', [
      {
        id: 1,
        login: 'admin',
        password:
          '$2b$08$.L5YcFGW7DAmGFaOv1xvUueWsy46EWXJHJMZaM.zAeZZtW43YfGI6',
        role: 'admin'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op
    return await queryInterface.bulkDelete(
      'user',
      {
        id: {
          [Op.in]: [1]
        }
      },
      {}
    )
  }
}
