"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Pen } from 'lucide-react';
import { useRouter } from 'next/navigation';

const page = () => {
	const router = useRouter();
	const [featuredPost, setFeaturedPost] = useState(null);
	const [otherPosts, setOtherPosts] = useState([]);

	useEffect(() => {
		axios.get('/api/users/getBlog')
			.then((response) => {
				const data = response.data;
				if (data.length > 0) {
					const randomIndex = Math.floor(Math.random() * data.length);
					const selectedPost = data[randomIndex];
					const remainingPosts = data.filter((_, i) => i !== randomIndex);

					if (selectedPost.isApproved) {
						setFeaturedPost(selectedPost);
					}
					setOtherPosts(remainingPosts);
				}
			})
			.catch((error) => {
				console.error('Error fetching blog data:', error);
			});
	}, []);

	return (
		<div className="max-w-6xl mx-auto px-4 py-12">
			<h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">Featured Post</h2>

			{featuredPost && (
				<div
					className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 shadow-md hover:shadow-lg transition cursor-pointer mb-16"
					onClick={() => router.push(`/Blog/${featuredPost._id}`)}
				>
					<h3 className="text-2xl font-bold text-gray-900">{featuredPost.user_name}</h3>
					<p className="text-indigo-700 font-semibold text-lg mt-1">{featuredPost.title}</p>
					<p className="text-gray-700 mt-3 line-clamp-4">{featuredPost.content}</p>
					<Link href={`/Blog/${featuredPost._id}`} className="inline-block mt-4 text-pink-600 font-semibold hover:underline">
						Read More
					</Link>
				</div>
			)}

			<h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">More Posts</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
				{otherPosts.map((post, index) => (
					post.isApproved && (
						<div
							key={index}
							className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl border border-gray-200 transition cursor-pointer"
							onClick={() => router.push(`/Blog/${post._id}`)}
						>
							<h3 className="text-xl font-bold text-gray-900">{post.user_name}</h3>
							<p className="text-indigo-600 font-medium mt-1">{post.title}</p>
							<p className="text-gray-700 mt-2 line-clamp-3">{post.content}</p>
							<Link href={`/Blog/${post._id}`} className="inline-block mt-3 text-pink-600 font-semibold hover:underline">
								Read More
							</Link>
						</div>
					)
				))}
			</div>

			<div className="fixed bottom-8 right-8 z-50">
				<Link
					href="/Blog/createBlog"
					className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 rounded-full shadow-lg hover:shadow-amber-400 transition"
				>
					<Pen className="text-white" />
				</Link>
			</div>
		</div>
	);
}

export default page;
