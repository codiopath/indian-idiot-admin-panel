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

const Content = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [contentData, setContentData] = useState([])

  useEffect(()=>{
    axios.get(`${baseUrl}/admin/getContent`)
    .then((res)=>{
      if(res.data.myType === 'Success'){
        // toast.success(res.data.message)
        setContentData(res.data.data)
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
    { field: "_id", headerName: "ID", flex: 0.4 },
    {
      field: "type",
      headerName: "Type",
      flex: .3,
      cellClassName: "name-column--cell",
    },
    {
      field: "OTT",
      headerName: "OTT",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "image",
      headerName: "Image",
      headerAlign: "left",
      align: "left",
      width: 150,
      editable: true,
      renderCell: (params) => <img style={{backgroundPosition: 'center', bockgroundSize: 'cover', width: '90%', borderRadius: '5px', height: '90%'}} src={params.value} />
    },
    {
      field: "heroImage",
      headerName: "Hero Image",
      headerAlign: "left",
      align: "left",
      width: 150,
      editable:true,
      renderCell: (params) => <img style={{backgroundPosition: 'center', bockgroundSize: 'cover', width: '100%'}} src={params.value} />
    },
    {
      field: "genres",
      headerName: "Genres",
      headerAlign: "left",
      align: "left",
      flex: 0.5,
      renderCell: (params) => <p>{params.value.toString()}</p>
    },
     {
        field: "language",
        headerName: "Language",
        flex: .3,
        cellClassName: "name-column--cell",
      },
     {
        field: "trending",
        headerName: "Trending",
        flex: .3,
        cellClassName: "name-column--cell",
      },
     {
        field: "duration",
        headerName: "Duration",
        flex: .3,
        cellClassName: "name-column--cell",
    },
     {
        field: "trailer",
        headerName: "Trailer Link",
        flex: .4,
        cellClassName: "name-column--cell",
    },
     {
        field: "createdBy",
        headerName: "Created By",
        flex: .4,
        cellClassName: "name-column--cell",
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
            contentId: row._id
          }
          axios.post(`${baseUrl}/content/delete`, payload)
          .then((res)=>{
            if(res.data.myType=== 'Success'){
              toast.success(res.data.message)
              axios.get(`${baseUrl}/admin/getContent`)
    .then((res)=>{
      if(res.data.myType === 'Success'){
        // toast.success(res.data.message)
        setContentData(res.data.data)
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
        title="All Content"
        subtitle="List of All Content is Here"
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
          rows={contentData}
          getRowId={(row)=> row._id}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Content;
