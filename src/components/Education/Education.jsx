import React from "react";
import { education } from "../../constants"; // Import the education data

const FALLBACK_IMG = "https://via.placeholder.com/150?text=Logo";

const Education = () => {
  const eduArray = Array.isArray(education) ? education : [];

  return (
    <section
      id="education"
      className="py-24 px-[6vw] md:px-[7vw] lg:px-[10vw] font-sans bg-skills-gradient"
    >
      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white">EDUCATION</h2>
        <div className="w-32 h-1 bg-purple-500 mx-auto mt-4" />
        <p className="text-gray-400 mt-4 text-lg font-semibold">
          My education has been a journey of learning and development. Here are
          the details of my academic background
        </p>
      </div>

      {/* Cards Centered */}
      <div className="flex flex-wrap justify-center gap-8">
        {eduArray.length === 0 ? (
          <div className="text-center text-gray-300 p-8 bg-gray-900 rounded-2xl border border-white/10 min-w-[280px]">
            No education data found. Please export an <code>education</code> array
            from <code>../../constants</code>.
          </div>
        ) : (
          eduArray.map((edu, idx) => {
            const id = edu?.id ?? idx;
            const degree = edu?.degree ?? "Degree";
            const school = edu?.school ?? "School / University";
            const date = edu?.date ?? "Dates";
            const grade = edu?.grade ?? "Grade";
            const desc = edu?.desc ?? "";
            const img = edu?.img ?? FALLBACK_IMG;

            return (
              <div
                key={id}
                className="w-[280px] p-6 rounded-2xl shadow-2xl border border-white/10 
                           bg-gray-900 backdrop-blur-md transform transition-transform duration-300 hover:scale-105"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-14 bg-white rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={img}
                      alt={school}
                      onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold text-white">{degree}</h3>
                    <h4 className="text-sm text-gray-300">{school}</h4>
                    <p className="text-xs text-gray-500 mt-1">{date}</p>
                  </div>
                </div>

                <p className="mt-4 text-gray-400 font-bold">Grade: {grade}</p>
                <p className="mt-2 text-gray-400">{desc}</p>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default Education;
