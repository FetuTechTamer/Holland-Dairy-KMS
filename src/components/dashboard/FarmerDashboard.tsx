'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { translations } from '@/lib/translations';
import { farmerArticles, Article } from '@/lib/mockData';
import { filterArticles } from '@/lib/searchHelpers';
import GlobalSearchBar from './GlobalSearchBar';
import StatsCards from './StatsCards';
import ArticleCard from './ArticleCard';
import KnowledgeShareFeed from './KnowledgeShareFeed';
import { ChevronRight, Calendar, AlertTriangle, Phone, History, BookMarked } from 'lucide-react';
import RoleBadge from './RoleBadge';

const FarmerDashboard = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const t = translations[language].dashboard;
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredArticles = filterArticles(farmerArticles, searchQuery, activeCategory);

  const categories = [
    { id: 'all', label: t.categories.all },
    { id: 'health', label: t.categories.health },
    { id: 'milkQuality', label: t.categories.milkQuality },
    { id: 'breeding', label: t.categories.breeding },
    { id: 'nutrition', label: t.categories.nutrition },
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            {t.welcome}, <span className="text-accent">{user?.name}</span>
          </h1>
          <div className="flex items-center gap-3">
            <RoleBadge role="FARMER" />
            <span className="text-sm opacity-50 font-medium tracking-wide">
              MEMBER SINCE {user?.joinDate}
            </span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <GlobalSearchBar onSearch={setSearchQuery} />

      {/* Stats Section */}
      <StatsCards role="FARMER" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content: Knowledge Base */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <div className="w-2 h-8 bg-accent rounded-full" />
              {t.sections.featured}
            </h2>
            
            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                    activeCategory === cat.id 
                      ? 'bg-accent text-white shadow-lg' 
                      : 'glass border border-white/10 hover:bg-white/5'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArticles.length > 0 ? (
              filteredArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center glass rounded-3xl border border-white/5 opacity-50">
                <p>No articles found for "{searchQuery}"</p>
              </div>
            )}
          </div>

          {/* Community Section */}
          <div className="pt-10">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <div className="w-2 h-8 bg-blue-500 rounded-full" />
              {t.sections.knowledgeShare}
            </h2>
            <KnowledgeShareFeed role="FARMER" />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <div className="glass p-8 rounded-[2rem] border border-white/10 shadow-xl">
            <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all group">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-bold text-sm">Report Emergency</span>
                </div>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-2xl glass hover:bg-accent hover:text-white transition-all group">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  <span className="font-bold text-sm">Contact Officer</span>
                </div>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-2xl glass hover:bg-accent hover:text-white transition-all group">
                <div className="flex items-center gap-3">
                  <History className="w-5 h-5" />
                  <span className="font-bold text-sm">Payment History</span>
                </div>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Library Section */}
          <div className="glass p-8 rounded-[2rem] border border-white/10">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <BookMarked className="w-5 h-5 text-accent" />
              My Library
            </h3>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-xs opacity-50 mb-1">SAVED ARTICLES</p>
                <p className="text-lg font-bold">12 Items</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-xs opacity-50 mb-1">PERSONAL NOTES</p>
                <textarea 
                  className="w-full bg-transparent border-none p-0 text-sm focus:ring-0 placeholder:opacity-40 h-24 resize-none"
                  placeholder="Type your notes here..."
                />
              </div>
            </div>
          </div>

          {/* Company Updates */}
          <div className="glass p-8 rounded-[2rem] border border-white/10">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              Company Updates
            </h3>
            <div className="space-y-6">
              {[
                { title: 'Milk Price Increase', date: 'April 1st', tag: 'Price' },
                { title: 'New Collection Zone', date: 'March 28th', tag: 'Route' },
                { title: 'Farmer Training Day', date: 'April 15th', tag: 'Event' },
              ].map((update, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-accent uppercase tracking-widest">{update.tag}</span>
                    <span className="text-[10px] opacity-40">{update.date}</span>
                  </div>
                  <p className="font-bold text-sm group-hover:text-accent transition-colors">{update.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
