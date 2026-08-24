import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS_DATA, DHANANJAY_BIO } from '../data/documentary';
import { ExternalLink, Github, Cpu } from 'lucide-react';

interface ProjectsSectionProps {
  projectImages?: string[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projectImages = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'EdTech & Artificial Intelligence', 'Assistive Hardware & AI Vision', 'Smart Sanitation & IoT', 'Social Leadership & STEM Mentorship'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-amber-500/30 text-xs font-playfair text-amber-400 mb-4 glow-blue">
          <Cpu className="w-3.5 h-3.5 text-amber-400" />
          <span className="uppercase tracking-widest font-semibold">Engineering & Innovation</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-playfair font-extrabold text-white tracking-tight mb-4">
          FEATURED <span className="text-gradient">PROJECTS</span>
        </h2>
        <p className="text-base sm:text-lg text-gray-400 font-jakarta leading-relaxed">
          Real-world hardware, IoT systems, AI vision tools, and EdTech platforms engineered to solve critical societal and educational challenges.
        </p>
      </motion.div>

      {/* Category Filters */}
      <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-playfair transition-all duration-300 cursor-pointer ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-amber-600 to-amber-800 text-white font-medium shadow-lg shadow-amber-500/30 border border-amber-400 scale-105'
                : 'glass-card text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence>
          {filteredProjects.map((project, idx) => {
            const projectImg = projectImages[idx] || project.image || null;

            return (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                itemScope
                itemType="https://schema.org/SoftwareApplication"
                className="group glass-card rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 relative"
              >
                <meta itemProp="name" content={project.title} />
                <meta itemProp="applicationCategory" content={project.category} />
                <meta itemProp="operatingSystem" content="Cross-Platform" />
                <meta itemProp="author" content="Dhananjay Misal" />

                {/* Optional Project Photo Banner */}
                {projectImg && (
                  <div className="w-full h-52 bg-[#0B1120] overflow-hidden relative">
                    <img
                      src={encodeURI(projectImg)}
                      alt={`Dhananjay Misal Project — ${project.title}`}
                      title={project.title}
                      loading="lazy"
                      itemProp="image"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/30 to-transparent opacity-90" />
                  </div>
                )}

                {/* Card Header & Media Preview */}
                <div className="p-8 pb-4">
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-medium">
                      {project.category}
                    </span>
                    <span className="text-xs font-mono text-gray-400">
                      {project.timeline}
                    </span>
                  </div>

                  <h3 className="text-2xl font-playfair font-extrabold text-white group-hover:text-amber-400 transition-colors mb-2">
                    {project.title}
                  </h3>

                  <p className="text-xs font-jakarta font-semibold text-amber-100 mb-4">
                    "{project.tagline}"
                  </p>

                  <p className="text-sm font-jakarta text-gray-300 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Impact Highlight */}
                  <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/20 mb-6 group-hover:border-amber-500/40 transition-colors">
                    <span className="text-xs font-playfair font-bold text-amber-200 block mb-1">
                      Measurable Social Impact:
                    </span>
                    <span className="text-xs font-jakarta text-gray-300">
                      {project.impact}
                    </span>
                  </div>

                  {/* Features Checklist */}
                  <div className="mb-6">
                    <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-2">Key Features</span>
                    <ul className="grid grid-cols-2 gap-2 text-xs font-jakarta text-gray-300">
                      {project.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          <span className="truncate">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer Tech Stack & Links */}
                <div className="p-8 pt-4 border-t border-white/10 bg-white/[0.02]">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    {/* Tech Stack Pills */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {project.techStack.map((tech, tIdx) => (
                        <span key={tIdx} className="px-2.5 py-1 rounded-md bg-white/5 text-[11px] font-mono text-gray-300 border border-white/5">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-3">
                      <a
                        href={project.githubUrl || DHANANJAY_BIO.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg glass-card text-gray-300 hover:text-white hover:border-amber-400 transition-colors cursor-pointer"
                        title="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      <a
                        href={project.demoUrl || "#contact"}
                        className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-playfair font-medium transition-all shadow-md hover:scale-105 cursor-pointer"
                      >
                        <span>Explore</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

