"use client"
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";


const page = () => {
  const [isLoading, setisLoading] = useState(false)
  const router = useRouter();
  const [blogdata, setblogdata] = useState({});

  const uploadBlog = async(e) => {
    e.preventDefault()
    setisLoading(true)
    try {
    await axios.post('/api/users/uploadBlog',blogdata)
    toast.info(' Blog will be uploaded once the Admins approve it!', {
                  position: "top-center",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: false,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  });  
    setTimeout(()=>{
      router.push('/Blog')
    },3500)
    } catch (error) {
      console.log(error)
    }
  }

  const getUserInfo = async() =>{
    const res = await axios.get('/api/users/user-info')
    const { data } = res
    setblogdata({
    user_id: data._id,
    username: data.userName,
    upload_date: new Date(),
    title: "",
    content: "",
    likesCount:[],
    comments:[],
    reports:[]
    })
  }
  
  useEffect(()=>{
    getUserInfo()
  },[])
  
  return (
    <>
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Upload Blog</h2>
        <form onSubmit={uploadBlog} className="space-y-4">
          <input
            onChange={(e)=>{
              setblogdata({...blogdata,title:e.target.value})
            }}
            type="text"
            name="title"
            placeholder="Blog Title"
            className="w-full border p-3 rounded"
            required
          />
          <textarea
            onChange={(e)=>{
              setblogdata({...blogdata,content:e.target.value})
            }}
            name="content"
            placeholder="Write your blog content..."
            rows="6"
            className="w-full border p-3 rounded"
            required
          />
          {isLoading ? <button
            disabled
            type="submit"
            className="w-full bg-gray-500 text-white py-3 rounded hover:bg-blue-700 transition"
          >
            Uploading...
          </button> : <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          >
            Upload Blog
          </button>}
          <ToastContainer/>
        </form>
      </div>
    </>
  );
}

export default page;
