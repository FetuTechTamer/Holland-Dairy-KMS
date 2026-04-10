'use client';

import React, { useState } from 'react';
import { Bell, User, CheckCircle, Plus, Send, X } from 'lucide-react';
import { useStaffCommunication } from '@/context/StaffCommunicationContext';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

const AnnouncementsList = () => {
  const { announcements, markAsRead, postAnnouncement } = useStaffCommunication();
  const { user } = useAuth();
  const { language } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const t = translations[language].dashboard.staffConnect;

  const [formData, setFormData] = useState({
    title: '',
    message: '',
    isUrgent: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.message) return;
    postAnnouncement(formData.title, formData.message, formData.isUrgent);
    setFormData({ title: '', message: '', isUrgent: false });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Bell className="w-5 h-5 text-accent" />
          {t.announcements}
        </h2>
        {user?.role === 'ADMIN' && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-xl text-sm font-bold hover:shadow-lg transition-all"
          >
            {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {showForm ? 'Cancel' : t.postAnnouncement}
          </button>
        )}
      </div>

      {showForm && (
        <div className="glass p-6 rounded-3xl border border-accent/20 animate-in slide-in-from-top-4 duration-300">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              required
              placeholder="Announcement Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent/50"
            />
            <textarea
              required
              placeholder="Announcement Message..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent/50 min-h-[100px]"
            />
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isUrgent}
                  onChange={(e) => setFormData({ ...formData, isUrgent: e.target.checked })}
                  className="w-4 h-4 accent-red-500"
                />
                <span className="text-xs font-bold text-red-500">Urgent Announcement</span>
              </label>
              <button type="submit" className="bg-accent text-white px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                <Send className="w-4 h-4" />
                Post
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {announcements.map((ann) => {
          const isRead = ann.readBy.includes(user?.id || '');
          return (
            <div
              key={ann.id}
              className={`glass p-5 rounded-3xl border transition-all ${
                ann.isUrgent ? 'border-red-500/30 bg-red-500/5' : 'border-white/10'
              } ${!isRead ? 'ring-1 ring-accent/30' : 'opacity-80'}`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                    ann.isUrgent ? 'bg-red-500/20 text-red-500' : 'bg-accent/20 text-accent'
                  }`}>
                    {ann.isUrgent ? <Bell className="w-5 h-5 animate-bounce" /> : <Bell className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className={`font-black ${ann.isUrgent ? 'text-red-500' : ''}`}>{ann.title}</h3>
                    <div className="flex items-center gap-2 text-[10px] opacity-50 font-bold uppercase tracking-tighter">
                      <User className="w-3 h-3" />
                      {ann.author} ({ann.authorRole}) • {ann.timestamp}
                    </div>
                  </div>
                </div>
                {!isRead && (
                  <button
                    onClick={() => markAsRead(ann.id)}
                    className="flex items-center gap-1.5 px-3 py-1 bg-accent/20 text-accent rounded-full text-[10px] font-black hover:bg-accent hover:text-white transition-all"
                  >
                    <CheckCircle className="w-3 h-3" />
                    MARK AS READ
                  </button>
                )}
              </div>
              <p className="text-sm opacity-80 leading-relaxed pl-13">
                {ann.message}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnnouncementsList;
