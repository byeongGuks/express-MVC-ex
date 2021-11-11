// routing

const { Router } = require('express');
const ctrl = require('./controller.js');

router = Router();

router.get('/', ctrl.getList);
router.get('/write', ctrl.getWrite);
router.post('/write', ctrl.postWrite);

module.exports =  router;