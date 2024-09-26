import AdminHome from "./AdminHome.jsx";
import UsersData from "./UsersData.jsx";
import ArticleData from "./ArticleData.jsx";
import ReportersData from "./ReportersData.jsx";
import {ReportersHome, MyArticles, Profile, ArticleForm} from '../../Components/index'

const renderCurrentPage = (currentPage, role, reporterId, setIsEditingDisabled, handleMenuItemClick, article='') => {
  console.log(currentPage, role);
  
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
        return <Profile/>;
      case "Add Article":
        return <ArticleForm/>
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
          return <MyArticles reporterId={reporterId} setIsEditingDisabled={setIsEditingDisabled} role={role} handleMenuItemClick={handleMenuItemClick}/>;
        case "Profile":
          return <Profile/>;
        case "Add Article":
          return <ArticleForm/>;
        case "Edit Article":
          return <ArticleForm article={article}/>
        default:
          return null;
      }
    }
};

export default renderCurrentPage;
