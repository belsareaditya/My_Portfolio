// src/components/Navbar/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const scrollAnimationRef = useRef(null);
  const observerRef = useRef(null);
  const navRef = useRef(null);

  // Detect scroll and change navbar background
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Map top-level menu ids to actual target ids on the page
  const mapSectionId = (id) => {
    if (id === "skills") return "tools";
    return id;
  };

  // Easing function (smooth)
  const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  // Cancel any running animation
  const cancelScrollAnimation = () => {
    if (scrollAnimationRef.current) {
      cancelAnimationFrame(scrollAnimationRef.current);
      scrollAnimationRef.current = null;
    }
  };

  // Smooth scroll to Y (duration ms)
  const smoothScrollTo = (targetY, duration = 700) => {
    // Use native smooth scrolling when available as a first-class option
    const supportsNative = "scrollBehavior" in document.documentElement.style;
    if (supportsNative) {
      // still cancel any custom animation in flight
      cancelScrollAnimation();
      window.scrollTo({ top: Math.round(targetY), behavior: "smooth" });
      return;
    }

    // otherwise use requestAnimationFrame easing
    cancelScrollAnimation();
    const startY = window.pageYOffset;
    const delta = targetY - startY;
    const start = performance.now();

    const step = (now) => {
      const elapsed = Math.min(1, (now - start) / duration);
      const t = easeInOutCubic(elapsed);
      window.scrollTo(0, Math.round(startY + delta * t));
      if (elapsed < 1) {
        scrollAnimationRef.current = requestAnimationFrame(step);
      } else {
        scrollAnimationRef.current = null;
      }
    };

    scrollAnimationRef.current = requestAnimationFrame(step);
  };

  // Robust external link opener: prevents default and opens via window.open
  const openExternal = (href, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    try {
      window.open(href, "_blank", "noopener,noreferrer");
    } catch (err) {
      window.location.href = href;
    }
  };

  // Smooth scroll to section with navbar offset and active highlight
  const handleMenuItemClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsOpen(false);

    const targetId = mapSectionId(sectionId);
    const section = document.getElementById(targetId);

    // compute offset for fixed navbar so section is visible below it
    const navbarEl = navRef.current;
    const navHeight = navbarEl ? navbarEl.getBoundingClientRect().height : 72;

    if (section) {
      // compute absolute Y to scroll to
      const rect = section.getBoundingClientRect();
      const targetY = window.pageYOffset + rect.top - (navHeight + 8); // small gap

      // perform super-smooth scroll
      smoothScrollTo(Math.max(0, targetY), 720);
      return;
    }

    // fallback: try original id if mapped target not found
    const fallback = document.getElementById(sectionId);
    if (fallback) {
      const rect = fallback.getBoundingClientRect();
      const targetY = window.pageYOffset + rect.top - (navHeight + 8);
      smoothScrollTo(Math.max(0, targetY), 720);
      return;
    }

    // if still not found (e.g., on blogs page), navigate home so user can access the section
    navigate("/");
    // optionally scroll after navigation (can't guarantee element present immediately)
  };

  // Setup IntersectionObserver to track active section while scrolling
  useEffect(() => {
    // sections we care about
    const ids = ["about", "tools", "experience", "work", "education"]; // tools is the skills subsection
    const elements = ids
      .map((i) => document.getElementById(i))
      .filter(Boolean);

    if (elements.length === 0) return;

    // cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    const options = {
      root: null,
      rootMargin: "-35% 0px -50% 0px", // offset to mark section active when centered-ish
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      // pick the element with largest intersection ratio or the one appearing first
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible.length > 0) {
        const id = visible[0].target.id;
        // if tools active, expose skills in top menu
        setActiveSection(id === "tools" ? "skills" : id);
      }
    }, options);

    elements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  // When component unmounts cancel any animation
  useEffect(() => {
    return () => {
      cancelScrollAnimation();
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  const menuItems = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" }, // clicks will scroll to #tools
    { id: "experience", label: "Experience" },
    { id: "work", label: "Projects" },
    { id: "education", label: "Education" },
  ];

  const SOCIALS = [
    { href: "https://github.com/belsareaditya", label: "GitHub", icon: <FaGithub size={20} /> },
    { href: "https://www.linkedin.com/in/belsareaditya/", label: "LinkedIn", icon: <FaLinkedin size={20} /> },
  ];

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 w-full z-[100] transition duration-300 px-[7vw] md:px-[7vw] lg:px-[20vw] ${
        isScrolled ? "bg-[#050414] bg-opacity-60 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="text-white py-5 flex justify-between items-center">
        {/* Logo */}
        <div
          className="text-lg font-semibold cursor-pointer select-none"
          onClick={() => {
            cancelScrollAnimation();
            window.scrollTo({ top: 0, behavior: "smooth" });
            setActiveSection("");
          }}
          aria-label="Go to top"
          style={{ userSelect: "none" }}
        >
          <span className="text-[#8245ec]">&lt;</span>
          <span className="text-white">Aditya</span>
          <span className="text-[#8245ec]">/</span>
          <span className="text-white">Belsare</span>
          <span className="text-[#8245ec]">&gt;</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6 text-gray-300">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`cursor-pointer hover:text-[#8245ec] ${activeSection === item.id ? "text-[#8245ec]" : ""}`}
            >
              <button onClick={() => handleMenuItemClick(item.id)} className="focus:outline-none">
                {item.label}
              </button>
            </li>
          ))}

          {/* Blogs button uses Link for client-side navigation */}
          <li>
            <Link
              to="/blogs"
              className="px-3 py-1 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-medium hover:opacity-95"
            >
              Blogs
            </Link>
          </li>
        </ul>

        {/* Desktop Social Icons (robust links) */}
        <div className="hidden md:flex space-x-4 items-center z-50">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              onClick={(e) => openExternal(s.href, e)}
              aria-label={s.label}
              className="text-gray-300 hover:text-[#8245ec] pointer-events-auto"
              target="_blank"
              rel="noopener noreferrer"
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden z-50">
          {isOpen ? (
            <FiX className="text-3xl text-[#8245ec] cursor-pointer" onClick={() => setIsOpen(false)} />
          ) : (
            <FiMenu className="text-3xl text-[#8245ec] cursor-pointer" onClick={() => setIsOpen(true)} />
          )}
        </div>
      </div>

      {/* Mobile Menu Items */}
      {isOpen && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-11/12 sm:w-4/5 bg-[#050414] bg-opacity-70 backdrop-blur-lg z-50 rounded-lg shadow-lg md:hidden">
          <ul className="flex flex-col items-center space-y-4 py-6 text-gray-300">
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={`cursor-pointer hover:text-white ${activeSection === item.id ? "text-[#8245ec]" : ""}`}
              >
                <button
                  onClick={() => {
                    handleMenuItemClick(item.id);
                    setIsOpen(false);
                  }}
                  className="focus:outline-none"
                >
                  {item.label}
                </button>
              </li>
            ))}

            <li>
              <Link
                to="/blogs"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-medium"
              >
                Blogs
              </Link>
            </li>

            <div className="flex space-x-4 pt-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  onClick={(e) => {
                    setIsOpen(false);
                    openExternal(s.href, e);
                  }}
                  aria-label={s.label}
                  className="text-gray-300 hover:text-white pointer-events-auto"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
