// routing

const { Router } = require('express');
const ctrl = require('./controller.js');

router = Router();

router.get('/sign_in', ctrl.getSignIn);
router.post('/sign_in', ctrl.postSignIn);

router.get('/sign_up', ctrl.getSignUp);
router.post('/sign_up', ctrl.postSignUp);

router.get('/sign_out', ctrl.getSignOut);

module.exports =  router;