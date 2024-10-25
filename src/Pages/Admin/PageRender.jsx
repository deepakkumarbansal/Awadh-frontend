import AdminHome from "./AdminHome.jsx";
import UsersData from "./UsersData.jsx";
import ArticleData from "./ArticleData.jsx";
import ReportersData from "./ReportersData.jsx";
import {ReportersHome, MyArticles, Profile, ArticleForm} from '../../Components/index'
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchRepoterArticlesAction } from "../../store/slice/newsSlice.js";
import { fetchAllAdminNewsAction, fetchAllReportersAction, fetchAllUsersAction } from "../../store/slice/adminSlice.js";

const renderCurrentPage = (currentPage, role, reporterId, setIsEditingDisabled, handleMenuItemClick, article='') => {
  const [page, setPage] = useState(1);
  const [pageOfUsers, setPageOfUSers] = useState(1);
  const [pageOfReporters, setPageOfReporters] = useState(1);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(role === 'reporter'){
      console.log("I am initiator",);
      
      dispatch(fetchRepoterArticlesAction({reporterId, page}))
    }
  }, [reporterId, role, page]);

  useEffect(()=>{
    if(role === "admin"){
      dispatch(fetchAllAdminNewsAction({limit:10, page}));
    }
  }, [role, page]);

  useEffect(()=>{
    if(role === "admin"){
      console.log(pageOfUsers, "users");
      
      dispatch(fetchAllUsersAction({limit:10, page:pageOfUsers}));
    }
  }, [role, pageOfUsers]);

  useEffect(()=>{
    if(role === "admin"){
      dispatch(fetchAllReportersAction({limit:10, page:pageOfReporters}));      
    }
  }, [role, pageOfReporters]);

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
      
      switch (currentPage) {
        case "Dashboard":
          return <ReportersHome />;
        case "My Articles":
          return <MyArticles setIsEditingDisabled={setIsEditingDisabled} role={role} handleMenuItemClick={handleMenuItemClick} reporterId={reporterId} setPag={setPage}/>;
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
