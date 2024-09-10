import AdminHome from "./AdminHome.jsx";
import UsersData from "./UsersData.jsx";
import ArticleData from "./ArticleData.jsx";
import ReportersData from "./ReportersData.jsx";
import {ReportersHome, MyArticles, Profile} from '../../Components/index'

const renderCurrentPage = (currentPage, user) => {
  if (user.role === "admin") {
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
        return <Profile user={user}/>;
      default:
        return null;
    }
  }

    if (user.role === "reporter") {

      switch (currentPage) {
        case "Dashboard":
          return <ReportersHome />;
        case "My Articles":
          return <MyArticles />;
        case "Profile":
          return <Profile/>;
        default:
          return null;
      }
    }
};

export default renderCurrentPage;
