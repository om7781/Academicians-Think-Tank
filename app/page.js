import React from 'react'
import HeroPage from '@/components/HeroPage'
import Blog from '@/components/Blog'

const page = () => {
  return (
    <>
    <div className="border-b-2 border-gray-500 pb-4"><HeroPage/></div>
    <h1 className="sm:text-5xl text-2xl font-bold title-font text-gray-900 mb-4 text-center mt-10">Our Featured Blogs</h1>
    <div><Blog/></div>
    </>
  )
}

export default page