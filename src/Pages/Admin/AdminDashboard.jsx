import React, { useEffect, useState } from "react";
import Workspace from "./Workspace";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  let userTYpe = localStorage.getItem("accountType")
    ? localStorage.getItem("accountType")
    : useSelector((state) => state.auth.role) ||
      localStorage.getItem("accountType");
  const [accountType, setAccountType] = useState(userTYpe); // State for account type
  const [isLoading, setIsLoading] = useState(true); // Loading state
  // Update account type from Redux or localStorage
  useEffect(() => {
    if (accountType) {
      setAccountType(accountType); // Sync Redux state with localStorage
    } else {
      const storedAccountType = localStorage.getItem("accountType");
      if (storedAccountType) {
        setAccountType(storedAccountType);
      }
    }
    setIsLoading(false); // Set loading to false after data is fetched
  }, [accountType]);

  // Log for debugging
  console.log("account type", accountType, localStorage.getItem("accountType"));

  const isAllowed = accountType === "admin" || accountType === "reporter";

  if (isLoading) {
    return <div>Loading...</div>; // Loading screen while determining account type
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
