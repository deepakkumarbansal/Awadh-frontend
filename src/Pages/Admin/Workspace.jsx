import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Services/Operations/auth.js";
import Sidebar from "./Sidebar.jsx";
import renderCurrentPage from "./PageRender.jsx";
import { Logout } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 280;

const Workspace = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editArticleData, setEditArticleData] = useState('');
  const { user, role, userName } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const [isEditingDisabled, setIsEditingDisabled] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  useEffect(() => {
    setIsMenuOpen(windowWidth >= 1024);
  }, [windowWidth]);

  const handleMenuItemClick = (pageName, article) => {
    setCurrentPage(pageName);
    setEditArticleData(article);
    if(pageName !== "Edit Article"){
      setIsEditingDisabled(true)
    }
    if (windowWidth < 1024) setIsMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout(navigate));
    navigate('/');
  };

  return (
    <div className="flex h-screen w-screen">
      <nav 
        className={`fixed top-0 left-0 h-full bg-gray-100 shadow-lg z-[10000] transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`} 
        style={{ width: `${drawerWidth}px` }}
      >
        <div className="p-4">
          <Link to={'/'}>
            <img src={'/images/logo.png'} alt="Awadh Kesari" className="w-full cursor-pointer" />
          </Link>
        </div>
        <div className="flex items-center justify-center bg-gray-200 rounded-md p-4 mb-4">
          <h6 className="font-semibold">{userName}</h6>
        </div>
        <Sidebar userRole={role} handleMenuItemClick={handleMenuItemClick} isEditingDisabled={isEditingDisabled} currentPage={currentPage} />
        <button
          className="flex items-center gap-2 w-full text-red-600 p-2 hover:bg-red-50 rounded-md transition duration-200"
          onClick={handleLogout}
        >
          <Logout />
          Logout
        </button>
      </nav>

      <div 
        className="transition-all duration-300 flex-1 h-full overflow-y-auto" 
        style={{ marginLeft: windowWidth >= 1024 ? `${drawerWidth}px` : "0" }}
        onClick={() => windowWidth < 1024 && setIsMenuOpen(false)}
      >
        <header className="flex items-center justify-between bg-gray-200 p-4 shadow-md">
          <button className="block lg:hidden" onClick={(e) => {
            setIsMenuOpen(true);
            e.stopPropagation();
          }}>
            <MenuIcon />
          </button>
          <h1 className="text-xl font-semibold">Workspace</h1>
        </header>

        <main className="p-4 h-full">
          {renderCurrentPage(currentPage, role, user, setIsEditingDisabled, handleMenuItemClick, editArticleData)}
        </main>
      </div>
    </div>
  );
};

export default Workspace;
