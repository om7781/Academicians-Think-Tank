"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const page = () => {
  const [featuredPost, setFeaturedPost] = useState(null);
  const [otherPosts, setOtherPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3003/api')
      .then((response) => {
        const data = response.data;

        if (data.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.length);
          const selectedPost = data[randomIndex];
          const remainingPosts = data.filter((_, i) => i !== randomIndex);

          setFeaturedPost(selectedPost);
          setOtherPosts(remainingPosts);
        }
      })
      .catch((error) => {
        console.error('Error fetching blog data:', error);
      });
  }, []);

  
	
	return (
		<div className="max-w-5xl mx-auto px-4 py-8">
		<h2 className='m-3 font-bold text-4xl text-center'>Featured Post</h2>
		{featuredPost && (
		  <div className="mb-10 p-6 bg-indigo-100 rounded-2xl shadow-md hover:shadow-lg transition">
			<h2 className="text-2xl font-bold text-indigo-800">{featuredPost.user_name}</h2>
			<p className="text-lg font-semibold text-indigo-600 mt-2">{featuredPost.title}</p>
			<p className="text-gray-700 mt-2">{featuredPost.content}</p>
			<Link className='mt-5 font-bold text-fuchsia-500 text-xl' href={`/${featuredPost.id}`}>Read More</Link>
		  </div>
		)}
	  
	  <h2 className='m-3 font-bold text-4xl text-center'>More Posts</h2>
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
		  {otherPosts.map((post, index) => (
			<div
			  key={index}
			  className="bg-white rounded-xl p-5 shadow hover:shadow-md border border-gray-100 transition"
			>
			  <h3 className="text-xl font-bold text-gray-800">{post.user_name}</h3>
			  <p className="text-indigo-600 font-medium mt-1">{post.title}</p>
			  <p className="text-gray-600 mt-2">{post.content}</p>
			</div>
		  ))}
		</div>
	  </div>
	  
);


}

export default page
