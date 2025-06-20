"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Teams = () => {
  const teamMembers = [
    {
      name: "Ashok Jogdand",
      role: "UI Designer",
      image:
        "https://i.ibb.co/GvwDDjx7/Whats-App-Image-2024-11-10-at-16-17-57-be61c449.jpg",
      job: "Ashok Jogdand is an Economics graduate from Fergusson College, Pune. With a passion for Central Banking, Geoeconomics, and public policy, he mentors first-generation learners and contributes to grassroots education initiatives & aiming to bridge academic knowledge with social impact.",
    },
    {
      name: "Lokesh Marghade",
      role: "CTO",
      image:
        "https://i.ibb.co/gLMvGGgH/Whats-App-Image-2025-06-05-at-20-33-45-70008cbb.jpg",
      job: "Lokesh Marghade has completed his BA in Economics from Fergusson College in 2025. His major interests lie in public policy, public finance, development economics, and psychology.",
    },
    {
      name: "Dinesh Pariskar",
      role: "Founder",
      image: "https://i.pravatar.cc/150?img=3",
      job: "Dinesh Pariskar holds a BA in Economics from Fergusson College and an MSc in International Business Economics and Finance from Gokhale Institute of Politics and Economics, Pune. He is deeply interested in international trade, finance, development economics, literature and public economics.",
    },
    {
      name: "Onkar Kedar",
      role: "DevOps",
      image:
        "https://i.ibb.co/0p8kpj13/Whats-App-Image-2025-06-05-at-20-12-25-df20e418.jpg",
      job: "Onkar Kedar, is an economics enthusiast who is passed BA economics from Fergusson College in 2025. His major interest is in Macroeconomics, international trade and policy-making.",
    },
  ];

  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % teamMembers.length);
    }, 2000);
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const handlePrev = () => {
    pauseTimer();
    setCurrent((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
    setTimeout(startTimer, 1500);
  };

  const handleNext = () => {
    pauseTimer();
    setCurrent((prev) => (prev + 1) % teamMembers.length);
    setTimeout(startTimer, 1500);
  };

  useEffect(() => {
    startTimer();
    return pauseTimer;
  }, []);

  const getCardPosition = (index) => {
    const total = teamMembers.length;
    const prevIndex = (current - 1 + total) % total;
    const nextIndex = (current + 1) % total;

    if (index === current) return "center";
    if (index === prevIndex) return "left";
    if (index === nextIndex) return "right";
    return "hidden";
  };

  const getCardStyle = (position) => {
    switch (position) {
      case "center":
        return "z-30 scale-105 blur-0 opacity-100";
      case "left":
        return "z-20 scale-95 blur-sm -translate-x-36 opacity-80";
      case "right":
        return "z-20 scale-95 blur-sm translate-x-36 opacity-80";

      default:
        return "opacity-0 pointer-events-none";
    }
  };

  return (
    <section className="text-gray-600 body-font min-h-screen flex flex-col items-center justify-center px-5 py-24 bg-gray-50">
      <div className="flex flex-col text-center w-full max-w-4xl mb-12">
        <h1 className="sm:text-3xl text-2xl font-semibold title-font mb-4 text-gray-900">
          Meet Our Team
        </h1>
        <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-600">
          A passionate group of individuals committed to making an impact.
        </p>
      </div>

      <div
        className="mt-10 relative w-full max-w-6xl"
        onMouseEnter={pauseTimer}
        onMouseLeave={startTimer}
        onTouchStart={pauseTimer}
        onTouchEnd={startTimer}
        onTouchCancel={startTimer}
      >
        <div className="relative flex justify-center items-center h-[30rem] sm:h-[32rem] md:h-[28rem] lg:h-[26rem]">
          {teamMembers.map((member, index) => {
            const position = getCardPosition(index);
            return (
              <div
                key={index}
                className={`absolute transition-all duration-700 ease-in-out transform ${getCardStyle(
                  position
                )}`}
              >
                <div className="flex flex-col items-center text-center bg-white px-6 py-8 rounded-3xl shadow-xl w-[90vw] sm:w-[28rem] md:w-[24rem] h-[26rem] border border-gray-200">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover object-center border-4 border-indigo-500 shadow-md mb-4"
                  />
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                    {member.name}
                  </h2>
                  <span className="text-xs sm:text-sm text-white bg-indigo-500 px-3 py-1 rounded-full mt-1 mb-4">
                    {member.role}
                  </span>
                  <div className="text-gray-700 text-xs sm:text-sm bg-gray-50 px-4 py-3 rounded-xl max-h-40 overflow-y-auto w-full shadow-inner border border-gray-100 scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent">
                    {member.job}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow hover:bg-gray-100 z-40"
          aria-label="Previous"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow hover:bg-gray-100 z-40"
          aria-label="Next"
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
};

export default Teams;
