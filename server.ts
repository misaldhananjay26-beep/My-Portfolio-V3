import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { DOCUMENTARY_CHAPTERS, DHANANJAY_BIO, PROJECTS_DATA, ACHIEVEMENTS_DATA } from './src/data/documentary.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Serve static folders from workspace root
  const mediaFolders = ['assets', 'images', 'project photos', 'project_photos', 'achivements', 'achievements', 'videos', 'certificate', 'certificates', 'music', 'audio'];
  mediaFolders.forEach((folder) => {
    const folderPath = path.join(process.cwd(), folder);
    if (fs.existsSync(folderPath)) {
      app.use(`/${folder}`, express.static(folderPath));
    }
  });

  // API 1: Local / Workspace Media Scanner
  app.get('/api/media', (req, res) => {
    try {
      const rootDir = process.cwd();
      const folders = ['assets', 'images', 'project photos', 'project_photos', 'achivements', 'achievements', 'videos', 'certificate', 'certificates', 'music', 'audio'];
      
      const mediaMap: Record<string, string[]> = {};

      folders.forEach((folder) => {
        const folderPath = path.join(rootDir, folder);
        if (fs.existsSync(folderPath)) {
          const files = fs.readdirSync(folderPath);
          const validFiles = files.filter(f => !f.startsWith('.') && f !== 'node_modules').map(f => `/${folder}/${f}`);
          mediaMap[folder] = validFiles;
        } else {
          mediaMap[folder] = [];
        }
      });

      res.json({
        success: true,
        source: 'local_workspace',
        media: mediaMap
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // API 2: GitHub API Proxy / Dynamic Folder Scanner
  app.get('/api/github-media', async (req, res) => {
    const owner = (req.query.owner as string) || 'DhananjayMisal';
    const repo = (req.query.repo as string) || 'Portfolio';
    const folder = (req.query.folder as string) || '';

    try {
      const targetUrl = folder
        ? `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(folder)}`
        : `https://api.github.com/repos/${owner}/${repo}/contents`;

      const response = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'Dhananjay-Misal-Portfolio-App',
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (!response.ok) {
        return res.status(response.status).json({
          success: false,
          message: `GitHub API responded with status ${response.status}`,
          url: targetUrl
        });
      }

      const data = await response.json();
      res.json({
        success: true,
        owner,
        repo,
        folder,
        contents: data
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to fetch GitHub repository contents'
      });
    }
  });

  // API 3: AI Documentary Companion powered by Gemini API
  app.post('/api/ask-ai', async (req, res) => {
    const { prompt, history } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.json({
          reply: "I am Dhananjay's AI Documentary Assistant. Currently, the GEMINI_API_KEY environment variable is missing, but here is a quick overview: Dhananjay Misal is an Entrepreneur, Founder of Arjuna, 1st Runner-Up at IIT Delhi for CleanSense AutoSan, Top 10 in India for Smart Glasses, and mentor to 300+ students!"
        });
      }

      const ai = new GoogleGenAI({ apiKey });

      const systemInstruction = `You are the Official Interactive AI Documentary Assistant for Dhananjay Misal's Portfolio.
You speak on behalf of Dhananjay's documentary story with professionalism, enthusiasm, warmth, and accuracy.

FACTS ABOUT DHANANJAY MISAL:
- Name: Dhananjay Misal
- Roles: Entrepreneur, Startup Founder, Student, Innovator, Mentor
- Tagline: "Building Ideas. Creating Impact. Inspiring Innovation."
- Starting Point: Class 9 at Pravara Public School Atal Tinkering Lab (PPS ATL Lab)
- Mentorship: Mentored over 300+ students across schools in AI, Robotics, Electronics, and INSPIRE MANAK.
- National Achievement 1: Top 10 Best Teams in India at IIT Delhi for "Smart Glasses for Visually Impaired People" (Class 9).
- National Achievement 2: 1st Runner-Up at IIT Delhi for "CleanSense AutoSan" (AI & IoT Smart Sanitation for railways & public toilets).
- Entrepreneurship: Participated in COEP I2I Entrepreneurship Competition, International Model United Nations (represented India, Turkey, Israel), Varroc Industrial Visit, and invited to NIBE Pvt Ltd inauguration.
- Startup Founder: Founder of "Arjuna" — a free AI-powered learning platform designed for curious students to master AI, Programming, Robotics, Electronics, and Entrepreneurship through practical project-based learning.
- Philosophy: Technology should be built for social impact and human problem solving. Age is never a barrier to innovation.

Keep answers concise (2-4 paragraphs), inspiring, structured with markdown bolding, and friendly. Always cite authentic facts from his journey.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction
        }
      });

      const reply = response.text || "Dhananjay's journey spans PPS ATL Lab, mentoring 300+ students, winning 1st Runner-Up at IIT Delhi with CleanSense AutoSan, Top 10 in India for Smart Glasses, and founding Arjuna AI.";

      res.json({ reply });
    } catch (err: any) {
      console.error('Gemini API Error:', err);
      res.status(500).json({
        reply: "Dhananjay's journey spans PPS ATL Lab, mentoring 300+ students, winning 1st Runner-Up at IIT Delhi with CleanSense AutoSan, Top 10 in India for Smart Glasses, and founding Arjuna AI. Ask me anything specific about these milestones!"
      });
    }
  });

  // SEO & AI Optimization Routes
  app.get('/llms.txt', (req, res) => {
    res.type('text/plain').send(`# Dhananjay Misal — Interactive Documentary & Portfolio
> Entrepreneur • Startup Founder • Student • Innovator • Mentor

## Biography
Dhananjay Misal is a young innovator, startup founder, and technology mentor from Maharashtra, India. His journey began in Class 9 at Pravara Public School Atal Tinkering Lab (PPS ATL Lab), where he transformed curiosity into national achievements.

## Key Milestones & Achievements
1. **Top 10 Best Teams in India (IIT Delhi)**: Developed Smart Glasses for Visually Impaired Navigation.
2. **1st Runner-Up at IIT Delhi**: Engineered CleanSense AutoSan — an AI & IoT smart sanitation monitoring system for railways and public facilities.
3. **Founder of Arjuna**: Free AI-powered learning platform empowering curious students to learn AI, Robotics, Electronics, and Entrepreneurship through project-based learning.
4. **Mentorship**: Mentored 300+ students across regional schools in AI, Robotics, INSPIRE MANAK, and ATL innovation challenges.
5. **Entrepreneurship & Diplomacy**: COEP I2I Finalist, International Model United Nations delegate (India, Turkey, Israel), Varroc Industrial Visit, Invitee to NIBE Pvt Ltd inauguration.

## Contact & Links
- Website: ${process.env.APP_URL || 'https://ai.studio'}
- Email: misaldhananjay26@gmail.com
- GitHub: https://github.com/DhananjayMisal
- LinkedIn: https://linkedin.com/in/dhananjay-misal
`);
  });

  app.get('/sitemap.xml', (req, res) => {
    const host = req.get('host') || '';
    const protocol = req.protocol === 'https' || host.includes('arjunapro.site') ? 'https' : 'http';
    const baseUrl = (process.env.APP_URL || (host ? `${protocol}://${host}` : 'https://arjunapro.site')).replace(/\/$/, '');

    res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>https://arjunapro.site/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>https://arjunapro.site/images/Official%20photo%20of%20Dhananjay%20Misal.jpg</image:loc>
      <image:title>Dhananjay Misal — Founder of Arjuna, IIT Delhi Honoree &amp; AI Pioneer</image:title>
      <image:caption>Official portrait of Dhananjay Misal, innovator and founder of Arjuna</image:caption>
    </image:image>
    <video:video>
      <video:thumbnail_loc>https://arjunapro.site/images/Official%20photo%20of%20Dhananjay%20Misal.jpg</video:thumbnail_loc>
      <video:title>Dhananjay Misal — Official Documentary &amp; Journey Film</video:title>
      <video:description>Interactive documentary detailing Dhananjay Misal's path from Class 9 at PPS ATL Lab to 1st Runner-Up at IIT Delhi for CleanSense AutoSan and founding Arjuna AI.</video:description>
      <video:content_loc>https://arjunapro.site/assets/hero-documentary.mp4</video:content_loc>
      <video:player_loc>https://arjunapro.site/#videos</video:player_loc>
      <video:duration>210</video:duration>
      <video:publication_date>2026-01-01T08:00:00+00:00</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
    </video:video>
  </url>
  <url>
    <loc>https://www.arjunapro.site/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://arjunapro.site/#story</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://arjunapro.site/#projects</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>https://arjunapro.site/images/Official%20photo%20of%20Dhananjay%20Misal.jpg</image:loc>
      <image:title>CleanSense AutoSan &amp; Smart Glasses Projects</image:title>
    </image:image>
  </url>
  <url>
    <loc>https://arjunapro.site/#achievements</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://arjunapro.site/#arjuna</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://arjunapro.site/#videos</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`);
  });

  app.get('/robots.txt', (req, res) => {
    res.type('text/plain').send(`User-agent: *
Allow: /

Sitemap: https://arjunapro.site/sitemap.xml
Sitemap: https://www.arjunapro.site/sitemap.xml
`);
  });

  // Vite Middleware in Dev vs Static Files in Prod
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Dhananjay Misal Portfolio Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
