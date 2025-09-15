// src/pages/NewBlogPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

const LOCAL_KEY = "my_blogs_v1";

const NewBlogPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    category: "General",
    excerpt: "",
    content: "",
    tags: "",
    heroImage: "",
    codeUrl: "",
    liveUrl: "",
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.excerpt.trim()) return;

    const newBlog = {
      id: Date.now(),
      title: form.title.trim(),
      category: form.category.trim(),
      excerpt: form.excerpt.trim(),
      content: form.content,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      heroImage: form.heroImage || "",
      codeUrl: form.codeUrl || "",
      liveUrl: form.liveUrl || "",
      author: { name: "You" },
      date: new Date().toISOString().split("T")[0],
      isLocal: true, // flag so we can allow delete later
    };

    try {
      const raw = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
      const next = [newBlog, ...raw];
      localStorage.setItem(LOCAL_KEY, JSON.stringify(next));
    } catch {
      localStorage.setItem(LOCAL_KEY, JSON.stringify([newBlog]));
    }

    // Show success popup before redirect
    setSuccess(true);
    setTimeout(() => {
      navigate(`/blog/${newBlog.id}`);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#060414] to-[#070418] text-white py-12 px-5 md:px-10 lg:px-20">
      <div className="max-w-5xl mx-auto relative">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-3 py-2 rounded-md border border-white/10 text-sm md:text-base text-gray-200 hover:bg-white/6"
        >
          ← Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-[#0f1116] border border-white/6 rounded-2xl p-6 space-y-4"
          >
            <h2 className="text-xl font-semibold">Create New Blog</h2>

            <input
              className="w-full p-3 rounded-md bg-transparent border border-white/10"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
              required
            />
            <input
              className="w-full p-3 rounded-md bg-transparent border border-white/10"
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm((s) => ({ ...s, category: e.target.value }))}
            />
            <input
              className="w-full p-3 rounded-md bg-transparent border border-white/10"
              placeholder="Tags (comma separated)"
              value={form.tags}
              onChange={(e) => setForm((s) => ({ ...s, tags: e.target.value }))}
            />
            <input
              className="w-full p-3 rounded-md bg-transparent border border-white/10"
              placeholder="Hero image URL (optional)"
              value={form.heroImage}
              onChange={(e) => setForm((s) => ({ ...s, heroImage: e.target.value }))}
            />
            <input
              className="w-full p-3 rounded-md bg-transparent border border-white/10"
              placeholder="Live demo URL (optional)"
              value={form.liveUrl}
              onChange={(e) => setForm((s) => ({ ...s, liveUrl: e.target.value }))}
            />
            <input
              className="w-full p-3 rounded-md bg-transparent border border-white/10"
              placeholder="Code repo URL (optional)"
              value={form.codeUrl}
              onChange={(e) => setForm((s) => ({ ...s, codeUrl: e.target.value }))}
            />
            <input
              className="w-full p-3 rounded-md bg-transparent border border-white/10"
              placeholder="Short excerpt"
              value={form.excerpt}
              onChange={(e) => setForm((s) => ({ ...s, excerpt: e.target.value }))}
              required
            />
            <textarea
              className="w-full p-3 rounded-md bg-transparent border border-white/10 h-48 resize-y"
              placeholder="Write content in Markdown..."
              value={form.content}
              onChange={(e) => setForm((s) => ({ ...s, content: e.target.value }))}
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-gradient-to-r from-green-600 to-emerald-500 text-white text-sm md:text-base font-medium hover:opacity-95"
              >
                Publish
              </button>
            </div>
          </form>

          {/* Live preview */}
          <div className="bg-[#0f1116] border border-white/6 rounded-2xl p-6 overflow-auto">
            <h3 className="text-lg font-semibold mb-3">
              {form.title || "Live preview"}
            </h3>
            <div className="prose prose-invert max-w-none text-gray-200">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {form.content || form.excerpt || "Start writing..."}
              </ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Success Animation */}
        <AnimatePresence>
          {success && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-[#0f1116] border border-white/10 rounded-xl p-8 text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <span className="text-3xl">✔</span>
                </motion.div>
                <p className="text-lg font-semibold text-white">
                  Blog Published Successfully!
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default NewBlogPage;
