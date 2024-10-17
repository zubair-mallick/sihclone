"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

const Chatbot = () => {
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div
      id="career-counseling"
      className="container relative p-8 mx-auto mb-10 text-center border border-gray-600 rounded-lg shadow-lg section"
    >
      {/* Image aligned to the right */}

      <h2
        className="mb-6 text-4xl font-bold text-transparent title bg-clip-text bg-gradient-to-r from-blue-300 to-purple-900"
        data-aos="fade-left"
      >
        Career Counseling Chatbot
      </h2>
      <p
        className="max-w-3xl mx-auto mb-8 text-lg text-gray-300"
        data-aos="fade-left"
      >
        Our Career Counseling Chatbot is here to guide you through your career
        journey, offering expert advice and answers to your questions. It
        provides a safe, anonymous environment where you can explore your career
        options, receive personalized guidance, and access valuable resources
        tailored to your needs.
      </p>

      <Link
        className="mx-auto max-w-56 gradient-btn"
        href={"/chatbot"}
        data-aos="fade-left"
      >
        Try the Chatbot
      </Link>
    </div>
  );
};

export default Chatbot;
