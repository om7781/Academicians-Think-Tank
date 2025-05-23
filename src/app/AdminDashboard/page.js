"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'


const page = () => {
  const [blogs, setblogs] = useState([])
  const getBlogs = async() =>{
    const response = await axios.get('/api/users/getBlog')
    console.log(response.data)
     setblogs(response.data)
    console.log(blogs)
  }
  
  const deleteBlog = async(id) =>{
    const response = await axios.post('/api/admin/deletBlog',{_id: id})
    console.log(response)
  }
  
  useEffect(()=>{
    getBlogs()
  },[])
  return (
    <>
    <ul>
      {blogs.map((e,i)=>{
      const blogid = e._id
      return <> <li className='m-5' key={i}> <b>title: </b>{e.title} <br></br> <b>Content: </b> {e.content} id: {blogid}<button onClick={()=>{
        deleteBlog(blogid)
      }} className='px-4 py-2 bg-red-600'>delete</button><hr className='my-3'></hr> </li>  </> 
    })}
    </ul>
    </>
  )
}

export default page