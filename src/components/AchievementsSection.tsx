import React from 'react';
import { motion } from 'motion/react';
import { ACHIEVEMENTS_DATA } from '../data/documentary';
import { Award, Trophy, ShieldCheck } from 'lucide-react';

interface AchievementsProps {
  achievementImages?: string[];
}

export const AchievementsSection: React.FC<AchievementsProps> = ({ achievementImages = [] }) => {
  return (
    <section id="achievements" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-amber-600/30 text-xs font-playfair text-amber-100 mb-4 glow-purple">
          <Trophy className="w-3.5 h-3.5 text-amber-300" />
          <span className="uppercase tracking-widest font-semibold">Honors & National Recognition</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-playfair font-extrabold text-white tracking-tight mb-4">
          ACCOMPLISHMENTS & <span className="text-gradient-purple">AWARDS</span>
        </h2>
        <p className="text-base sm:text-lg text-gray-400 font-jakarta leading-relaxed">
          National innovation finishes at IIT Delhi, regional entrepreneurial pitches, and global diplomatic conferences.
        </p>
      </motion.div>

      {/* Grid of Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ACHIEVEMENTS_DATA.map((item, idx) => {
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              className="glass-card p-8 rounded-3xl border border-white/10 hover:border-amber-600/50 hover:shadow-2xl hover:shadow-amber-600/20 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-amber-600/10 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-600/20 transition-all" />

              <div>
                {/* Badge Header */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span className="px-3 py-1 rounded-full bg-amber-950/60 border border-amber-600/30 text-amber-100 font-playfair font-bold text-xs">
                    {item.badge}
                  </span>
                  <Award className="w-5 h-5 text-amber-300 group-hover:scale-120 transition-transform" />
                </div>

                {/* Title & Organization */}
                <h3 className="text-xl font-playfair font-extrabold text-white group-hover:text-amber-100 transition-colors mb-2">
                  {item.title}
                </h3>

                <p className="text-xs font-jakarta font-semibold text-amber-400 mb-4">
                  {item.organization} • <span className="text-gray-400">{item.year}</span>
                </p>

                <p className="text-sm font-jakarta text-gray-300 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Bottom Footer Accent */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Verified Credential</span>
                </span>
                <span className="text-amber-300 group-hover:translate-x-1.5 transition-transform">
                  National Stage →
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

