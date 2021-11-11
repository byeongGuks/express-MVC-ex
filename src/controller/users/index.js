// routing
const { Router } = require('express');
const ctrl = require('./controller.js');

router = Router();

// todo : 권한 없으면 에러메세지 뜨게 하기

router.get('/', ctrl.getList);
router.get('/user', ctrl.getUser); 

module.exports =  router;