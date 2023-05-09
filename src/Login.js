import axios from 'axios';
import React, { useEffect, useState, useContext, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from './environments';
import { LoginContext } from './Contexts/LoginContext';
import back from '../src/assets/back.mp4'

function Login() {

    const {setLoggedUserData} = useContext(LoginContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const vidRef = useRef(null);

    useEffect(()=>{
        // toast("checking")
        vidRef.current.play();
    }, [])

    const submit = () => {

        
        const payload = {email, password}
        axios.post(`${baseUrl}/admin`, payload)
        .then(async (res)=>{
            if(res.data.myType==="Success"){
                toast.success(res.data.message)
                // console.log('this data ', res.data.data)
                setLoggedUserData(res.data.data)

               await localStorage.setItem("userData", JSON.stringify(res.data.data))
               await localStorage.setItem("loggedIn", "true")
                window.location.reload()
            }
            else{
                toast.error(res.data.message)

            }
            console.log(res)
        })
        .catch((err)=>{
            toast.error(err.message)
        })
    }
  return (
    <div style={{height: '100vh', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', margin: '0 !important', padding: '0 !important'}}>
       
       <video id="background-video"
       ref={vidRef}
       src={back} 
       loop autoPlay
         style={{ zIndex: '-1', width: '100%', height: '100%', objectFit: 'cover'}} 
         
         />

         <div style={{position: 'absolute', width: '100%', height: '100%', top: 0, background: '#00000099'}}>

         </div>


        <ToastContainer theme="light"/>
        <div style={{ display: 'flex', flexDirection: 'column', width: '30%', position: 'absolute', zIndex: '1'}}>
            <input type='email' placeholder='Enter your Email'
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            onClick={()=>{vidRef.current.play();}}
            style={{background: '#dddddd50', padding: '20px', borderRadius: '10px', color: '#fff', outline: 'none', border: 'none'}}
            
            />
            <input type='password' placeholder='Enter your Password'
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            style={{background: '#dddddd50', padding: '20px', borderRadius: '10px', color: '#fff', outline: 'none', border: 'none', marginTop: '20px'}}
            />
            <button onClick={submit}
            style={{background: 'transparent', padding: '20px', borderRadius: '3px', marginTop: '20px', color: '#fff', outline: 'none', border: '2px solid'}}
            >Login</button>
        </div>
    </div>
  )
}

export default Login