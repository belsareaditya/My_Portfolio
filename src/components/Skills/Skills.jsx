// src/components/Skills/Tools.jsx
import React from "react";
import { SkillsInfo } from "../../constants";

const Tools = () => {
  // Get only the "Tools" category
  const toolsCategory = SkillsInfo.find(
    (category) => category.title.toLowerCase() === "tools"
  );

  if (!toolsCategory) return null; // In case "Tools" doesn't exist in SkillsInfo

  return (
    <section
      id="tools"
      className="py-24 px-[12vw] md:px-[7vw] lg:px-[20vw] font-sans bg-skills-gradient clip-path-custom"
    >
      {/* Section Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">TOOLS</h2>
        <div className="w-24 h-1 bg-[#8245ec] mx-auto mt-2"></div>
        <p className="text-gray-400 mt-4 text-lg font-semibold">
          A collection of tools I use to build, test, and deploy my projects
        </p>
      </div>

      {/* Tool Items */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
        {toolsCategory.skills.map((tool) => (
          <div
            key={tool.name}
            className="flex items-center justify-center space-x-2 border-2 border-gray-700 rounded-3xl py-3 px-3 
                       text-center transition-all duration-300 transform hover:scale-110 hover:shadow-[0_0_20px_2px_rgba(130,69,236,0.5)]"
          >
            <img
              src={tool.logo}
              alt={`${tool.name} logo`}
              className="w-6 h-6 sm:w-8 sm:h-8 transition-transform duration-300 group-hover:rotate-6"
            />
            <span className="text-xs sm:text-sm text-gray-300 font-medium">
              {tool.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Tools;
