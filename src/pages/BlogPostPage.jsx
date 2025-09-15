// src/pages/BlogPostPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { motion, AnimatePresence } from "framer-motion";
import { DEMO_BLOGS } from "../data/blogs";

const LOCAL_KEY = "my_blogs_v1";
const LOCAL_DELETED_KEY = "my_blogs_deleted_v1";
const LOCAL_COMMENTS = (id) => `comments_${id}`;

const BlogPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  // animation state
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'success'|'info'|'error', message: string }
  const commentsRef = useRef(null);

  // load blog + comments (merge local + demo + respect deleted)
  useEffect(() => {
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

    const found = merged.find((b) => String(b.id) === String(id));
    setBlog(found || null);

    try {
      const raw = JSON.parse(localStorage.getItem(LOCAL_COMMENTS(id)) || "[]");
      setComments(Array.isArray(raw) ? raw : []);
    } catch {
      setComments([]);
    }
  }, [id]);

  useEffect(() => {
    if (!blog) return;
    document.title = `${blog.title} — Blogs`;
    return () => (document.title = "Blogs");
  }, [blog]);

  // scroll to bottom of comments when comments change (e.g., new comment)
  useEffect(() => {
    if (!commentsRef.current) return;
    // tiny timeout to let DOM update
    setTimeout(() => {
      commentsRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 80);
  }, [comments]);

  const submitComment = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      // optionally show validation toast
      setToast({ type: "error", message: "Please write something before posting." });
      setTimeout(() => setToast(null), 2200);
      return;
    }

    const next = [
      ...comments,
      { id: Date.now(), text: text.trim(), date: new Date().toISOString() },
    ];
    setComments(next);
    localStorage.setItem(LOCAL_COMMENTS(id), JSON.stringify(next));
    setText("");

    // success toast (green) with animation
    setToast({ type: "success", message: "Comment posted!" });
    setTimeout(() => setToast(null), 3000);

    // scroll to the latest comment (the useEffect above will run too)
    setTimeout(() => {
      if (commentsRef.current) {
        commentsRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }, 140);
  };

  const handleDelete = () => {
    if (!blog) return;
    if (!window.confirm("Are you sure you want to delete this blog? This action cannot be undone.")) return;

    setDeleting(true);

    // animation duration matches timeout below
    setTimeout(() => {
      // Remove from local created list (if exists)
      try {
        const rawLocal = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
        const nextLocal = rawLocal.filter((b) => String(b.id) !== String(blog.id));
        localStorage.setItem(LOCAL_KEY, JSON.stringify(nextLocal));
      } catch (err) {
        console.error(err);
      }

      // Add id to deleted list
      try {
        const rawDel = JSON.parse(localStorage.getItem(LOCAL_DELETED_KEY) || "[]");
        const normalized = rawDel.map(String);
        if (!normalized.includes(String(blog.id))) {
          normalized.unshift(String(blog.id));
          localStorage.setItem(LOCAL_DELETED_KEY, JSON.stringify(normalized));
        }
      } catch (err) {
        localStorage.setItem(LOCAL_DELETED_KEY, JSON.stringify([String(blog.id)]));
      }

      // remove comments
      try {
        localStorage.removeItem(LOCAL_COMMENTS(id));
      } catch {}

      setToast({ type: "info", message: "Blog deleted" });
      setTimeout(() => {
        setToast(null);
        navigate("/blogs");
      }, 700);
    }, 900); // leave time for the animation to play
  };

  if (!blog) {
    return (
      <main className="min-h-screen p-8 bg-gradient-to-b from-[#060414] to-[#070418] text-white">
        <div className="max-w-3xl mx-auto bg-[#0f0b1a] p-6 rounded-xl border border-white/6">
          <p className="text-gray-400">Post not found.</p>
          <div className="mt-4">
            <button onClick={() => navigate("/blogs")} className="px-3 py-2 rounded-md border border-white/8">
              Back to blogs
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-[#060414] to-[#070418] text-white py-12 px-5 md:px-10 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate(-1)}
              className="px-3 py-2 rounded-md border border-white/10 text-sm md:text-base text-gray-200 hover:bg-white/6"
            >
              ← Back
            </button>

            <button
              onClick={handleDelete}
              className="ml-4 px-3 py-2 rounded-md bg-gradient-to-r from-red-600 to-pink-600 text-white text-sm md:text-base font-medium hover:opacity-95"
            >
              Delete
            </button>
          </div>

          <header className="bg-[#0f0b1a] rounded-xl p-6 border border-white/6">
            <h1 className="text-3xl font-bold">{blog.title}</h1>
            <div className="text-xs text-gray-400 mt-2">
              {blog.author?.name || "Author"} • {new Date(blog.date).toLocaleDateString()}
            </div>
          </header>

          <article className="prose prose-invert max-w-none mt-6 bg-transparent p-6 rounded-xl border border-white/6">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
              {blog.content}
            </ReactMarkdown>
          </article>

          <div className="mt-6 bg-[#08061a] rounded-xl p-6 border border-white/6">
            <h4 className="text-lg font-semibold mb-3">Comments</h4>

            {comments.length === 0 && <div className="text-gray-400 mb-3">No comments yet — be the first!</div>}

            <div className="space-y-3 max-h-[36vh] overflow-auto pr-2 mb-3">
              {comments.map((c) => (
                <div key={c.id} className="p-3 rounded bg-white/3">
                  <div className="text-xs text-gray-300">{new Date(c.date).toLocaleString()}</div>
                  <div className="text-sm text-gray-200 mt-1">{c.text}</div>
                </div>
              ))}
              {/* dummy anchor to scroll into view */}
              <div ref={commentsRef} />
            </div>

            <form onSubmit={submitComment} className="mt-4 flex flex-col gap-3">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full p-3 rounded-md bg-transparent border border-white/8 text-white"
                placeholder="Write a comment..."
                rows={3}
              />
              <div className="flex justify-end">
                <button type="submit" className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 text-white">
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* toast area */}
        <div aria-live="polite" className="fixed bottom-6 right-6 z-50">
          <AnimatePresence>
            {toast && toast.type === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                className="bg-gradient-to-r from-green-600 to-emerald-500 text-white py-2 px-4 rounded-md border border-white/10 shadow-md"
              >
                {toast.message}
              </motion.div>
            )}

            {toast && toast.type === "info" && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                className="bg-white/5 text-white py-2 px-4 rounded-md border border-white/10 shadow-md"
              >
                {toast.message}
              </motion.div>
            )}

            {toast && toast.type === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                className="bg-red-600 text-white py-2 px-4 rounded-md border border-white/10 shadow-md"
              >
                {toast.message}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Delete animation modal */}
      <AnimatePresence>
        {deleting && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#130f14] p-8 rounded-2xl border border-white/10 text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div
                className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center mx-auto mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 10 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 220 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-7 4V4a1 1 0 011-1h6a1 1 0 011 1v3" />
                </svg>
              </motion.div>
              <p className="text-lg font-semibold text-white mb-2">Deleting blog…</p>
              <p className="text-sm text-gray-300">This will remove the post from the list.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BlogPostPage;
