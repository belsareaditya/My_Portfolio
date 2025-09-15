import React, { useEffect, useRef, useState } from "react";
import { projects } from "../../constants";

const Work = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const containerRef = useRef(null);
  const observerRef = useRef(null);

  const projArray = Array.isArray(projects) ? projects : [];

  const handleOpenModal = (project) => setSelectedProject(project);
  const handleCloseModal = () => setSelectedProject(null);

  // IntersectionObserver for reveal animation (with proper cleanup)
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 }
    );

    observerRef.current = observer;
    const cards = root.querySelectorAll(".project-card");
    cards.forEach((card) => observer.observe(card));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [projArray.length]); // re-run if number of projects changes

  return (
    <section
      id="work"
      className="py-20 px-[6vw] md:px-[5vw] lg:px-[8vw] font-sans relative"
    >
      {/* Section Title */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white">PROJECTS</h2>
        <div className="w-28 h-1 bg-purple-500 mx-auto mt-4 rounded" />
        <p className="text-gray-400 mt-4 text-lg font-medium max-w-3xl mx-auto">
          A showcase of the projects I have worked on, highlighting my skills and
          experience across different technologies.
        </p>
      </div>

      {/* Projects Grid (list-like cards) */}
      <div ref={containerRef} className="grid gap-6">
        {projArray.map((project, index) => (
          <div
            key={project?.id ?? index}
            onClick={() => handleOpenModal(project)}
            className={`project-card opacity-0 translate-y-6
                       border border-white/10 bg-gradient-to-r from-gray-900/80 to-gray-800/60
                       rounded-2xl shadow-xl overflow-hidden cursor-pointer
                       transition-transform duration-400 ease-out hover:scale-[1.02] hover:shadow-2xl
                       flex flex-col md:flex-row`}
            style={{
              transitionDelay: `${index * 80}ms`,
            }}
          >
            {/* Left: Image */}
            <div className="md:w-2/5 w-full h-56 md:h-auto flex-shrink-0 bg-gray-800">
              <img
                src={project?.image}
                alt={project?.title ?? "project"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>

            {/* Right: Info */}
            <div className="md:w-3/5 w-full p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">
                  {project?.title ?? "Untitled Project"}
                </h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-3">
                  {project?.description ?? ""}
                </p>
                <div className="flex flex-wrap gap-2">
                  {(project?.tags ?? []).map((tag, i) => (
                    <span
                      key={i}
                      className="bg-[#1f1730] text-[11px] font-semibold text-purple-400 rounded-full px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex gap-3 items-center">
                <a
                  href={project?.github || "#"}
                  onClick={(e) => {
                    if (!project?.github) e.preventDefault();
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-transparent border border-white/10 hover:border-purple-500 text-gray-300 px-4 py-2 rounded-lg text-sm font-medium"
                >
                  View Code
                </a>
                <a
                  href={project?.webapp || "#"}
                  onClick={(e) => {
                    if (!project?.webapp) e.preventDefault();
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  View Live
                </a>

                {/* small metadata on the far right of card */}
                {project?.year && (
                  <span className="ml-auto text-gray-400 text-xs">
                    {project.year}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        {projArray.length === 0 && (
          <div className="col-span-full text-center text-gray-300 p-8 bg-gray-900 rounded-2xl border border-white/10">
            No projects found. Export a <code>projects</code> array from{" "}
            <code>../../constants</code>.
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-85 p-4">
          <div className="bg-gray-900 rounded-xl shadow-2xl w-full max-w-5xl overflow-hidden">
            <div className="flex justify-end p-4">
              <button
                onClick={handleCloseModal}
                className="text-white text-3xl font-bold hover:text-purple-500"
                aria-label="Close project modal"
              >
                &times;
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-0">
              {/* Modal image */}
              <div className="md:w-1/2 w-full flex items-center justify-center bg-gray-800 p-4">
                <img
                  src={selectedProject?.image}
                  alt={selectedProject?.title}
                  className="w-full h-64 md:h-[420px] object-contain rounded-lg"
                />
              </div>

              {/* Modal details */}
              <div className="md:w-1/2 w-full p-6 flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-3">
                  {selectedProject?.title}
                </h3>
                <p className="text-gray-400 mb-4">{selectedProject?.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {(selectedProject?.tags ?? []).map((tag, i) => (
                    <span
                      key={i}
                      className="bg-[#1f1730] text-xs font-semibold text-purple-400 rounded-full px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex flex-col sm:flex-row gap-3">
                  <a
                    href={selectedProject?.github || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-1/2 text-center bg-transparent border border-white/10 hover:border-purple-500 text-gray-300 px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    View Code
                  </a>
                  <a
                    href={selectedProject?.webapp || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-1/2 text-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    View Live
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Small CSS tweaks for reveal */}
      <style>{`
        .project-card.is-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .project-card {
          will-change: opacity, transform;
        }
      `}</style>
    </section>
  );
};

export default Work;
