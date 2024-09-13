import { apiConnector } from "../connector";
import { articlesEndPoints } from "../apis";
import { toast } from "react-hot-toast";
const { GET_ALL_ARTICLE, GET_ARTICLES_BY_CATAGORY } = articlesEndPoints;
// import {setNews} from "../../store/slice"

export const getAllArticles = async () => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    console.log("check1");
    const response = await apiConnector("GET", GET_ALL_ARTICLE);
    console.log("all articles res....",response);
    result = response?.data?.articles;
  } catch (error) {
    console.log("GET_ALL_artilces_API API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const getAllArticlesByCatagory = async (catagory) => {
  try {
    const response = await apiConnector("GET", GET_ARTICLES_BY_CATAGORY(catagory));
    const data = await response.json();
    if(!response.ok){
      throw new Error(response);
    }
    return {catagory, data};
  } catch (error) {
    console.log(error); //Not throwing it b/c it may possible that it is used inside the Promise.all(); 
    return {[catagory]: ""}
  }
}

export const getAllArticlesByCatagories = async (catagories =[]) => {
  try {
    const results = await Promise.all(catagories.map((catagory)=>getAllArticlesByCatagory(catagory)));  
    console.log(results);
      
    if(results){
      const resultInObjectForm = results.reduce((accumulated, {catagory, data})=>{
        accumulated[catagory] = data;
        return accumulated;
      }, {});
      return resultInObjectForm;
    }
  } catch (error) {
    console.log("Error:ARTICLESBYCATAGORY", error);
  }
}