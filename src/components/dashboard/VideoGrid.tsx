'use client';

import React, { useState } from 'react';
import { Play, Clock, Eye, Video } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { tutorialVideos, Role } from '@/lib/mockData';
import VideoPlayerModal from './VideoPlayerModal';

interface VideoGridProps {
  role: Role;
}

const VideoGrid: React.FC<VideoGridProps> = ({ role }) => {
  const { language } = useLanguage();
  const t = translations[language].dashboard;
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  const filteredVideos = tutorialVideos.filter(v => v.role === role);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredVideos.map((video) => (
          <div 
            key={video.id} 
            className="group relative glass rounded-[2rem] overflow-hidden border border-white/5 shadow-lg hover:shadow-accent/10 transition-all cursor-pointer"
            onClick={() => setSelectedVideo(video)}
          >
            {/* Thumbnail */}
            <div className="aspect-video relative overflow-hidden">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 rounded-full bg-accent/90 flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                  <Play className="w-8 h-8 text-white fill-white ml-1" />
                </div>
              </div>
              <div className="absolute bottom-4 right-4 px-2 py-1 rounded-md bg-black/70 text-[10px] font-bold text-white flex items-center gap-1.5 backdrop-blur-md">
                <Clock className="w-3 h-3" />
                {video.duration}
              </div>
            </div>

            {/* Info */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-accent uppercase tracking-widest">{video.category}</span>
                <span className="text-[10px] opacity-40 flex items-center gap-1.5">
                  <Eye className="w-3 h-3" />
                  {video.views} 
                </span>
              </div>
              <h3 className="font-bold text-lg mb-4 line-clamp-1 group-hover:text-accent transition-colors">
                {video.title}
              </h3>
              <button className="flex items-center gap-2 text-xs font-bold text-accent group-hover:translate-x-1 transition-transform">
                {t.actions.watchNow}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedVideo && (
        <VideoPlayerModal 
          video={selectedVideo} 
          isOpen={!!selectedVideo} 
          onClose={() => setSelectedVideo(null)} 
        />
      )}
    </div>
  );
};

export default VideoGrid;
