import React from "react";
import Workspace from "./Workspace";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const userType = useSelector((state) => state.auth);
  console.log(userType);

  return (
    <div>
      {
        // userType === ('admin' || 'reporter') ?
          <Workspace />
          // :
          // <h3 className="font-bold flex items-center justify-center h-screen">You are not allowed to access this Page</h3>
      }
    </div>
  );
};

export default AdminDashboard;
