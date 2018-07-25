'use strict';

const faker = require("faker");

let users = [{
     id: 1,
     username: "testuser1",
     email: faker.internet.email(),
     password: "password11",
     createdAt: new Date(),
     updatedAt: new Date(),
     role: "standard"
     },
     {     
     id: 2,
     username: "testuser2",
     email: faker.internet.email(),
     password: "password22",
     createdAt: new Date(),
     updatedAt: new Date(),
     role: "standard"
     }
];

module.exports = {
  up: (queryInterface, Sequelize) => {
       return queryInterface.bulkInsert("Users", users, {});
  },

  down: (queryInterface, Sequelize) => {
       return queryInterface.bulkDelete("Users", null, {});
  }
};
