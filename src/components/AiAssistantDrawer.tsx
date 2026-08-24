import React, { useState } from 'react';
import { Sparkles, Send, X, Bot, User, MessageSquare, RefreshCw } from 'lucide-react';

interface AiDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
}

export const AiAssistantDrawer: React.FC<AiDrawerProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: "Hello! I am Dhananjay's AI Documentary Companion. Ask me anything about his journey at PPS ATL Lab, national recognitions at IIT Delhi, Arjuna AI learning platform, or student mentorship!"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const quickQuestions = [
    "What did Dhananjay achieve at IIT Delhi?",
    "Tell me about CleanSense AutoSan",
    "What is the Arjuna learning platform?",
    "How many students has Dhananjay mentored?"
  ];

  const handleSend = async (questionText?: string) => {
    const textToSend = questionText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = { sender: 'user', text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    if (!questionText) setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: textToSend })
      });

      const data = await response.json();
      const aiMsg: Message = {
        sender: 'ai',
        text: data.reply || "Dhananjay's journey spans PPS ATL Lab, 1st Runner-Up at IIT Delhi, and founding Arjuna AI!"
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: "Dhananjay Misal is an Entrepreneur, Founder of Arjuna, 1st Runner-Up at IIT Delhi for CleanSense AutoSan, and mentor to 300+ students!"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end animate-fade-in">
      <div className="w-full max-w-lg h-full glass-card border-l border-white/10 p-6 flex flex-col justify-between relative shadow-2xl">
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-600/30 border border-amber-600/40 flex items-center justify-center text-amber-100">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-playfair font-bold text-white text-base">
                AI Documentary Companion
              </h3>
              <p className="text-[10px] font-mono text-amber-100">Powered by Gemini AI</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl glass-card text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto my-4 space-y-4 pr-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                  msg.sender === 'user'
                    ? 'bg-amber-600 text-white'
                    : 'bg-purple-600/30 text-amber-100 border border-amber-600/30'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[82%] p-4 rounded-2xl text-xs sm:text-sm font-jakarta leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-amber-600 text-white font-medium'
                    : 'glass-card border border-white/10 text-gray-200'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 p-4 glass-card rounded-2xl text-xs text-amber-100">
              <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
              <span>Analyzing Dhananjay's documentary archives...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="mb-4">
          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-2">Suggested Questions</span>
          <div className="flex flex-wrap gap-1.5">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="px-2.5 py-1 rounded-full glass-card border border-white/10 hover:border-purple-400 text-[11px] font-jakarta text-gray-300 hover:text-white transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="pt-3 border-t border-white/10 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything about Dhananjay's work..."
            className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-xs font-jakarta text-white placeholder-gray-500 focus:outline-none focus:border-purple-400"
          />

          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            className="p-2.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-800 text-white disabled:opacity-30 transition-all hover:scale-105"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
