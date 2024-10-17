"use client";

import { useState } from "react";
import CareerGuidance from "@/components/counseling/CareerGuidance";
import ResourceFinder from "@/components/counseling/ResourceFinder";

const Page = () => {
  const [selectedTool, setSelectedTool] = useState("careerGuidance");

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTool(e.target.value);
  };

  return (
    <main className="max-w-6xl mx-3 md:mx-auto section">
      {/* Heading and description */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold">Councelling Tools</h1>
        <p className="mt-4 text-lg text-gray-400">
          Explore our Councelling Tools designed to give u resource and alert
          you about available exams and scholarships you through your learning
          journey, tools include Career Guidance and Resource Finder.
        </p>

        {/* Dropdown Selector */}
        <div className="mt-6">
          <label htmlFor="toolSelector" className="mr-4 text-lg font-semibold">
            Select a tool:
          </label>
          <select
            id="toolSelector"
            value={selectedTool}
            onChange={handleSelectChange}
            className="p-2 text-white transition-all duration-300 rounded-lg outline-none bg-gradient-to-r from-purple-500 to-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <option
              value="careerGuidance"
              className="text-white bg-gray-800 hover:bg-gray-700"
            >
              Career Guidance
            </option>
            <option
              value="resourceFinder"
              className="text-white bg-gray-800 hover:bg-gray-700"
            >
              Resource Finder
            </option>
          </select>
        </div>
      </header>

      {/* Render selected component based on dropdown value */}
      <div>
        {selectedTool === "careerGuidance" && <CareerGuidance />}
        {selectedTool === "resourceFinder" && <ResourceFinder />}
      </div>
    </main>
  );
};

export default Page;

