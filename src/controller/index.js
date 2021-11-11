const { Router } = require("express");
const auth = require('./auth/index.js');
const articles = require('./articles/index.js');
const users = require('./users/index.js');

const router = Router();

router.get('/', (req, res, next) => {
    try {
        const { user } = req.session;
        console.log(user);
        res.render('home.pug', { user });
    } catch (err) {
        return next(err);
    }
});

router.use('/auth', auth);
router.use('/users', users)
router.use('/articles', articles)

module.exports = router;