import AdminHome from "./AdminHome.jsx";
import UsersData from "./UsersData.jsx";
import ArticleData from "./ArticleData.jsx";
import ReportersData from "./ReportersData.jsx";
import {ReportersHome, MyArticles, Profile, ArticleForm} from '../../Components/index'
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAllNewsAction, fetchRepoterArticlesAction } from "../../store/slice/newsSlice.js";
import { fetchAllAdminNewsAction, fetchAllReportersAction, fetchAllUsersAction } from "../../store/slice/adminSlice.js";

const renderCurrentPage = (currentPage, role, reporterId, setIsEditingDisabled, handleMenuItemClick, article='') => {
  const [page, setPage] = useState(0);
  const [pageOfUsers, setPageOfUSers] = useState(1);
  const [pageOfReporters, setPageOfReporters] = useState(1);
  console.log(currentPage, role);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(role === 'reporter'){
      dispatch(fetchRepoterArticlesAction(reporterId))
    } else {
      dispatch(fetchAllAdminNewsAction(10, page));
      dispatch(fetchAllUsersAction(10, pageOfUsers));
      dispatch(fetchAllReportersAction(10, pageOfReporters))
      console.log("dispatch pageno.", pageOfReporters);
      
    }
  }, [reporterId, role]);

  if (role === "admin") {
    switch (currentPage) {
      case "Dashboard":
        return <AdminHome />;
      case "Users":
        return <UsersData setPage={setPageOfUSers}/>;
      case "Reporters":
        return <ReportersData setPage={setPageOfReporters}/>;
      case "Articles":
        return <ArticleData setPag={setPage} setIsEditingDisabled={setIsEditingDisabled} role={role} handleMenuItemClick={handleMenuItemClick}/>;
      case "Profile":
        return <Profile />;
      case "Add Article":
        return <ArticleForm handleMenuItemClick={handleMenuItemClick}/>;
      case "Edit Article":
        return <ArticleForm article={article} handleMenuItemClick={handleMenuItemClick} setIsEditingDisabled={setIsEditingDisabled}/>
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
          return <MyArticles setIsEditingDisabled={setIsEditingDisabled} role={role} handleMenuItemClick={handleMenuItemClick} reporterId={reporterId}/>;
        case "Profile":
          return <Profile/>;
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
