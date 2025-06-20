"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Pen } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Page = () => {
	const router = useRouter();
	const [Posts, setPosts] = useState([]);
	const [categorizedPosts, setCategorizedPosts] = useState({});

	const getblog = async () => {
		try {
			const response = await axios.get(`/api/users/getBlog`);
			setPosts(response.data);
		} catch (error) {
			console.error("Error fetching blogs:", error);
		}
	};

	const addcategory = () => {
		const grouped = {};
		Posts.forEach((post) => {
			if (post.isApproved) {
				if (!grouped[post.category]) {
					grouped[post.category] = [];
				}
				grouped[post.category].push(post);
			}
		});
		setCategorizedPosts(grouped);
	};

	useEffect(() => {
		getblog();
	}, []);

	useEffect(() => {
		if (Posts.length > 0) {
			addcategory();
		}
	}, [Posts]);

	return (
		<div className="max-w-6xl mx-auto px-4 py-12">
			<h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Blogs by Category</h2>

			{Object.keys(categorizedPosts).map((category, idx) => (
				<div key={idx} className="mb-10">
					<h2 className="text-2xl font-bold mb-4 capitalize text-indigo-700">{category} Posts</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
						{categorizedPosts[category].map((post) => (
							<div
								key={post._id}
								className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl border border-gray-200 transition cursor-pointer"
								onClick={() => router.push(`/Blog/${post._id}`)}
							>
								<h3 className="text-xl font-bold text-gray-900">{post.username}</h3>
								<p className="text-indigo-600 font-medium mt-1">{post.title}</p>
								<p className="text-gray-700 mt-2 line-clamp-3">{post.content}</p>
								<Link href={`/Blog/${post._id}`} className="inline-block mt-3 text-pink-600 font-semibold hover:underline">
									Read More
								</Link>
							</div>
						))}
					</div>
				</div>
			))}

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
};

export default Page;
