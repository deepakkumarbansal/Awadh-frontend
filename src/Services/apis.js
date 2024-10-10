import { envConfig } from "../config/envConfig";
const {baseBackendUrl : BASE_URL} = envConfig

export const profileEndpoints = {
  GET_ALL_USER_API: BASE_URL + "/api/admin/all-users",
  GET_ALL_REPORTERS_API: BASE_URL + "/api/admin/all-reporters",
  UPDATE_STATUS_OF_USER_API: (userId) =>
    BASE_URL + `/api/admin/update-status/${userId}`,
  GER_ALL_ARTICLES: BASE_URL + "/api/admin/all-articles",
  UPDATE_ARTICLE_VERIFICATION: (articleId) =>
    BASE_URL + `/api/admin/verify-article/${articleId}`,
  UPDATE_ARTICLE_STATUS: (articleId) =>
    BASE_URL + `/api/admin/update-article-status/${articleId}`,
};

export const articlesEndPoints = {
  CREATE_ARTICLE: BASE_URL + "/api/article/create",
  GET_ALL_ARTICLE: BASE_URL + "/api/article/all-articles",
  GET_ALL_ADMIN_ARTICLE: BASE_URL + "/api/admin/all-articles",
  GET_ARTICLE_BY_ID: (articleId) =>
    BASE_URL + `/api/article/whole-article/${articleId}`,
  UPDATE_ARTICLE_BY_ID: (articleId) =>
    BASE_URL + `/api/article/update-article/${articleId}`,
  DELETE_ARTICLE_BY_ID: (articleId) =>
    BASE_URL + `/api/article/delete-article/${articleId}`,
  GET_ARTICLE_BY_REPORTERS_ID: (articleId) =>
    BASE_URL + `/api/article/reporter-articels/${articleId}`,
  GET_ARTICLES_BY_CATAGORY: BASE_URL + `/api/article/article-category`,
  SEARCH_ARTICLES: BASE_URL + `/api/article/search-article`
};

export const commentsEndPoints = {
  CREATE_COMMENT: BASE_URL + "/api/comment/create",
  GET_COMMENT_BY_ARTICLE_ID: (articleId) =>
    BASE_URL + `/api/comment/getCommentsByArticle/:${articleId}`,
};

export const authEndPoints = {
  LOGIN_API: BASE_URL + "/api/auth/login",
  REGISTER_API: BASE_URL + "/api/auth/register",
  FORGET_PASSWORD_API: BASE_URL + "/api/auth/forgetpassword",
  VERIFY_PASSWORD_API: BASE_URL + "/api/auth/verifypassword",
  UPDATE_PASSWORD: BASE_URL + `/api/auth/changePassword`,
  UPDATE_NAME: BASE_URL + `/api/auth/changeName`,
  SEND_INVITATION_MAIL: BASE_URL + `/api/admin/invite-reporter`,
  ACCEPT_INVITE_REPORTER: (token) => BASE_URL + `/api/admin/accept-invite-reporter/${token}`,
  UPDATE_AVATAR_URL: BASE_URL + `/api/auth/update-avatar-url`
};

export const visitorCountApi = {
  getCount: BASE_URL + "/api/count/visit-count",
  updateCount: BASE_URL + "/api/count/update-visit-count",
};
