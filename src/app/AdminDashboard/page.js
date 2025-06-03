"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";


const page = () => {
  const [blogs, setblogs] = useState([]);
  const [users, setusers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const router = useRouter()

  const getBlogs = async () => {
    const response = await axios.get("/api/users/getBlog");
    console.log(response.data);
    setblogs(response.data);
  };

  const getUsers = async () => {
    const users = await axios.get("/api/admin/user-list");
    const response = users.data;
    setusers(response.users);
  };

  const deleteBlog = async (id) => {
    const response = await axios.post("/api/admin/deleteBlog", { _id: id });
    console.log(response);
    getBlogs();
  };

  const confirmDelete = async () => {
  await deleteBlog(selectedBlogId)
  setShowModal(false)
}

  const approveBlog = async (id) => {
    const response = await axios.patch("/api/admin/approveBlog", { _id: id });
    console.log(response);
    getBlogs();
  };

  useEffect(() => {
    getBlogs();
  }, []);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <h1 className="my-10 text-5xl font-extrabold text-center">
        <span className="px-6 py-2 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 rounded-full">
          Admin Dashboard
        </span>
      </h1>
      <section className="px-4 md:px-16 lg:px-32 py-10">
        <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Blogs Awaiting Approval ({blogs.filter((b) => !b.isApproved).length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((blog, i) =>
            !blog.isApproved ? (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
              >
                <h4 className="text-xl font-semibold text-indigo-600 mb-2">
                  {blog.title}
                </h4>
                <p className="text-gray-700 line-clamp-3">{blog.content}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(blog.upload_date).toLocaleDateString()}
                </p>
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={() => approveBlog(blog._id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      setSelectedBlogId(blog._id);
                      setShowModal(true);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : null
          )}
        </div>
      </section>

      <section className="px-4 md:px-16 lg:px-32 py-10">
        <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Approved Blogs ({blogs.filter((b) => b.isApproved).length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((blog, i) =>
            blog.isApproved ? (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
              >
                <h4 className="text-xl font-semibold text-indigo-600 mb-2">
                  {blog.title}
                </h4>
                <p className="text-gray-700 line-clamp-3">{blog.content}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(blog.upload_date).toLocaleDateString()}
                </p>
                <button
                  onClick={() => {
                    setSelectedBlogId(blog._id);
                    setShowModal(true);
                  }}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
                <button onClick={()=>{
                  router.push(`/AdminDashboard/${blog._id}`)
                }} className="mt-4 ml-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Reports({blog.reports.length})</button>
              </div>
            ) : null
          )}
        </div>
      </section>

      <section className="px-4 md:px-16 lg:px-32 py-10">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Users List
        </h3>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {users.map((user, i) => (
              <li key={i}>{user.userName}</li>
            ))}
          </ul>
          <button
            onClick={getUsers}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Refresh Users
          </button>
        </div>
      </section>
      {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Confirm Delete</h2>
      <p className="text-gray-600 mb-6">Are you sure you want to delete this blog?</p>
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          No
        </button>
        <button
          onClick={confirmDelete}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Yes
        </button>
      </div>
    </div>
  </div>
)}
    </>
  );
};

export default page;
