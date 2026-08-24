import React, { useState } from 'react';
import { CERTIFICATES_DATA } from '../data/documentary';
import { Award, ShieldCheck, ZoomIn, X, ExternalLink, FileCheck } from 'lucide-react';

interface CertificatesProps {
  certificates?: string[];
}

export const CertificatesSection: React.FC<CertificatesProps> = ({ certificates = [] }) => {
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  return (
    <section id="certificates" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-amber-500/30 text-xs font-playfair text-amber-400 mb-4">
          <FileCheck className="w-3.5 h-3.5" />
          <span className="uppercase tracking-widest font-semibold">Official Credentials</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-playfair font-extrabold text-white tracking-tight mb-4">
          CERTIFICATES & <span className="text-gradient">CREDENTIALS</span>
        </h2>
        <p className="text-base sm:text-lg text-gray-400 font-jakarta leading-relaxed">
          Authentic certificates from IIT Delhi, Pravara Public School ATL Lab, and International Model United Nations.
        </p>
      </div>

      {/* Grid of Certificates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CERTIFICATES_DATA.map((cert, idx) => {
          const imgUrl = certificates[idx] || null;

          return (
            <div
              key={cert.id}
              itemScope
              itemType="https://schema.org/EducationalOccupationalCredential"
              onClick={() => imgUrl && setSelectedCert(imgUrl)}
              className="glass-card p-6 rounded-3xl border border-white/10 hover:border-amber-500/40 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group cursor-pointer"
            >
              <meta itemProp="credentialCategory" content={cert.category} />
              <meta itemProp="name" content={`Dhananjay Misal Certificate — ${cert.title}`} />
              <meta itemProp="recognizedBy" content={cert.issuer} />

              <div>
                {/* Optional Certificate Thumbnail */}
                {imgUrl && (
                  <div className="w-full h-32 rounded-2xl overflow-hidden bg-[#0B1120] mb-4 border border-white/10 relative">
                    <img
                      src={encodeURI(imgUrl)}
                      alt={`Dhananjay Misal Certificate — ${cert.title}`}
                      title={cert.title}
                      loading="lazy"
                      itemProp="image"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                {/* Header Icon */}
                <div className="w-10 h-10 rounded-xl bg-amber-600/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                  <Award className="w-5 h-5" />
                </div>

                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-100 block mb-1">
                  {cert.category}
                </span>

                <h3 className="text-lg font-playfair font-bold text-white group-hover:text-amber-400 transition-colors mb-2">
                  {cert.title}
                </h3>

                <p className="text-xs font-jakarta text-amber-200 mb-3">
                  {cert.issuer}
                </p>

                <p className="text-xs font-jakarta text-gray-400 leading-relaxed mb-4">
                  {cert.description}
                </p>
              </div>

              {/* Action Link */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400">
                <span className="text-amber-400 font-medium">Verify Document</span>
                <ZoomIn className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Certificate Zoom Modal */}
      {selectedCert && (
        <div
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 animate-fade-in"
        >
          <button
            onClick={() => setSelectedCert(null)}
            className="absolute top-6 right-6 p-3 rounded-full glass-card text-white hover:bg-white/20 transition-colors z-50"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl max-h-[85vh] rounded-3xl overflow-hidden glass-card p-4 relative flex flex-col items-center justify-center"
          >
            <img
              src={encodeURI(selectedCert)}
              alt="Certificate Verification"
              className="max-w-full max-h-[75vh] object-contain rounded-xl"
            />
            <span className="text-xs font-mono text-gray-300 mt-4">
              Official Verified Certificate • Dhananjay Misal Portfolio
            </span>
          </div>
        </div>
      )}
    </section>
  );
};
