"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Teams = () => {
  const teamMembers = [
  {
    name: "Holden Caulfield",
    role: "UI Designer",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Henry Letham",
    role: "CTO",
    image: "https://i.pravatar.cc/150?img=2",
  },
  {
    name: "Oskar Blinde",
    role: "Founder",
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    name: "John Doe",
    role: "DevOps",
    image: "https://i.pravatar.cc/150?img=4",
  },
  {
    name: "Martin Eden",
    role: "Software Engineer",
    image: "https://i.pravatar.cc/150?img=5",
  },
  {
    name: "Boris Kitua",
    role: "UX Researcher",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Atticus Finch",
    role: "QA Engineer",
    image: "https://i.pravatar.cc/150?img=2",
  },
  {
    name: "Alper Kamu",
    role: "System",
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    name: "Rodrigo Monchi",
    role: "Product Manager",
    image: "https://i.pravatar.cc/150?img=4",
  },
];


  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % teamMembers.length);
    }, 3000);
  };

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetTimer = () => {
    clearTimer();
    startTimer();
  };

  const pauseTimer = () => clearTimer();
  const resumeTimer = () => startTimer();

  useEffect(() => {
    startTimer();
    return () => clearTimer();
  }, []);

  const prev = () => {
    setCurrent((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
    resetTimer();
  };

  const next = () => {
    setCurrent((prev) => (prev + 1) % teamMembers.length);
    resetTimer();
  };

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
        return "z-30 scale-110 blur-0 opacity-100";
      case "left":
        return "z-20 scale-90 blur-[2px] -translate-x-48 opacity-60";
      case "right":
        return "z-20 scale-90 blur-[2px] translate-x-48 opacity-60";
      default:
        return "opacity-0 pointer-events-none";
    }
  };

  return (
    <section className="text-gray-600 body-font min-h-screen flex flex-col items-center justify-center px-5 py-24 bg-gray-50">
      <div className="flex flex-col text-center w-full max-w-4xl mb-12">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
          Our Team
        </h1>
        <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-600">
          Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table.
          Franzen you probably haven't heard of them.
        </p>
      </div>

      <div
        className="relative w-full max-w-5xl"
        onMouseEnter={pauseTimer}
        onMouseLeave={resumeTimer}
      >
        <div className="relative flex justify-center items-center h-50">
          {teamMembers.map((member, index) => {
            const position = getCardPosition(index);
            return (
              <div
                key={index}
                className={`absolute transition-transform transition-opacity duration-700 ease-in-out transform ${getCardStyle(
                  position
                )}`}
              >
                <div className="flex items-center border-gray-200 border p-6 rounded-2xl bg-white shadow-lg w-72 h-36">
                  <img
                    alt={member.name}
                    className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-6"
                    src={member.image}
                  />
                  <div className="flex-grow">
                    <h2 className="text-gray-900 title-font font-medium">
                      {member.name}
                    </h2>
                    <p className="text-gray-500">{member.role}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={prev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow hover:bg-gray-100 z-40"
          aria-label="Previous"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={next}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow hover:bg-gray-100 z-40"
          aria-label="Next"
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
};

export default Teams;
