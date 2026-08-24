import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Sparkles, Rocket } from 'lucide-react';
import { DHANANJAY_BIO } from '../data/documentary';

interface HeroProps {
  onStartStory: () => void;
  heroVideoUrl?: string;
}

export const HeroSection: React.FC<HeroProps> = ({ onStartStory, heroVideoUrl }) => {
  const [typingIndex, setTypingIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);

  const words = DHANANJAY_BIO.typingWords;

  // Typing Effect Loop
  useEffect(() => {
    const word = words[typingIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(word.substring(0, currentText.length + 1));
        if (currentText === word) {
          setIsDeleting(true);
          setSpeed(1800); // Pause at full word
        } else {
          setSpeed(80);
        }
      } else {
        setCurrentText(word.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setTypingIndex((prev) => (prev + 1) % words.length);
          setSpeed(400);
        } else {
          setSpeed(40);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, typingIndex, speed, words]);

  return (
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#050816] pt-20">
      {/* Hero Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {heroVideoUrl ? (
          <video
            src={encodeURI(heroVideoUrl)}
            poster="/images/Official%20photo%20of%20Dhananjay%20Misal.jpg"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover object-[25%_center] sm:object-[30%_center] scale-105 opacity-55 filter saturate-120"
          />
        ) : (
          /* High-End Canvas Ambient Video Simulation when video file is pending upload */
          <div className="w-full h-full bg-gradient-to-br from-[#050816] via-[#0B1120] to-[#0d162d] relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(59,130,246,0.18),transparent_60%)] animate-pulse duration-1000" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.15),transparent_50%)]" />
          </div>
        )}

        {/* Dark Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/50 to-transparent" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#050816]/40 to-[#050816]" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        {/* Top Tagline Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-amber-500/30 text-xs font-playfair text-amber-200 mb-8 glow-blue"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="tracking-wide">AN INTERACTIVE DOCUMENTARY EXPERIENCE</span>
        </motion.div>

        {/* Big Name */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-playfair font-extrabold tracking-tight text-white mb-6 uppercase"
        >
          DHANANJAY <span className="text-gradient">MISAL</span>
        </motion.h1>

        {/* Subtitle Roles */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-2xl font-jakarta font-medium text-gray-300 mb-6 flex items-center justify-center gap-2 flex-wrap"
        >
          <span className="text-amber-400">Entrepreneur</span>
          <span className="text-gray-600">•</span>
          <span className="text-amber-300">Startup Founder</span>
          <span className="text-gray-600">•</span>
          <span className="text-amber-200">Student</span>
          <span className="text-gray-600">•</span>
          <span className="text-amber-100">Innovator</span>
        </motion.p>

        {/* Dynamic Typing Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="h-10 sm:h-12 flex items-center justify-center mb-10"
        >
          <p className="text-xl sm:text-3xl font-playfair font-semibold text-gradient-purple">
            <span>{currentText}</span>
            <span className="inline-block w-0.5 h-6 sm:h-8 bg-amber-400 ml-1 animate-pulse" />
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md justify-center mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartStory}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-800 text-white font-playfair font-bold text-sm tracking-wide shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300 flex items-center justify-center gap-3 group cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
            <span>EXPLORE MY JOURNEY</span>
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#projects"
            className="w-full sm:w-auto px-8 py-4 rounded-full glass-card hover:bg-white/10 text-gray-200 hover:text-white font-playfair font-semibold text-sm border border-white/15 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Rocket className="w-4 h-4 text-amber-300" />
            <span>VIEW PROJECTS</span>
          </motion.a>
        </motion.div>

        {/* Quick Highlights Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-4xl glass-card p-6 rounded-2xl border border-white/10 hover:border-amber-500/30 transition-all duration-500"
        >
          {DHANANJAY_BIO.stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="flex flex-col items-center p-2 cursor-default"
            >
              <span className="text-2xl sm:text-3xl font-playfair font-extrabold text-white text-gradient">
                {stat.value}
              </span>
              <span className="text-xs font-jakarta text-gray-400 mt-1 text-center">
                {stat.label} <span className="text-amber-400">{stat.suffix}</span>
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <motion.a
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        href="#story"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors group cursor-pointer"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">SCROLL TO WATCH</span>
        <div className="w-6 h-10 rounded-full border-2 border-gray-500/40 group-hover:border-amber-400 flex items-start justify-center p-1 transition-colors">
          <div className="w-1.5 h-2.5 bg-amber-400 rounded-full animate-bounce mt-1" />
        </div>
      </motion.a>
    </section>
  );
};

