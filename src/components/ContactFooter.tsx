import React, { useState } from 'react';
import { DHANANJAY_BIO } from '../data/documentary';
import { Github, Linkedin, Instagram, Mail, MapPin, Send, CheckCircle2, MessageSquare, FileText } from 'lucide-react';

export const ContactFooter: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    const formattedMessage = `Hello Dhananjay!\n\nI am reaching out from your portfolio website (arjunapro.site).\n\n📌 *Name:* ${form.name}\n✉️ *Email:* ${form.email}\n💬 *Message:* ${form.message}`;

    const whatsappUrl = `https://wa.me/918767103423?text=${encodeURIComponent(formattedMessage)}`;

    // Redirect user directly to WhatsApp with pre-filled details
    window.open(whatsappUrl, '_blank');

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', message: '' });
    }, 5000);
  };

  return (
    <footer id="contact" className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
        {/* Left Side: Identity & Socials */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-800 flex items-center justify-center font-playfair font-bold text-white text-lg overflow-hidden border border-white/20 relative flex-shrink-0">
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
                <span className="absolute inset-0 flex items-center justify-center font-playfair font-bold text-sm text-white">DM</span>
              </div>
              <span className="font-playfair font-bold text-2xl text-white">Dhananjay Misal</span>
            </div>

            <p className="text-sm font-jakarta text-gray-300 mb-6 leading-relaxed">
              "Building Ideas. Creating Impact. Inspiring Innovation."
            </p>

            <p className="text-xs font-jakarta text-gray-400 mb-8 leading-relaxed">
              Open to technical collaborations, startup venture discussions, student mentorship invites, and social impact initiatives.
            </p>

            {/* Direct Contact Info Cards */}
            <div className="space-y-3 mb-8">
              <a
                href={DHANANJAY_BIO.socials.email}
                className="flex items-center gap-3 p-3 rounded-2xl glass-card text-xs font-mono text-gray-300 hover:text-white hover:border-amber-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-amber-400" />
                <span>{DHANANJAY_BIO.email}</span>
              </a>

              <a
                href="https://wa.me/918767103423"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-2xl glass-card text-xs font-mono text-gray-300 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors group"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>WhatsApp: +91 8767103423</span>
              </a>

              <div className="flex items-center gap-3 p-3 rounded-2xl glass-card text-xs font-mono text-gray-300">
                <MapPin className="w-4 h-4 text-amber-300" />
                <span>{DHANANJAY_BIO.location}</span>
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href={DHANANJAY_BIO.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl glass-card text-gray-300 hover:text-white hover:border-amber-400 transition-colors"
              title="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>

            <a
              href={DHANANJAY_BIO.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl glass-card text-gray-300 hover:text-white hover:border-amber-400 transition-colors"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>

            <a
              href={DHANANJAY_BIO.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl glass-card text-gray-300 hover:text-white hover:border-amber-400 transition-colors"
              title="Instagram Profile"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="lg:col-span-7">
          <div className="glass-card p-8 sm:p-10 rounded-3xl border border-white/10 relative">
            <h3 className="text-2xl font-playfair font-bold text-white mb-2">Send a Direct Message</h3>
            <p className="text-xs font-jakarta text-gray-400 mb-6">
              Reach out for mentorship, startup pitches, speaking engagements, or engineering queries.
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-amber-950/60 border border-amber-500/30 flex flex-col items-center text-center animate-fade-in">
                <CheckCircle2 className="w-12 h-12 text-amber-400 mb-3" />
                <h4 className="text-lg font-playfair font-bold text-white mb-1">Message Sent Successfully!</h4>
                <p className="text-xs font-jakarta text-gray-300">Thank you for getting in touch. Dhananjay will respond shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono text-gray-400 block mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Elon Musk"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-jakarta text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-gray-400 block mb-1">Your Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g. elon@x.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-jakarta text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-gray-400 block mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Share your proposal or project details..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-jakarta text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 via-blue-600 to-amber-800 text-white font-playfair font-bold text-xs tracking-wider uppercase shadow-xl shadow-emerald-500/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-300 group-hover:scale-110 transition-transform" />
                  <span>Send Direct Message via WhatsApp (+91 8767103423)</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* AI Search & LLM Indexing Bar */}
      <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
        <p>© {new Date().getFullYear()} Dhananjay Misal. Handcrafted & Production Ready.</p>

        <div className="flex items-center gap-4">
          <a href="/llms.txt" target="_blank" className="hover:text-amber-400 transition-colors flex items-center gap-1">
            <FileText className="w-3.5 h-3.5" />
            <span>llms.txt</span>
          </a>
          <a href="/sitemap.xml" target="_blank" className="hover:text-amber-400 transition-colors">
            sitemap.xml
          </a>
          <a href="/robots.txt" target="_blank" className="hover:text-amber-400 transition-colors">
            robots.txt
          </a>
        </div>
      </div>
    </footer>
  );
};
