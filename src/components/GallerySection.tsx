import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, ZoomIn, X, ChevronRight, ChevronLeft } from 'lucide-react';

interface GalleryProps {
  images?: string[];
}

export const GallerySection: React.FC<GalleryProps> = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // Fallback high quality placeholders if local images directory is pending upload
  const displayImages = images.length > 0 ? images : [
    '/images/gallery_1.jpg',
    '/images/gallery_2.jpg',
    '/images/gallery_3.jpg',
    '/images/gallery_4.jpg',
    '/images/gallery_5.jpg',
    '/images/gallery_6.jpg'
  ];

  const handleOpenLightbox = (imgUrl: string, idx: number) => {
    setSelectedImage(imgUrl);
    setSelectedIndex(idx);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextIdx = (selectedIndex + 1) % displayImages.length;
    setSelectedIndex(nextIdx);
    setSelectedImage(displayImages[nextIdx]);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const prevIdx = (selectedIndex - 1 + displayImages.length) % displayImages.length;
    setSelectedIndex(prevIdx);
    setSelectedImage(displayImages[prevIdx]);
  };

  // Keyboard Navigation for Lightbox
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, selectedIndex, displayImages]);

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-amber-500/30 text-xs font-playfair text-amber-400 mb-4 glow-blue">
          <ImageIcon className="w-3.5 h-3.5" />
          <span className="uppercase tracking-widest font-semibold">Visual Documentation</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-playfair font-extrabold text-white tracking-tight mb-4">
          MOMENTS IN <span className="text-gradient">GALLERY</span>
        </h2>
        <p className="text-base sm:text-lg text-gray-400 font-jakarta leading-relaxed">
          Behind the scenes at PPS ATL Lab, national presentations at IIT Delhi, interactive mentoring sessions, and industrial visits.
        </p>
      </motion.div>

      {/* Masonry / Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayImages.map((imgUrl, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (idx % 6) * 0.08 }}
            itemScope
            itemType="https://schema.org/ImageObject"
            onClick={() => handleOpenLightbox(imgUrl, idx)}
            className="group relative h-72 rounded-3xl overflow-hidden glass-card border border-white/10 cursor-pointer hover:border-amber-500/50 transition-all duration-500 hover:scale-[1.02] shadow-xl"
          >
            <meta itemProp="contentUrl" content={`https://arjunapro.site${encodeURI(imgUrl)}`} />
            <meta itemProp="name" content={`Dhananjay Misal — Gallery Snapshot ${idx + 1}`} />
            <meta itemProp="author" content="Dhananjay Misal" />

            {/* Visual Image / Placeholder Canvas */}
            <div className="w-full h-full bg-gradient-to-br from-[#0B1120] to-[#1e293b] flex items-center justify-center relative">
              <img
                src={encodeURI(imgUrl)}
                alt={`Dhananjay Misal — Entrepreneur, Innovator & Founder of Arjuna (Gallery Moment ${idx + 1})`}
                title={`Dhananjay Misal Documentary Snapshot ${idx + 1}`}
                loading="lazy"
                itemProp="thumbnail"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 relative z-10"
              />

              {/* Fallback Graphic Badge */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-gray-400 group-hover:text-white transition-colors">
                <ImageIcon className="w-10 h-10 text-amber-400/60 mb-2 group-hover:scale-110 transition-transform" />
                <span className="font-playfair font-semibold text-xs text-gray-300">Documentary Snapshot {idx + 1}</span>
                <span className="text-[10px] font-mono text-gray-500 mt-1">Click to Expand Lightbox</span>
              </div>
            </div>

            {/* Hover Zoom Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6 z-20">
              <span className="text-xs font-playfair font-medium text-white">
                Moment #{idx + 1}
              </span>
              <div className="w-9 h-9 rounded-full bg-amber-600/90 flex items-center justify-center text-white shadow-lg shadow-amber-500/40">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-3 rounded-full glass-card text-white hover:bg-white/20 transition-colors z-50 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={handlePrev}
              className="absolute left-6 p-3 rounded-full glass-card text-white hover:bg-white/20 transition-colors z-50 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl max-h-[85vh] rounded-3xl overflow-hidden glass-card p-3 relative flex items-center justify-center border border-white/20 shadow-2xl"
            >
              <img
                src={selectedImage}
                alt="Gallery Preview"
                className="max-w-full max-h-[75vh] object-contain rounded-2xl"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute bottom-4 left-6 right-6 text-center text-xs font-mono text-gray-300 glass-card py-2 px-4 rounded-full border border-white/10">
                Moment {selectedIndex + 1} of {displayImages.length} • Dhananjay Misal Interactive Gallery
              </div>
            </motion.div>

            <button
              onClick={handleNext}
              className="absolute right-6 p-3 rounded-full glass-card text-white hover:bg-white/20 transition-colors z-50 cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

