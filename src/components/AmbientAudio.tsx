import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';

interface AmbientAudioProps {
  musicUrl?: string;
}

export const AmbientAudio: React.FC<AmbientAudioProps> = ({ musicUrl }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    return localStorage.getItem('dhananjay_audio_muted') === 'true';
  });
  const [volume, setVolume] = useState<number>(() => {
    const saved = localStorage.getItem('dhananjay_audio_vol');
    return saved ? parseFloat(saved) : 0.35;
  });
  const [blockedAutoplay, setBlockedAutoplay] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(false);
  const [hasAudioError, setHasAudioError] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const isSetupRef = useRef<boolean>(false);

  const safeMusicUrl = musicUrl ? encodeURI(musicUrl) : undefined;

  const candidateUrls = [
    safeMusicUrl,
    '/assets/bg.mp3',
    '/music/bg.mp3',
    '/audio/bg.mp3',
    '/bg.mp3'
  ].filter((url, index, self) => url && self.indexOf(url) === index) as string[];

  const [candidateIndex, setCandidateIndex] = useState<number>(0);
  const activeMusicUrl = candidateUrls[candidateIndex];

  // Synchronize MP3 audio element if musicUrl is provided
  useEffect(() => {
    if (activeMusicUrl && audioRef.current && !hasAudioError) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;

      if (!isMuted) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setBlockedAutoplay(false);
        }).catch(() => {
          setBlockedAutoplay(true);
        });
      }
    } else if (hasAudioError || !activeMusicUrl) {
      if (!isMuted && isSetupRef.current && audioCtxRef.current) {
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }
      }
    }
  }, [activeMusicUrl, isMuted, volume, hasAudioError]);

  // Initialize Web Audio Synth for cinematic ambient soundtrack if no MP3 file or audio error
  const initAudioSynth = () => {
    if ((safeMusicUrl && !hasAudioError) || (isSetupRef.current && audioCtxRef.current)) return;

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.value = isMuted ? 0 : volume;
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Create warm ambient chords (D minor / F major ambient pad frequencies)
      const freqs = [146.83, 220.00, 261.63, 329.63, 440.00]; // D3, A3, C4, E4, A4
      const newOscs: OscillatorNode[] = [];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        
        // Sine & triangle blending for warm metallic/space sound
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Low frequency oscillator (LFO) for ambient swell breathing
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.1 + idx * 0.03, ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(0.08, ctx.currentTime);

        lfo.connect(oscGain.gain);
        lfo.start();

        oscGain.gain.setValueAtTime(0.04 / (idx + 1), ctx.currentTime);

        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();

        newOscs.push(osc);
      });

      oscillatorsRef.current = newOscs;
      isSetupRef.current = true;
      setIsPlaying(true);
      setBlockedAutoplay(false);
    } catch (e) {
      console.warn("Audio Context init error:", e);
      setBlockedAutoplay(true);
    }
  };

  // Handle Autoplay trigger on user interaction or mount
  useEffect(() => {
    const handleAutoplayAttempt = async () => {
      if (!isMuted) {
        if (musicUrl && audioRef.current) {
          try {
            await audioRef.current.play();
            setIsPlaying(true);
            setBlockedAutoplay(false);
          } catch {
            setBlockedAutoplay(true);
          }
        } else {
          initAudioSynth();
          if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
            try {
              await audioCtxRef.current.resume();
              setIsPlaying(true);
              setBlockedAutoplay(false);
            } catch {
              setBlockedAutoplay(true);
            }
          }
        }
      }
    };

    const handleFirstClick = () => {
      handleAutoplayAttempt();
      window.removeEventListener('click', handleFirstClick);
      window.removeEventListener('keydown', handleFirstClick);
      window.removeEventListener('touchstart', handleFirstClick);
    };

    window.addEventListener('click', handleFirstClick);
    window.addEventListener('keydown', handleFirstClick);
    window.addEventListener('touchstart', handleFirstClick);

    return () => {
      window.removeEventListener('click', handleFirstClick);
      window.removeEventListener('keydown', handleFirstClick);
      window.removeEventListener('touchstart', handleFirstClick);
    };
  }, [musicUrl]);

  // Update Gain when Volume or Mute state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
    if (gainNodeRef.current && audioCtxRef.current) {
      const targetGain = isMuted ? 0 : volume;
      gainNodeRef.current.gain.setTargetAtTime(targetGain, audioCtxRef.current.currentTime, 0.1);
    }
    localStorage.setItem('dhananjay_audio_muted', String(isMuted));
    localStorage.setItem('dhananjay_audio_vol', String(volume));
  }, [isMuted, volume]);

  const toggleSound = async () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (musicUrl && audioRef.current) {
      if (nextMuted) {
        audioRef.current.pause();
      } else {
        try {
          await audioRef.current.play();
          setBlockedAutoplay(false);
        } catch {
          setBlockedAutoplay(true);
        }
      }
    } else {
      if (!isSetupRef.current) {
        initAudioSynth();
      }

      if (audioCtxRef.current) {
        if (audioCtxRef.current.state === 'suspended') {
          await audioCtxRef.current.resume();
        }
      }
      setBlockedAutoplay(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {activeMusicUrl && !hasAudioError && (
        <audio
          ref={audioRef}
          src={activeMusicUrl}
          loop
          playsInline
          className="hidden"
          onError={() => {
            console.warn("Audio candidate failed to load:", activeMusicUrl);
            if (candidateIndex < candidateUrls.length - 1) {
              setCandidateIndex(prev => prev + 1);
            } else {
              setHasAudioError(true);
              initAudioSynth();
            }
          }}
        />
      )}

      {/* If Autoplay blocked pill */}
      {blockedAutoplay && isMuted && (
        <button
          onClick={toggleSound}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full glass-card text-xs font-playfair tracking-wide text-amber-400 hover:text-white border border-amber-500/30 hover:border-amber-400 shadow-xl shadow-amber-500/10 transition-all duration-300 animate-bounce"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
          <span>Enable Ambient Sound</span>
        </button>
      )}

      {/* Main Ambient Sound Control Card */}
      <div className="glass-card rounded-full p-2 flex items-center gap-2 border border-white/10 shadow-2xl transition-all duration-300">
        <button
          onClick={toggleSound}
          className={`p-2.5 rounded-full transition-all duration-300 ${
            !isMuted
              ? 'bg-amber-600/30 text-amber-400 border border-amber-500/40 glow-blue'
              : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
          }`}
          title={isMuted ? 'Enable Ambient Soundtrack' : 'Mute Soundtrack'}
        >
          {!isMuted ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
        </button>

        <button
          onClick={() => setShowControls(!showControls)}
          className="text-xs font-playfair text-gray-300 hover:text-white px-2 flex items-center gap-1.5 cursor-pointer"
        >
          <Music className="w-3.5 h-3.5 text-amber-300" />
          <span className="hidden sm:inline">Cinematic Sound</span>
          {!isMuted && (
            <div className="flex items-end gap-0.5 h-3 w-3.5 ml-1">
              <span className="w-0.5 bg-amber-400 animate-pulse h-full rounded-full" />
              <span className="w-0.5 bg-purple-400 animate-pulse h-2/3 rounded-full" style={{ animationDelay: '0.2s' }} />
              <span className="w-0.5 bg-indigo-400 animate-pulse h-4/5 rounded-full" style={{ animationDelay: '0.4s' }} />
            </div>
          )}
        </button>

        {showControls && (
          <div className="flex items-center gap-2 pr-3 pl-1 border-l border-white/10 animate-fade-in">
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setVolume(val);
                if (val > 0 && isMuted) setIsMuted(false);
              }}
              className="w-20 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <span className="text-[10px] font-mono text-gray-400 w-6">
              {Math.round((isMuted ? 0 : volume) * 100)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
