"use client"
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';





const page = () => {
  const router = useRouter();
  const [user,setUser] = React.useState({
      fullName : "",
      userName : "",
      email : "",
      password : ""
  });

  const [loading,setLoading] = React.useState(false);
  const redirect = () =>{
    setTimeout(() => {
    router.push('/Login')
    }, 3500);
  }

  const onSignup = async () => {
    try {
      setLoading(true)
      await axios.post('/api/users/signup',user)
    } catch (error) {
      console.log(error)
    }
    finally{
      setLoading(false);
      toast.success(' You can Now Login!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      redirect()
    }
  }
  return (
    <>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Sign up</h1>
            <input 
              onChange={(e)=>{
                setUser({...user,fullName : e.target.value})
              }}
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="fullname"
              placeholder="Full Name"  />

            <input 
            onChange={(e)=>{
              setUser({...user,userName : e.target.value})
            }}
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="user_name"
              placeholder="User Name"  />

            <input 
            onChange={(e)=>{
              setUser({...user,email : e.target.value})
            }}
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"  />

            <input 
            onChange={(e)=>{
              setUser({...user,password : e.target.value})
            }}
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"  />
            <button
              onClick={onSignup}
              type="submit"
              className="w-full text-center py-3 rounded bg-black text-white hover:bg-green-dark focus:outline-none my-1"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            <div className="text-center text-sm text-grey-dark mt-4">
              By signing up, you agree to the 
              <a className="no-underline border-b border-grey-dark text-grey-dark m-1" href="/">
                Terms of Service
              </a> and 
              <a className="no-underline border-b border-grey-dark text-grey-dark m-1" href="/">
                Privacy Policy
              </a>
            </div>
          </div>

          <div className="text-grey-dark mt-6">
            Already have an account? 
            <Link className="no-underline border-b border-blue text-blue ml-1" href="/Login">
              Log in
            </Link>.
      <ToastContainer/>
          </div>
        </div>
      </div>
    </>
  )
}

export default page