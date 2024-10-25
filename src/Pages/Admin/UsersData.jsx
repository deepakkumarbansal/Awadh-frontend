import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUsersAction,
  selectAllUsersData,
  selectLoader,
} from "../../store/slice/adminSlice";
import {
  searchUser,
  updateUserOrReporterStatus,
} from "../../Services/Operations/admin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Components/Loader/Loader";

const UsersData = ({ setPage: setPageOfOriginalData }) => {
  const originalUsersData = useSelector(selectAllUsersData);
  const originalDataLoader = useSelector(selectLoader);
  const [loader, setLoader] = useState(originalDataLoader);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pageOfSeachedData, setPageOfSearchedData] = useState(1);
  const [isSearched, setIsSeached] = useState(false);
  const [displayData, setDisplayData] = useState(originalUsersData);
  const [searchedUserData, setSearchedUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoader(originalDataLoader);
  }, [originalDataLoader]);

  useEffect(() => {
    (async () => {
      if (isSearched) {
        setLoader(true);
        const searchedData = await searchUser(
          "user",
          searchQuery,
          pageOfSeachedData,
          limit
        );
        setSearchedUserData(searchedData);
        setPage(searchedData.page);
        setIsSeached(false);
        setLoader(false);
      }
    })();
  }, [pageOfSeachedData, isSearched]);

  useEffect(() => {
    if (Object.keys(searchedUserData).length > 0) {
      setDisplayData(searchedUserData);
    } else {
      setDisplayData(originalUsersData);
    }
  }, [searchedUserData, originalUsersData]);

  useEffect(() => {
    const handleWindowResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    setPageOfSearchedData(1)
  }
  const handleSearchClick = async () => {
    if (searchQuery.trim() === "") {
      setSearchedUserData({});
      return;
    }
    setIsSeached(true);
  };
  const handleChangePage = (newPage) => {
    if (searchedUserData?.page) {
      setPageOfSearchedData(newPage);
      setIsSeached(true);
    } else {
      setPageOfOriginalData(newPage);
    }
  };

  const updateUserStatus = async (userId, status) => {
    updateUserOrReporterStatus(userId, status)
      .then(() => {
        toast.success("Status Updated Successfully.");
        dispatch(fetchAllUsersAction(limit, page));
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    if (searchedUserData?.page) {
      const { page, totalCount, limit } = searchedUserData;
      setPage(page);
      setTotalCount(totalCount);
      setLimit(limit);
    } else {
      const { page, totalCount, limit } = originalUsersData;
      setPage(page || 1);
      setTotalCount(totalCount || 0);
      setLimit(limit || 10);
    }
  }, [searchedUserData, originalUsersData]);

  const handleClear = () => {
    setSearchedUserData({});
    setSearchQuery("");
    setPageOfSearchedData(1);
  };

  if (loader) {
    return <Loader />;
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
      <div className="p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-semibold mb-4">Users</h1>

        <div className="bg-white p-4 rounded-lg flex flex-col md:flex-row md:justify-end items-center mb-4 shadow-sm">
          <input
            type="text"
            className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 mb-2 md:mb-0 md:mr-2"
            placeholder="Search users..."
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
                searchedUserData?.page ? "block" : "hidden"
              } bg-gradient-to-r from-gray-500 to-gray-500 text-white px-4 py-2 rounded-md hover:from-gray-600 hover:to-gray-600 transition w-32 h-10`}
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </div>

        {displayData?.users?.length > 0 ? (
          <div className="bg-white rounded-lg shadow overflow-auto w-full">
            {/* For Laptops */}
            <div className="hidden lg:block">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 md:p-3 text-left text-gray-600 font-semibold">
                      Name
                    </th>
                    <th className="p-2 md:p-3 text-left text-gray-600 font-semibold">
                      Email
                    </th>
                    <th className="p-2 md:p-3 text-left text-gray-600 font-semibold">
                      Mobile
                    </th>
                    <th className="p-2 md:p-3 text-left text-gray-600 font-semibold">
                      Status
                    </th>
                    <th className="p-2 md:p-3 text-left text-gray-600 font-semibold">
                      Options
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* {users?.map((user) => ( */}
                  {displayData?.users?.map((user) => (
                    <tr
                      key={user._id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="p-2 md:p-3 flex items-center space-x-3">
                        <img
                          src={user.avatarUrl || "images/author.jpg"}
                          alt="Avatar"
                          className="w-8 h-8 rounded-full"
                          loading="lazy"
                        />
                        <span className="font-medium text-gray-800 truncate">
                          {user?.name}
                        </span>
                      </td>
                      <td className="p-2 md:p-3 text-gray-700 truncate">
                        {user.email}
                      </td>
                      <td className="p-2 md:p-3 text-gray-700 truncate">
                        {user.mobile}
                      </td>
                      <td
                        className={`p-2 md:p-3 font-semibold ${
                          user.status === "active"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {user.status}
                      </td>
                      <td className="p-2 md:p-3 flex justify-center">
                        <button
                          className={`w-32 px-3 py-1 rounded-md text-white font-bold ${
                            user.status === "active"
                              ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                              : "bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
                          } transition duration-150 ease-in-out`}
                          onClick={() =>
                            updateUserStatus(
                              user._id,
                              user.status === "active" ? "inactive" : "active"
                            )
                          }
                        >
                          {user.status === "active"
                            ? "Set Inactive"
                            : "Set Active"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Card for mobile or tablet */}
            <div className="lg:hidden grid grid-cols-1 gap-4">
              {/* {users?.map((user) => ( */}
              {displayData?.users?.map((user) => (
                <div
                  key={user._id}
                  className={`border-b p-4 flex items-center space-x-3 bg-white rounded-lg shadow-md ${
                    windowWidth < 570 && "flex-col justify-center"
                  }`}
                >
                  <img
                    src={user.avatarUrl || "images/author.jpg"}
                    alt="Avatar"
                    className="w-12 h-12 rounded-full"
                    loading="lazy"
                  />
                  <div
                    className={`flex-grow ${
                      windowWidth < 570 &&
                      "flex justify-center items-center flex-col w-full my-4"
                    }`}
                  >
                    <h2 className="font-medium text-gray-800 truncate">
                      {user?.name}
                    </h2>
                    <p className="text-gray-700 truncate">{user.email}</p>
                    <p className="text-gray-700 truncate">{user.mobile}</p>
                    <p
                      className={`font-semibold ${
                        user.status === "active"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {user.status}
                    </p>
                  </div>
                  <button
                    className={`w-32 h-10 px-3 py-1 rounded-md text-white font-bold text-nowrap ${
                      user.status === "active"
                        ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                        : "bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
                    } transition duration-150 ease-in-out`}
                    onClick={() =>
                      updateUserStatus(
                        user._id,
                        user.status === "active" ? "inactive" : "active"
                      )
                    }
                  >
                    {user.status === "active" ? "Set Inactive" : "Set Active"}
                  </button>
                </div>
              ))}
            </div>

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
        ) : (
          <div className="w-full flex justify-center">
            <h5>No User found</h5>
          </div>
        )}
      </div>
    </>
  );
};

export default UsersData;
