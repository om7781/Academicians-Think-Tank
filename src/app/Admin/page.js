"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'


const AdminLogin = () => {
  const [email, setemail] = useState("")
  const [pass, setpass] = useState("")
  const router = useRouter();
  const onLogin = async () =>{
    const user = await axios.post('/api/admin/login',{email,pass});
    if(user){
      router.push('/AdminDashboard')
    }
  }
  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-amber-100 px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Admin Login</h1>
          <input 
            onChange={(e)=>{
              setemail(e.target.value)
            }}
            type="email"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email" 
            required
          />

          <input 
           onChange={(e)=>{
              setpass(e.target.value)
            }}
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password" 
            required
          />

          <button
            type="submit"
            onClick={onLogin}
            className="w-full text-center py-3 rounded bg-black text-white hover:bg-green-dark cursor-pointer focus:outline-none my-1"
          >
            Login
          </button>

          <div className="text-center text-sm text-grey-dark mt-4">
            <Link href="/forgot-password" className="no-underline border-b border-grey-dark text-grey-dark">
              Forgot password?
            </Link>
          </div>
        </div>

        <div className="text-grey-dark mt-6">
          Not an admin? <Link href="/" className="no-underline border-b border-blue text-blue">Return to site</Link>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin