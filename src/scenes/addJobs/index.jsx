import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState } from "react";
import axios from 'axios'
import { baseUrl } from "../../environments";
import { useEffect } from "react";
import { LoggedAdmin } from "../loggedAdminData";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './addJobs.css'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'


function AddJobs() {

    const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link'],
          ['clean']
        ],
      }

    const  formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link'
      ]

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const [jobRequiurements, setJobRequiurements] = useState("")



  const handleFormSubmit = (values) => {
    console.log(typeof(jobRequiurements));

    if(jobRequiurements){
        const payload = {values, requirements: jobRequiurements , adminId: LoggedAdmin._id, createdBy: LoggedAdmin.email}
        axios.post(`${baseUrl}/joinUs/add`, payload)
        .then((res)=>{
          if(res.data.myType === 'Success'){
            toast.success(res.data.message)
            window.location.reload()
          }
          else{
            toast.error(res.data.message)
          }
        })
        .catch((err)=>{
          toast.error(err)
        })
    }
    else{
        toast.error('Please add requirements also')
    }
  };
  
 

  return (
    <Box m="20px">
      <Header title="ADD JOBS" subtitle="Add a New Jobs" />
      <ToastContainer/>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
           
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Job Designation"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.designation}
                name="designation"
                error={!!touched.designation && !!errors.designation}
                helperText={touched.designation && errors.designation}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Job Brief"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.brief}
                name="brief"
                error={!!touched.brief && !!errors.brief}
                helperText={touched.brief && errors.brief}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Job Details"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.details}
                name="details"
                error={!!touched.details && !!errors.details}
                helperText={touched.details && errors.details}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Assignment Link"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.link}
                name="link"
                error={!!touched.link && !!errors.link}
                helperText={touched.link && errors.link}
                sx={{ gridColumn: "span 4" }}
              />

            </Box>

            <ReactQuill value={jobRequiurements} modules={modules} formats={formats} onChange={(newValue)=>{setJobRequiurements(newValue)}} placeholder='Enter the Job Requirements' style={{marginTop: '30px', color: '#fff'}} className='myInputQuillClass'
            />


           

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Add Job
              </Button>
            </Box>
          </form>
        )}
      </Formik>

     

    </Box>
  );
};


const checkoutSchema = yup.object().shape({
    designation: yup.string().required("required"),
    brief: yup.string().required("required"),
    details: yup.string().required("required"),
    link: yup.string().required("required"),
});
const initialValues = {
    designation: "",
    brief: "",
    details: "",
    link: ""
};


export default AddJobs