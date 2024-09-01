import { apiConnector } from "../connector";
import { articlesEndPoints } from "../apis";
import { toast } from "react-hot-toast";
const { GET_ALL_ARTICLE } = articlesEndPoints;

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
