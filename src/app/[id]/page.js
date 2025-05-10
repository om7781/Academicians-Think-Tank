"use client";
import axios from "axios";
import { MessageCircle, Send, SendIcon, ThumbsUpIcon } from "lucide-react";
import React, { use, useEffect, useState } from "react";
import { ThumbsUp } from "lucide-react";
import Link from "next/link";
import { NextResponse } from "next/server";


const page = ({ params }) => {
  const [commentData, setcommentdata] = useState("");
  const [isLiked, setisLiked] = useState(false);
  const [commentbox, setCommentbox] = useState(false);
  const [comment, setComment] = useState([]);
  const { id } = use(params);
  const [blog, setBlog] = useState([]);
  const [isLogged, setisLogged] = useState(false)

  const getData = async () => {
    const response = await axios("http://localhost:3003/api/" + id);
    const { data } = response;
    setBlog(data);
    console.log(blog);
  };

  useEffect(() => {
    getData();
  }, []);

  const like = () => {
    const changedValue = !isLiked;
    setisLiked(changedValue);
    console.log(isLiked);
  };

  const displayComments = async () => {
    try {
    const response = await axios.post('/api/users-comment/comment',{commentData : commentData})
    console.log(response)
      
    } catch (error) {
      return NextResponse.json({error:error.message})
    }

  };

  const displayCommentBox = () => {
    setCommentbox(!commentbox);
  };


  const updateComments = async() => {
    const data = axios.get('')
  }

  const checkAuth = async () => {
    const response = await axios.get('/api/users/check-auth')
    if(response.data.authenticated){
      setisLogged(true)
    } else {
      setisLogged(false)
    }
  }

  useEffect(() => {
    checkAuth()
  },[])

  
  return (
    <>
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/Blog"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-6 inline-block transition"
          >
            ← Back to Blog
          </Link>

          <article className="bg-white p-8 rounded-2xl shadow-lg">
            <header className="mb-6">
              <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight text-center">
                {blog.title}
              </h1>
              <div className="text-gray-500 flex items-center gap-2 text-xl">
                <span
                  className="text-lg font-black"
                  dateTime={blog.upload_date}
                >
                  {blog.upload_date}
                </span>
                <span className="mx-1">•</span>
                <span className=" font-bold">{blog.user_name}</span>
              </div>
            </header>
            <hr className="mb-10"></hr>
            <div className="prose max-w-none text-gray-800 leading-relaxed">
              {blog.content}
            </div>

            {blog.user_name && (
              <div className="mt-10 pt-6 border-t border-gray-200">
                <div className="flex items-center">
                  <img
                    alt={blog.author}
                    className="h-12 w-12 rounded-full bg-gray-200 object-cover"
                    src={blog.author_image || "/default-avatar.png"}
                  />
                  <div className="ml-4">
                    <p className="text-sm font-semibold text-gray-900">
                      {blog.user_name}
                    </p>
                    <p className="text-sm text-gray-500">Author</p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex gap-4">
              <button
                onClick={like}
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition"
              >
                {isLiked ? (
                  <ThumbsUpIcon className="w-5 h-5 fill-current" />
                ) : (
                  <ThumbsUp className="w-5 h-5" />
                )}
                {isLiked ? "Liked" : "Like"}
              </button>
              <button
                onClick={displayCommentBox}
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition"
              >
                <MessageCircle className="w-5 h-5" />
                Comment
              </button>
            </div>
            {commentbox ? (
              <div className="bg-slate-100 my-6 p-6 rounded-xl shadow-md">
                <div className="mb-4 max-h-48 overflow-y-auto">
                  <ul className="space-y-2 text-gray-800 text-sm">
                    {comment.map((e, i) =>
                      e == "" ? (
                        console.log("Empty string")
                      ) : (
                        <li
                          key={i}
                          className="bg-white px-4 py-2 rounded-lg shadow-sm"
                        >
                          {e}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {isLogged ? <div className="flex items-center gap-2">
                  <input
                    className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-sm"
                    type="text"
                    placeholder="Write a comment..."
                    onChange={(e) => setcommentdata(e.currentTarget.value)}
                  />
                  <button
                    onClick={displayComments}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div> : "Please Log in Or Signup To comment on this Post."}
              </div>
            ) : (
              ""
            )}
          </article>
        </div>
      </div>

    </>
  );
};

export default page;
