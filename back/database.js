const knex = require('knex');
const knexfile = require('./knexfile');

const environment ='development';
const config = knexfile[environment];

module.exports = knex(config);
