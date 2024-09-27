import React, { useState } from "react";
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
  TextField,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsersAction, selectAllUsersData, selectLoader } from "../../store/slice/adminSlice";
import { updateUserOrReporterStatus } from "../../Services/Operations/admin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Components/Loader/Loader";


const UsersData = ({setPage}) => {
  const {totalCount, page, limit, users} = useSelector(selectAllUsersData);
  const [user, setUser] = useState(null)
  
  const [anchorEl, setAnchorEl] = useState(null);
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(10); // प्रति पृष्ठ डिफ़ॉल्ट पंक्तियाँ
  const [searchQuery, setSearchQuery] = useState("");

  // const users = mockUsersData.slice(
  //   page * rowsPerPage,
  //   page * rowsPerPage + rowsPerPage
  // );

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    setPage(0);
    // यहां सर्च फिल्टरिंग लॉजिक जोड़ें यदि आवश्यक हो
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // टेबल के लिए शैलियाँ
  const tableHeadStyle = {
    fontWeight: "600",
    color: "#717f8c",
  };

  const tableBodyStyle = {
    color: "#717f8c",
  };

  const handleClick = (event, user) => {
    setAnchorEl(event.currentTarget);
    setUser(user);
  };

  // मेनू बंद करने के लिए फ़ंक्शन
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const loader = useSelector(selectLoader)
  const updateUserStatus = async (status) => {
    updateUserOrReporterStatus(user?._id, status)
    .then(()=>{
      toast.success("Status Updated Successfully.")
      dispatch(fetchAllUsersAction(limit, page))
    })
    .catch((error)=>{
      toast.error(error.message)
    })
  }

  if(loader){
    return <Loader/>
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
      <Box sx={{}}>
        <Box sx={{ ml: 2, mt: 2 }}>
          <Typography variant="h5" fontWeight="600">
            उपयोगकर्ता
          </Typography>
        </Box>

        <Box
          sx={{
            p: 2,
            mt: 2,
            backgroundColor: "white",
            borderRadius: "10px 10px 0px 0px",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <TextField
            fullWidth
            label="खोजें"
            variant="outlined"
            sx={{ flex: 1 }}
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <Button variant="contained" onClick={handleSearchClick}>
            खोजें
          </Button>
        </Box>

        {/* उपयोगकर्ताओं की तालिका */}
        <TableContainer
          sx={{
            mt: 2,
            borderRadius: "0px 0px 10px 10px",
          }}
        >
          <Table size="medium" aria-label="a dense table">
            <TableHead sx={{ backgroundColor: "transparent" }}>
              <TableRow>
                <TableCell sx={tableHeadStyle}>नाम</TableCell>
                <TableCell sx={tableHeadStyle}>ईमेल</TableCell>
                <TableCell sx={tableHeadStyle}>मोबाइल नंबर</TableCell>
                {/* <TableCell sx={tableHeadStyle}>लिंग</TableCell> */}
                <TableCell sx={tableHeadStyle}>स्थिति</TableCell>
                <TableCell sx={tableHeadStyle}>ऑप्शन</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user) => (
                <TableRow
                  key={user._id}
                  sx={{
                    backgroundColor: "white",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                    cursor: "pointer",
                  }}
                >
                  <TableCell
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontWeight: "600",
                    }}
                  >
                    <Avatar src={user.profilePicture} alt="no" />{" "}
                    {user?.name}
                  </TableCell>

                  <TableCell sx={tableBodyStyle}>
                    {user.email}
                    {user.isEmailVerified && (
                      <span
                        style={{
                          color: "blue",
                          marginLeft: "5px",
                          fontSize: "25px",
                        }}
                      >
                        ✓
                      </span>
                    )}
                  </TableCell>
                  <TableCell sx={tableBodyStyle}>{user.mobile}</TableCell>
                  {/* <TableCell sx={tableBodyStyle}>{user.gender}</TableCell> */}
                  <TableCell
                    style={{
                      color:
                        user.status === "active"
                          ? "green"
                          : user.status === "inactive"
                          ? "red"
                          : user.status === "लंबित"
                          ? "orange"
                          : "black",
                      fontWeight: "600",
                    }}
                  >
                    {user.status}
                  </TableCell>
                  <TableCell>
                  <IconButton aria-label="more" onClick={(e)=>handleClick(e, user)}>
                      <MoreVertIcon />
                    </IconButton>
                    {user.status === 'active' &&
                      <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      {/* <MenuItem
                      sx={tableBodyStyle}
                      onClick={() => {
                        editArticle();
                        handleClose();
                      }}
                    >
                      संपादित करें
                    </MenuItem> */}
                      <MenuItem
                      sx={tableBodyStyle}
                      onClick={() => {
                        updateUserStatus('inactive');
                        handleClose();
                      }}
                    >
                      inactive
                    </MenuItem>
                    </Menu>
                    }
                    {user.status === 'inactive' &&
                      <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      {/* <MenuItem
                      sx={tableBodyStyle}
                      onClick={() => {
                        editArticle();
                        handleClose();
                      }}
                    >
                      संपादित करें
                    </MenuItem> */}
                      <MenuItem
                      sx={tableBodyStyle}
                      onClick={() => {
                        updateUserStatus('active');
                        handleClose();
                      }}
                    >
                      active
                    </MenuItem>
                    </Menu>
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* पेजिनेशन घटक */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCount}
        rowsPerPage={limit}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default UsersData;
