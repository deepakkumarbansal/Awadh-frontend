import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import { apiConnector } from "../../Services/connector";
import { authEndPoints } from "../../Services/apis";
import toast from "react-hot-toast";
import { ToastContainer } from "react-toastify";

const ReporterInvitation = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
//   const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // setLoader(true)
    (async () => {
      try {
        const response = await apiConnector("POST", authEndPoints.ACCEPT_INVITE_REPORTER(token));
        toast.success(response.message);
        setTimeout(()=>{
            navigate('/login');
        }, 2000)
      } catch (error) {
        toast.error(error.message);
      } finally {
        // setLoader(false);
      }
    })();
  }, [token]);

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* {loader && <Loader/>} */}
    </div>
  );
};

export default ReporterInvitation;
