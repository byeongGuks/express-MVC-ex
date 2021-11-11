const { userDAO } = require('../../DAO/index.js');
const auth = require('../../lib/authentication.js');

//get sign in
const getSignIn = async(req, res, next) => {
    try {
        const user = req.session.user;
        if(user) res.redirect('/');
        else res.render('auth/sign_in.pug', { user });
    } catch(err) {
        return next(err);
    }
};

//post sign in
const postSignIn = async(req, res, next) => {
    try {
        const { username, password } = req.body;
        if(!username || !password) throw new Error('BAD_REQUEST'); // error 400
        if(username.length > 20) throw new Error('PAYLOAD_TOO_LARGE'); 
        const user = await userDAO.getByUsername(username);
        if(!user || !(await auth.verifyPassword(password, user.password))) throw new Error('UNAUTHORIZED') // error 401
        // authorized user
        req.session.user = {
            id : user.id,
            username : user.username,
            wirtingName : user.writing_name,
            isStaff : user.is_staff
        };
        req.session.save(() => {
            res.redirect('/');
        });
        //return res.redirect('/');
    } catch(err) {
        return next(err);
    }
};

//get sign up
const getSignUp = async (req, res, next) => {
    try {
        const user = req.session.user;
        res.render('auth/sign_up.pug', { user })
    } catch(err) {
        return next(err);
    }
};

//post sign up
const postSignUp = async (req, res, next) => {
    try {
        console.log(req.body);
        const {username, password, writingName} = req.body;
        if(!username || !password || !writingName) throw new Error('BAD_REQUEST'); // error 400
        if(username.length > 20 || writingName.length > 20) throw new Error('BAD_REQUEST'); // error 400
        const hashedPassword = await auth.encryptPassword(password);
        await userDAO.createUser(username, hashedPassword, writingName);
        return res.redirect('/auth/sign_in');
    } catch(err) {
        return next(err);
    }
};

//get sign out
const getSignOut = async (req, res, next) => {
    try {
        req.session.destroy((err) => {
            if(err) throw err;
            res.redirect('/auth/sign_in');
        });
    } catch(err) {
        return next(err);
    }
};

module.exports = {
    getSignIn,
    postSignIn,
    getSignUp,
    postSignUp,
    getSignOut
};
