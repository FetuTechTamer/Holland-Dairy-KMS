'use client';

import React, { useState } from 'react';
import { Users, Search, MessageCircle, Mail, Globe, MapPin, Briefcase } from 'lucide-react';
import { mockUsers, User as UserType } from '@/lib/mockData';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import DirectMessageModal from './DirectMessageModal';

const TeamDirectory = () => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'PRODUCTION' | 'QUALITY' | 'LOGISTICS' | 'SALES'>('all');
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const t = translations[language].dashboard.staffConnect;

  const staff = mockUsers.filter(u => u.role === 'STAFF' || u.role === 'ADMIN');

  const filteredStaff = staff.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || u.staffSubRole === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Users className="w-5 h-5 text-accent" />
            {t.teamDirectory}
          </h2>
          <p className="text-xs opacity-50 mt-1">Connect with your colleagues across departments.</p>
        </div>
      </div>

      {/* Search & Tabs */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search staff by name or email..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-10 pr-4 outline-none focus:border-accent/50 transition-all text-sm"
          />
        </div>
        <div className="flex gap-2 p-1.5 bg-white/5 rounded-2xl border border-white/5">
          {['all', 'PRODUCTION', 'QUALITY', 'LOGISTICS', 'SALES'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab 
                ? 'bg-accent text-white shadow-lg' 
                : 'opacity-50 hover:opacity-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map((u) => (
          <div key={u.id} className="glass p-6 rounded-[2.5rem] border border-white/10 hover:border-accent/30 transition-all flex flex-col h-full bg-gradient-to-br from-white/5 to-transparent">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-tr from-accent to-blue-500 p-0.5 shadow-lg">
                <div className="w-full h-full rounded-[1.4rem] bg-slate-900 flex items-center justify-center font-black text-2xl text-white">
                  {u.name.charAt(0)}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">{u.name}</h3>
                <div className="flex flex-wrap gap-2">
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${
                    u.role === 'ADMIN' ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                  }`}>
                    {u.role === 'ADMIN' ? 'MANAGEMENT' : u.staffSubRole}
                  </span>
                  <span className="flex items-center gap-1 text-[9px] font-black text-green-500">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    ONLINE
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-8 flex-1">
              <div className="flex items-center gap-3 text-xs opacity-50 font-medium">
                <Mail className="w-4 h-4 text-blue-400" />
                {u.email}
              </div>
              <div className="flex items-center gap-3 text-xs opacity-50 font-medium">
                <MapPin className="w-4 h-4 text-accent" />
                Bishoftu Plant
              </div>
              <div className="flex items-center gap-3 text-xs opacity-50 font-medium">
                <Briefcase className="w-4 h-4 text-purple-400" />
                Joined {new Date(u.joinDate).toLocaleDateString()}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
              <button 
                onClick={() => setSelectedUser(u)}
                className="flex items-center justify-center gap-2 bg-accent text-white py-2.5 rounded-xl text-[11px] font-black hover:shadow-lg transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                CHAT
              </button>
              <a 
                href={`mailto:${u.email}`} 
                className="flex items-center justify-center gap-2 glass border border-white/10 hover:bg-white/5 py-2.5 rounded-xl text-[11px] font-black transition-all"
              >
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                EMAIL
              </a>
            </div>
          </div>
        ))}
      </div>

      {selectedUser && (
        <DirectMessageModal 
          recipient={selectedUser} 
          onClose={() => setSelectedUser(null)} 
        />
      )}
    </div>
  );
};

export default TeamDirectory;
