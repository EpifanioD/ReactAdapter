const express = require('express');
const routes = express.Router();

const PacientesControllers = require('./controllers/PacientesControllers');


routes.get('/pacientes', PacientesControllers.index);
routes.put('/pacientes/:id', PacientesControllers.update);

module.exports = routes;