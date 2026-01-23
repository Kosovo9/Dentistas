
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("User interaction required for autoplay"));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-8 left-8 z-[100]">
      <audio 
        ref={audioRef} 
        loop 
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
      />
      
      <motion.button
        onClick={togglePlay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`flex items-center gap-3 p-3 rounded-full backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-700 ${isPlaying ? 'bg-gold-luxury text-navy-luxury' : 'bg-navy-luxury/40 text-white/40 hover:text-white'}`}
      >
        <div className="w-10 h-10 rounded-full flex items-center justify-center relative overflow-hidden">
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.svg key="pause" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></motion.svg>
            ) : (
              <motion.svg key="play" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></motion.svg>
            )}
          </AnimatePresence>
          
          {isPlaying && (
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute inset-0 border-2 border-dashed border-navy-luxury/20 rounded-full"
            />
          )}
        </div>
        
        <div className="pr-4 flex flex-col items-start leading-none">
          <span className="text-[8px] font-black uppercase tracking-widest opacity-60">Ambientación</span>
          <span className="text-[10px] font-bold uppercase tracking-widest">{isPlaying ? 'Dental Spa ON' : 'Activar Música'}</span>
        </div>
      </motion.button>
    </div>
  );
};

export default MusicPlayer;
