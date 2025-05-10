"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'



const page = () => {
  const router = useRouter();
  const [user,setUser] = useState({
    email: "",
    password: ""
  })

  const redirect = () =>{
    setTimeout(() => {
    router.push('/Profile')
    }, 3500);
  }

  const onLogin = async(e) =>{
    try {
      e.preventDefault()
      // console.log(user)
      const response = await axios.post('/api/users/login',user)
      toast.success(' You are logged in!', {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
      console.log("Login Success",response.data)
      redirect();
    } catch (error) {
      toast.error('There was an error', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } 
  }
  return (
    <>
<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
  <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h2>
    
    <form className="space-y-4" onSubmit={onLogin}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input 
       onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
          type="email" 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          placeholder="your@email.com"
          required
         />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input 
          onChange={(e) => setUser(prev => ({ ...prev, password: e.target.value }))}
          type="password" 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          placeholder="••••••••"
          required
         />
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
          <span className="ml-2 text-sm text-gray-600">Remember me</span>
        </label>
        <Link href="/" className="text-sm text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
      </div>

      <button type='submit' className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
  Sign In
</button>
      <ToastContainer/>
    </form>

    <div className="mt-6 text-center text-sm text-gray-600">
      Don't have an account? 
      <Link href="/Signup" className="text-indigo-600 hover:text-indigo-500 font-medium">Sign up</Link>
    </div>
  </div>
</div>
    </>
  )
}

export default page