'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { translations } from '@/lib/translations';
import { staffArticles, Article } from '@/lib/mockData';
import { filterArticles } from '@/lib/searchHelpers';
import GlobalSearchBar from './GlobalSearchBar';
import StatsCards from './StatsCards';
import ArticleCard from './ArticleCard';
import KnowledgeShareFeed from './KnowledgeShareFeed';
import RoleBadge from './RoleBadge';
import Breadcrumb from '../Breadcrumb';
import Link from 'next/link';
import {
  History,
  Shield,
  ChevronRight,
  Settings,
  Zap,
  HelpCircle,
  HardHat,
  ClipboardList
} from 'lucide-react';

const StaffDashboard = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const t = translations[language].dashboard;
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredArticles = filterArticles(staffArticles, searchQuery, activeCategory);

  const categories = [
    { id: 'all', label: t.categories.all },
    { id: 'processing', label: t.categories.processing },
    { id: 'safety', label: t.categories.safety },
    { id: 'logistics', label: t.categories.logistics },
    { id: 'milkQuality', label: t.categories.milkQuality },
  ];

  return (
    <div className="space-y-6 pb-20">
      <Breadcrumb />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            {t.welcome}, <span className="text-blue-500">{user?.name}</span>
          </h1>
          <div className="flex items-center gap-3">
            <RoleBadge role="STAFF" />
            <span className="text-sm opacity-50 font-medium tracking-wide uppercase">
              {user?.department} DEPARTMENT
            </span>
          </div>
        </div>

        <Link
          href="/"
          className="flex items-center gap-3 px-6 py-3 rounded-2xl glass border border-accent/20 text-accent font-bold hover:bg-accent hover:text-white transition-all shadow-lg group self-start md:self-center"
        >
          <History className="w-5 h-5 -rotate-90 group-hover:-translate-x-1 transition-transform" />
          {translations[language].nav.exitHub}
        </Link>
      </div>

      {/* Search Bar */}
      <GlobalSearchBar onSearch={setSearchQuery} />

      {/* Stats Section */}
      <StatsCards role="STAFF" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content: Internal Knowledge */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <div className="w-2 h-8 bg-blue-500 rounded-full" />
              SOPs & Manuals
            </h2>

            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${activeCategory === cat.id
                    ? 'bg-blue-500 text-white shadow-lg'
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
                <p>No documents found matching your search</p>
              </div>
            )}
          </div>

          <div className="pt-10">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <div className="w-2 h-8 bg-indigo-500 rounded-full" />
              Department Discussion
            </h2>
            <KnowledgeShareFeed role="STAFF" />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <div className="glass p-8 rounded-[2rem] border border-white/10 shadow-xl">
            <h3 className="text-xl font-bold mb-6">Internal Actions</h3>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500 hover:text-white transition-all group">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5" />
                  <span className="font-bold text-sm">Report Safety Issue</span>
                </div>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-2xl glass hover:bg-blue-500 hover:text-white transition-all group">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5" />
                  <span className="font-bold text-sm">Request Maintenance</span>
                </div>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-2xl glass hover:bg-blue-500 hover:text-white transition-all group">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5" />
                  <span className="font-bold text-sm">Submit Improvement</span>
                </div>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Internal Support */}
          <div className="glass p-8 rounded-[2rem] border border-white/10 bg-indigo-500/5">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-500" />
              Internal Support
            </h3>
            <p className="text-sm opacity-60 mb-6 font-medium">Need IT help or have HR questions? Reach out directly.</p>
            <button className="w-full bg-indigo-500 text-white font-bold py-4 rounded-2xl shadow-xl hover:shadow-indigo-500/20 active:scale-95 transition-all">
              Submit Internal Ticket
            </button>
          </div>

          {/* Training & Development */}
          <div className="glass p-8 rounded-[2rem] border border-white/10 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <HardHat className="w-20 h-20" />
            </div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-emerald-500" />
              My Training
            </h3>
            <div className="space-y-6">
              {[
                { title: 'Dutch Quality Standards', progress: 100, status: 'Completed' },
                { title: 'Chemical Safety v2', progress: 45, status: 'In Progress' },
                { title: 'Machine Operation', progress: 0, status: 'Not Started' },
              ].map((training, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold">{training.title}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${training.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-amber-500/20 text-amber-500'
                      }`}>{training.status}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${training.progress === 100 ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                      style={{ width: `${training.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
