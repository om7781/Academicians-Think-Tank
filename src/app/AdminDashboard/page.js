"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'


const page = () => {
  const [blogs, setblogs] = useState([])
  const [users, setusers] = useState([])
  
  const getBlogs = async() =>{
    const response = await axios.get('/api/users/getBlog')
    console.log(response.data)
     setblogs(response.data)
    console.log(blogs)
  }
  
  const getUsers = async() => {
    const users = await axios.get('/api/admin/user-list')
    const response = users.data
    setusers(response.users)
  }

  const deleteBlog = async(id) =>{
    const response = await axios.post('/api/admin/deleteBlog',{_id: id})
    console.log(response)
    getBlogs()
    // console.log(id)
  }
  
  useEffect(()=>{
    getBlogs()
  },[])
  return (
    <>
    <div className='m-10'>
        <h1 className='font-bold text-5xl text-center'>BLOG Section</h1>
        <ul>
      {blogs.map((e,i)=>{
      const blogid = e._id
      return <li key={i} className='m-5'> <b>title: </b>{e.title} <br></br> <b>Content: </b> {e.content} id: {blogid}<button onClick={()=>{
        deleteBlog(blogid)
      }} className='px-4 py-2 bg-red-600'>delete</button><hr className='my-3'></hr> </li>  
    })}
    </ul>

    </div>
    <div className='m-10'>
      <h1 className='font-bold text-5xl text-center'>Users List: </h1>
        <ul>
          {users.map((user,i)=>{
            return <li className='mt-2 ' key={i}>{user.userName}</li>
          })}
        </ul>
        <button  onClick={getUsers}>Get</button>
    </div>
    
    </>
  )
}

export default page