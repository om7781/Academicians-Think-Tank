"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Page = () => {
  const [blogs, setblogs] = useState([]);
  const [users, setusers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [links, setlinks] = useState("");
  const router = useRouter();

  const getBlogs = async () => {
    const response = await axios.get("/api/users/getBlog");
    setblogs(response.data);
  };

  const updateLink = async () => {
    const response = await axios.post('/api/admin/uploadLink', { links });
    if (response.data.success) {
      toast.success("Link Updated!", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
      });
    }
  };

  const getUsers = async () => {
    const res = await axios.get("/api/admin/user-list");
    setusers(res.data.users);
  };

  const deleteBlog = async (id) => {
    await axios.post("/api/admin/deleteBlog", { _id: id });
    getBlogs();
  };

  const confirmDelete = async () => {
    await deleteBlog(selectedBlogId);
    setShowModal(false);
  };

  const approveBlog = async (id) => {
    await axios.patch("/api/admin/approveBlog", { _id: id });
    getBlogs();
  };

  useEffect(() => {
    getBlogs();
    getUsers();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 pb-10">
      <ToastContainer />
      <div className="container mx-auto px-4 md:px-8 py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
          <span className="inline-block bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 px-6 py-2 rounded-full">
            Admin Dashboard
          </span>
        </h1>

        {/* Blogs Awaiting Approval */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
            Blogs Awaiting Approval ({blogs.filter((b) => !b.isApproved).length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog, i) =>
              !blog.isApproved ? (
                <div key={i} className="bg-white rounded-xl shadow p-6">
                  <h4 className="text-xl font-semibold text-indigo-600 mb-2">{blog.title}</h4>
                  <p className="text-gray-700 line-clamp-3">{blog.content}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(blog.upload_date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">{blog.username}</p>
                  <div className="flex gap-3 mt-4 flex-wrap">
                    <button
                      onClick={() => approveBlog(blog._id)}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        setSelectedBlogId(blog._id);
                        setShowModal(true);
                      }}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </section>

        {/* Approved Blogs */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
            Approved Blogs ({blogs.filter((b) => b.isApproved).length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog, i) =>
              blog.isApproved ? (
                <div key={i} className="bg-white rounded-xl shadow p-6">
                  <h4 className="text-xl font-semibold text-indigo-600 mb-2">{blog.title}</h4>
                  <p className="text-gray-700 line-clamp-3">{blog.content}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(blog.upload_date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">{blog.username}</p>
                  <div className="flex gap-3 mt-4 flex-wrap">
                    <button
                      onClick={() => {
                        setSelectedBlogId(blog._id);
                        setShowModal(true);
                      }}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => router.push(`/AdminDashboard/${blog._id}`)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Reports ({blog.reports.length})
                    </button>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </section>

        {/* Link Uploader */}
        <section className="mb-10">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
              value={links}
              onChange={(e) => setlinks(e.target.value)}
              placeholder="Enter link..."
              className="flex-1 border border-gray-300 px-4 py-2 rounded-md w-full"
            />
            <button
              onClick={updateLink}
              className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 w-full sm:w-auto"
            >
              Update Link
            </button>
          </div>
        </section>

        {/* Users List */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
            Users List
          </h2>
          <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {users.map((user, i) => (
                <li key={i}>{user.userName}</li>
              ))}
            </ul>
            <button
              onClick={getUsers}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Refresh Users
            </button>
          </div>
        </section>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
              <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this blog?</p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  No
                </button>
                <button
                  onClick={confirmDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Page;
