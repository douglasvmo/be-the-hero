const exptres = require('express');

const routes = exptres.Router();
const OngsController = require('./controller/OngController');
const IncidentController = require('./controller/IncidentController');
const ProfileController = require('./controller/ProfileController');
const SessionController = require('./controller/SessionController');

routes.get('/ongs', OngsController.index);
routes.get('/incidents', IncidentController.index);
routes.get('/profiles', ProfileController.index);

routes.post('/ongs', OngsController.create);
routes.post('/incidents', IncidentController.create);
routes.post('/session', SessionController.create);

routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;
