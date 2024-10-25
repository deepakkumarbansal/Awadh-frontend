import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchAllAdminNewsAction,
  selectAllArticlesData,
  selectLoader,
} from "../../store/slice/adminSlice";
import { updateArticleStatusById, deleteArticleById } from "../../Services/Operations/admin";
import { seachArticles } from "../../Services/Operations/article";
import Loader from "../../Components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdMore } from "react-icons/io";
import { useLocation } from "react-router-dom";

const ArticlesData = ({ setPag : setPageOfOriginalData, setIsEditingDisabled, role, handleMenuItemClick }) => {
  const originalArticlesData = useSelector(selectAllArticlesData);
  const originalDataLoader = useSelector(selectLoader);
  const [loader, setLoader] = useState(originalDataLoader);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pageOfSeachedData, setPageOfSearchedData] = useState(1);
  const [isSearched, setIsSearched] = useState(false);
  const [displayData, setDisplayData] = useState(originalArticlesData);
  const [searchedArticlesData, setSearchedArticlesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const [selectedArticle, setSelectedArticle] = useState(null);
  const menuRef = useRef(null);
  const {pathname: path} = useLocation();


  useEffect(() => {
    setLoader(originalDataLoader);
  }, [originalDataLoader]);

  useEffect(() => {
    (async () => {
      if (isSearched) {
        setLoader(true);
        const searchedData = await seachArticles(searchQuery, limit, pageOfSeachedData, role, path); 
        console.log("data", searchedData);
        
        setSearchedArticlesData(searchedData);
        setPage(searchedData.page);
        setIsSearched(false);
        setLoader(false);
      }
    })();
  }, [pageOfSeachedData, isSearched]);

  useEffect(() => {
    if (searchedArticlesData?.page) {
      const { page, totalCount, limit } = searchedArticlesData;
      setPage(page);
      setTotalCount(totalCount);
      setLimit(limit);
      setDisplayData(searchedArticlesData);
    } else if(searchedArticlesData?.data?.length === 0){
      console.log("data change", searchedArticlesData);
      
      setDisplayData({});
    } 
    else {
      const { page, totalCount, limit } = originalArticlesData;
      setPage(page || 1);
      setTotalCount(totalCount || 0);
      setLimit(limit || 10);
      setDisplayData(originalArticlesData);
    }
  }, [searchedArticlesData, originalArticlesData]);

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
      setSearchedArticlesData({});
      return;
    }
    setIsSearched(true)
  };
  const handleChangePage = (newPage) => {
    if (searchedArticlesData?.page) {
      setPageOfSearchedData(newPage);
      setIsSearched(true);
      console.log("page", newPage);
      
    } else {
      setPageOfOriginalData(newPage);
      console.log("page", newPage);
    }
  };

  const updateArticleStatus = async (status, article) => {
    if (role !== "admin") {
      toast.error("User is not allowed to update article status");
      return;
    }
    try {
      setSelectedArticle(article);
      await updateArticleStatusById(article?._id, status);
      console.log("hello", limit);
      dispatch(fetchAllAdminNewsAction({limit, page}));
      console.log("hello1");
      toast.success("Status Updated Successfully.");
      
    } catch (error) {
      console.log(error.message);
      
      toast.error(error.message);
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    setSearchedArticlesData({});
    setPageOfSearchedData(1);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setSelectedArticle(null); // Clse menu if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const handleClick = (article) => {
    if (selectedArticle?._id === article?._id) {
      setSelectedArticle(article); // Close if the same article is clicked
    } else {
      setSelectedArticle(article); // Open menu for the clicked article
    }
  };

  const deleteArticle = async (article) => {
    if (role !== "admin") {
      toast.error("User is not allowed to delete article");
      return;
    }
    try {
      setSelectedArticle(article)
      await deleteArticleById(article?._id);
      console.log(article._id,"display data", displayData);
      
      dispatch(fetchAllAdminNewsAction({limit, page}));
      toast.success("News Deleted Successfully.");
      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
    console.log(displayData);
    
  }, [displayData])

  const editArticle = (article) => {
    if (role !== "admin") {
      toast.error("User is not allowed to edit article");
      return;
    }
    setIsEditingDisabled(false);
    console.log("selected", article);
    setSelectedArticle(article);
    handleMenuItemClick("Edit Article", article);
  };

  if (loader) {
    return <Loader />;
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
      <div className="p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-semibold mb-4">Articles</h1>

        {/* Search Section */}
        <div className="bg-white p-4 rounded-lg flex flex-col md:flex-row md:justify-end items-center mb-4 shadow-sm">
          <input
            type="text"
            className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 mb-2 md:mb-0 md:mr-2"
            placeholder="Search articles..."
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
                searchedArticlesData?.page > 0 ? "block" : "hidden"
              } bg-gradient-to-r from-gray-500 to-gray-500 text-white px-4 py-2 rounded-md hover:from-gray-600 hover:to-gray-600 transition w-32 h-10`}
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </div>

        {displayData?.articles?.length > 0 ? (
          <div className="bg-white rounded-lg shadow overflow-auto w-full">
            {/* For Laptops */}
            <div className="hidden lg:block">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left text-gray-600 font-semibold">Image</th>
                    <th className="p-3 text-left text-gray-600 font-semibold">Title</th>
                    <th className="p-3 text-left text-gray-600 font-semibold">Category</th>
                    <th className="p-3 text-left text-gray-600 font-semibold">Published By</th>
                    <th className="p-3 text-left text-gray-600 font-semibold">Published Date</th>
                    <th className="p-3 text-left text-gray-600 font-semibold">Status</th>
                    <th className="p-3 text-left text-gray-600 font-semibold">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {displayData?.articles?.map((article) => (
                    <tr key={article._id} className="hover:bg-gray-100 cursor-pointer">
                      <td className="p-3">
                        {article.images?.length > 0 ? (
                          <img src={article.images[0]} alt="article" className="w-16 h-16 object-cover rounded-md" />
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td className="p-3 truncate max-w-xs">
                        <Link to={`/news/${article._id}`} className=" text-blue-500 hover:underline" title={article.title}>
                          {article.title}
                        </Link>
                      </td>
                      <td className="p-3">{article.category}</td>
                      <td className="p-3">{article.publishedBy}</td>
                      <td className="p-3">{article.updatedAt || "N/A"}</td>
                      <td className={`p-3 font-semibold ${article.status === "accepted" ? "text-green-600" : article.status === "rejected" ? "text-red-600" : "text-black"}`}>
                        {article.status === "accepted" ? "Accepted" : article.status === "rejected" ? "Rejected" : "Draft"}
                      </td>
                      <td className="p-3 relative">
                        <button onClick={() => handleClick(article)} className="text-gray-500 hover:text-gray-700">
                          <IoMdMore />
                        </button>
                        {/* Menu for edit, delete, accept/reject */}
                        {selectedArticle?._id === article._id && (
                          <div ref={menuRef} className="absolute bg-white shadow-lg z-10 w-32 rounded-md right-1">
                            <ul className="">
                              <li onClick={() => { editArticle(article); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Edit</li>
                              <li onClick={() => { deleteArticle(article); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Delete</li>
                              {(article.status === "rejected" || article.status === "draft") && <li onClick={() => { updateArticleStatus("accepted", article); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Accept</li>}
                              {(article.status === "accepted" || article.status === "draft") && <li onClick={() => { updateArticleStatus("rejected", article); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Reject</li>}
                            </ul>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* For Mobile and tablet */}
            <div className="lg:hidden grid grid-cols-1 gap-4">
              {displayData?.articles?.map((article) => (
                <div key={article._id} className="p-4 bg-white rounded-lg shadow-md">
                  {article.images?.length > 0 ? (
                    <img src={article.images[0]} alt="article" className="w-full h-48 object-cover rounded-md mb-2" />
                  ) : (
                    <div className="text-gray-500">No Image</div>
                  )}
                  <div className="truncate">
                    <span className="text-black text-xl font-semibold">Title: </span>
                    <Link to={`/news/${article._id}`} className="text-blue-500 hover:underline text-xl font-semibold">
                      {article.title}
                    </Link>
                  </div>
                  <div className="text-gray-500"><span>Category: </span>{article.category}</div>
                  <div className="flex">
                    <span>Status: </span> &nbsp;
                    <p className={`capitalize ${article.status==="accepted" ? "text-green-600" : article.status === "rejected" ? "text-red-600" : "text-black"}`}>{article.status}</p>
                  </div>

                  <div className="mt-2">
                    {/* <button onClick={() => handleClick(article._id)} className="text-gray-500 hover:text-gray-700">
                      <IoMdMore />
                    </button>
                    {selectedArticle?._id === article._id && (
                      <div ref={menuRef} className="bg-white shadow-lg z-10 w-32 rounded-md right-1 absolute">
                        <ul className="text-left">
                          <li onClick={() => { editArticle(); setSelectedArticle(article); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Edit</li>
                          <li onClick={() => { deleteArticle(); setSelectedArticle(article); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Delete</li>
                          <li onClick={() => { updateArticleStatus("accepted"); setSelectedArticle(article); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Accept</li>
                          <li onClick={() => { updateArticleStatus("rejected"); setSelectedArticle(article); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Reject</li>
                        </ul>
                      </div>
                    )} */}
                    <ul className="text-left flex w-full justify-center mt-2 gap-2 flex-wrap">
                          <li onClick={() => { editArticle(article);  }} className="block px-4 py-2 font-bold text-lg hover:bg-blue-600 cursor-pointer border shadow-md bg-blue-500 text-white w-24 text-center rounded-md">Edit</li>
                          <li onClick={() => { deleteArticle(article);  }} className="block px-4 py-2 font-bold text-lg hover:bg-red-600 cursor-pointer border shadow-md bg-red-500 text-white w-24 text-center rounded-md">Delete</li>
                          {(article.status === "rejected" || article.status === "draft") && <li onClick={() => { updateArticleStatus("accepted", article); }} className="block px-4 py-2 font-bold text-lg hover:bg-gray-100 cursor-pointer border shadow-md bg-black text-white w-24 text-center rounded-md bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">Accept</li>}
                          {(article.status === "accepted" || article.status === "draft") && <li onClick={() => { updateArticleStatus("rejected", article); }} className="block px-4 py-2 font-bold text-lg hover:bg-gray-100 cursor-pointer border shadow-md bg-black text-white w-24 text-center rounded-md bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600">Reject</li>}
                        </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Section */}
            <div className="p-4 flex flex-col md:flex-row justify-between items-center bg-gray-50">
              <div className="text-gray-600">
                Showing {(page - 1) * limit + 1} to{" "}
                {Math.min(page * limit, totalCount)} of {totalCount} Articles
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
          <div className="text-gray-500 text-center">No articles found</div>
        )}
      </div>
    </>
  );
};

export default ArticlesData;
