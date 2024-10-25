import { apiConnector } from "../connector";
import { articlesEndPoints } from "../apis";
import { toast } from "react-hot-toast";
const { GET_ALL_ARTICLE, GET_ARTICLES_BY_CATAGORY, GET_ARTICLE_BY_REPORTERS_ID, DELETE_ARTICLE_BY_ID, GET_ALL_ADMIN_ARTICLE, SEARCH_ARTICLES, GET_UNIQUE_ARTICLES } = articlesEndPoints;
// import {setNews} from "../../store/slice"

export const getUniqueArticles = async() => {
  try {
    const response = await apiConnector("GET", GET_UNIQUE_ARTICLES);
    return response?.data?.data;
  } catch (error) {
    throw new Error(error.message)
  }
}
export const getAllArticles = async (limit) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("GET", GET_ALL_ARTICLE, null, null, {limit});
    result = response?.data?.articles;
  } catch (error) {
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const getAllAdminArticles = async (limit, page) => {
  let result = {};
  console.log("limits", limit, page);
  
  try {
    const response = await apiConnector("GET", GET_ALL_ADMIN_ARTICLE, null, {authorization: `Bearer ${localStorage.getItem("token")}`}, {limit, page});
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
    return {[category]: {}}
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

export const getAllArticlesByReporterId = async (reporterId, page) => {
  console.log("clicked", reporterId, page);
  
  try {
    const response = await apiConnector('GET', GET_ARTICLE_BY_REPORTERS_ID(reporterId), null, null, {limit: 10, page});
    if(!response){
      throw response.data.message;
    }
    console.log("art",response);
    
    return response.data;
  } catch (error) {
    throw error;
  }
}



export const seachArticles = async (query, limit, page, role, path, reporterId) => {
  try {
    
    const response = await apiConnector("POST", SEARCH_ARTICLES, {query, reporterId, path, role}, {}, {limit, page});
    const information = response?.data
    return {message: information?.message, articles:information?.data?.articles, totalCount:information?.data?.totalCount, limit: information?.data?.limitNumber, page: information?.data?.pageNumber }
  } catch (error) {
    if(error.response){
      return {message: error.response.data?.message, data:[]}
    } else {
      return {message: error.message, data:[]}
    }
  }
}