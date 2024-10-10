import React, { useEffect, useState } from "react";
import Workspace from "./Workspace";
import { useSelector } from "react-redux";
import { selectAuthUserRole, selectAuthUserStatus } from "../../store/slice/authSlice";
import Loader from "../../Components/Loader/Loader";
import { useLocation } from "react-router-dom";

const AdminDashboard = () => {
  let userType = useSelector(selectAuthUserRole);
  const userStatus = useSelector(selectAuthUserStatus)
  const url = useLocation().pathname;
  const [accountType, setAccountType] = useState(userType); // State for account type
  const [isLoading, setIsLoading] = useState(true); // Loading state
  // Update account type from Redux or localStorage
  useEffect(() => {
    setIsLoading(true);
    setAccountType(userType);

    setIsLoading(false); // Set loading to false after data is fetched
  }, [userType]);
  
  let isAllowed = (accountType === "admin" || accountType === "reporter") && (`/${userType}` == url) && userStatus === 'active' ;


  if (isLoading) {
    return <Loader/>; // Loading screen while determining account type
  }

  return (
    <div>
      {isAllowed ? (
        <Workspace />
      ) : (
        <h3 className="font-bold flex items-center justify-center h-screen">
          You are not allowed to access this Page
        </h3>
      )}
    </div>
  );
};

export default AdminDashboard;
