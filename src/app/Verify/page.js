"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'


const page = () => {
    const [token, settoken] = useState("")
    const [errormssg, seterror] = useState([])
    const [verified,setVerified] = useState(false)

    const hitVerify = async() =>{
        try {
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
        } catch (error) {
          seterror(error.response.data.error)
        }
    }

    useEffect(()=>{
        hitVerify()
    },[token])
    
    useEffect(()=>{
        const data = window.location.search.split("=")[1]
        console.log(data)
        settoken(data)
    })

    const showError = () =>{
          console.log(errormssg)
    }

    useEffect(()=>{
      showError()
    },[errormssg])
  return (
    
    <>
    <div className='font-bold text-5xl text-center m-10 h-90'>Verification page
      <div className='font-bold text-4xl text-center m-10'><h1 className='font-bold text-red-600'>{errormssg}</h1></div>
    </div>
    
    <ToastContainer/>
    <button onClick={showError}>Show</button>
    
    </>
  )
}

export default page