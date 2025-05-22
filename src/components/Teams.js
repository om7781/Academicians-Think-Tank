"use client";
import React, { useEffect, useState } from "react";


const teamMembers = [
  { name: "Holden Caulfield", role: "UI Designer", img: "https://dummyimage.com/150x150" },
  { name: "Henry Letham", role: "CTO", img: "https://dummyimage.com/150x150" },
  { name: "Oskar Blinde", role: "Founder", img: "https://dummyimage.com/150x150" },
  { name: "John Doe", role: "DevOps", img: "https://dummyimage.com/150x150" },
  { name: "Martin Eden", role: "Software Engineer", img: "https://dummyimage.com/150x150" },
  { name: "Boris Kitua", role: "UX Researcher", img: "https://dummyimage.com/150x150" },
  { name: "Atticus Finch", role: "QA Engineer", img: "https://dummyimage.com/150x150" },
  { name: "Alper Kamu", role: "System", img: "https://dummyimage.com/150x150" },
  { name: "Rodrigo Monchi", role: "Product Manager", img: "https://dummyimage.com/150x150" },
];

const Teams = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  const member = teamMembers[currentIndex];

  return (
    <>
        <h1 className='mt-25 font-bold text-5xl text-center'>Our Team : </h1>
      <section className="text-gray-600 body-font min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-50">
        <div className="w-full max-w-xl p-8 bg-white rounded-3xl shadow-2xl border border-blue-100 animate__animated animate__fadeIn text-center transition-all duration-500">
          <img
            src={member.img}
            alt={member.name}
            className="w-32 h-32 object-cover rounded-full mx-auto shadow-lg border-4 border-blue-200 mb-6"
          />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{member.name}</h2>
          <p className="text-xl text-blue-600 font-medium">{member.role}</p>
        </div>
      </section>
    </>
  );
};

export default Teams;
