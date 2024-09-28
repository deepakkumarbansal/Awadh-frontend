import { apiConnector } from "../connector"
import { articlesEndPoints, profileEndpoints } from "../apis"
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

export const getAllUsers = async (limit, page) => {
    try {
        const response = await apiConnector("GET", profileEndpoints.GET_ALL_USER_API, null, null, {limit, page});
        const result = response?.data;
        return result;
    } catch (error) {
        throw new Error(error)
    }
}

export const getAllReporters = async (limit, page) => {
    try {
        const response = await apiConnector("GET", profileEndpoints.GET_ALL_REPORTERS_API, null, null, {limit, page});
        const result = response?.data;
        return result;
    } catch (error) {
        throw new Error(error)
    }
}

export const updateUserOrReporterStatus = async(id, status) => {
    try {
        // throw new Error("test error");
        const response = await apiConnector("PUT", profileEndpoints.UPDATE_STATUS_OF_USER_API(id), {status});
        const result = response?.data;
        return result;
    } catch (error) {
        throw new Error(error)
    }
}

export const updateArticleStatusById = async(id, status) => {
    try {
        const response = await apiConnector('PUT', profileEndpoints.UPDATE_ARTICLE_STATUS(id), {status});
        const result = response?.data;
        return result;
    } catch (error) {
        throw new Error(error)
    }
}
