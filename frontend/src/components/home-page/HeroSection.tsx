"use client";

import { useRef } from "react";
import { ScrollParallax } from "react-just-parallax";
import HeroImage from "/public/assets/hero.png";
import Image from "next/image";
const HeroSection = () => {
  const parallaxRef = useRef(null);

  return (
    <section className="relative h-screen overflow-hidden text-white bg-black">
      <ScrollParallax isAbsolutelyPositioned>
        <div className="absolute inset-0 bg-black opacity-60">
          <Image
            src={HeroImage}
            alt="Hero Image"
            ref={parallaxRef}
            className="absolute inset-0 z-50 object-cover w-full h-full"
          />
        </div>
      </ScrollParallax>
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black to-transparent"></div>
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black to-transparent"></div>

      <div className="relative z-10 flex items-center justify-center h-full px-4 text-center md:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="mb-6 text-4xl font-bold md:text-6xl">
            Empower Hub: Igniting Potential, Shaping Futures
          </h1>
          <p className="max-w-xl mx-auto mb-8 text-lg md:text-xl">
            Discover Empower Hub—where innovation meets collaboration. Our
            platform drives progress and opens new doors, helping you achieve
            your goals with transformative solutions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
