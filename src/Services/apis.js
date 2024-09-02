const BASE_URL = "http://localhost:8400/api";

export const profileEndpoints = {
  GET_ALL_USER_API: BASE_URL + "/admin/all-users",
  GET_ALL_REPORTERS_API: BASE_URL + "admin/all-reporters",
  UPDATE_STATUS_OF_USER_API: () => BASE_URL + `/admin/update-status/:${userId}`,
  GER_ALL_ARTICLES: BASE_URL + "/admin/all-articles",
  UPDATE_ARTICLE_VERIFICATION: () =>
    BASE_URL + `/admin/verify-article/:${articleId}`,
};

export const articlesEndPoints = {
  CREATE_ARTICLE: BASE_URL + "/article/create",
  GET_ALL_ARTICLE: BASE_URL + "/admin/all-articles",
  GET_ARTICLE_BY_ID:()=> BASE_URL + `/article/whole-article/: ${articleId}`,
  UPDATE_ARTICLE_BY_ID: ()=> BASE_URL + `/article/update-article/: ${articleId}`,
  DELETE_ARTICLE_BY_ID: ()=> BASE_URL + `/article/delete-article/: ${articleId}`,
  GET_ARTICLE_BY_REPORTERS_ID: ()=> BASE_URL + `/article/whole-article/: ${articleId}`,
};
export const commentsEndPoints = {
  CREATE_COMMENT: BASE_URL + "/comment/create",
  GET_COMMENT_BY_ARTICLE_ID: () =>
    BASE_URL + `/comment/getCommentsByArticle/: ${articleId}`,
};
export const authEndPoints = {
  LOGIN_API: BASE_URL + "/auth/login",
  REGISTER_API: BASE_URL + "/auth/register",
  FORGET_PASSWORD_API: BASE_URL + "/auth/forgetpassword",
  VERIFY_PASSWORD_API: BASE_URL + "/auth/verifypassword",
};
