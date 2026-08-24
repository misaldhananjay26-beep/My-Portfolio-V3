import React, { useEffect, useRef, useState } from 'react';
import { Video as VideoIcon, Play, Pause, Eye, VolumeX, Maximize2, X } from 'lucide-react';

interface VideosProps {
  videos?: string[];
}

interface VideoCardProps {
  videoUrl: string;
  title: string;
  index: number;
  onOpenModal: (url: string) => void;
}

const SingleVideoCard: React.FC<VideoCardProps> = ({ videoUrl, title, index, onOpenModal }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Safely encode video URL so filenames with spaces work
  const safeVideoUrl = encodeURI(videoUrl);

  // IntersectionObserver to auto-play only when visible and pause when out of view
  useEffect(() => {
    const videoNode = videoRef.current;
    if (!videoNode || hasError) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            videoNode.play().catch(() => {});
          } else {
            setIsIntersecting(false);
            videoNode.pause();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(videoNode);

    return () => {
      observer.unobserve(videoNode);
    };
  }, [hasError]);

  return (
    <div
      id={`video-${index}`}
      itemScope
      itemType="https://schema.org/VideoObject"
      className="glass-card rounded-3xl border border-white/10 overflow-hidden flex flex-col group relative hover:border-amber-600/50 transition-all duration-500 hover:scale-[1.02]"
    >
      <meta itemProp="name" content={`Dhananjay Misal — ${title}`} />
      <meta itemProp="description" content={`Documentary video footage of Dhananjay Misal: ${title}. Showcase of AI, robotics, and social impact innovation.`} />
      <meta itemProp="thumbnailUrl" content="https://arjunapro.site/images/Official%20photo%20of%20Dhananjay%20Misal.jpg" />
      <meta itemProp="contentUrl" content={`https://arjunapro.site${safeVideoUrl}`} />
      <meta itemProp="embedUrl" content={`https://arjunapro.site/#video-${index}`} />
      <meta itemProp="uploadDate" content="2026-01-01T08:00:00+00:00" />
      <meta itemProp="familyFriendly" content="true" />

      {/* Video Container */}
      <div className="relative h-64 w-full bg-[#0B1120] overflow-hidden flex items-center justify-center">
        {!hasError ? (
          <video
            ref={videoRef}
            src={safeVideoUrl}
            poster="/images/Official%20photo%20of%20Dhananjay%20Misal.jpg"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover filter saturate-110 group-hover:scale-105 transition-transform duration-700 cursor-pointer"
            onClick={() => onOpenModal(safeVideoUrl)}
            onError={() => {
              setHasError(true);
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#0B1120] to-[#1e1b4b] flex flex-col items-center justify-center p-6 text-center">
            <VideoIcon className="w-12 h-12 text-amber-300/60 mb-2 group-hover:scale-110 transition-transform" />
            <span className="font-playfair font-semibold text-xs text-gray-300">Documentary Video #{index + 1}</span>
            <span className="text-[10px] font-mono text-amber-300 mt-1">Upload video to /videos/ on GitHub</span>
          </div>
        )}

        {/* Permanently Muted Indicator Pill */}
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass-card border border-white/20 text-[10px] font-mono text-gray-300 flex items-center gap-1.5 z-10 pointer-events-none">
          <VolumeX className="w-3 h-3 text-red-400" />
          <span>Permanently Muted</span>
        </div>

        {/* Maximize Modal Button */}
        <button
          onClick={() => onOpenModal(safeVideoUrl)}
          className="absolute top-4 right-4 p-2 rounded-full glass-card text-white hover:bg-white/20 transition-colors z-10 opacity-0 group-hover:opacity-100"
          title="Fullscreen Video View"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Play State Badge */}
        {!hasError && (
          <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full glass-card border border-amber-500/30 text-xs font-playfair text-amber-200 flex items-center gap-1.5 z-10 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>{isIntersecting ? 'Autoplay Active' : 'Paused (Out of View)'}</span>
          </div>
        )}
      </div>

      {/* Video Caption Details */}
      <div className="p-6 border-t border-white/10">
        <h4 className="text-lg font-playfair font-bold text-white group-hover:text-amber-300 transition-colors mb-2">
          {title}
        </h4>
        <p className="text-xs font-jakarta text-gray-400 leading-relaxed">
          Documentary archive recording capturing prototype demos, stage presentations, and ATL lab work.
        </p>
      </div>
    </div>
  );
};

const getVideoTitle = (url: string, index: number) => {
  try {
    const filename = url.split('/').pop() || '';
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
    if (!nameWithoutExt || nameWithoutExt.startsWith('video_')) {
      return `Documentary Footage #${index + 1}`;
    }
    // Clean and capitalize filename
    return nameWithoutExt
      .replace(/_/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  } catch {
    return `Documentary Record #${index + 1}`;
  }
};

export const VideosSection: React.FC<VideosProps> = ({ videos = [] }) => {
  const [activeModalVideo, setActiveModalVideo] = useState<string | null>(null);

  const displayVideos = videos.length > 0 ? videos : [
    '/videos/attended the inauguration ceremony of NIBE Pvt. limited.mp4',
    "/videos/Felicitated By Principal Dr. B.B. Ambade for completing ISRO's START Program.mp4",
    '/videos/interaction with NAAC community.mp4',
    '/videos/Introduction of Smart Glasses For blind people.mp4',
    '/videos/National Science Day.mp4',
    '/videos/Science Day Rocket Lauch.mp4',
    '/videos/surveillance drone project.mp4'
  ];

  return (
    <section id="videos" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-amber-600/30 text-xs font-playfair text-amber-100 mb-4 glow-purple">
          <VideoIcon className="w-3.5 h-3.5 text-amber-300" />
          <span className="uppercase tracking-widest font-semibold">Cinematic Footages</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-playfair font-extrabold text-white tracking-tight mb-4">
          DOCUMENTARY <span className="text-gradient-purple">VIDEOS</span>
        </h2>
        <p className="text-base sm:text-lg text-gray-400 font-jakarta leading-relaxed">
          Watch real footage of prototype demonstrations, national presentations at IIT Delhi, and student mentorship sessions.
        </p>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayVideos.map((videoUrl, idx) => (
          <SingleVideoCard
            key={idx}
            videoUrl={videoUrl}
            title={getVideoTitle(videoUrl, idx)}
            index={idx}
            onOpenModal={(url) => setActiveModalVideo(url)}
          />
        ))}
      </div>

      {/* Fullscreen Video Modal */}
      {activeModalVideo && (
        <div
          onClick={() => setActiveModalVideo(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 animate-fade-in"
        >
          <button
            onClick={() => setActiveModalVideo(null)}
            className="absolute top-6 right-6 p-3 rounded-full glass-card text-white hover:bg-white/20 transition-colors z-50"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full aspect-video rounded-3xl overflow-hidden glass-card border border-white/20 relative"
          >
            <video
              src={activeModalVideo}
              autoPlay
              loop
              muted
              playsInline
              controls={false}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full glass-card border border-white/20 text-xs font-mono text-gray-300 flex items-center gap-2">
              <VolumeX className="w-4 h-4 text-red-400" />
              <span>Permanently Muted Video</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
