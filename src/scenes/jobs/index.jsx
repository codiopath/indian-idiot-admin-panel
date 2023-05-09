import { Alert, Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import { useState } from "react";
import { useEffect, useContext } from "react";
import axios from "axios";
import { baseUrl } from "../../environments";
import { LoginContext } from "../../Contexts/LoginContext";
import { LoggedAdmin } from "../loggedAdminData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";


function Jobs() {
    const [theData, setTheData] = useState([]);
    useEffect(() => {
      axios
        .get(`${baseUrl}/joinUs/get`)
        .then((res) => {
          if (res.data.myType === "Success") {
            // toast.success(res.data.message)
            console.log("my Admins Data :", res.data.data);
            setTheData(res.data.data);
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }, []);
  
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
      { field: "_id", headerName: "ID" },
      {
        field: "designation",
        headerName: "Designation",
        flex: 1,
        cellClassName: "name-column--cell",
      },
      // {
      //   field: "phone",
      //   headerName: "Phone Number",
      //   flex: 1,
      // },
      // {
      //   field: "link",
      //   headerName: "Link",
      //   flex: 1,
      //   renderCell: ({ row }) => (
      //       <a href='"http://www.w3schools.com"' target="_blank" style={{color: '#fff'}}>
      //         Click Here
      //       </a>
      //     ),
      // },
      {
        field: "createdBy",
        headerName: "Created By",
        flex: 1,
      },
      // {
      //   field: "Edit",
      //   headerName: "Edit",
      //   flex: 1,
      //   cellClassName: "name-column--cell",
      //   renderCell: ({ row }) => (
      //     <Button onClick={() => alert(row)} style={{ color: "#fff" }}>
      //       Edit
      //     </Button>
      //   ),
      // },
      {
        field: "Delete",
        headerName: "Delete",
        flex: 1,
        // cellClassName: "name-column--cell",
        renderCell: ({ row }) => (
          <Button
            onClick={() => {
              const payload = { adminId: LoggedAdmin._id, joinUsId: row._id };
              // ${baseUrl}/admin/add-content`
              axios
                .post(`${baseUrl}/joinUs/delete`, payload)
                .then((res) => {
                  if (res.data.myType === "Success") {
                    toast.success(res.data.message);
  
                    axios
                    .get(`${baseUrl}/joinUs/get`)
                      .then((res) => {
                        if (res.data.myType === "Success") {
                          setTheData(res.data.data);
                        } else {
                          toast.error(res.data.message);
                        }
                      })
                      .catch((err) => {
                        toast.error(err.message);
                      });
                  } else {
                    toast.error(res.data.message);
                  }
                })
                .catch((err) => {
                  toast.error(err.message);
                });
            }}
            style={{ color: "#fff" }}
          >
            Delete
          </Button>
        ),
      },
    ];
  
    const [open, setOpen] = useState(true);
    return (
      <Box m="20px">
        <ToastContainer />
  
        <Header title="All Jobs" subtitle="Managing the Jobs" />
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          <DataGrid
            checkboxSelection
            rows={theData}
            columns={columns}
            getRowId={(row) => row._id}
          />
        </Box>
      </Box>
    );
  };

export default Jobs