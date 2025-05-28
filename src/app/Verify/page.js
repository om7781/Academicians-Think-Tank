"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'




const page = () => {
    const [token, settoken] = useState("")
    const [verified,setVerified] = useState(false)
    const hitVerify = async() =>{
        const response = await axios.post('/api/users/sendEmail',{token});
        console.log(response)
        setVerified(true)
        toast.success("You are verified!",{
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              draggable: true,
              progress: undefined,
              theme: "light",
              })
    }

    useEffect(()=>{
        hitVerify()
    },[token])
    
    useEffect(()=>{
        const data = window.location.search.split("=")[1]
        console.log(data)
        settoken(data)
    })

  return (
    
    <>
    <div className='font-bold text-5xl text-center m-10 h-90'>Verification page</div>

    <ToastContainer/>
    </>
  )
}

export default page