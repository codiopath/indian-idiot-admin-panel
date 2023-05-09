import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../environments";
import { LoggedAdmin } from "../loggedAdminData";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [contactData, setContactData] = useState([])

  useEffect(()=>{
    axios.post(`${baseUrl}/contact/getAll`, {adminId: LoggedAdmin._id})
    .then((res)=>{
      if(res.data.myType === 'Success'){
        // toast.success(res.data.message)
        setContactData(res.data.data)
      }
      else{
        toast.error(res.data.message)
      }
    })
    .catch((err)=>{
      toast.error(err.message)
    })
  }, [])

  const columns = [
    { field: "_id", headerName: "ID", flex: 0.5 },
    {
      field: "email",
      headerName: "Email",
      flex: .5,
      cellClassName: "name-column--cell",
    },
    {
      field: "message",
      headerName: "Message",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "Delete",
      headerName: "Delete",
      headerAlign: "center",
      flex: 1,
      align: "center",
      // cellClassName: "name-column--cell",
      renderCell: ({ row }) => (
        <Button onClick={() => {
          const payload = {
            adminId: LoggedAdmin._id,
            contactId: row._id
          }
          axios.post(`${baseUrl}/contact/delete`, payload)
          .then((res)=>{
            if(res.data.myType=== 'Success'){
              toast.success(res.data.message)
              axios.post(`${baseUrl}/contact/getAll`, {adminId: LoggedAdmin._id})
    .then((res)=>{
      if(res.data.myType === 'Success'){
        // toast.success(res.data.message)
        setContactData(res.data.data)
      }
      else{
        toast.error(res.data.message)
      }
    })
    .catch((err)=>{
      toast.error(err.message)
    })
            }
            else{
              toast.error(res.data.message)
            }
          })
          .catch((err)=> toast.error(err.message))
        }
        }
        style={{ color: "#fff" }}
         >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <ToastContainer/>
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
      />
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={contactData}
          getRowId={(row)=> row._id}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
