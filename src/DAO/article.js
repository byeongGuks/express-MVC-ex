const { runQuery } = require('../lib/database_query.js');
const { changeArticleDateFormat } = require('../lib/changeFormat.js');

const getList = async(sortBy) => {
    if(sortBy!='created_date' && sortBy!='updated_date' && sortBy!='number_liked') return '';
    const sql = 'SELECT a.id, a.title, a.author_id AS authorID, a.created_date AS createdDate, ' + 
    'a.updated_date AS updatedDate, a.number_liked AS numberLiked, u.writing_name AS writingName ' +
    'FROM articles AS a INNER JOIN users AS u ON a.author_id = u.id AND a.is_deleted = 0 ' +
    'ORDER BY ' + sortBy + ';'; 
    const articles = await runQuery(sql);
    return articles.map(changeArticleDateFormat);
};


const getArticleByAuthor = async (authorID) => {
    const sql = 'SELECT a.id, a.title, a.content, a.created_date AS createdDate, ' + 
    'a.updated_date AS updatedDAte, a.number_liked AS numberLiked, u.writing_name AS writingName ' +
    'FROM articles as a INNER JOIN users AS u WHERE a.author_id = ? AND a.is_deleted = 0 ON a.author_id = u.id ;';
    const results = await runQuery(sql, [authorID]);
    return changeArticleDateFormat(results[0]);
};

const getArticleByID = async (id) => {
    const sql = 'SELECT a.id, a.title, a.content, a.created_date AS createdDate, ' + 
    'a.updated_date AS updatedDAte, a.number_liked AS numberLiked, u.writing_name AS writingName ' +
    'FROM articles as a INNER JOIN users AS u WHERE a.id = ? AND a.is_deleted = 0 ON a.author_id = u.id ;';
    const results = await runQuery(sql, [authorID]);
    return changeArticleDateFormat(results[0]);
};

const createArticle = async(title, content, authorID) => {
    const sql = 'INSERT INTO articles (title, content, author_id) VALUES (?, ?, ?);';
    await runQuery(sql, [title, content, authorID]);
};

const updateArticle = async(id, title, content) => {
    const sql = 'UPDATE articles SET title = ?, content = ?, WHERE id = ?; ';
    await runQuery(sql, [title, content, id]);
};

const removeArticle = async(id) => {
    const sql = 'UPDATE articles SET is_deleted = 1 WHERE id = ?;';
    await runQuery(sql, [id]);
};

module.exports = {
    getList,
    getArticleByAuthor,
    getArticleByID,
    createArticle,
    updateArticle,
    removeArticle
}