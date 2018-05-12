const routes = require('express').Router();

const banrisul = require('./banrisul');

routes.use('/banrisul', banrisul);

module.exports = routes;
