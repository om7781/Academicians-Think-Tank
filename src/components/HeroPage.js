"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const HeroPage = () => {
  const [link, setlink] = useState("");

  const getlink = async () => {
    const response = await axios.get("/api/users/getFormLink");
    const data = response.data;

    // If there's at least one link in the array
    if (data.response && data.response.length > 0) {
      setlink(data.response[0].link);
    }
  };

  useEffect(() => {
    getlink();
  }, []);

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <img
            className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
            alt="hero"
            src="/Images/mainImage.jpg"
          />
          <div className="text-center lg:w-2/3 w-full">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Academicians Think Tank
            </h1>
            <p className="mb-8 leading-relaxed">
              We are a platform dedicated to sharing knowledge and fostering
              opportunities across the internet. Focused on fields like
              economics, law, and political science, we help students develop
              skills, build networks, and access valuable resources. Whether
              it’s career guidance, academic insights, or professional
              connections, we aim to bridge the gap between learning and
              real-world opportunities.
            </p>
            <div className="flex justify-center">
              <Link
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Join
              </Link>
              <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroPage;
