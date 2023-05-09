import { Alert, Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import Header from "../../components/Header";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../environments";
import { LoggedAdmin } from "../loggedAdminData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Section = () => {
  const [theData, setTheData] = useState([]);
  useEffect(() => {
    console.log("logged data :", mockDataTeam);
    axios
      .get(`${baseUrl}/admin/getSection`)
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
      field: "title",
      headerName: "Title",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "createdBy",
      headerName: "Created By",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Edit",
      headerName: "Edit",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: ({ row }) => (
        <Button onClick={() => alert(row)} style={{ color: "#fff" }}>
          Edit
        </Button>
      ),
    },
    {
      field: "Delete",
      headerName: "Delete",
      flex: 1,
      // cellClassName: "name-column--cell",
      renderCell: ({ row }) => (
        <Button
          onClick={() => {
            const payload = { adminId: LoggedAdmin._id, sectionId: row._id };
            // ${baseUrl}/admin/add-content`
            axios
              .post(`${baseUrl}/admin/deleteSection`, payload)
              .then((res) => {
                if (res.data.myType === "Success") {
                  toast.success(res.data.message);

                  axios
                  .get(`${baseUrl}/admin/getSection`)
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

      <Header title="SECTION" subtitle="Managing the Sections" />
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
          rows={theData}
          columns={columns}
          getRowId={(row) => row._id}
        />
      </Box>
    </Box>
  );
};

export default Section;
