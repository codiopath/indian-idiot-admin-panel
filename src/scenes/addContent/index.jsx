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
import './index.css'
import { mockGenres, mockOtt } from "../../data/mockData";


import {storage} from '../../firebase'
import {ref, uploadBytes, listAll, getDownloadURL} from 'firebase/storage'
import {v4} from 'uuid'

const AddContent = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [isSuperAdmin, setIsSuperAdmin] = useState(false)


const [imageUpload, setImageUpload] = useState(null)
const [heroImageUpload, setHeroImageUpload] = useState(null)

  const [type, setType] = useState('tv')
  const [genre, setGenre] = useState([])
  const [ott, setOtt] = useState([])
  const [trending, setTrending] = useState(false)
  const [hero, setHero] = useState(false)
  const [emoji, setEmoji] = useState([])
  const [heroImage, setHeroImage] = useState('')
  const [image, setImage] = useState('')

  useEffect(()=>{

      console.log("is super admin : ", LoggedAdmin);
  }, [])

  const uploadImage = () => {
    const randomId = v4()
    if(!imageUpload) return
    const imageRef = ref(storage, `contentImages/${imageUpload.name + randomId}`)
    uploadBytes(imageRef, imageUpload).then( (snapshot) => {
      console.log('uploaded');
      getDownloadURL(snapshot.ref).then( url => {
        setImage(url)
        toast.success('Image Uploaded Succesffully')
    });
    });
    
  }

  const uploadHeroImage = () => {
    const randomId = v4()
    if(!heroImageUpload) return
    const imageRef = ref(storage, `heroImages/${heroImageUpload.name + randomId}`)
    uploadBytes(imageRef, heroImageUpload).then( (snapshot) => {
      console.log('uploaded');
      getDownloadURL(snapshot.ref).then( url => {setHeroImage(url)
        toast.success('Hero Image Uploaded Succesffully')
        console.log('url :', url)
    });
    });
    
  }

  const handleFormSubmit = (values) => {
    console.log(values);

    if(!genre){
        toast.error("Please select genre first")
    }
    else if(!ott){
        toast.error("Please select OTT first")
    }
    else if(!hero && heroImage){
        toast.error("Please select hero as yes first")
    }
    else if(hero && !heroImage){
        toast.error("Please upload Hero image first")
    }
    
    else{

//     const check = {
//         dialogue
// : 
// 6
// direction
// : 
// 10
// duration
// : 
// "3hr`"
// language
// : 
// "hindi"
// music
// : 
// 2
// performance
// : 
// 7
// review
// : 
// "Awesome it is"
// seenWithParents
// : 
// "yes of course"
// spoiler
// : 
// "abcdef"
// story
// : 
// 5
// subHeading
// : 
// "ek do teen"
// tii
// : 
// "oooooooo"
// title
// : 
// "one to three"
// trailer
// : 
// "this is "
//     }

        // console.log('value ::::', values)
    const payload = {
        title: values.title,
        subHead: values.subHeading,
        type: type,
        image,
        heroImage,
        genres: genre,
        OTT: ott,
        language: values.language,
        trending,
        hero,
        duration: values.duration,
        ratings: {
            direction: values.direction,
            music: values.music,
            story: values.story,
            dialogue: values.dialogue,
            performance: values.performance
        },
        review: values.review,
        spoiler: values.spoiler,
        seenWithParents: values.seenWithParents,
        TIItake: values.tii,
        emoji,
        trailer: values.trailer,
        createdBy: LoggedAdmin.firstName + " " + LoggedAdmin.lastName,
        adminId: LoggedAdmin._id
        
        }
    axios.post(`${baseUrl}/admin/addContent`, payload)
    .then((res)=>{
      if(res.data.myType === 'Success'){
        toast.success(res.data.message)
      }
      else{
        toast.error(res.data.message)
      }
    })
    .catch((err)=>{
      toast.error(err.message + '123')
    })

}
  };

  return (
    <Box m="20px">
      <Header title="ADD CONTENT" subtitle="Add the content here" />
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
                label="Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Sub Heading"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.subHeading}
                name="subHeading"
                error={!!touched.subHeading && !!errors.subHeading}
                helperText={touched.subHeading && errors.subHeading}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Language"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.language}
                name="language"
                error={!!touched.language && !!errors.language}
                helperText={touched.language && errors.language}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="duration"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.duration}
                name="duration"
                error={!!touched.duration && !!errors.duration}
                helperText={touched.duration && errors.duration}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Spoiler"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.spoiler}
                name="spoiler"
                error={!!touched.spoiler && !!errors.spoiler}
                helperText={touched.spoiler && errors.spoiler}
                sx={{ gridColumn: "span 2" }}
              />

              <h2>Ratings /10</h2>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Direction"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.direction}
                name="direction"
                error={!!touched.direction && !!errors.direction}
                helperText={touched.direction && errors.direction}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Music"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.music}
                name="music"
                error={!!touched.music && !!errors.music}
                helperText={touched.music && errors.music}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Story"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.story}
                name="story"
                error={!!touched.story && !!errors.story}
                helperText={touched.story && errors.story}
                sx={{ gridColumn: "span 2" }}
              />
                <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Dialogue"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dialogue}
                name="dialogue"
                error={!!touched.dialogue && !!errors.dialogue}
                helperText={touched.dialogue && errors.dialogue}
                sx={{ gridColumn: "span 2" }}
              />
                <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Performance"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.performance}
                name="performance"
                error={!!touched.performance && !!errors.performance}
                helperText={touched.performance && errors.performance}
                sx={{ gridColumn: "span 2" }}
              />
              <h2></h2>
               <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Review"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.review}
                name="review"
                error={!!touched.review && !!errors.review}
                helperText={touched.review && errors.review}
                sx={{ gridColumn: "span 4" }}
              />
               <TextField
                fullWidth
                variant="filled"
                type="text"
                label="TTI's take"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.tii}
                name="tii"
                error={!!touched.tii && !!errors.tii}
                helperText={touched.tii && errors.tii}
                sx={{ gridColumn: "span 2" }}
              />
               <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Trailer Link"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.trailer}
                name="trailer"
                error={!!touched.trailer && !!errors.trailer}
                helperText={touched.trailer && errors.trailer}
                sx={{ gridColumn: "span 2" }}
              />

               <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Seen With Parents"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.seenWithParents}
                name="seenWithParents"
                error={!!touched.seenWithParents && !!errors.seenWithParents}
                helperText={touched.seenWithParents && errors.seenWithParents}
                sx={{ gridColumn: "span 4" }}
              />

              <div style={{display: 'flex', width:'77.8vw', flexWrap: 'wrap', justifyContent: 'space-between'}}>


                <div className="super-admin-container">

            <label>Type</label>
            <select
            onChange={(e)=>{setType(e.target.value)}}
            >
             <option value={'tv'}>TV Show</option>
             <option value={'movie'}>MOVIE</option>
            </select>
                </div>

                <div className="super-admin-container">
                    
                    <label>Genres : <span>{genre.toString()}</span></label>
                    <select
                    onChange={(e)=>{setGenre([...genre ,e.target.value])}}
                    >
                     <option>Select Genre</option>

                     {
                        mockGenres.map((obj)=>{
                            return(
                                <option value={obj.name}>{obj.name}</option>
                            )
                        })
                     }
                        
                    </select>
                        </div>

                
                        <div className="super-admin-container">
                    
                    <label>OTT : {ott.toString()}</label>
                    <select
                    onChange={(e)=>{setOtt([...ott ,e.target.value])}}
                    >
                     <option>Select OTT</option>

                     {
                        mockOtt.map((obj)=>{
                            return(
                                <option value={obj.name}>{obj.name}</option>
                            )
                        })
                     }

                     <option value={'movie'}>MOVIES</option>
                    </select>
                         </div>


                         <div className="super-admin-container">
                    
                    <label>Trending</label>
                    <select as="select" name="color"
                    onChange={(e)=>{setTrending(e.target.value)}}
                    >
                     <option value={false}>No</option>
                     <option value={true}>Yes</option>
                    </select>
                        </div>  


                         <div className="super-admin-container">
                    
                    <label>Hero Section</label>
                    <select
                    onChange={(e)=>{setHero(e.target.value)}}
                    >
                     <option value={false}>No</option>
                     <option value={true}>Yes</option>
                    </select>
                        </div>   


                        <div className="super-admin-container">
                    
                    <label>Emoji's :
                        {
                        emoji.map((obj)=>{
                            console.log(obj)
                            if(obj === '&#128512;'){
                                return(
                                    <span>&#128512;</span>
                                )
                            }
                        else  if(obj === '&#128525;'){
                            return(
                                <span>&#128525;</span>
                            )
                        }
                        else  if(obj === '&#128551;'){
                            return(
                                <span>&#128551;</span>
                            )
                        }
                        else  if(obj === '&#128516;'){
                            return(
                                <span>&#128516;</span>
                            )
                        }
                        else  if(obj === '&#128514;'){
                            return(
                                <span>&#128514;</span>
                            )
                        }
                        else  if(obj === '&#128520;'){
                            return(
                                <span>&#128520;</span>
                            )
                        }
                        else  if(obj === '&#128526;'){
                            return(
                                <span>&#128526;</span>
                            )
                        }
                        else  if(obj === '&#128529;'){
                            return(
                                <span>&#128529;</span>
                            )
                        }


                        })
                    }
                         {/* <span>{emoji}</span> */}
                         
                    </label>
                    <select as="select" name="color"
                    onChange={(e)=>{setEmoji([...emoji, e.target.value])}}
                    >
                     <option value={'&#128512;'}>&#128512;</option>
                     <option value={'&#128525;'}>&#128525;</option>
                     <option value={'&#128551;'}>&#128551;</option>
                     <option value={'&#128516;'}>&#128516;</option>
                     <option value={'&#128514;'}>&#128514;</option>
                     <option value={'&#128520;'}>&#128520;</option>
                     <option value={'&#128526;'}>&#128526;</option>
                     <option value={'&#128529;'}>&#128529;</option>
                    </select>
                        </div>   



                        <div className="super-admin-container" style={{width: '100%'}}>
                    
                    <label>Select Content Image </label>
                    <input type="file" 
                    onChange={(e)=>{setImageUpload(e.target.files[0])}}
                    />
                    <button style={{marginTop: '10px'}}
                    onClick={uploadImage}
                    >Upload</button>
                        </div>  


                        {
                            hero ?
                            <div className="super-admin-container" style={{width: '100%'}}>
                    
                    <label>Select Hero Section Image </label>
                    <input type="file" 
                    onChange={(e)=>{setHeroImageUpload(e.target.files[0])}}
                    />
                    <button style={{marginTop: '10px'}}
                    onClick={uploadHeroImage}
                    >Upload</button>
                        </div> 
                        : 
                        null
                        }
                         
                        


            </div>

            </Box>

            {
              image &&  
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Add Content
              </Button>
            </Box>
            }
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
    title: yup.string().required("required"),
    subHeading: yup.string().required("required"),
    language: yup.string().required('required'),
    duration: yup.string().required('required'),
    spoiler: yup.string().required('required'),

    direction: yup.number(),
    music: yup.number(),
    story: yup.number(),
    dialogue: yup.number(),
    performance: yup.number(),


    review: yup.string().required('required'),
    tii: yup.string().required('required'),
    trailer: yup.string().required('required'),
    seenWithParents: yup.string().required('required')
  // contact: yup
  //   .string()
  //   .matches(phoneRegExp, "Phone number is not valid")
  //   .required("required"),
    // password: yup.string().required('Password required'),
  // address1: yup.string().required("required"),
  // address2: yup.string().required("required"),
});
const initialValues = {
  title: "",
  subHeading: "",
  language: "",
  duration: "",
  spoiler: "",

  direction: 0,
  music: 0,
  story: 0,
  dialogue: 0,
  performance: 0,

  review: "",
  tii: '',
  trailer: '',
  seenWithParents: ''

  // contact: "",
  // address1: "",
  // address2: "",
};

export default AddContent;
