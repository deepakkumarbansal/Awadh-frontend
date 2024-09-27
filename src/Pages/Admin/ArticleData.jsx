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
import { fetchAllAdminNewsAction, selectAllArticlesData, selectLoader } from "../../store/slice/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { deleteArticleById } from "../../Services/Operations/article";
import { updateArticleStatusById } from "../../Services/Operations/admin";
import Loader from "../../Components/Loader/Loader";

const ArticlesData = ({
  setPag,
  setIsEditingDisabled,
  role,
  handleMenuItemClick,
}) => {
  const loader = useSelector(selectLoader);
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(0);
  const {
    totalCount,
    page:currentPage,
    limit,
    articles: adminArticles,
  } = useSelector(selectAllArticlesData);
  const [articles, setArticles] = useState(adminArticles);
  const [rowsPerPage, setRowsPerPage] = useState(limit);

  useEffect(() => {
    setArticles(adminArticles);
  }, [adminArticles]);
  const handleChangePage = (newPage) => {
    setPage(newPage);
    setPag((prev) => prev + 1);
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
    console.log("arrticle status", article);

    setAnchorEl(event.currentTarget);
    setArticle(article);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [article, setArticle] = useState("");
  useEffect(()=>{
    console.log(article, "choose");
    
  }, [article])

  const deleteArticle = async () => {
    if (role != "reporter") {
      toast.error("User is not allowed to delete article");
      return;
    }
    deleteArticleById(article._id)
      .then((data) => {
        console.log(data);
        const updatedArticles = articles.filter(({ _id }) => {
          return _id != article._id;
        });
        setArticles(updatedArticles);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const editArticle = async () => {
    if (role != "admin") {
      toast.error("User is not allowed to edit article");
      return;
    }
    setIsEditingDisabled(false);
    console.log("edi", article);

    handleMenuItemClick("Edit Article", article);
  };
  const dispatch = useDispatch();
  const updateArticleStatus = async (status) => {
    if (role != "admin") {
      toast.error("User is not allowed to update article status");
      return;
    }
    updateArticleStatusById(article._id,status)
      .then((data) => {
        console.log(data);
        dispatch(fetchAllAdminNewsAction(limit, currentPage))
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if(loader){
    return <Loader/>
  }
 
  return (
    <>
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
        }}
      >
        <Table size="medium" aria-label="articles table">
          <TableHead sx={{ backgroundColor: "transparent" }}>
            <TableRow>
              <TableCell sx={tableHeadStyle}>लेख संख्या</TableCell>
              <TableCell sx={tableHeadStyle}>शीर्षक</TableCell>
              <TableCell sx={tableHeadStyle}>श्रेणी</TableCell>
              <TableCell sx={tableHeadStyle}>छवि</TableCell>
              <TableCell sx={tableHeadStyle}>प्रकाशित द्वारा</TableCell>
              <TableCell sx={tableHeadStyle}>प्रकाशित तिथि</TableCell>
              <TableCell sx={tableHeadStyle}>स्थिति</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articles?.map((article, index) => (
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
                <TableCell sx={tableBodyStyle}>
                  <Link to={`/article/${article._id}`}>{article.title}</Link>
                </TableCell>
                <TableCell sx={tableBodyStyle}>{article.category}</TableCell>
                <TableCell sx={tableBodyStyle}>
                  {article?.images?.length > 0 ? (
                    <Avatar
                      src={article.images[0]}
                      alt="article image"
                      sx={{ width: 100, height: 100 }} // Increased size
                    />
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell sx={tableBodyStyle}>{article.publishedBy}</TableCell>
                <TableCell sx={tableBodyStyle}>
                  {article.updatedAt ? article.updatedAt : "N/A"}
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
                  <IconButton
                    aria-label="more"
                    onClick={(e) => handleClick(e, article)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  {/* To be handled error, as both options is showing */}
                  <Menu
                    key={article._id}
                    sx={{ zIndex: 1300 }} 
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem
                      sx={tableBodyStyle}
                      onClick={() => {
                        editArticle();
                        handleClose();
                      }}
                    >
                      संपादित करें
                    </MenuItem>
                    <MenuItem
                      sx={tableBodyStyle}
                      onClick={() => {
                        deleteArticle();
                        handleClose();
                      }}
                    >
                      हटाएं
                    </MenuItem>

                    {(article.status === "accepted" ||
                      article.status === "draft") && (
                      <MenuItem
                        sx={tableBodyStyle}
                        onClick={() => {
                          updateArticleStatus("rejected");
                          handleClose();
                        }}
                      >
                        Reject
                      </MenuItem>
                    )}

                    {(article.status === "rejected" ||
                      article.status === "draft") && (
                      <MenuItem
                        sx={tableBodyStyle}
                        onClick={() => {
                          updateArticleStatus("accepted");
                          handleClose();
                        }}
                      >
                        Accept
                      </MenuItem>
                    )}
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={(e) => handleChangePage(e, page + 1)}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default ArticlesData;
