import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { fetchRepoterArticlesAction, selectReporterArticles } from "../../store/slice/newsSlice";
import { deleteArticleById } from "../../Services/Operations/article";
import Loader from "../../Components/Loader/Loader";
import toast from "react-hot-toast";
import { ToastContainer } from "react-toastify";
const ArticlesData = ({setIsEditingDisabled, role, handleMenuItemClick, reporterId}) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [article, setArticle] = useState('');
  const [reporterArticles, setReporterArticles] = useState([]);
  const { totalCount, page: currentPage, limit: initialLimit, articles } = useSelector(selectReporterArticles);
  const [rowsPerPage, setRowsPerPage] = useState(initialLimit || 10);
  const [page, setPage] = useState(currentPage);
  useEffect(()=>{
    setReporterArticles(articles);
  }, [articles])

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const tableHeadStyle = {
    fontWeight: "600",
    color: "#717f8c",
  };

  const tableBodyStyle = {
    color: "#717f8c",
  };

  const handleClick = (event, article) => {
    setAnchorEl(event.currentTarget);
    setArticle(article)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteArticle = async () => {
    if(role != 'reporter'){
      toast.error("User is not allowed to delete article");
      return;
    }
    deleteArticleById(article._id)
    .then((data)=>{
      console.log(data);
      // const updatedArticles = reporterArticles.filter((reporterArticle)=>{
      //   return reporterArticle._id != article._id;
      // });
      dispatch(fetchRepoterArticlesAction(reporterId));
      // setReporterArticles(updatedArticles);
    })
    .catch((error)=>{
      console.log(error);
    })
    
  }

  const editArticle = async () => {
    if(role != 'reporter'){
      toast.error("User is not allowed to edit article");
      return;
    }
    setIsEditingDisabled(false);
    console.log("edi",article);
    
    handleMenuItemClick("Edit Article", article)
  } 

  return (
    <>
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
      <Box sx={{ ml: 2, mt: 2 }}>
        <Typography variant="h5" fontWeight="600">
          लेख
        </Typography>
      </Box>

      <TableContainer
        sx={{
          mt: 2,
          borderRadius: "10px",
          backgroundColor: "white",
          width: "100%", // Ensure full width
        }}
      >
        <Table size="medium" aria-label="articles table">
          <TableHead sx={{ backgroundColor: "transparent" }}>
            <TableRow>
              <TableCell sx={tableHeadStyle}>लेख संख्या</TableCell>
              <TableCell sx={tableHeadStyle}>शीर्षक</TableCell>
              <TableCell sx={tableHeadStyle}>श्रेणी</TableCell>
              <TableCell sx={tableHeadStyle}>छवि</TableCell>
              <TableCell sx={tableHeadStyle}>प्रकाशित तिथि</TableCell>
              <TableCell sx={tableHeadStyle}>स्थिति</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              reporterArticles?.length > 0 ? 
              reporterArticles.map((article, index) => (
                <TableRow
                  key={article._id}
                  sx={{
                    backgroundColor: "white",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                    cursor: "pointer",
                  }}
                >
                  <TableCell sx={tableBodyStyle}>{index + 1}</TableCell>
                  <TableCell sx={{...tableBodyStyle, width:"40%"} }>
                    <Link to={`/news/${article._id}`}>{article.title}</Link>
                  </TableCell>
                  <TableCell sx={tableBodyStyle}>{article.category}</TableCell>
                  <TableCell sx={tableBodyStyle}> {/* Todo: Make it to center */}
                    {article?.images?.length > 0 ? (
                      <Avatar
                        src={article.images[0]}
                        alt="article image"
                        sx={{ width: 100, height: 100}} // Increased size
                      />
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell sx={tableBodyStyle}>
                    {article.publishDate
                      ? article.publishDate.toLocaleDateString("hi-IN")
                      : "N/A"}
                  </TableCell>
                  <TableCell
                    sx={{
                      color:
                        article.status === "accepted"
                          ? "green"
                          : article.status === "rejected"
                          ? "red"
                          : "black",
                      fontWeight: "600",
                    }}
                  >
                    {article.status === "accepted" ? "स्वीकृत" : "अस्वीकृत"}
                  </TableCell>
                  <TableCell>
                    <IconButton aria-label="more" onClick={(e)=>handleClick(e, article)}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem sx={tableBodyStyle} onClick={()=>{
                        editArticle();
                        handleClose();
                      }}>संपादित करें</MenuItem>
                      <MenuItem sx={tableBodyStyle} onClick={()=>{
                        deleteArticle();
                        handleClose();
                      }}>हटाएं</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              )) : 
              <div className="flex justify-center w-screen">
                <Loader/>
              </div>
            }
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default ArticlesData;
