"use client"
import axios from 'axios';
import React, { use, useEffect, useState } from 'react'

const page = ({params}) => {
    const { id } = use(params);
    const [reports, setreports] = useState([]);
    const getReports = async() =>{
        const response = await axios.get('/api/users/getBlog/' + id);
        const data = response.data
        setreports(data.reports)
    }
    useEffect(()=>{
      getReports()
    },[])
  return (
    <>
    <div className='font-bold text-center text-6xl my-10'>Reports for the Blog: </div>
    <div className='m-10'>
      <ul>
        {reports.length == 0 ? "No reports on this post" : reports.map((report,i)=>{
        return <li key={i}>user: {report.username} comment: {report.comment}</li>
    })}
      </ul>
    </div>
    </>
  )
}

export default page