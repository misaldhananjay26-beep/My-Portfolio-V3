# My Portfolio V3

A cinematic interactive portfolio and documentary experience for Dhananjay Misal—showcasing projects, achievements, mentorship, certificates, media, and the Arjuna learning initiative.

**Live site:** [my-portfolio-new-sepia.vercel.app](https://my-portfolio-new-sepia.vercel.app)

## What this project does

This portfolio turns a conventional resume into an explorable story. Visitors can move through a documentary timeline, review projects and recognitions, browse media, view certificates, and ask an AI assistant about the journey.

## Highlights

- Interactive documentary timeline with chapter navigation
- Project showcase for Arjuna, Smart Glasses, CleanSense AutoSan, and student mentorship
- Achievements, gallery, videos, and certificate sections
- Gemini-powered documentary assistant through a server-side API route
- Graceful AI fallback when no Gemini key is configured
- Dynamic local media catalog served through the Express server
- GitHub media proxy for repository-based content experiments
- Ambient audio, animated particles, motion effects, and responsive navigation
- SEO routes for `robots.txt`, `sitemap.xml`, and `llms.txt`

## Tech stack

- React 19 and TypeScript
- Vite 6
- Express
- Tailwind CSS 4
- Google Gemini API via `@google/genai`
- Motion and Lucide React
- Node.js and `tsx`

## Run locally

### Prerequisites

- Node.js 18 or newer
- npm
- A Gemini API key is optional; without it, the assistant uses a built-in fallback response.

### Setup

```bash
git clone https://github.com/misaldhananjay26-beep/My-Portfolio-V3.git
cd My-Portfolio-V3
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

On Windows PowerShell, use `Copy-Item .env.example .env` instead of `cp .env.example .env`.

## Environment variables

Create a `.env` file from `.env.example`:

```env
GEMINI_API_KEY=your_gemini_api_key
APP_URL=http://localhost:3000
```

`GEMINI_API_KEY` enables live AI responses. Never commit real keys to the repository.

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Express and Vite development server |
| `npm run build` | Build the frontend and bundle the server |
| `npm run start` | Run the production server from `dist/server.cjs` |
| `npm run preview` | Preview the Vite production build |
| `npm run lint` | Type-check the project with TypeScript |

## Project structure

```text
.
├── src/
│   ├── components/       # Portfolio sections and interactive UI
│   ├── data/             # Documentary, project, and achievement content
│   ├── App.tsx            # Main experience composition
│   └── main.tsx           # React entry point
├── public/                # Public static files
├── assets/                # Hero and media assets
├── images/                # Gallery images
├── project photos/        # Project presentation media
├── videos/                # Documentary videos
├── certificate/           # Certificate images
├── server.ts              # Express APIs, media serving, AI route, and SEO routes
└── package.json
```

## Content and media

Most documentary content is organized in `src/data`. Media folders are served by `server.ts` and can be refreshed through the local media scanner. Keep filenames stable when updating media references in the React components.

## Deployment

The project is deployed at [my-portfolio-new-sepia.vercel.app](https://my-portfolio-new-sepia.vercel.app). For a new deployment, configure the environment variables in the hosting provider and run the production build before starting the server.

## Author

**Dhananjay Misal**

- Portfolio: [arjunapro.site](https://arjunapro.site/)
- GitHub: [misaldhananjay26-beep](https://github.com/misaldhananjay26-beep)
- LinkedIn: [Dhananjay Misal](https://in.linkedin.com/in/dhananjay-misal-74a926307)
- LeetCode: [dhananjaymisal07](https://leetcode.com/u/dhananjaymisal07/)

## License

No license file is currently included. Add a license before inviting external contributions or permitting reuse.
