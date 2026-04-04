'use client';

import React from 'react';
import { X, Play, Volume2, Maximize, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoPlayerModalProps {
  video: any;
  isOpen: boolean;
  onClose: () => void;
}

const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ video, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        />

        {/* Modal Content */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-5xl bg-zinc-950 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 bg-white/5 border-b border-white/5">
            <h2 className="text-xl font-bold line-clamp-1">{video.title}</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Video Player Placeholder */}
          <div className="aspect-video bg-black relative group">
            <img 
              src={video.thumbnail} 
              className="w-full h-full object-cover opacity-40 blur-sm"
              alt="Video Background"
            />
            
            {/* Simulation UI */}
            <div className="absolute inset-0 flex flex-col justify-between p-8">
              <div className="flex justify-end">
                <div className="bg-red-600 px-3 py-1 rounded text-[10px] font-bold text-white uppercase tracking-widest animate-pulse">
                  Playing Tutorial
                </div>
              </div>

              {/* Controls Overlay */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-accent/90 flex items-center justify-center shadow-accent/20 shadow-2xl">
                    <Play className="w-10 h-10 text-white fill-white ml-2" />
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Progress Bar */}
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-accent rounded-full" />
                  </div>
                  
                  {/* Controls */}
                  <div className="flex items-center justify-between text-white/70">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-3">
                        <Volume2 className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
                        <span className="text-sm font-medium">04:12 / {video.duration}</span>
                      </div>
                      <Maximize className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
                    </div>
                    <Share2 className="w-5 h-5 hover:text-accent cursor-pointer transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="p-8 space-y-4">
            <div className="flex items-center gap-4">
              <div className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-bold text-[10px] uppercase tracking-widest">
                {video.category}
              </div>
              <span className="text-xs opacity-50 font-medium tracking-wide">
                PUBLISHED ON {video.date}
              </span>
            </div>
            <p className="text-white/60 leading-relaxed text-sm">
              This comprehensive video tutorial covers the entire process of {video.title.toLowerCase()}. 
              Follow along with our experts as they demonstrate Holland Dairy's world-class standards 
              using Dutch technology in the Ethiopian context.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default VideoPlayerModal;
