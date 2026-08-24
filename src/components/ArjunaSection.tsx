import React from 'react';
import { Rocket, Target, Sparkles, HeartHandshake, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export const ArjunaSection: React.FC = () => {
  const roadmapSteps = [
    { title: "Phase 1: Free AI Curriculums", desc: "Interactive modules in AI, Robotics, Electronics & IoT built specifically for curious students." },
    { title: "Phase 2: Adaptive AI Tutor", desc: "Integrating Gemini LLM tutors to answer coding queries and guide students through step-by-step circuit debugging." },
    { title: "Phase 3: Nationwide Mentorship Network", desc: "Connecting high-school innovators with mentors from top institutes like IIT Delhi and COEP." },
    { title: "Phase 4: Open Innovation Hub", desc: "Empowering young founders to publish open-source hardware/software prototypes and receive micro-grants." }
  ];

  return (
    <section id="arjuna" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="glass-card rounded-3xl border border-amber-500/30 p-8 sm:p-12 relative overflow-hidden bg-gradient-to-br from-[#0B1120] via-[#050816] to-[#0e172e]">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-playfair text-amber-400 mb-4">
              <Rocket className="w-3.5 h-3.5 text-amber-400" />
              <span className="uppercase tracking-widest font-semibold">Flagship Venture</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-playfair font-extrabold text-white tracking-tight">
              ARJUNA — <span className="text-gradient">AI LEARNING PLATFORM</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-300 font-jakarta mt-2 max-w-2xl">
              A free AI-powered learning platform empowering passionate students to master AI, Robotics, Electronics, and Entrepreneurship through practical experiences.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://arjunaedu.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-800 text-white font-playfair font-bold text-xs tracking-wider uppercase shadow-xl shadow-amber-500/20 hover:scale-105 transition-transform flex items-center gap-2"
            >
              <span>Join Arjuna Mission</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="glass-card p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
            <div className="w-12 h-12 rounded-xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-playfair font-bold text-white mb-3">Our Mission</h3>
            <p className="text-sm font-jakarta text-gray-300 leading-relaxed">
              To dismantle financial and geographic barriers in technical education, providing free high-grade learning resources so every curious student can start building real technology today.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
            <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-amber-600/30 flex items-center justify-center text-amber-300 mb-6">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-playfair font-bold text-white mb-3">Our Vision</h3>
            <p className="text-sm font-jakarta text-gray-300 leading-relaxed">
              To cultivate an active ecosystem of 100,000+ young Indian innovators, hardware builders, and social entrepreneurs who engineer technology to solve real community problems.
            </p>
          </div>
        </div>

        {/* Roadmap Steps */}
        <div className="mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block mb-6">Strategic Roadmap</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {roadmapSteps.map((step, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl border border-white/10 relative">
                <div className="text-2xl font-playfair font-extrabold text-amber-400/50 mb-2">0{idx + 1}</div>
                <h4 className="text-base font-playfair font-bold text-white mb-2">{step.title}</h4>
                <p className="text-xs font-jakarta text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Bar */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between flex-wrap gap-4">
          <span className="text-xs font-mono text-gray-300">Core Technologies Driving Arjuna:</span>
          <div className="flex items-center gap-2 flex-wrap">
            {['Gemini API', 'React 19', 'TypeScript', 'Tailwind CSS', 'Web Audio', 'Python'].map((tech) => (
              <span key={tech} className="px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-200 text-xs font-mono">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
