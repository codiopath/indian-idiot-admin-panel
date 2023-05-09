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

const AddSection = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

    const [sectionData, setSectionData] = useState([])

    const [entries, setEntries] = useState([])

  const handleFormSubmit = (values) => {
    console.log(values);
    const payload = {title: values.title, createdBy: LoggedAdmin.email, adminId: LoggedAdmin._id, entries}
    axios.post(`${baseUrl}/admin/addSection`, payload)
    .then((res)=>{
      if(res.data.myType === 'Success'){
        toast.success(res.data.message)
      }
      else{
        toast.error(res.data.message)
      }
    })
    .catch((err)=>{
      toast.error(err)
    })
  };
  
  useEffect(()=>{
    // console.log('admin :', LoggedAdmin)
    axios.get(`${baseUrl}/admin/getContent`)
    .then((res)=>{
      if(res.data.myType === 'Success'){
        // toast.success(res.data.message)
        setSectionData(res.data.data)
        // console.log('fetched :', res.data.data)
      }
      else{
        toast.error(res.data.message)
      }
    })
    .catch((err)=>{
      toast.error(err.message)
    })
  },[])

  return (
    <Box m="20px">
      <Header title="ADD SECTION" subtitle="Add a New Section" />
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
                label="Section Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 4" }}
              />

            </Box>


            <div className="super-admin-container" style={{width: '100%'}}>
                    
                    <label>Selected :
                        {
                        
                        entries && 
                        entries.map((data)=>{
                            return(
                                <span>{data.title}</span>
                            )
                        })
                        }
                        
                    </label>
                    <select
                    style={{width: '100%'}}
                    onChange={(e)=>{
                        // console.log(JSON.parse(e.target.value), 'e')
                        setEntries([...entries ,JSON.parse(e.target.value)])}}
                    >
                     <option>Select Title</option>

                     {
                        sectionData &&
                        sectionData.map((obj)=>{
                            // console.log(obj)
                            return(
                                <option value={JSON.stringify(obj)}>{obj.title}</option>
                             )
                        })
                     } 
                        
                    </select>
                        </div>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Add Section
              </Button>
            </Box>
          </form>
        )}
      </Formik>

     

    </Box>
  );
};


const checkoutSchema = yup.object().shape({
  title: yup.string().required("required"),
});
const initialValues = {
  title: ""
};

export default AddSection;
