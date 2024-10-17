"use client";

import { useState, ChangeEvent } from "react";
import AiCareerSuggestor from "@/components/education/AiCareerSuggestor";
import EducationalRoadmapMaker from "@/components/education/EducationalRoadmapMaker";

const Page = () => {
  const [selectedTool, setSelectedTool] = useState("career");

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedTool(e.target.value);
  };

  return (
    <main className="container mx-auto section">
      {/* Heading and description */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold ">Education Section</h1>
        <p className="mt-4 text-lg max-w-xl mx-auto text-gray-400">
          The Education section offers two tools to help you navigate and plan
          your journey: the AI Career Suggestor and the Educational Roadmap
          Maker.
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
              value="career"
              className="text-white bg-gray-800 hover:bg-gray-700"
            >
              AI Career Suggestor
            </option>
            <option
              value="roadmap"
              className="text-white bg-gray-800 hover:bg-gray-700"
            >
              Ai Roadmap Maker
            </option>
          </select>
        </div>
      </header>

      {/* Render selected component based on dropdown value */}
      <div>
        {selectedTool === "career" && <AiCareerSuggestor />}
        {selectedTool === "roadmap" && <EducationalRoadmapMaker />}
      </div>
    </main>
  );
};

export default Page;
