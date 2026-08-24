import React, { useEffect, useRef } from 'react';

interface AdSenseUnitProps {
  client?: string;
  slot?: string;
  format?: string;
  responsive?: boolean;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

export const AdSenseUnit: React.FC<AdSenseUnitProps> = ({
  client = 'ca-pub-5070885459873158',
  slot = 'auto',
  format = 'auto',
  responsive = true,
  className = '',
}) => {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      if (typeof window !== 'undefined' && adRef.current) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushed.current = true;
      }
    } catch (err) {
      console.warn('AdSense unit push note:', err);
    }
  }, []);

  return (
    <div className={`my-8 max-w-5xl mx-auto px-4 overflow-hidden text-center ${className}`}>
      <div className="glass-card p-4 rounded-2xl border border-white/10 bg-black/20 text-center relative overflow-hidden">
        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-2 opacity-60">
          Advertisement
        </span>
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', minHeight: '90px' }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive ? 'true' : 'false'}
        />
      </div>
    </div>
  );
};
