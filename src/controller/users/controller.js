
const { userDAO } = require('../../DAO/index.js');
const auth = require('../../lib/authentication.js');
const { changeUserFormatToHtml } = require('../../lib/changeFormat.js');

const getUser = async (req, res, next) => {
    try {
        const user = req.session.user;
        const { username, id } = req.query;
        let userInfo;
        if(username) {
            userInfo = await userDAO.getByUsername(username);
            if(!userInfo) throw new Error('Not Found'); //  404 
        } else if(id) {
            userInfo = await userDAO.getByUserID(id);
            if(!userInfo) throw new Error('Not Found'); //  404 
        } else throw new Error('BAD_REQUEST'); // error 400
        
        return res.render('users/user', { user, userInfo });
    } catch(err) {
        return next(err);
    }
};

const makeHtmlForm = userlist => {
    let result = '<ul> '
    userlist.forEach(user => {
        result += `<li> <a href='/users/user?username=${user.username}'>${user.username} </li>`;
    })
    return result + '</ul>';
};

const getList = async (req, res, next) => {
    try {
        const user = req.session.user;
        let { sortBy } = req.query;
        if(!sortBy) sortBy = 'num_post';
        if(sortBy!='num_post' && sortBy!='date_joined') throw new Error('BAD_REQUEST');
        let userListObject = await userDAO.getList(sortBy);
        if(!userListObject) throw new Error('NOT_FOUND'); //  404
        const userList = makeHtmlForm(Object.values(userListObject))
        return res.render('users/list.pug' , { user, sortBy, userList });
    } catch(err) {
        return next(err);
    }
};

module.exports = {
    getUser,
    getList,
};

