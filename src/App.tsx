import React, { useState, useEffect } from 'react';
import { Mic } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StoryDocumentary } from './components/StoryDocumentary';
import { ProjectsSection } from './components/ProjectsSection';
import { AchievementsSection } from './components/AchievementsSection';
import { ArjunaSection } from './components/ArjunaSection';
import { GallerySection } from './components/GallerySection';
import { VideosSection } from './components/VideosSection';
import { CertificatesSection } from './components/CertificatesSection';
import { ContactFooter } from './components/ContactFooter';
import { AmbientAudio } from './components/AmbientAudio';
import { ParticleCanvas } from './components/ParticleCanvas';
import { AiAssistantDrawer } from './components/AiAssistantDrawer';
import { AdSenseUnit } from './components/AdSenseUnit';

export default function App() {
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mediaData, setMediaData] = useState<Record<string, string[]>>({});

  // Dynamically fetch media catalog from server / GitHub
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await fetch('/api/media');
        if (res.ok) {
          const data = await res.json();
          if (data.media) {
            setMediaData(data.media);
          }
        }
      } catch (err) {
        console.warn("Local media fetch notice:", err);
      }
    };

    fetchMedia();
  }, []);

  // Intersection Observer for Active Section Highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'story', 'projects', 'achievements', 'arjuna', 'gallery', 'videos', 'certificates', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroVideos = mediaData.assets || [];
  const heroVideoUrl = heroVideos.length > 0 ? heroVideos[0] : '/assets/1st Autoplay Video.mp4';

  const galleryImages = (mediaData.images && mediaData.images.length > 0)
    ? mediaData.images
    : [
        '/images/Official photo of Dhananjay Misal.jpg',
        '/images/Official photo of Dhananjay Misal atl.jpg',
        '/images/Official photo of Dhananjay Misal1.jpg',
        '/images/Official photo of Dhananjay Misal3.jpg'
      ];

  const projectPhotos = (mediaData['project photos'] && mediaData['project photos'].length > 0)
    ? mediaData['project photos']
    : (mediaData['project_photos'] && mediaData['project_photos'].length > 0)
      ? mediaData['project_photos']
      : [
          '/project photos/attending first imun.jpg',
          '/project photos/auto car charging system on highway.jpg',
          '/project photos/celebrating atal community day.jpg',
          '/project photos/certificate ISRO.jpg',
          '/project photos/Ganesha auto Aarti player.jpg',
          '/project photos/guiding students on robotics and AI.jpg',
          '/project photos/IIT Delhi.jpg',
          '/project photos/making rocket.jpg',
          '/project photos/news.jpg',
          '/project photos/newspaper.jpg',
          '/project photos/Official photo of Dhananjay Misal3.jpg',
          '/project photos/presenting ai smart glasses for blind people.jpg',
          '/project photos/selected for district level.jpg',
          '/project photos/selected for state level inspire Manas.jpg',
          '/project photos/surveillance drone system.jpg',
          '/project photos/taking students session on inspire Manak.jpg',
          '/project photos/using brain sensing technology.jpg'
        ];

  const achievementPhotos = (mediaData.achivements && mediaData.achivements.length > 0)
    ? mediaData.achivements
    : (mediaData.achievements && mediaData.achievements.length > 0)
      ? mediaData.achievements
      : [
          '/achivements/COEP.jpg',
          '/achivements/COEP 3.jpg',
          '/achivements/COEP grp photo.jpg',
          '/achivements/COEP1.jpg',
          '/achivements/COEP2.jpg',
          '/achivements/felicitated by CEO of Pravara Rural Education Society Dr Sushmita Vikhe and Shalini Tai Vikhe(Dhananjay Misal).jpg',
          '/achivements/felicitated by CEO of Pravara Rural Education Society Dr Sushmita Vikhe and Shalini Tai Vikhe 1(Dhananjay Misal).jpg',
          '/achivements/industrial visit to Varroc.jpg',
          '/achivements/invited to NIS community as Community Mentor.jpg',
          '/achivements/Made 1st Robot.jpg',
          '/achivements/Official photo of Dhananjay Misal annual day 2.jpg',
          '/achivements/Official photo of Dhananjay Misal iit delhi.jpg',
          '/achivements/Official photo of Dhananjay Misal iit delhi 1st runner up.jpg'
        ];

  const videoFiles = (mediaData.videos && mediaData.videos.length > 0)
    ? mediaData.videos
    : [
        '/videos/attended the inauguration ceremony of NIBE Pvt. limited.mp4',
        "/videos/Felicitated By Principal Dr. B.B. Ambade for completing ISRO's START Program.mp4",
        '/videos/interaction with NAAC community.mp4',
        '/videos/Introduction of Smart Glasses For blind people.mp4',
        '/videos/National Science Day.mp4',
        '/videos/Science Day Rocket Lauch.mp4',
        '/videos/surveillance drone project.mp4'
      ];

  const certificateFiles = (mediaData.certificate && mediaData.certificate.length > 0)
    ? mediaData.certificate
    : (mediaData.certificates && mediaData.certificates.length > 0)
      ? mediaData.certificates
      : [
          '/certificate/DHANANJAY DATTU MISAL.png',
          '/certificate/Dhananjay Dattu Misal_Micro_Learning_Module_Certificate.png',
          '/certificate/download (1).jpeg',
          '/certificate/gov certificate.jpg',
          '/certificate/gov certificate (1).jpg',
          '/certificate/gov certificate (2).jpg',
          '/certificate/gov certificate (3).jpg',
          '/certificate/gov certificate (4).jpg',
          '/certificate/gov certificate (5).jpg',
          '/certificate/gov certificate (6).jpg',
          '/certificate/gov certificate (7).jpg',
          '/certificate/Misal Dhananjay_AI_APPRECIATE_BADGE.png',
          '/certificate/Misal Dhananjay_AI_APPRECIATE_CERTIFICATE.png'
        ];

  const allMediaFiles = Object.values(mediaData).flat();
  
  // Search specifically for 'bg.mp3' across scanned folders
  const bgMp3File = allMediaFiles.find((f): f is string => {
    if (typeof f !== 'string') return false;
    const filename = f.split('/').pop()?.toLowerCase() || '';
    return filename === 'bg.mp3';
  });

  // Target specifically bg.mp3 (defaults to /assets/bg.mp3 if not yet returned by scanner)
  const musicUrl = bgMp3File || '/assets/bg.mp3';

  return (
    <div className="relative min-h-screen bg-[#050816] text-white font-jakarta overflow-x-hidden selection:bg-amber-500/30 selection:text-white">
      {/* Dynamic Animated Particle Canvas Backdrop */}
      <ParticleCanvas />

      {/* Persistent Ambient Soundtrack Controller */}
      <AmbientAudio musicUrl={musicUrl} />



      {/* Navigation Bar */}
      <Navbar
        onOpenAiChat={() => setAiDrawerOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Experience Stream */}
      <main className="relative z-10 space-y-12">
        <HeroSection
          heroVideoUrl={heroVideoUrl}
          onStartStory={() => {
            const storyEl = document.getElementById('story');
            if (storyEl) storyEl.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Google AdSense Verification & Placement Unit */}
        <AdSenseUnit />

        <StoryDocumentary />

        <ProjectsSection projectImages={projectPhotos} />

        <AchievementsSection achievementImages={achievementPhotos} />

        <ArjunaSection />

        <GallerySection images={galleryImages} />

        <VideosSection videos={videoFiles} />

        <CertificatesSection certificates={certificateFiles} />
      </main>

      {/* Contact & Footer */}
      <ContactFooter />

      {/* AI Assistant Drawer */}
      <AiAssistantDrawer
        isOpen={aiDrawerOpen}
        onClose={() => setAiDrawerOpen(false)}
      />
    </div>
  );
}
