const BASE_URL = "http://localhost:8400/api";

export const profileEndpoints = {
  GET_ALL_USER_API: BASE_URL + "/admin/all-users",
  GET_ALL_REPORTERS_API: BASE_URL + "/admin/all-reporters",
  UPDATE_STATUS_OF_USER_API: (userId) =>
    BASE_URL + `/admin/update-status/${userId}`,
  GER_ALL_ARTICLES: BASE_URL + "/admin/all-articles",
  UPDATE_ARTICLE_VERIFICATION: (articleId) =>
    BASE_URL + `/admin/verify-article/${articleId}`,
  UPDATE_ARTICLE_STATUS: (articleId) =>
    BASE_URL + `/admin/update-article-status/${articleId}`,
};

export const articlesEndPoints = {
  CREATE_ARTICLE: BASE_URL + "/article/create",
  GET_ALL_ARTICLE: BASE_URL + "/article/all-articles",
  GET_ALL_ADMIN_ARTICLE: BASE_URL + "/admin/all-articles",
  GET_ARTICLE_BY_ID: (articleId) =>
    BASE_URL + `/article/whole-article/${articleId}`,
  UPDATE_ARTICLE_BY_ID: (articleId) =>
    BASE_URL + `/article/update-article/${articleId}`,
  DELETE_ARTICLE_BY_ID: (articleId) =>
    BASE_URL + `/article/delete-article/${articleId}`,
  GET_ARTICLE_BY_REPORTERS_ID: (articleId) =>
    BASE_URL + `/article/reporter-articels/${articleId}`,
  GET_ARTICLES_BY_CATAGORY: BASE_URL + `/article/article-category`,
  SEARCH_ARTICLES: BASE_URL + `/article/search-article`
};
export const commentsEndPoints = {
  CREATE_COMMENT: BASE_URL + "/comment/create",
  GET_COMMENT_BY_ARTICLE_ID: (articleId) =>
    BASE_URL + `/comment/getCommentsByArticle/:${articleId}`,
};
export const authEndPoints = {
  LOGIN_API: BASE_URL + "/auth/login",
  REGISTER_API: BASE_URL + "/auth/register",
  FORGET_PASSWORD_API: BASE_URL + "/auth/forgetpassword",
  VERIFY_PASSWORD_API: BASE_URL + "/auth/verifypassword",
  UPDATE_PASSWORD: BASE_URL + `/auth/changePassword`,
  UPDATE_NAME: BASE_URL + `/auth/changeName`,
  SEND_INVITATION_MAIL: BASE_URL + `/admin/invite-reporter`,
  ACCEPT_INVITE_REPORTER: (token) => BASE_URL + `/admin/accept-invite-reporter/${token}`,
  UPDATE_AVATAR_URL: BASE_URL + `/auth/update-avatar-url`
};

export const visitorCountApi = {
  getCount: BASE_URL + "/count/visit-count",
  updateCount: BASE_URL + "/count/update-visit-count",
};
