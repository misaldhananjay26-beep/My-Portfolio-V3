import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, ArrowUpRight, Compass, ShieldCheck, Mic } from 'lucide-react';

interface NavbarProps {
  onOpenAiChat: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAiChat, activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Story', href: '#story' },
    { label: 'Projects', href: '#projects' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Arjuna', href: '#arjuna' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Videos', href: '#videos' },
    { label: 'Certificates', href: '#certificates' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo / Identity */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-tr from-amber-600 to-amber-800 flex items-center justify-center font-playfair font-bold text-white shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300 border border-white/20 relative flex-shrink-0">
            <img 
              src="/images/Dhananjaymisal.jpg" 
              alt="Dhananjay Misal" 
              className="w-full h-full object-cover object-top relative z-10"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src.includes('Dhananjaymisal.jpg')) {
                  target.src = '/images/Dhananjaymisal.png';
                } else if (target.src.includes('Dhananjaymisal.png')) {
                  target.src = '/images/Official%20photo%20of%20Dhananjay%20Misal.jpg';
                } else if (target.src.includes('Official%20photo%20of%20Dhananjay%20Misal.jpg')) {
                  target.src = '/images/Official photo of Dhananjay Misal.jpg';
                } else {
                  target.style.display = 'none';
                }
              }}
            />
            <span className="absolute inset-0 flex items-center justify-center font-playfair font-bold text-xs text-white">DM</span>
          </div>
          <div className="flex flex-col">
            <span className="font-playfair font-bold tracking-tight text-white text-base group-hover:text-amber-400 transition-colors leading-tight">
              Dhananjay Misal
            </span>
            <span className="text-[10px] font-mono text-gray-400 tracking-wider uppercase">
              Interactive Documentary
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card border border-white/10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`px-3 py-1.5 rounded-full text-xs font-jakarta transition-all duration-300 ${
                activeSection === link.href.replace('#', '')
                  ? 'bg-amber-600/30 text-white font-medium border border-amber-500/30'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Omni AI Voice Agent Button */}
          <button
            id="omni-open-widget-btn"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-playfair font-medium shadow-lg shadow-purple-600/25 border border-purple-400/30 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            title="Open AI Voice Agent"
          >
            <Mic className="w-3.5 h-3.5 text-purple-200 animate-pulse" />
            <span>AI Voice Agent</span>
          </button>

          {/* Ask AI Companion Button */}
          <button
            onClick={onOpenAiChat}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-amber-600/30 hover:border-purple-400 text-xs font-playfair text-amber-100 hover:text-white glow-purple transition-all duration-300 group"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 group-hover:rotate-12 transition-transform" />
            <span>Ask AI Story</span>
          </button>

          {/* Explore Button */}
          <a
            href="#story"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-600 to-blue-500 hover:from-blue-500 hover:to-amber-800 text-white text-xs font-playfair font-medium shadow-lg shadow-blue-600/25 transition-all duration-300 hover:scale-[1.02]"
          >
            <span>Explore Journey</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenAiChat}
            className="p-2 rounded-lg glass-card border border-amber-600/30 text-amber-100"
            title="Ask AI"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg glass-card text-gray-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden glass-card border-b border-white/10 px-6 py-6 mt-3 space-y-3 animate-fade-in">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-jakarta text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAiChat();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl glass-card border border-amber-600/30 text-xs font-playfair text-amber-100"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Ask AI About Dhananjay</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
