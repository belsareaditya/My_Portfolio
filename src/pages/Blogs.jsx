// src/pages/Blogs.jsx
import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DEMO_BLOGS } from "../data/blogs";

const Tag = ({ t }) => (
  <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-purple-700 to-pink-600 text-white mr-2 mb-2 inline-block">
    {t}
  </span>
);

const LOCAL_KEY = "my_blogs_v1";
const LOCAL_DELETED_KEY = "my_blogs_deleted_v1";

/**
 * BlogCard shows a numbered badge, hero, content and actions.
 * `index` is 0-based here — we display 1-based to the user.
 */
const BlogCard = ({ blog, index, onDelete }) => {
  const hero = blog.heroImage || `https://picsum.photos/seed/blog-${blog.id}/800/520`;

  return (
    <article className="relative w-full bg-gradient-to-b from-[#0f1116] to-[#0b0d12] border border-white/6 rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row items-stretch">
      {/* Number badge - smaller and inside card */}
      <div className="absolute top-3 left-3 z-10">
        <div className="flex items-center justify-center w-7 h-7 rounded-md bg-gradient-to-tr from-purple-600 to-pink-500 text-white text-xs font-bold shadow-md">
          {index + 1}
        </div>
      </div>

      {/* Hero Image */}
      <div className="md:w-5/12 w-full bg-black/5 flex items-center justify-center p-6">
        <div className="w-full h-56 md:h-56 rounded-xl overflow-hidden bg-white/5">
          <img src={hero} alt={blog.title} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Content */}
      <div className="md:w-7/12 w-full p-6 md:p-8 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-white">{blog.title}</h3>
          <div className="text-xs text-gray-400 mt-2">
            {blog.category} • {new Date(blog.date).toLocaleDateString()}
          </div>
          <p className="text-gray-300 mt-4 text-sm md:text-base leading-relaxed line-clamp-3">
            {blog.excerpt}
          </p>
          <div className="mt-4 flex flex-wrap">
            {(blog.tags || []).map((t) => (
              <Tag key={t} t={t} />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3 flex-wrap">
          <Link
            to={`/blog/${blog.id}`}
            className="px-4 py-2 rounded-md bg-white/6 hover:bg-white/8 text-white text-sm font-medium transition"
          >
            Read
          </Link>
          <Link
            to={`/blogs/${blog.id}/edit`}
            className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 to-sky-500 text-white text-sm font-medium hover:opacity-95"
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete(blog)}
            className="px-4 py-2 rounded-md bg-gradient-to-r from-red-600 to-pink-600 text-white text-sm font-medium hover:opacity-95"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
};


const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [toast, setToast] = useState(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const loadBlogs = () => {
    let deleted = [];
    try {
      deleted = JSON.parse(localStorage.getItem(LOCAL_DELETED_KEY) || "[]");
    } catch {}

    let local = [];
    try {
      local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    } catch {}

    const merged = [
      ...local.filter((b) => !deleted.includes(String(b.id))),
      ...DEMO_BLOGS.filter(
        (d) => !local.some((l) => l.id === d.id) && !deleted.includes(String(d.id))
      ),
    ];
    setBlogs(merged);
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  // reveal observer
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.12 }
    );
    root.querySelectorAll("article").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [blogs]);

  const handleDelete = (blog) => {
    if (!window.confirm(`Delete "${blog.title}"?`)) return;

    // remove from local list if exists
    try {
      const rawLocal = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
      const nextLocal = rawLocal.filter((b) => String(b.id) !== String(blog.id));
      localStorage.setItem(LOCAL_KEY, JSON.stringify(nextLocal));
    } catch (err) {
      console.error("Failed to update local list", err);
    }

    // add to deleted list (so demo posts remain deleted)
    try {
      const rawDel = JSON.parse(localStorage.getItem(LOCAL_DELETED_KEY) || "[]");
      if (!rawDel.includes(String(blog.id))) {
        rawDel.push(String(blog.id));
        localStorage.setItem(LOCAL_DELETED_KEY, JSON.stringify(rawDel));
      }
    } catch (err) {
      localStorage.setItem(LOCAL_DELETED_KEY, JSON.stringify([String(blog.id)]));
    }

    // remove comments for that post
    try {
      localStorage.removeItem(`comments_${String(blog.id)}`);
    } catch {}

    // refresh list and show toast with undo
    loadBlogs();
    setToast({ message: "Blog deleted", id: blog.id });
    setTimeout(() => setToast(null), 4000);
  };

  const handleUndo = () => {
    if (!toast) return;
    const id = String(toast.id);
    try {
      const rawDel = JSON.parse(localStorage.getItem(LOCAL_DELETED_KEY) || "[]");
      const next = rawDel.filter((x) => x !== id);
      localStorage.setItem(LOCAL_DELETED_KEY, JSON.stringify(next));
    } catch (err) {
      console.error("Failed to undo delete", err);
    }
    loadBlogs();
    setToast(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#060414] to-[#070418] text-white py-12 px-5 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto space-y-8" ref={containerRef}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold">Blogs</h1>

          <Link
            to="/blogs/new"
            className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm md:text-base font-medium hover:opacity-95"
          >
            + Create New Blog
          </Link>
        </div>

        <div className="flex flex-col gap-8">
          {blogs.length === 0 ? (
            <div className="text-center text-gray-400">
              <p>No blogs to show.</p>
              <div className="mt-4 flex justify-center gap-4">
                <button
                  onClick={() => navigate("/")}
                  className="px-4 py-2 rounded-md border border-white/10 text-gray-300 hover:bg-white/6"
                >
                  ← Back Home
                </button>
                <Link
                  to="/blogs/new"
                  className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm"
                >
                  + Create New Blog
                </Link>
              </div>
            </div>
          ) : (
            blogs.map((b, idx) => <BlogCard key={b.id} blog={b} index={idx} onDelete={handleDelete} />)
          )}
        </div>
      </div>

      {/* Toast with Undo */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4 bg-white/5 border border-white/10 text-white px-4 py-2 rounded-md shadow">
          <span>{toast.message}</span>
          <button
            onClick={handleUndo}
            className="px-3 py-1 rounded-md bg-gradient-to-r from-green-600 to-emerald-500 text-white text-sm"
          >
            Undo
          </button>
        </div>
      )}

      <style>{`
        .is-visible { transform: translateY(0); opacity: 1; transition: all 480ms cubic-bezier(.2,.9,.2,1); }
        article { transform: translateY(12px); opacity: 0; transition: all 420ms ease; }
      `}</style>
    </main>
  );
};

export default Blogs;
