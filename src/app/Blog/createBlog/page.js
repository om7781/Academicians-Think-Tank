"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();
  const [blogdata, setblogdata] = useState({});

  const uploadBlog = async (e) => {
    e.preventDefault();
    setisLoading(true);
    try {
      await axios.post("/api/users/uploadBlog", blogdata);
      toast.info("Blog will be uploaded once the Admins approve it!", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
      });
      setTimeout(() => {
        router.push("/Blog");
      }, 3500);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  const getUserInfo = async () => {
    const res = await axios.get("/api/users/user-info");
    const { data } = res;
    setblogdata({
      user_id: data._id,
      username: data.userName,
      upload_date: new Date(),
      title: "",
      content: "",
      likesCount: [],
      comments: [],
      reports: [],
      category: "",
    });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 py-10 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8 sm:p-10">
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-8">
          Upload a New Blog
        </h2>
        <form onSubmit={uploadBlog} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Blog Title</label>
            <input
              onChange={(e) =>
                setblogdata({ ...blogdata, title: e.target.value })
              }
              type="text"
              name="title"
              placeholder="Enter your blog title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Blog Content</label>
            <textarea
              onChange={(e) =>
                setblogdata({ ...blogdata, content: e.target.value })
              }
              name="content"
              placeholder="Write your blog content..."
              rows="6"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Select Category</label>
            <select
              onChange={(e) =>
                setblogdata({ ...blogdata, category: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            >
              <option value="">-- Select a Category --</option>
              <option value="Economics">Economics</option>
              <option value="Public Policies">Public Policies</option>
              <option value="International Trades">International Trades</option>
              <option value="International Relations">International Relations</option>
              <option value="Law">Law</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 font-semibold text-white rounded-lg transition ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isLoading ? "Uploading..." : "Upload Blog"}
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Page;
