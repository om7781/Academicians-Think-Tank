"use client";
import axios from "axios";
import { MessageCircle, Send, ThumbsUp, TriangleAlert } from "lucide-react";
import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";


const page = ({ params }) => {
  const [commentData, setcommentdata] = useState({
    blogid: "",
    username: "",
    content: "",
    timestamp: Date.now()
  });
  const [count, setcount] = useState(0)
  const [isLiked, setisLiked] = useState(false);
  const [commentbox, setCommentbox] = useState(false);
  const [comment, setComment] = useState([]);
  const { _id } = use(params);
  const [blog, setBlog] = useState([]);
  const [isLogged, setisLogged] = useState(false);
  const [userdata, setuserdata] = useState({})
  const [reportbox,setreportBox] = useState(false)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  const getData = async () => {
    const response = await axios("/api/users/getBlog/" + _id);
    const { data } = response;
    setBlog(data);
    setcount(data.likesCount.length)
    return data;
  }


  useEffect(() => {
    getData();
  }, []);
    
  const updateLike = (blogData, userName) => {
  if (blogData.likesCount.includes(userName)) {
    setisLiked(true);
  } else {
    setisLiked(false);
  }
};

  const like = async () => {
  try {
    if (isLogged) {
      const userid = await axios.get('/api/users/user-info');
      const { userName } = userid.data;
      const { _id } = await params;

      const blogdata = await axios.post('/api/users/like', { username: userName, _id });
      const { count } = blogdata.data;
      setcount(count)
      setisLiked(true); 
    } else {
      toast.error("Please Log in to Like the post!", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

  const getuserInfo = async () => {
    const res = await axios.get('/api/users/user-info');
    const { data } = res;
    const { _id } = await params;
    setcommentdata({ ...commentData, username: data.userName, blogid: _id });
    setuserdata({...userdata, username:data.userName, blogid:_id})
    return data.userName;
  };

  useEffect(() => {
  const fetchDataAndUpdateLike = async () => {
    const userName = await getuserInfo();
    const blogData = await getData();
    updateLike(blogData, userName);
  };
  fetchDataAndUpdateLike();
}, []);


  const uploadComment = async () => {
    const res = await axios.patch('/api/users-comment/comment', commentData);
    setcommentdata({...commentData,content:""})
    await getComment()
  };

  const uploadreport = async () =>{
    console.log(userdata)
    const response = await axios.post('/api/users/reportBlogs',userdata)
    console.log(response)
  }

  const getComment = async () => {
    const { _id } = await params;
    const res = await axios.post('/api/users-comment/getComment', { _id });
    setComment(res.data);
    console.log(comment);
  };


  useEffect(() => {
     getComment();
  }, []);


  const displayCommentBox = () => {
    setCommentbox(true)
    setreportBox(false)
  };

  const displayreport = () => {
    setreportBox(true)
    setCommentbox(false)

  }

  const checkAuth = async () => {
    const response = await axios.get('/api/users/check-auth');
    if (response.data.authenticated) {
      setisLogged(true);
    } else {
      setisLogged(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/Blog"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-6 inline-block transition"
          >
            ← Back to Blog
          </Link>

          <article className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
            <header className="mb-6">
              <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 leading-tight text-center">
                {blog.title}
              </h1>
              <div className="text-gray-500 flex flex-wrap items-center justify-center gap-2 text-base sm:text-xl">
                <span
                  className="text-sm sm:text-lg font-black"
                  dateTime={blog.upload_date}
                >
                  {formatDate(blog.upload_date)}
                </span>
                <span className="mx-1">•</span>
                <span className="font-bold">{blog.username}</span>
              </div>
            </header>
            <hr className="mb-10"></hr>
            <div className="prose prose-sm sm:prose-base max-w-none text-gray-800 leading-relaxed">
              {blog.content}
            </div>

            {blog.username && (
              <div className="mt-10 pt-6 border-t border-gray-200">
                <div className="flex items-center">
                  <img
                    alt={blog.author}
                    className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gray-200 object-cover"
                    src={blog.author_image || "/default-avatar.png"}
                  />
                  <div className="ml-3 sm:ml-4">
                    <p className="text-sm font-semibold text-gray-900">
                      {blog.username}
                    </p>
                    <p className="text-sm text-gray-500">Author</p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <ToastContainer/>
              <button
                onClick={like}
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition"
              >
                {isLiked ? (
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-5 h-5 fill-current" />
                    <span>{count}</span>
                  </div>
                ) : (
                  <>
                  <ThumbsUp className="w-5 h-5" />
                  <span>{count}</span>
                  </>
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
              <button
                onClick={displayreport}
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition"
              >
                <TriangleAlert />
                Report
              </button>
              
            </div>

            {commentbox && (
              <div className="bg-slate-100 my-6 p-4 sm:p-6 rounded-xl shadow-md">
                <div className="mb-4 max-h-48 overflow-y-auto">
                  <ul className="space-y-2 text-gray-800 text-sm flex flex-col-reverse">
                    {comment.length ==0 ? <li>No Comments yet, Be the First one to Comment!</li> : comment.map((e, i) => {
                      return (
                      <li key={i}>
                        <p><span className="font-semibold">User:</span> {e.username}</p>
                        <p><span className="font-semibold">Content:</span> {e.comment}</p>
                        <p><span className="font-semibold">Time:</span> {formatDate(e.timestamp)}</p>
                      </li>
                    )})}       
                  </ul>
                </div>

                {isLogged ? (
                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <input
                      className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-sm w-full"
                      type="text"
                      placeholder="Write a comment..."
                      value={commentData.content}
                      onChange={(e) =>
                        setcommentdata({ ...commentData, content: e.currentTarget.value })
                      }
                    />
                    <button
                      onClick={uploadComment}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition w-full sm:w-auto"
                    >
                      <Send className="w-5 h-5 mx-auto" />
                    </button>
                    
                  </div>
                  
                  
                ) : (
                  <p className="text-sm text-gray-600">Please log in or sign up to comment on this post.</p>
                )}
              </div>
            )}
            {reportbox && (
              <div className="bg-slate-100 my-6 p-4 sm:p-6 rounded-xl shadow-md">
                {isLogged ? (
                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <input
                      className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-sm w-full"
                      type="text"
                      placeholder="Write a comment for report..."
                      value={userdata.comment}
                      onChange={(e) =>
                        setuserdata({ ...userdata, comment: e.currentTarget.value })
                      }
                    />
                    <button
                      onClick={uploadreport}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition w-full sm:w-auto"
                    >
                      <Send className="w-5 h-5 mx-auto" />
                    </button>
                    
                  </div>
                  
                  
                ) : (
                  <p className="text-sm text-gray-600">Please log in or sign up to Report this post.</p>
                )}
              </div>
            )}
          </article>
        </div>
      </div>
    </>
  );
};

export default page;
