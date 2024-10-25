import { apiConnector } from "../connector"
import { adminEndPoints, articlesEndPoints, profileEndpoints } from "../apis"
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
        const response = await apiConnector("GET", profileEndpoints.GET_ALL_USER_API, null, {authorization : `Bearer ${localStorage.getItem("token")}`}, {limit, page});
        const result = response?.data;
        return result;
    } catch (error) {
        throw new Error(error)
    }
}

export const getAllReporters = async (limit, page) => {
    try {
        const response = await apiConnector("GET", profileEndpoints.GET_ALL_REPORTERS_API, null, {authorization : `Bearer ${localStorage.getItem("token")}`}, {limit, page});
        const result = response?.data;
        return result;
    } catch (error) {
        throw new Error(error)
    }
}

export const updateUserOrReporterStatus = async(id, status) => {
    try {
        // throw new Error("test error");
        const response = await apiConnector("PUT", profileEndpoints.UPDATE_STATUS_OF_USER_API(id), {status}, {authorization: `Bearer ${localStorage.getItem("token")}`});
        const result = response?.data;
        return result;
    } catch (error) {
        throw new Error(error)
    }
}

export const updateArticleStatusById = async(id, status) => {
    try {
        const response = await apiConnector('PUT', profileEndpoints.UPDATE_ARTICLE_STATUS(id), {status}, {authorization: `Bearer ${localStorage.getItem("token")}`});
        const result = response?.data;
        return result;
    } catch (error) {
        throw new Error(error)
    }
}

export const deleteArticleById = async (articleId) => {
    try {
      const response = await apiConnector('DELETE', articlesEndPoints.DELETE_ARTICLE_BY_ID(articleId));
      if(!response){
        throw response.data.message;
      }
      console.log("delete");
      return response.data;
    } catch (error) {
      throw error;
    }
  }


export const fetchUsersPerMonth = async() => {
    try {
        const response = await apiConnector("GET", adminEndPoints.USER_PER_MONTH, {}, {Authorization: `Bearer ${localStorage.getItem("token")}`});
        const information = response?.data;
        return information?.data;
    } catch (error) {
        console.log(error.message);
        return [];
    }
}
export const fetchArticlesPerMonth = async() => {
    try {
        const response = await apiConnector("GET", adminEndPoints.ARTICLES_PER_MONTH, {}, {Authorization: `Bearer ${localStorage.getItem("token")}`});
        const information = response?.data;
        return information?.data;
    } catch (error) {
        console.log(error.message);
        return [];
    }
}

export const searchUser = async(userType, query, page, limit) => {
    try {
        const response = await apiConnector("GET", adminEndPoints.SEARCH_USERS, null, {Authorization: `Bearer ${localStorage.getItem("token")}`}, {userType, query, page, limit});
        const information = response?.data;
        return information?.data;
    } catch (error) {
        console.log(error.message);
        return {}
    }
}