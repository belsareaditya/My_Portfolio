import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

/**
 * CheckCircle Icon
 */
const CheckCircle = ({ size = 20, stroke = "#34D399", filledBg = "transparent" }) => {
  const viewBoxSize = 24;
  const circleRadius = 9.5;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      fill="none"
      aria-hidden="true"
      focusable="false"
      style={{ display: "block" }}
    >
      <motion.circle cx="12" cy="12" r={11} fill={filledBg} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.18 }} />
      <motion.circle
        cx="12"
        cy="12"
        r={circleRadius}
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0.6 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.36, ease: "easeOut" }}
      />
      <motion.path
        d="M7.8 12.2l2.2 2.2 6.2-6.2"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: 0.18, duration: 0.26, ease: "easeOut" }}
      />
    </svg>
  );
};

const Contact = () => {
  const form = useRef();
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({
    user_email: "",
    user_name: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (!form.current) return;

    emailjs
      .sendForm("service_9v0x0nk", "template_5sr0c89", form.current, "DG44y6GqBSCqR6Ptc")
      .then(
        () => {
          setIsSent(true);
          setFormData({ user_email: "", user_name: "", subject: "", message: "" });
          form.current.reset();
          toast.success("Message sent successfully! ✅", { position: "top-right", autoClose: 3000, theme: "dark" });
          setTimeout(() => setIsSent(false), 3000);
        },
        (err) => {
          console.error(err);
          toast.error("Failed to send message. Try again.", { position: "top-right", autoClose: 3000, theme: "dark" });
        }
      );
  };

  const isFilled = (name) => {
    const v = formData[name];
    if (name === "user_email") return v && v.includes("@") && v.length > 4;
    return v && v.trim().length > 0;
  };

  const inputBase =
    "w-full p-3 pr-12 rounded-md bg-[#0f0c1a] text-gray-100 border border-gray-700 placeholder:text-gray-500 focus:outline-none transition-shadow";

  return (
    <section id="contact" className="flex flex-col items-center justify-center py-16 px-6 md:px-[7vw] lg:px-[20vw]">
      <ToastContainer />
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">Connect With Me</h2>
        <div className="w-28 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded" />
        <p className="text-gray-400 mt-3 max-w-xl mx-auto">I’d love to hear from you — opportunities, feedback, or a quick hello.</p>
      </div>

      <div className="w-full max-w-md bg-[#0b0713] p-6 rounded-2xl shadow-lg border border-gray-800">
        <h3 className="text-lg font-semibold text-white text-center mb-3">Send a message</h3>

        <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-4 relative">
          <div className="relative">
            <input
              type="email"
              name="user_email"
              placeholder="Email"
              onChange={handleChange}
              value={formData.user_email}
              required
              className={`${inputBase} focus:ring-2 focus:ring-purple-600/30`}
              style={{ boxShadow: isFilled("user_email") ? "0 0 0 4px rgba(52,211,153,0.06)" : undefined }}
            />
          </div>

          <div className="relative">
            <input
              type="text"
              name="user_name"
              placeholder="Your Name"
              onChange={handleChange}
              value={formData.user_name}
              required
              className={`${inputBase} focus:ring-2 focus:ring-purple-600/30`}
              style={{ boxShadow: isFilled("user_name") ? "0 0 0 4px rgba(52,211,153,0.06)" : undefined }}
            />
          </div>

          <div className="relative">
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              onChange={handleChange}
              value={formData.subject}
              required
              className={`${inputBase} focus:ring-2 focus:ring-purple-600/30`}
              style={{ boxShadow: isFilled("subject") ? "0 0 0 4px rgba(52,211,153,0.06)" : undefined }}
            />
          </div>

          <div className="relative">
            <textarea
              name="message"
              placeholder="Message"
              rows={5}
              onChange={handleChange}
              value={formData.message}
              required
              className={`${inputBase} resize-none focus:ring-2 focus:ring-purple-600/30`}
              style={{ boxShadow: isFilled("message") ? "0 0 0 4px rgba(52,211,153,0.06)" : undefined }}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold hover:brightness-95 active:scale-[0.997] transition-transform"
          >
            Send message
          </button>

          {/* ⚠️ Disclaimer under the form */}
          <p className="text-xs text-gray-500 mt-3 text-center">
            ⚠️ All messages are logged.
          </p>

          <AnimatePresence>
            {isSent && (
              <motion.div
                initial={{ y: -6, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -6, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="absolute -top-8 right-4 bg-green-800/80 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2 shadow"
              >
                <CheckCircle size={16} stroke="#ecfdf5" filledBg="transparent" />
                <span>Sent</span>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </section>
  );
};

export default Contact;
