const changeArticleDateFormat = article => {
    article.createdDate = article.createdDate.toString();
    article.updatedDate = article.updatedDate.toString();
    return article;
}

const changeUserDateFormat = user => {
    user.dateJoined = user.dateJoined.toString();
    return user;
}

module.exports = {
    changeArticleDateFormat,
    changeUserDateFormat,
}