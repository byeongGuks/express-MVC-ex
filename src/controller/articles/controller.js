const { articleDAO, userDAO } = require('../../DAO/index.js');


const getWrite = async(req, res, next) => {
    try {
        const user = req.session.user;
        if(!user) {
            res.write("<script>alert('Please Sign In')</script>");
            res.write("<script>window.location=\"http://localhost:3001/auth/sign_in\"</script>");
        }
        return res.render('articles/write.pug', { user });
    } catch(err) {
        return next(err);
    }
};

// db에 article 등록
// user num_post 증가시켜주기
const postWrite = async(req, res, next) => {
    try {
        const { title, content } = req.body;
        if(!title || !content) throw new Error('BAD_REQUEST'); // error 400
        if(title.length  > 50) throw new Error('PAYLOAD_TOO_LARGE'); //error 413
        const { id, username } = req.session.user;
        if(!id || !username) throw new Error('UNAUTHORIZED'); //error 401

        
        // 비동기식흐름제어
        const tmp1 = articleDAO.createArticle(title, content, id);
        const userInfo = await userDAO.getByUsername(username);
        const tmp2 = userDAO.updateByUsername(username, userInfo.writingName, userInfo.numPost+1);
        const tmp3 = await tmp1;
        const tmp4 = await tmp2;
        return res.redirect('/'); // todo : change link to ariticle list 
    } catch(err) {
        return next(err);
    }
};

const makeHtmlForm = articleList => {
    let result = '<ul> '
    articleList.forEach(article => {
        result += `<li> <a href='/articles/article?id=${article.id}'>${article.title}</a> `
        + `created date : ${article.createdDate} updated date : ${article.updatedDate} `
        + `written by <a href='/users/user?id=${article.authorID}'> ${article.writingName} </li>`
    })
    return result + '</ul>';
};


const getList = async(req, res, next) => {
    try {
        const user = req.session.user;
        if(!user) {
            res.write("<script>alert('Please Sign In')</script>");
            res.write("<script>window.location=\"http://localhost:3001/auth/sign_in\"</script>");
        }
        const articleListObject = await articleDAO.getList('updated_date');
        if(!articleListObject) throw new Error('NOT_FOUND');
        const articleList = makeHtmlForm(Object.values(articleListObject))
        return res.render('articles/list.pug' , { user, articleList });
    } catch(err) {
        return next(err);
    }
};


module.exports = {
    getWrite,
    postWrite,
    getList
};