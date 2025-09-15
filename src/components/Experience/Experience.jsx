import React, { useEffect, useRef } from "react";
import { experiences } from "../../constants"; // keep your data here

const Experience = () => {
  const expArray = Array.isArray(experiences) ? experiences : [];
  const containerRef = useRef(null);

  useEffect(() => {
    const observerOpts = { root: null, rootMargin: "0px", threshold: 0.12 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    }, observerOpts);

    const cards = containerRef.current?.querySelectorAll(".exp-card") ?? [];
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      className="py-24 px-[6vw] md:px-[7vw] lg:px-[10vw] font-sans bg-skills-gradient clip-path-custom-2"
    >
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white">EXPERIENCE</h2>
        <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded" />
        <p className="text-gray-400 mt-4 text-lg font-semibold max-w-2xl mx-auto">
          Roles I've taken and the impact delivered — concise, focused, and
          outcome-driven.
        </p>
      </div>

      {/* Container */}
      <div
        ref={containerRef}
        className="relative grid gap-8 lg:grid-cols-9 lg:items-start"
      >
        {expArray.length === 0 ? (
          <div className="min-w-[320px] bg-gray-900 border border-white/10 rounded-2xl p-6 text-gray-300">
            No experience data found. Please export an{" "}
            <code>experiences</code> array from <code>../../constants</code>.
          </div>
        ) : (
          expArray.map((experience, index) => {
            const id = experience?.id ?? index;
            const role = experience?.role ?? "Role";
            const company = experience?.company ?? "Company";
            const date = experience?.date ?? "Dates";
            const desc = experience?.desc ?? "";
            const img = experience?.img ?? "";
            const skills = Array.isArray(experience?.skills)
              ? experience.skills
              : [];

            const delayMs = index * 90;

            const baseWrapper =
              "exp-card col-span-9 flex-shrink-0 w-full p-6 rounded-2xl border border-white/8 bg-gray-900 backdrop-blur-md transform transition-transform duration-500 hover:scale-[1.01] opacity-0 translate-y-6";

            return (
              <article
                key={id}
                className={baseWrapper}
                style={{
                  transitionProperty: "transform, opacity",
                  transitionDuration: "520ms",
                  transitionTimingFunction: "cubic-bezier(.2,.9,.2,1)",
                  transitionDelay: `${delayMs}ms`,
                }}
                aria-label={`${role} at ${company}`}
              >
                <div className="relative">
                  {/* HEADER */}
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-14 h-14 rounded-md bg-white/5 overflow-hidden flex-shrink-0 flex items-center justify-center border border-white/6"
                        style={{ minWidth: 56, minHeight: 56 }}
                      >
                        {img ? (
                          <img
                            src={img}
                            alt={`${company} logo`}
                            className="w-full h-full object-contain p-1"
                          />
                        ) : (
                          <div className="text-sm font-semibold text-gray-300">
                            {company?.[0] ?? "?"}
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {role}
                        </h3>
                        <p className="text-sm text-gray-300">{company}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {date}
                    </span>
                  </div>

                  {/* BODY */}
                  <div className="mt-4 text-left">
                    {Array.isArray(desc) ? (
                      <ul className="list-disc list-inside text-gray-400 text-sm space-y-2 leading-relaxed">
                        {desc.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {desc}
                      </p>
                    )}

                    <div className="mt-4">
                      <h5 className="text-sm text-white font-medium">
                        Skills
                      </h5>
                      <ul className="flex flex-wrap mt-2">
                        {skills.map((skill, i) => (
                          <li
                            key={i}
                            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-3 py-1 text-xs rounded-lg mr-2 mb-2 border border-white/10"
                          >
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* Inline animation CSS */}
      <style>{`
        /* reveal */
        .exp-card.is-visible {
          transform: translateY(0) scale(1);
          opacity: 1;
        }
        .exp-card {
          will-change: transform, opacity;
        }
      `}</style>
    </section>
  );
};

export default Experience;
