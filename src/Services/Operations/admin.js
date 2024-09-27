import { apiConnector } from "../connector"
import { articlesEndPoints } from "../apis"
export const createArticle = async (data) => {
    try {
        const response = await apiConnector("POST",articlesEndPoints.CREATE_ARTICLE, data);
        const result = response?.data?.message;
        return result
    } catch (error) {
        console.log(error);
        return error.message
    }
}

export const updateArticle = async (data) => {
    try {
        const response = await apiConnector("PATCH", articlesEndPoints.UPDATE_ARTICLE_BY_ID(data.articleId), data);
        const result = response?.data?.message;
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}