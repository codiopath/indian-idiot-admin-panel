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

const AddQuestion = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [isSuperAdmin, setIsSuperAdmin] = useState(false)


  const handleFormSubmit = (values) => {
    console.log("is super admin : ", isSuperAdmin);
    console.log(values);
    const payload = {...values, createdBy: 'Me', adminId: LoggedAdmin._id, superAdmin: isSuperAdmin}
    axios.post(`${baseUrl}/question/add`, payload)
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

  return (
    <Box m="20px">
      <Header title="ADD QUESTION" subtitle="Add a New Question" />
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
                label="Add Question"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.question}
                name="question"
                error={!!touched.question && !!errors.question}
                helperText={touched.question && errors.question}
                sx={{ gridColumn: "span 4" }}
              />

            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Add Question
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};


const checkoutSchema = yup.object().shape({
  question: yup.string().required("required"),
});
const initialValues = {
  question: ""
};

export default AddQuestion;
