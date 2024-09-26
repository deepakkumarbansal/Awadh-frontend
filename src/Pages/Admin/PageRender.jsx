import AdminHome from "./AdminHome.jsx";
import UsersData from "./UsersData.jsx";
import ArticleData from "./ArticleData.jsx";
import ReportersData from "./ReportersData.jsx";
import {ReportersHome, MyArticles, Profile, ArticleForm} from '../../Components/index'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchRepoterArticlesAction } from "../../store/slice/newsSlice.js";

const renderCurrentPage = (currentPage, role, reporterId, setIsEditingDisabled, handleMenuItemClick, article='', userName, email) => {
  console.log(currentPage, role);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchRepoterArticlesAction(reporterId))
  }, [reporterId]);

  if (role === "admin") {
    switch (currentPage) {
      case "Dashboard":
        return <AdminHome />;
      case "Users":
        return <UsersData />;
      case "Reporters":
        return <ReportersData />;
      case "Articles":
        return <ArticleData />;
      case "Profile":
        return <Profile />;
      case "Add Article":
        return <ArticleForm/>;
      case "Edit Article":
        return <ArticleForm article={article}/>
      default:
        return null;
    }
  }

    if (role === "reporter") {
      console.log("C",currentPage);
      
      switch (currentPage) {
        case "Dashboard":
          return <ReportersHome />;
        case "My Articles":
          return <MyArticles setIsEditingDisabled={setIsEditingDisabled} role={role} handleMenuItemClick={handleMenuItemClick}/>;
        case "Profile":
          return <Profile email={email} name={userName} role={role}/>;
        case "Add Article":
          return <ArticleForm handleMenuItemClick={handleMenuItemClick}/>;
        case "Edit Article":
          return <ArticleForm article={article} handleMenuItemClick={handleMenuItemClick} setIsEditingDisabled={setIsEditingDisabled}/>
        default:
          return null;
      }
    }
};

export default renderCurrentPage;
