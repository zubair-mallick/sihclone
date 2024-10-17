"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Card from "@/components/ui/Card";
import img from "/public/assets/Boyoboy.png";
import Image from "next/image";

const Education = () => {
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out", // Optional: smoother animation
    });
  }, []);

  return (
    <div id="education" className="py-12 section to-gray-900">
      <div className="container p-8 mx-auto text-center border border-gray-600 rounded-lg shadow-lg">
        {/* Add AOS animation for the image */}
        <div className="opacity-70">
          <Image
            src={img}
            alt="Boy"
            className="absolute top"
            data-aos="fade-left"
            data-aos-duration="700"
            data-aos-easing="ease-in-out"
            data-aos-anchor-placement="top-bottom"
          />
        </div>
        <h1
          className="mb-6 text-4xl font-bold text-transparent title bg-clip-text bg-gradient-to-r from-blue-300 to-purple-900"
          data-aos="fade-left"
        >
          Education and Career Guidance
        </h1>
        <p
          className="max-w-3xl mx-auto mb-8 text-lg text-gray-300"
          data-aos="fade-left"
        >
          Welcome to the Education section, where we provide comprehensive
          guidance to help you navigate your educational journey. Whether
          you&apos;re seeking to explore career paths or refine your academic
          focus, our tools are designed to support you in making informed
          decisions.
        </p>
        <div className="gap-6 px-8 md:flex md:justify-evenly">
          <div
            className="p-6 transition-shadow duration-300 rounded-lg shadow-md hover:shadow-xl"
            data-aos="fade-right"
          >
            <Card
              title={"AI Career Suggestor:"}
              desc={`Discover potential career paths tailored to your interests and
              existing knowledge. Input your details to receive personalized
              career suggestions that align with your aspirations.`}
              link={"/education"}
            />
          </div>
          <div
            className="p-6 transition-shadow duration-300 rounded-lg shadow-md hover:shadow-xl"
            data-aos="fade-left"
          >
            <Card
              title={"Educational Roadmap Maker"}
              desc={`A tool to assist you in planning your educational journey. It will
              help you map out your academic goals and strategies based on your
              career objectives and interests.`}
              link={"/education"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
