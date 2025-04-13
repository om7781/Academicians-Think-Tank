"use client";
import axios from "axios";
import { Link, MessageCircle, SendIcon, ThumbsUpIcon } from "lucide-react";
import React, { use, useEffect, useState } from "react";
import { ThumbsUp } from "lucide-react";

const page = ({ params }) => {
  const [commentInput, setcommentInput] = useState("");
  const [isLiked, setisLiked] = useState(false);
  const [comment, setComment] = useState([]);
  const { id } = use(params);
  const [blog, setBlog] = useState([]);
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

  const displayComments = () => {
    setComment([...comment, commentInput]);
    console.log(comment);
    setcommentInput("");
  };
  return (
    <>
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog">
            <a className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-6 inline-block transition">
              ← Back to Blog
            </a>
          </Link>

          <article className="bg-white p-8 rounded-2xl shadow-lg">
            <header className="mb-6">
              <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">
                {blog.title}
              </h1>
              <div className="text-gray-500 text-sm flex items-center gap-2">
                <time dateTime={blog.date}>{blog.date}</time>
                <span className="mx-1">•</span>
                <span>{blog.user_name}</span>
              </div>
            </header>

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
              <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition">
                <MessageCircle className="w-5 h-5" />
                Comment
              </button>
            </div>
            <div className="commentBox py-20 bg-slate-500 my-3 rounded flex justify-between row-auto">
              <div>
                <ul>
                  {comment.map((e, i) => {
                    return <li key={i}> {e} </li>;
                  })}
                </ul>
              </div>
              <div>
                <div className="flex justify-around">
                  <div className="w-full">
                    <input
                      className=" h-auto py-2 w-full  bg-amber-50 rounded"
                      value={commentInput}
                      onChange={(e) => {
                        setcommentInput(e.currentTarget.value);
                      }}
                    />
                  </div>
                  <button
                    onClick={displayComments}
                    className="py-2 px-3 bg-blue-400 rounded cursor-pointer"
                  >
                    <SendIcon />
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
};

export default page;
