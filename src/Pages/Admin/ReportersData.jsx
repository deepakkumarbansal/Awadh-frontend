import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllReportersAction, selectAllReportersData, selectLoader } from "../../store/slice/adminSlice";
import { searchUser, updateUserOrReporterStatus } from "../../Services/Operations/admin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Components/Loader/Loader";
import Modal from "../../Components/Modal/Modal";
import { Input, SubmitButton } from "../../Components";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../Services/connector";
import { authEndPoints } from "../../Services/apis";

const ReportersData = ({ setPage: setPageOfOriginalData }) => {
  const originalReportersData = useSelector(selectAllReportersData);
  const originalDataLoader = useSelector(selectLoader);
  const [loader, setLoader] = useState(originalDataLoader);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pageOfSearchedData, setPageOfSearchedData] = useState(1);
  const [isSearched, setIsSearched] = useState(false);
  const [displayData, setDisplayData] = useState(originalReportersData);
  const [searchedReporterData, setSearchedReporterData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isInviteModelOpen, setIsInviteModelOpen] = useState(false);
  const [sendEmailLoader, setSendEmailLoader] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoader(originalDataLoader);
  }, [originalDataLoader]);

  useEffect(() => {
    (async () => {
      if (isSearched) {
        setLoader(true);
        console.log("qury", searchQuery);
        
        const searchedData = await searchUser("reporter", searchQuery, pageOfSearchedData, limit);
        setSearchedReporterData(searchedData);
        setPage(searchedData.page);
        setIsSearched(false);
        setLoader(false);
      }
    })();
  }, [pageOfSearchedData, isSearched]);

  useEffect(() => {
    if (Object.keys(searchedReporterData).length > 0) {
      setDisplayData(searchedReporterData);
    } else {
      setDisplayData(originalReportersData);
      console.log("original data", originalReportersData);
      
    }
  }, [searchedReporterData, originalReportersData]);

  useEffect(() => {
    const handleWindowResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    setPageOfSearchedData(1)
  }
  const handleSearchClick = () =>{
    if(searchQuery.trim() === ""){
      setSearchedReporterData({});
      return;
    }
    setIsSearched(true);
  }

  const handleChangePage = (newPage) => {
    if (searchedReporterData?.page) {
      setPageOfSearchedData(newPage);
      setIsSearched(true);
    } else {
      setPageOfOriginalData(newPage);
    }
  };

  const updateReporterStatus = async (reporterId, status) => {
    try {
      await updateUserOrReporterStatus(reporterId, status);
      toast.success("Status Updated Successfully.");
      dispatch(fetchAllReportersAction(limit, page));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleClear = () => {
    setSearchedReporterData({});
    setSearchQuery("");
    setPageOfSearchedData(1);
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    setValue
  } = useForm();

  const sendEmail = async (data) => {
    try {
      setSendEmailLoader(true);
      console.log("TOken", `Bearer ${localStorage.getItem("token")}`);
      
      await apiConnector('POST', authEndPoints.SEND_INVITATION_MAIL, {email: getValues("email")}, {authorization: `Bearer ${localStorage.getItem("token")}`});
      toast.success("Invitation email sent successfully.");
    } catch (error) {
      console.log("error", error);
      
      toast.error(error.response.data.message || error.message);
    } finally {
      setSendEmailLoader(false);
      setIsInviteModelOpen(false)
    }
  };

  const InviteReporterModel = () => (
    <Modal isVisible={isInviteModelOpen} onClose={() => {setIsInviteModelOpen(false); setValue("email", "")}}>
      <form onSubmit={handleSubmit(sendEmail)} className="flex flex-col">
        <Input type="email" name="email" register={register} placeholder="Email" errors={errors} />
        <SubmitButton isSubmitPending={sendEmailLoader} value="Send Invitation" />
      </form>
    </Modal>
  );

  useEffect(() => {
    if (searchedReporterData?.page) {
      const { page, totalCount, limit } = searchedReporterData;
      setPage(page);
      setTotalCount(totalCount);
      setLimit(limit);
    } else {
      const { page, totalCount, limit } = originalReportersData;
      setPage(page || 1);
      setTotalCount(totalCount || 0);
      setLimit(limit || 10);
    }
  }, [searchedReporterData, originalReportersData]);

  if (loader) {
    return <Loader />;
  }

  return (
    <>
      <ToastContainer style={{position: "relative", zIndex: 10000}} position="top-right" autoClose={5000} hideProgressBar={false} />
      <div className="p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-semibold mb-4">Reporters</h1>

        <div className="bg-white p-4 rounded-lg flex flex-col md:flex-row md:justify-end items-center mb-4 shadow-sm">
          <input
            type="text"
            className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 mb-2 md:mb-0 md:mr-2"
            placeholder="Search reporters..."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <div className="flex gap-2">
            <button
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-md hover:from-purple-600 hover:to-blue-600 transition w-32 h-10"
              onClick={handleSearchClick}
            >
              Search
            </button>
            <button
              className={`${
                searchedReporterData.page ? "block" : "hidden"
              } bg-gradient-to-r from-gray-500 to-gray-500 text-white px-4 py-2 rounded-md hover:from-gray-600 hover:to-gray-600 transition w-32 h-10`}
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </div>

        <div className="w-full flex justify-center my-4">
          <button
            className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-md hover:from-green-600 hover:to-teal-600 transition w-40 h-12"
            onClick={() => setIsInviteModelOpen(true)}
          >
            Invite Reporter
          </button>
        </div>

        {displayData?.reporters?.length > 0 ? (
          <div className="bg-white rounded-lg shadow overflow-auto w-full">
            {/* For Laptops */}
            <div className="hidden lg:block">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 md:p-3 text-left text-gray-600 font-semibold">Name</th>
                    <th className="p-2 md:p-3 text-left text-gray-600 font-semibold">Email</th>
                    <th className="p-2 md:p-3 text-left text-gray-600 font-semibold">Mobile</th>
                    <th className="p-2 md:p-3 text-left text-gray-600 font-semibold">Status</th>
                    <th className="p-2 md:p-3 text-left text-gray-600 font-semibold">Articles Count</th>
                    <th className="p-2 md:p-3 text-left text-gray-600 font-semibold">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {displayData?.reporters?.map((reporter) => (
                    <tr key={reporter._id} className="border-t hover:bg-gray-50 transition">
                      <td className="p-2 md:p-3 flex items-center space-x-3">
                        <img src={reporter.avatarUrl || "images/author.jpg"} alt="Avatar" className="w-8 h-8 rounded-full" />
                        <span className="font-medium text-gray-800 truncate">{reporter?.name}</span>
                      </td>
                      <td className="p-2 md:p-3 text-gray-700">{reporter.email}</td>
                      <td className="p-2 md:p-3 text-gray-700">{reporter.mobile}</td>
                      <td className={`p-2 md:p-3 font-semibold ${reporter.status === "active" ? "text-green-600" : "text-red-600"}`}>
                        {reporter.status}
                      </td>
                      <td className="p-2 md:p-3 text-gray-700">{reporter.articlesCount}</td>
                      <td className="p-2 md:p-3">
                        <button
                          className={`w-full px-3 py-1 rounded-md text-white font-bold ${
                            reporter.status === "active"
                              ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                              : "bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
                          } transition`}
                          onClick={() =>
                            updateReporterStatus(
                              reporter._id,
                              reporter.status === "active" ? "inactive" : "active"
                            )
                          }
                        >
                          {reporter.status === "active" ? "Set Inactive" : "Set Active"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* For Tablets and Mobile Devices */}
            <div className="lg:hidden">
              {displayData?.reporters?.map((reporter) => (
                <div key={reporter._id} className="p-4 border-t flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <img
                      src={reporter.avatarUrl || "images/author.jpg"}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="font-semibold text-gray-900">{reporter.name}</span>
                  </div>
                  <p className="text-gray-700">Email: {reporter.email}</p>
                  <p className="text-gray-700">Mobile: {reporter.mobile}</p>
                  <p>
                    Status: <span
                      className={`font-semibold capitalize ${
                        reporter.status === "active" ? "text-green-600" : "text-red-600"
                      }`}
                    >{reporter.status}</span>
                  </p>
                  <p className="text-gray-700">Articles Count: {reporter.articlesCount}</p>
                  <button
                    className={`px-4 py-2 rounded-md text-white font-bold ${
                      reporter.status === "active"
                        ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                        : "bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
                    } transition w-full`}
                    onClick={() =>
                      updateReporterStatus(reporter._id, reporter.status === "active" ? "inactive" : "active")
                    }
                  >
                    {reporter.status === "active" ? "Set Inactive" : "Set Active"}
                  </button>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="p-4 flex flex-col md:flex-row justify-between items-center bg-gray-50">
              <div className="text-gray-600">
                Showing {(page - 1) * limit + 1} to{" "}
                {Math.min(page * limit, totalCount)} of {totalCount} users
              </div>
              <div className="flex space-x-2 mt-2 md:mt-0">
                <button
                  onClick={() => handleChangePage(page - 1)}
                  className={`w-32 px-4 py-2 border rounded ${
                    page === 1
                      ? "cursor-not-allowed bg-gray-400"
                      : "bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500"
                  }`}
                  disabled={page === 1}
                >
                  Previous
                </button>
                <button
                  onClick={() => handleChangePage(page + 1)}
                  className={`w-32 px-4 py-2 border rounded ${
                    page * limit >= totalCount
                      ? "cursor-not-allowed bg-gray-400"
                      : "bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500"
                  }`}
                  disabled={page * limit >= totalCount}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        ) :  (
          <p className="text-gray-700">No reporters found.</p>
        )}

        <InviteReporterModel />
      </div>
    </>
  );
};

export default ReportersData;
