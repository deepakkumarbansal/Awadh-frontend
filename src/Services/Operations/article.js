import { apiConnector } from "../connector";
import { articlesEndPoints } from "../apis";
import { toast } from "react-hot-toast";
const { GET_ALL_ARTICLE, GET_ARTICLES_BY_CATAGORY, GET_ARTICLE_BY_REPORTERS_ID, DELETE_ARTICLE_BY_ID, GET_ALL_ADMIN_ARTICLE } = articlesEndPoints;
// import {setNews} from "../../store/slice"

export const getAllArticles = async (limit) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("GET", GET_ALL_ARTICLE, null, {limit});
    result = response?.data?.articles;
  } catch (error) {
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const getAllAdminArticles = async (limit, page) => {
  let result = {};
  console.log("Welcome back");
  
  try {
    const response = await apiConnector("GET", GET_ALL_ADMIN_ARTICLE, null, {limit, page});
    console.log("Welcome back", response);
    result = response?.data;
    return result
  } catch (error) {
    throw new Error(error)
  }
};

export const getAllArticlesByCatagory = async (category, page=1, limit) => {
  try {    
    const response = await apiConnector("GET", GET_ARTICLES_BY_CATAGORY,null, {}, {category: category, page, limit});    
    if(!response){
      throw new Error(response);
    }
    const data = response.data;
    return {category, data};
  } catch (error) {
    console.log(error); //Not throwing it b/c it may possible that it is used inside the Promise.all(); 
    return {[category]: []}
  }
}

export const getAllArticlesByCatagories = async (catagories =[]) => {
  try {    
    const results = await Promise.all(catagories.map((catagory)=>getAllArticlesByCatagory(catagory)));  
    if(results){
      const resultInObjectForm = results.reduce((accumulated, {category, data})=>{        
        accumulated[category] = data;
        return accumulated;
      }, {});            
      return resultInObjectForm;
    }
  } catch (error) {
    console.log("Error:ARTICLESBYCATAGORY", error);
  }
}

export const getAllArticlesByReporterId = async (reporterId) => {
  try {
    const response = await apiConnector('GET', GET_ARTICLE_BY_REPORTERS_ID(reporterId));
    if(!response){
      throw response.data.message;
    }
    console.log("art",response);
    
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const deleteArticleById = async (articleId) => {
  try {
    const response = await apiConnector('DELETE', DELETE_ARTICLE_BY_ID(articleId));
    if(!response){
      throw response.data.message;
    }
    console.log("delete");
    return response.data;
  } catch (error) {
    throw error;
  }
}