// src/pages/EditBlogPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { motion, AnimatePresence } from "framer-motion";
import { DEMO_BLOGS } from "../data/blogs";

const LOCAL_KEY = "my_blogs_v1";
const LOCAL_DELETED_KEY = "my_blogs_deleted_v1";

const EditBlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let local = [];
    try {
      local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    } catch {}

    let deleted = [];
    try {
      deleted = JSON.parse(localStorage.getItem(LOCAL_DELETED_KEY) || "[]");
    } catch {}

    const merged = [
      ...local.filter((b) => !deleted.includes(String(b.id))),
      ...DEMO_BLOGS.filter((d) => !local.some((l) => l.id === d.id) && !deleted.includes(String(d.id))),
    ];

    const found = merged.find((b) => String(b.id) === String(id));
    if (!found) {
      setForm(null);
      return;
    }

    // prefill form (if the blog is a demo and not in local, we still prefill and when saving we add to local)
    setForm({
      id: found.id,
      title: found.title || "",
      category: found.category || "",
      excerpt: found.excerpt || "",
      content: found.content || "",
      tags: (found.tags || []).join(", "),
      heroImage: found.heroImage || "",
      codeUrl: found.codeUrl || "",
      liveUrl: found.liveUrl || "",
      author: found.author || { name: "Author" },
      date: found.date || new Date().toISOString().split("T")[0],
      isLocal: !!local.find((l) => String(l.id) === String(found.id)),
    });
  }, [id]);

  if (!form) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#060414] to-[#070418] text-white py-12 px-5 md:px-10 lg:px-20">
        <div className="max-w-3xl mx-auto bg-[#0f0b1a] p-6 rounded-xl border border-white/6">
          <div className="text-gray-400">Blog not found or it was deleted.</div>
          <div className="mt-4">
            <button onClick={() => navigate("/blogs")} className="px-3 py-2 rounded-md border border-white/8">Back to blogs</button>
          </div>
        </div>
      </main>
    );
  }

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    setSaving(true);

    // small delay to show animation
    setTimeout(() => {
      try {
        // load local array
        const rawLocal = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");

        // if exists, update; if not, prepend as local edited copy
        const exists = rawLocal.some((b) => String(b.id) === String(form.id));
        let next;
        const item = {
          id: form.id,
          title: form.title,
          category: form.category,
          excerpt: form.excerpt,
          content: form.content,
          tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
          heroImage: form.heroImage,
          codeUrl: form.codeUrl,
          liveUrl: form.liveUrl,
          author: form.author,
          date: form.date,
          isLocal: true,
        };

        if (exists) {
          next = rawLocal.map((b) => (String(b.id) === String(form.id) ? item : b));
        } else {
          next = [item, ...rawLocal];
        }

        localStorage.setItem(LOCAL_KEY, JSON.stringify(next));
      } catch (err) {
        console.error("Failed to save edit", err);
      }

      // finish animation then navigate
      setTimeout(() => {
        setSaving(false);
        navigate(`/blog/${form.id}`);
      }, 700);
    }, 500);
  };

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-[#060414] to-[#070418] text-white py-12 px-5 md:px-10 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => navigate(-1)} className="mb-6 px-3 py-2 rounded-md border border-white/10 text-gray-200 hover:bg-white/6">
            ← Back
          </button>

          <div className="bg-[#0f1116] border border-white/6 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-4">Edit Blog</h2>

            <form onSubmit={handleSave} className="grid grid-cols-1 gap-4">
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full p-3 rounded-md bg-transparent border border-white/10"
                placeholder="Title"
                required
              />
              <input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full p-3 rounded-md bg-transparent border border-white/10"
                placeholder="Category"
              />
              <input
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                className="w-full p-3 rounded-md bg-transparent border border-white/10"
                placeholder="Tags (comma separated)"
              />
              <input
                value={form.heroImage}
                onChange={(e) => setForm({ ...form, heroImage: e.target.value })}
                className="w-full p-3 rounded-md bg-transparent border border-white/10"
                placeholder="Hero image URL"
              />
              <input
                value={form.liveUrl}
                onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                className="w-full p-3 rounded-md bg-transparent border border-white/10"
                placeholder="Live demo URL"
              />
              <input
                value={form.codeUrl}
                onChange={(e) => setForm({ ...form, codeUrl: e.target.value })}
                className="w-full p-3 rounded-md bg-transparent border border-white/10"
                placeholder="Code repo URL"
              />
              <input
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                className="w-full p-3 rounded-md bg-transparent border border-white/10"
                placeholder="Excerpt"
              />
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full p-3 rounded-md bg-transparent border border-white/10 h-48"
                placeholder="Markdown content"
              />
              <div className="flex justify-end">
                <button type="submit" className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 to-sky-500 text-white">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Save animation */}
      <AnimatePresence>
        {saving && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-[#0f1116] p-8 rounded-2xl border border-white/10 text-center" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} transition={{ type: "spring", stiffness: 300 }}>
              <motion.div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4" initial={{ scale: 0 }} animate={{ scale: 1, rotate: 360 }} transition={{ delay: 0.15 }}>
                <span className="text-3xl text-white">✔</span>
              </motion.div>
              <p className="text-lg font-semibold text-white">Saved changes</p>
              <p className="text-sm text-gray-300 mt-1">Redirecting to post…</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EditBlogPage;
