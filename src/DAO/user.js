const { runQuery } = require('../lib/database_query.js');
const { changeUserDateFormat } = require('../lib/changeFormat');

const createUser = async (username, password, writingName) => {
    const sql = 'INSERT INTO users (username, password, writing_name) VALUES (?, ?, ?);';
    await runQuery(sql, [username, password, writingName]);
};

const deleteUser = async (username) => {
    const sql = 'DELETE FROM users WHERE username = ?;';
    await runQuery(sql, [username]);
};

const getByUsername = async (username) => {
    const sql = 'SELECT id, username, password, writing_name AS writingName, num_post AS numPost, date_joined AS dateJoined, is_staff AS isStaff '+
    'FROM users WHERE username = ?;';
    const results = await runQuery(sql, [username]);
    return results[0];
    //return changeUserDateFormat(results[0]);
};

// username과 writing name만 수정가능
const updateByUsername = async (username, writingName, numPost) => {
    const sql = 'UPDATE users SET writing_name = ?, num_post = ? WHERE username = ?;';
    return await runQuery(sql, [writingName, numPost, username]);
};

const getByUserID = async (id) => {
    const sql = 'SELECT id, username, password, writing_name AS writingName, num_post AS numPost, date_joined AS dateJoined, is_staff AS isStaff '+
    'FROM users WHERE id = ?;';
    const results = await runQuery(sql, [id]);
    return changeUserDateFormat(results[0]);
};

// username과 writing name만 수정가능
const updateByUserID = async (id, writingName, numPost) => {
    const sql = 'UPDATE users SET writing_name = ?, num_post = ? WHERE id = ?;';
    return await runQuery(sql, [writingName, numPost, id]);
};

const getList = async(sortBy) => {
    if(sortBy!='num_post' && sortBy!='date_joined') return '';
    const sql = 'SELECT id, username, writing_name AS writingName, num_post AS numPost, '+
    'date_joined AS dateJoined FROM users ORDER BY ' + sortBy + ' DESC;'
    let users = await runQuery(sql);
    console.log(users);
    let a = users.map(changeUserDateFormat);;
    return users.map(changeUserDateFormat);
};


module.exports = {
    createUser,
    deleteUser,
    getByUsername,
    getByUserID,
    updateByUserID,
    getList,
    updateByUsername
};