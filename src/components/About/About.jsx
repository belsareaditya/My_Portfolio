import React from 'react';
import ReactTypingEffect from 'react-typing-effect';
import { motion } from 'framer-motion';
import profileImage from '../../assets/profile2.png';

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-8 px-6 md:px-12 lg:px-24 font-sans mt-16 md:mt-24 lg:mt-32"
    >
      {/* Decorative blurred gradient blob */}
      <svg
        className="pointer-events-none absolute -right-32 -top-20 opacity-30 w-80 h-80 md:w-[36rem] md:h-[36rem]"
        viewBox="0 0 600 600"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <g transform="translate(300,300)">
          <path
            d="M120,-165C148,-129,156,-76,169,-21C182,34,200,90,183,134C165,179,112,213,57,226C1,239,-55,232,-103,207C-150,182,-189,139,-200,88C-211,37,-194,-21,-164,-65C-135,-109,-93,-139,-50,-167C-7,-194,36,-219,83,-212C130,-205,92,-201,120,-165Z"
            fill="url(#g)"
          />
          <defs>
            <linearGradient id="g" x1="0" x2="1">
              <stop offset="0%" stopColor="#8245ec" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.85" />
            </linearGradient>
          </defs>
        </g>
      </svg>

      <div className="relative z-10 max-w-6xl mx-auto grid gap-8 md:grid-cols-2 items-center">
        {/* Image Column (left on md+) */}
        <motion.div
          className="flex justify-center md:justify-start"
          initial={{ y: 0 }}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-[26rem] md:h-[26rem] rounded-2xl bg-gradient-to-br from-white/5 via-white/3 to-transparent p-1 backdrop-blur-sm shadow-2xl border border-white/5">
            <motion.img
              src={profileImage}
              alt="Tarun Kaushik"
              className="w-full h-full rounded-2xl object-cover"
              initial={{ scale: 0.98 }}
              animate={{ scale: [0.98, 1.02, 0.98] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>

        {/* Text Column */}
        <div className="text-center md:text-left">
          <p className="text-sm uppercase tracking-widest text-[#a8a6b9] mb-2">Hello there 👋</p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2 leading-tight">Hi, I am</h1>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 leading-tight">Aditya Belsare</h2>

          <h3 className="text-lg sm:text-2xl md:text-3xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#8245ec] to-[#a855f7] leading-tight">
            <span className="text-white mr-2">I am a</span>
            <ReactTypingEffect
              text={[
                'DevOps Engineer',
                'SRE Engineer',
                'Cloud Engineer',
              ]}
              speed={100}
              eraseSpeed={50}
              typingDelay={500}
              eraseDelay={2000}
              cursorRenderer={(cursor) => <span className="text-[#8245ec]">{cursor}</span>}
              displayTextRenderer={(text, i) => (
                <span className="inline-block align-middle">{text}</span>
              )}
            />
          </h3>

   <p
  className="text-base sm:text-lg md:text-lg text-gray-300 mb-6 leading-relaxed max-w-xl mx-auto md:mx-0 text-justify"
>
  I’m a <span className="font-semibold text-white">Cloud Engineer | Site Reliability Engineer (SRE)</span> 
  with expertise in <span className="text-purple-400">AWS, DevOps, and infrastructure automation</span>. 
  I design and manage highly available, scalable, and secure cloud environments for modern applications. 
  Skilled in Docker, Kubernetes, and Infrastructure as Code 
  (<span className="text-purple-400">Terraform, CloudFormation</span>). 
  Experienced in building CI/CD pipelines (Jenkins, GitHub Actions) to enable seamless, automated deployments. 
  Passionate about reliability, performance optimization, and cost-efficient cloud solutions.
</p>




          <div className="flex items-center justify-center md:justify-start gap-4">
            <a
              href="https://www.linkedin.com/in/belsareaditya/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition"
            >
            LinkedIn Profile
            </a>


            <a
              href="#contact"
              className="inline-flex items-center justify-center px-5 py-3 rounded-full border border-white/10 text-sm font-medium text-white/90 hover:bg-white/5 transition"
            >
              Let's talk
            </a>
          </div>
        </div>
      </div>

      {/* Small subtle divider */}
      <div className="mt-10 mx-auto max-w-6xl">
        <div className="h-px w-full bg-gradient-to-r from-white/5 via-white/2 to-transparent rounded" />
      </div>
    </section>
  );
}
