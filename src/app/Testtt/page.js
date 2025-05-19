"use client";
import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function TestSlider() {
  const teamMembers = [
    {
      name: "Alice Johnson",
      role: "Frontend Developer",
      image: "https://i.pravatar.cc/150?img=1",
    },
    {
      name: "Bob Smith",
      role: "Backend Developer",
      image: "https://i.pravatar.cc/150?img=2",
    },
    {
      name: "Clara Lee",
      role: "UI/UX Designer",
      image: "https://i.pravatar.cc/150?img=3",
    },
    {
      name: "David Patel",
      role: "DevOps Engineer",
      image: "https://i.pravatar.cc/150?img=4",
    },
    {
      name: "Eva Wilson",
      role: "Project Manager",
      image: "https://i.pravatar.cc/150?img=5",
    },
  ];

  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % teamMembers.length);
    }, 2000);
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
      return "z-20 scale-90 blur-sm -translate-x-48 opacity-60";
    case "right":
      return "z-20 scale-90 blur-sm translate-x-48 opacity-60";
    default:
      return "opacity-0 pointer-events-none";
  }
};


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Our Team</h1>

      <div className="relative w-full max-w-5xl">
        {/* Slider cards */}
        <div
          className="relative flex justify-center items-center h-80"
          onMouseEnter={pauseTimer}
          onMouseLeave={resumeTimer}
        >
          {teamMembers.map((member, index) => {
            const position = getCardPosition(index);
            return (
              <div
                key={index}
                className={`absolute transition-transform transition-opacity duration-700 ease-in-out transform ${getCardStyle(
                  position
                )}`}
              >
                <div className="bg-white rounded-2xl shadow-lg p-6 w-64 text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
                  />
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow hover:bg-gray-100 z-40"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={next}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow hover:bg-gray-100 z-40"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}
