'use client';

import React, { useState } from 'react';
import { FileText, ThumbsUp, MessageSquare, Plus, Search, Filter, Send, X } from 'lucide-react';
import { useStaffCommunication } from '@/context/StaffCommunicationContext';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { KnowledgeTip } from '@/lib/staffCommunicationData';

const StaffKnowledgeShare = () => {
  const { tips, postTip, toggleHelpful } = useStaffCommunication();
  const { user } = useAuth();
  const { language } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const t = translations[language].dashboard.staffConnect;

  const [formData, setFormData] = useState({
    title: '',
    text: '',
    category: 'Production Tip' as KnowledgeTip['category']
  });

  const categories = ['Production Tip', 'Quality Tip', 'Logistics Tip', 'Safety Tip', 'Efficiency'];

  const filteredTips = tips.filter(tip => {
    const matchesSearch = tip.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         tip.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || tip.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.text) return;
    postTip(formData.title, formData.text, formData.category);
    setFormData({ title: '', text: '', category: 'Production Tip' });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FileText className="w-5 h-5 text-accent" />
            {t.knowledgeShare}
          </h2>
          <p className="text-xs opacity-50 mt-1">Shared by staff, for staff. Improve our dairy together.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-2xl font-bold hover:shadow-lg transition-all"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? 'Cancel' : t.shareTip}
        </button>
      </div>

      {showForm && (
        <div className="glass p-6 rounded-[2rem] border border-accent/20 animate-in slide-in-from-top-4 duration-300">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold opacity-50 ml-1">Tip Title</label>
                <input
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Pasteurizer cleaning shortcut"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold opacity-50 ml-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent/50"
                >
                  {categories.map(cat => <option key={cat} value={cat} className="bg-slate-900">{cat}</option>)}
                </select>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold opacity-50 ml-1">The Tip / Lesson</label>
              <textarea
                required
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                placeholder="Describe what you learned or how to do something better..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent/50 min-h-[120px]"
              />
            </div>
            <div className="flex justify-end">
              <button type="submit" className="bg-accent text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:shadow-lg transition-all">
                <Send className="w-4 h-4" />
                Share Tip
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search shared tips..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-10 pr-4 outline-none focus:border-accent/50 transition-all text-sm"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeCategory === 'all' ? 'bg-accent text-white' : 'glass border border-white/10 hover:bg-white/5'
            }`}
          >
            All Tips
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeCategory === cat ? 'bg-accent text-white' : 'glass border border-white/10 hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTips.map((tip) => (
          <div key={tip.id} className="glass p-6 rounded-[2rem] border border-white/10 hover:border-accent/30 transition-all group flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black px-3 py-1 bg-accent/10 text-accent rounded-full border border-accent/20">
                  {tip.category}
                </span>
                <span className="text-[10px] opacity-40 font-bold">{tip.timestamp}</span>
              </div>
              <h3 className="text-lg font-black mb-2 group-hover:text-accent transition-colors">{tip.title}</h3>
              <p className="text-sm opacity-60 leading-relaxed mb-6 italic">"{tip.text}"</p>
            </div>
            <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs uppercase">
                  {tip.author.charAt(0)}
                </div>
                <div>
                  <p className="text-[10px] font-black">{tip.author}</p>
                  <p className="text-[9px] opacity-40 uppercase tracking-tighter">{tip.authorSubRole}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => toggleHelpful(tip.id)}
                  className="flex items-center gap-1.5 text-accent hover:bg-accent/10 px-3 py-1.5 rounded-full transition-all"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-[10px] font-black">{tip.helpfulCount} {t.helpful}</span>
                </button>
                <div className="flex items-center gap-1 text-blue-400 opacity-60">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-[10px] font-black">{tip.comments}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffKnowledgeShare;
