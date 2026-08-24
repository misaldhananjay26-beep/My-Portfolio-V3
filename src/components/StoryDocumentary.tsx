import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DOCUMENTARY_CHAPTERS } from '../data/documentary';
import { ChevronRight, ChevronLeft, MapPin, Calendar, BookOpen, Quote, Sparkles } from 'lucide-react';

export const StoryDocumentary: React.FC = () => {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const activeChapter = DOCUMENTARY_CHAPTERS[activeChapterIndex];

  const handleNext = () => {
    if (activeChapterIndex < DOCUMENTARY_CHAPTERS.length - 1) {
      setActiveChapterIndex(activeChapterIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeChapterIndex > 0) {
      setActiveChapterIndex(activeChapterIndex - 1);
    }
  };

  return (
    <section id="story" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-amber-500/30 text-xs font-playfair text-amber-400 mb-4 glow-blue">
          <BookOpen className="w-3.5 h-3.5" />
          <span className="uppercase tracking-widest font-semibold">Interactive Documentary</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-playfair font-extrabold text-white tracking-tight mb-4">
          MY <span className="text-gradient">STORY</span>
        </h2>
        <p className="text-base sm:text-lg text-gray-400 font-jakarta leading-relaxed">
          The evolution of an innovator. Walk through each chapter of passion, experiments, national stages, mentorship, and building for social impact.
        </p>
      </motion.div>

      {/* Chapter Progress Timeline Bar */}
      <div className="mb-12 glass-card p-4 rounded-2xl border border-white/10 overflow-x-auto">
        <div className="flex items-center justify-between min-w-[700px] gap-2 relative">
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-gray-800 -translate-y-1/2 -z-0" />
          
          {DOCUMENTARY_CHAPTERS.map((chap, idx) => {
            const isActive = idx === activeChapterIndex;
            const isCompleted = idx < activeChapterIndex;

            return (
              <button
                key={chap.id}
                onClick={() => setActiveChapterIndex(idx)}
                className={`relative z-10 flex flex-col items-center group transition-all duration-300 cursor-pointer ${
                  isActive ? 'scale-110' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-playfair text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-600 to-amber-800 text-white glow-blue ring-4 ring-amber-500/30 shadow-lg shadow-amber-500/40'
                      : isCompleted
                      ? 'bg-amber-950 text-amber-400 border border-amber-500/50'
                      : 'bg-[#0B1120] text-gray-400 border border-white/10'
                  }`}
                >
                  {chap.id}
                </div>
                <span className="text-[10px] font-playfair font-medium text-gray-400 mt-2 truncate max-w-[85px] group-hover:text-white transition-colors">
                  {chap.period}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Documentary Chapter Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Chapter Metadata & Quote */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeChapter.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden shadow-xl"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Chapter Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-amber-600/20 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold">
                  Chapter {activeChapter.id} of {DOCUMENTARY_CHAPTERS.length}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-white mb-2">
                {activeChapter.subtitle}
              </h3>

              <div className="flex flex-col gap-2 my-6 pt-4 border-t border-white/10 text-xs font-jakarta text-gray-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>{activeChapter.period}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-300" />
                  <span>{activeChapter.location}</span>
                </div>
              </div>

              {/* Quote Block */}
              {activeChapter.quote && (
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 relative my-2">
                  <Quote className="w-5 h-5 text-amber-400 mb-2 opacity-60" />
                  <p className="text-xs sm:text-sm font-jakarta italic text-gray-300 leading-relaxed">
                    "{activeChapter.quote}"
                  </p>
                </div>
              )}

              {/* Key Highlights */}
              <div className="mt-6">
                <span className="text-xs font-mono uppercase tracking-wider text-gray-400 block mb-3">Key Milestones</span>
                <div className="flex flex-wrap gap-2">
                  {activeChapter.highlights.map((h, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-jakarta text-gray-300 hover:border-amber-500/40 transition-colors">
                      #{h}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Chapter Prose & Narrative */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeChapter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-card p-8 sm:p-10 rounded-3xl border border-white/10 relative min-h-[420px] flex flex-col justify-between shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
                  <h3 className="text-3xl font-playfair font-extrabold text-white">
                    {activeChapter.title}
                  </h3>
                  <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />
                </div>

                {/* Prose Paragraphs */}
                <div className="space-y-6 text-gray-300 text-base sm:text-lg font-jakarta leading-relaxed">
                  {activeChapter.content.map((p, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="relative pl-4 border-l-2 border-amber-500/40 hover:border-amber-400 transition-colors"
                    >
                      {p}
                    </motion.p>
                  ))}
                </div>
              </div>

              {/* Chapter Navigation Footer Buttons */}
              <div className="flex items-center justify-between pt-8 mt-10 border-t border-white/10">
                <button
                  onClick={handlePrev}
                  disabled={activeChapterIndex === 0}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-card hover:bg-white/10 text-xs font-playfair text-gray-300 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Chapter</span>
                </button>

                <span className="text-xs font-mono text-gray-400 hidden sm:inline">
                  Chapter {activeChapterIndex + 1} of {DOCUMENTARY_CHAPTERS.length}
                </span>

                <button
                  onClick={handleNext}
                  disabled={activeChapterIndex === DOCUMENTARY_CHAPTERS.length - 1}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-800 text-white text-xs font-playfair font-medium shadow-lg shadow-amber-500/20 hover:scale-105 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                >
                  <span>Next Chapter</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

