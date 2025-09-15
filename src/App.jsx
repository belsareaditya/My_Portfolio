// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Experience from "./components/Experience/Experience";
import Work from "./components/Work/Work";
import Education from "./components/Education/Education";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import BlurBlob from "./components/BlurBlob";

import Blogs from "./pages/Blogs";
import BlogPostPage from "./pages/BlogPostPage";
import NewBlogPage from "./pages/NewBlogPage";
import EditBlogPage from "./pages/EditBlogPage"; // ✅ added this

const App = () => {
  return (
    <BrowserRouter>
      <div className="bg-[#050414] min-h-screen">
        {/* Background effects */}
        <BlurBlob position={{ top: "35%", left: "20%" }} size={{ width: "30%", height: "40%" }} />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

        <div className="relative pt-20">
          <Navbar />

          <Routes>
            {/* Main portfolio page */}
            <Route
              path="/"
              element={
                <>
                  <About />
                  <Skills />
                  <Experience />
                  <Work />
                  <Education />
                  <Contact />
                </>
              }
            />

            {/* Blog routes */}
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/new" element={<NewBlogPage />} />
            <Route path="/blog/:id" element={<BlogPostPage />} />
            <Route path="/blogs/:id/edit" element={<EditBlogPage />} />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
