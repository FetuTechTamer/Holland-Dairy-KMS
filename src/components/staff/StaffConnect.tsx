'use client';

import React, { useState } from 'react';
import { MessageSquare, Bell, FileText, Users, Globe, History } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import AnnouncementsList from './AnnouncementsList';
import ChatRooms from './ChatRooms';
import StaffKnowledgeShare from './StaffKnowledgeShare';
import TeamDirectory from './TeamDirectory';
import { StaffCommunicationProvider } from '@/context/StaffCommunicationContext';

const StaffConnect = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'announcements' | 'chat' | 'tips' | 'directory'>('announcements');
  const t = translations[language].dashboard.staffConnect;

  const tabs = [
    { id: 'announcements', label: t.announcements, icon: Bell, color: 'text-red-500', bg: 'bg-red-500/10' },
    { id: 'chat', label: t.chatRooms, icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { id: 'tips', label: t.knowledgeShare, icon: FileText, color: 'text-accent', bg: 'bg-accent/10' },
    { id: 'directory', label: t.teamDirectory, icon: Users, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  return (
    <StaffCommunicationProvider>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-black flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-accent to-blue-500 flex items-center justify-center text-white shadow-lg">
                <Globe className="w-6 h-6 animate-pulse" />
              </div>
              {t.title}
            </h1>
            <p className="text-sm opacity-50 mt-2 font-medium tracking-tight">Holland Dairy internal communication and collaboration system.</p>
          </div>

          <div className="flex gap-2 p-1.5 bg-white/5 rounded-2xl border border-white/5 self-end">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  activeTab === tab.id 
                  ? 'bg-white text-slate-900 shadow-xl' 
                  : 'opacity-50 hover:opacity-100 hover:bg-white/5'
                }`}
              >
                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-slate-900' : tab.color}`} />
                <span className="hidden sm:inline uppercase tracking-widest">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="glass p-8 rounded-[3rem] border border-white/10 shadow-2xl bg-gradient-to-br from-white/5 via-transparent to-black/20 min-h-[600px]">
          {activeTab === 'announcements' && <AnnouncementsList />}
          {activeTab === 'chat' && <ChatRooms />}
          {activeTab === 'tips' && <StaffKnowledgeShare />}
          {activeTab === 'directory' && <TeamDirectory />}
        </div>

        {/* Footer Context */}
        <div className="flex justify-center">
          <div className="flex items-center gap-2 px-6 py-3 glass rounded-full border border-white/5 opacity-40 text-[10px] font-black tracking-widest uppercase">
            <History className="w-3.5 h-3.5" />
            End-to-end encrypted staff communication
          </div>
        </div>
      </div>
    </StaffCommunicationProvider>
  );
};

export default StaffConnect;
