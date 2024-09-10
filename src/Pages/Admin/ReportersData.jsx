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

// Dummy Data for Reporters
const mockReportersData = [
  {
    _id: "1",
    firstName: "राजेश",
    lastName: "कुमार",
    email: "rajesh.kumar@example.com",
    mobile: "123-456-7890",
    gender: "पुरुष",
    status: "सक्रिय",
    profilePicture: "https://via.placeholder.com/150",
    articlesCount: 50,
  },
  {
    _id: "2",
    firstName: "सीमा",
    lastName: "शर्मा",
    email: "seema.sharma@example.com",
    mobile: "987-654-3210",
    gender: "महिला",
    status: "निष्क्रिय",
    profilePicture: "https://via.placeholder.com/150",
    articlesCount: 35,
  },
  {
    _id: "3",
    firstName: "अनिल",
    lastName: "वर्मा",
    email: "anil.verma@example.com",
    mobile: "456-789-0123",
    gender: "पुरुष",
    status: "लंबित",
    profilePicture: "https://via.placeholder.com/150",
    articlesCount: 20,
  },
  // Add more mock reporters as needed
];

const ReportersData = () => {
  // State for pagination, search, and menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page
  const [searchQuery, setSearchQuery] = useState("");

  const reporters = mockReportersData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to handle menu close
  const handleClose = () => {
    setAnchorEl(null);
  };

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
                <TableCell sx={tableHeadStyle}>लिंग</TableCell>
                <TableCell sx={tableHeadStyle}>स्थिति</TableCell>
                <TableCell sx={tableHeadStyle}>लेखों की संख्या</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reporters.map((reporter) => (
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
                    {reporter?.firstName + " " + reporter?.lastName}
                  </TableCell>

                  <TableCell sx={tableBodyStyle}>
                    {reporter.email}
                  </TableCell>
                  <TableCell sx={tableBodyStyle}>{reporter.mobile}</TableCell>
                  <TableCell sx={tableBodyStyle}>{reporter.gender}</TableCell>
                  <TableCell
                    style={{
                      color:
                        reporter.status === "सक्रिय"
                          ? "green"
                          : reporter.status === "निष्क्रिय"
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
                    <IconButton aria-label="more" onClick={handleClick}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem sx={tableBodyStyle}>संपादित करें</MenuItem>
                      <MenuItem sx={tableBodyStyle}>हटाएं</MenuItem>
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
        count={mockReportersData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default ReportersData;
