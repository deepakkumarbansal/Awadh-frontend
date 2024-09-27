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
import { fetchAllReportersAction, selectAllReportersData, selectLoader } from "../../store/slice/adminSlice";
import { updateUserOrReporterStatus } from "../../Services/Operations/admin";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader/Loader";

const ReportersData = ({setPage}) => {
  // State for pagination, search, and menu
  const [anchorEl, setAnchorEl] = useState(null);
  const { totalCount, page, limit, reporters} = useSelector(selectAllReportersData);
  const [reporter, setReporter] = useState(null)
  // const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page
  const [searchQuery, setSearchQuery] = useState("");

  // const reporters = mockReportersData.slice(
  //   page * rowsPerPage,
  //   page * rowsPerPage + rowsPerPage
  // );

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    setPage(0);
    // Add search filtering logic here if needed
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Table styles
  const tableHeadStyle = {
    fontWeight: "600",
    color: "#717f8c",
  };

  const tableBodyStyle = {
    color: "#717f8c",
  };

  // Function to handle menu click
  const handleClick = (event, reporter) => {
    setAnchorEl(event.currentTarget);
    setReporter(reporter)
  };

  // Function to handle menu close
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();
  const loader = useSelector(selectLoader)
  const updateReporterStatus = async (status) => {
    updateUserOrReporterStatus(reporter?._id, status) // not updating status, telling that user not exist
    .then((data)=>{
      console.log(data);
      //Here we can update the displayed user status using foreach but I am dispatching 
      dispatch(fetchAllReportersAction(limit, page))
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  if(loader){
    return <Loader/>
  }

  return (
    <>
      <Box sx={{}}>
        <Box sx={{ ml: 2, mt: 2 }}>
          <Typography variant="h5" fontWeight="600">
            रिपोर्टर
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

        {/* Table of Reporters */}
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
                <TableCell sx={tableHeadStyle}>लेखों की संख्या</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reporters?.map((reporter) => (
                <TableRow
                  key={reporter._id}
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
                    <Avatar src={reporter.profilePicture} alt="no" />{" "}
                    {reporter?.name}
                  </TableCell>

                  <TableCell sx={tableBodyStyle}>
                    {reporter.email}
                  </TableCell>
                  <TableCell sx={tableBodyStyle}>{reporter.mobile}</TableCell>
                  {/* <TableCell sx={tableBodyStyle}>{reporter.gender}</TableCell> */}
                  <TableCell
                    style={{
                      color:
                        reporter.status === "active"
                          ? "green"
                          : reporter.status === "inactive"
                          ? "red"
                          : reporter.status === "लंबित"
                          ? "orange"
                          : "black",
                      fontWeight: "600",
                    }}
                  >
                    {reporter.status}
                  </TableCell>
                  <TableCell sx={tableBodyStyle}>
                    {reporter.articlesCount}
                  </TableCell>
                  <TableCell>
                  <IconButton aria-label="more" onClick={(e)=>handleClick(e, reporter)}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
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
                    {
                      reporter.status === 'inactive' ?
                      <MenuItem
                      sx={tableBodyStyle}
                      onClick={() => {
                        updateReporterStatus('active');
                        handleClose();
                      }}
                    >
                      active
                    </MenuItem>
                    :
                    <MenuItem
                      sx={tableBodyStyle}
                      onClick={() => {
                        updateReporterStatus('inactive');
                        handleClose();
                      }}
                    >
                      inactive
                    </MenuItem>
                    }
                  </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Pagination component */}
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

export default ReportersData;
