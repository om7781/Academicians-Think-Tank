"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import { BadgeCheck } from "lucide-react";





const UserProfile = () => {
  const router = useRouter()
  const [user, setUser] = useState({
    name: "",
    about: "A passionate blogger and developer.",
    email: "",
    photo: "https://i.pravatar.cc/150?img=3", 
  });
  const [userinfo, setuserinfo] = useState({})
  const [isverified,setisverified] = useState(false)
  const [verifyenabled,setverifyenabled] = useState(true)
  const [isAdmin,setisAdmin] = useState(false)
  const [blogs, setBlogs] = useState([]);
  const [reports, setreports] = useState([]);

  const verifyEmail= async() =>{
    setverifyenabled(false)
    const response = await axios.post('/api/users/verifyEmail',userinfo)
    const respdata = response.data
    if(respdata.success){
      toast.success("Email Sent Successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
    }
    if(!respdata.success){
      toast.error("Try again later", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
    }
    setTimeout(()=>{
      setverifyenabled(true)
    },5000)
  
  }
  const logout = async() => {
    try {
      await axios.get('/api/users/logout');
      toast.success("Logout successful");
      router.push('/Login');
    } catch (error) {
      toast.error("Logout failed");
    }
  }

  const getuserInfo = async() => {
    const res = await axios.get('/api/users/user-info')
    const data = res.data
    setisAdmin(data.isAdmin)
    const { _id } = await res.data
    setUser({...user,
      name:data.fullName,
      email:data.email,
      id:data._id
    }) 
    if(data.isVerified){
      setisverified(true)
    }
    setuserinfo({email:data.email,userId:data._id})
    try {
      const blogdata = await axios.post("/api/users/getblogbyid",{_id}); 
      setBlogs(blogdata.data)
      blogs.map((blog,i)=>{
        setreports(blog.reports)
      })
    } catch (err) {
      console.error("Error fetching blogs", err);
    }
  }
  const getReports = async()=>{
    console.log(reports)
  }
  useEffect(()=>{
    getuserInfo()
  },[])


  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center gap-6">
        <img
          src={user.photo}
          alt="User"
          className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
        />
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-600 mt-2">{user.about}</p>
          <p className="text-sm text-gray-500 mt-1 flex">{user.email} <span >{isverified ? <span><BadgeCheck /></span> : ""}</span></p>
          {verifyenabled ? !isverified && <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={verifyEmail}>Verify</button> : <button disabled className="inline-flex text-white bg-gray-600 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded text-lg" onClick={verifyEmail}>Verify</button>}
          <ToastContainer/>
        </div>
        <div className="ml-10">
          <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={logout}>Log Out</button>
          {isAdmin ? <Link className=" mx-2 inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" href={'/AdminDashboard'} >Admin Dashboard</Link> : ""}
        </div>    
      </div>

      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Your Blogs </h3>
        {blogs.length === 0 ? (
          <p className="text-gray-500">No blogs posted yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogs.map((blog, index) => (
              <div key={index} className="bg-white p-5 rounded-lg shadow-md">
                <h4 className="text-xl font-bold text-indigo-600 mb-2">{blog.title}</h4>
                <p className="text-gray-700 line-clamp-3">{blog.content}</p>
                <p className="text-sm text-gray-400 mt-2">
                  {new Date(blog.upload_date).toLocaleDateString()}
                </p>
                <Link className='mt-5 font-bold text-emerald-300 text-xl' href={"/Blog/" + blog._id}> Go To Blog</Link>
                {blog.isApproved ? "Approved" : "Not Approved Yet"}
                <button onClick={()=>{
                  getReports()
                }}>Get report</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;