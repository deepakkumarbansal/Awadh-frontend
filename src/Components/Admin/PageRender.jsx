import AdminHome from "./AdminHome.jsx";
import UsersData from "./UsersData.jsx";
import ArticleData from "./ArticleData.jsx";
import ReportersData from "./ReportersData.jsx";
// import Profile from "./Profile.jsx";
// import CollaboratorsData from "./adminDashboard/CollaboratorsData.jsx";
// import CreatorHome from "../components/creatorDashboard/CreatorHome.jsx";
// import CreatorVideos from "../components/creatorDashboard/CreatorVideos.jsx";
// import CreatorAnalytics from "../components/creatorDashboard/CreatorAnalytics.jsx";
// import CreatorSocialMedia from "../components/creatorDashboard/CreatorSocialMedia.jsx";

// import PendingStatePopup from "../models/PendingStatePopup.jsx";
// import UserHome from "../components/userDashboard/UserHome.jsx";
// import UserHistory from "../components/userDashboard/UserHistory.jsx";
// import UserMyLikes from "../components/userDashboard/UserMyLikes.jsx";
// import UserPlaylist from "../components/userDashboard/UserPlaylist.jsx";
// import UserMyAssessment from "../components/userDashboard/UserMyAssessment.jsx";
// import UnifiedRecord from "./adminDashboard/UnifiedRecord.jsx";

const renderCurrentPage = (currentPage, userData) => {
  if (userData.activeDashboard === "admin") {
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
        return <h1>Profile</h1>;
      default:
        return null;
    }
  }

  //   if (userData.activeDashboard === "creator") {
  //     if (userData.status === "pending") {
  //       return <PendingStatePopup />;
  //     }

  //     switch (currentPage) {
  //       case "Dashboard":
  //         return <CreatorHome />;
  //       case "My Content":
  //         return <CreatorVideos />;
  //       case "Analytics":
  //         return <CreatorAnalytics />;
  //       case "Social Media":
  //         return <CreatorSocialMedia />;
  //       case "Profile":
  //         return <Profile />;
  //       default:
  //         return null;
  //     }
  //   }

  //   if (userData.activeDashboard === "user") {
  //     switch (currentPage) {
  //       case "Dashboard":
  //         return <UserHome />;
  //       case "History":
  //         return <UserHistory />;
  //       case "My Likes":
  //         return <UserMyLikes />;
  //       case "My Playlist":
  //         return <UserPlaylist />;
  //       case "My Assessments":
  //         return <UserMyAssessment />;
  //       case "Profile":
  //         return <Profile />;
  //       default:
  //         return null;
  //     }
  //   }
};

export default renderCurrentPage;
