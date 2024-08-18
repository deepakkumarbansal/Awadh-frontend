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

// उपयोगकर्ताओं के लिए नकली डेटा
const mockUsersData = [
  {
    _id: "1",
    firstName: "राम",
    lastName: "कुमार",
    email: "ram.kumar@example.com",
    mobile: "9876543210",
    gender: "पुरुष",
    status: "सक्रिय",
    profilePicture: "https://via.placeholder.com/150",
    isEmailVerified: true,
  },
  {
    _id: "2",
    firstName: "सीता",
    lastName: "शर्मा",
    email: "seeta.sharma@example.com",
    mobile: "8765432109",
    gender: "महिला",
    status: "निष्क्रिय",
    profilePicture: "https://via.placeholder.com/150",
    isEmailVerified: false,
  },
  {
    _id: "3",
    firstName: "मोहन",
    lastName: "वर्मा",
    email: "mohan.verma@example.com",
    mobile: "7654321098",
    gender: "पुरुष",
    status: "लंबित",
    profilePicture: "https://via.placeholder.com/150",
    isEmailVerified: true,
  },
  {
    _id: "4",
    firstName: "गीता",
    lastName: "देवी",
    email: "geeta.devi@example.com",
    mobile: "6543210987",
    gender: "महिला",
    status: "सक्रिय",
    profilePicture: "https://via.placeholder.com/150",
    isEmailVerified: true,
  },
  {
    _id: "5",
    firstName: "रवि",
    lastName: "सिंह",
    email: "ravi.singh@example.com",
    mobile: "5432109876",
    gender: "पुरुष",
    status: "निष्क्रिय",
    profilePicture: "https://via.placeholder.com/150",
    isEmailVerified: false,
  },
];

const UsersData = () => {
  // पेजिनेशन, सर्च और मेनू के लिए स्टेट
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // प्रति पृष्ठ डिफ़ॉल्ट पंक्तियाँ
  const [searchQuery, setSearchQuery] = useState("");

  const users = mockUsersData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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

  // मेनू क्लिक को हैंडल करने के लिए फ़ंक्शन
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // मेनू बंद करने के लिए फ़ंक्शन
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
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
                <TableCell sx={tableHeadStyle}>लिंग</TableCell>
                <TableCell sx={tableHeadStyle}>स्थिति</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
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
                    {user?.firstName + " " + user?.lastName}
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
                  <TableCell sx={tableBodyStyle}>{user.gender}</TableCell>
                  <TableCell
                    style={{
                      color:
                        user.status === "सक्रिय"
                          ? "green"
                          : user.status === "निष्क्रिय"
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

      {/* पेजिनेशन घटक */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={mockUsersData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default UsersData;
