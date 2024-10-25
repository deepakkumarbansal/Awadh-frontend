import { commentsEndPoints } from "../apis"
import { apiConnector } from "../connector"

const createComment = async(articleId, userId, comment) => {
    try {
        const response = await apiConnector("POST", commentsEndPoints.CREATE_COMMENT, {articleId, userId, comment}, {authorization: `Bearer ${localStorage.getItem("token")}`});
        return response?.data?.comment;
    } catch (error) {
        throw new Error(error.message);
    }
}

const getCommentsByArticle = async(articleId, page, limit) => {
    try {
        const response = await apiConnector("GET", commentsEndPoints.GET_COMMENT_BY_ARTICLE_ID(articleId), null, {authorization: `Bearer ${localStorage.getItem("token")}`}, {limit, page});
        return response.data;
    } catch (error) {
        console.log(error.message);
        return [];
    }
}

export {
    createComment,
    getCommentsByArticle
}