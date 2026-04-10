'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { translations } from '@/lib/translations';
import { allArticles, tutorialVideos, smsAlerts, paymentRecords, milkRecords as baseMilkRecords, MilkRecord } from '@/lib/mockData';
import { filterArticles } from '@/lib/searchHelpers';
import ArticleCard from './ArticleCard';
import KnowledgeShareFeed from './KnowledgeShareFeed';
import VideoGrid from './VideoGrid';
import RoleBadge from './RoleBadge';
import Breadcrumb from '../Breadcrumb';
import EthiopianDate from './EthiopianDate';
import { Search } from 'lucide-react';
import Link from 'next/link';
import {
  History,
  Edit3, MessageCircle,
  BookOpen, X, Leaf, GraduationCap
} from 'lucide-react';
import { getTodayEthiopian } from '@/lib/ethiopianCalendar';

const FarmerDashboard = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const t = translations[language].dashboard;
  const tF = translations[language].farmer;
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTab, setActiveTab] = useState<'knowledge' | 'chat' | 'training' | 'notes'>('knowledge');

  // Milk records state
  const [milkRecords, setMilkRecords] = useState<MilkRecord[]>(baseMilkRecords.filter(r => r.farmerId === '2'));
  const [showMilkForm, setShowMilkForm] = useState(false);
  const [milkForm, setMilkForm] = useState({ liters: '', quality: 'A' as 'A' | 'B' | 'C', notes: '' });

  // Notes state
  const [notes, setNotes] = useState<{ id: string; text: string; date: string }[]>([
    { id: 'note1', text: 'Remember to clean water troughs before morning collection.', date: '1/9/2019' },
  ]);
  const [noteText, setNoteText] = useState('');

  const farmerAllowedCats = ['cat3', 'cat9', 'cat11'];
  const farmerBaseArticles = allArticles.filter(a =>
    (a.role === 'FARMER' || a.role === 'BOTH') && farmerAllowedCats.includes(a.category)
  );
  const filteredArticles = filterArticles(farmerBaseArticles, searchQuery, activeCategory);

  const farmerVideos = tutorialVideos.filter(v => v.role === 'FARMER' || v.role === 'BOTH');
  const myPayments = paymentRecords.filter(p => p.farmerId === '2');

  const categories = [
    { id: 'all', label: t.categories.all },
    { id: 'cat3', label: t.categories.cat3 },
    { id: 'cat9', label: t.categories.cat9 },
    { id: 'cat11', label: t.categories.cat11 },
  ];

  const tabs = [
    { id: 'knowledge', label: language === 'am' ? 'እውቀት' : 'Knowledge', icon: BookOpen },
    { id: 'chat', label: language === 'am' ? 'ውይይት' : 'Chat', icon: MessageCircle },
    { id: 'training', label: language === 'am' ? 'ስልጠና' : 'Training', icon: GraduationCap },
    { id: 'notes', label: language === 'am' ? 'ማስታወሻዎች' : 'Notes', icon: Edit3 },

  ];

  const handleAddMilk = () => {
    if (!milkForm.liters) return;
    const newRec: MilkRecord = {
      id: `mr-${Date.now()}`,
      farmerId: user?.id || '2',
      date: getTodayEthiopian(),
      liters: Number(milkForm.liters),
      quality: milkForm.quality,
      notes: milkForm.notes,
    };
    setMilkRecords([newRec, ...milkRecords]);
    setMilkForm({ liters: '', quality: 'A', notes: '' });
    setShowMilkForm(false);
  };

  const alertTypeColor = (type: string) => {
    switch (type) {
      case 'DISEASE': return 'bg-red-500/20 text-red-500';
      case 'PRICE': return 'bg-green-500/20 text-green-500';
      case 'EVENT': return 'bg-purple-500/20 text-purple-500';
      default: return 'bg-blue-500/20 text-blue-500';
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <Breadcrumb />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {t.welcome}, <span className="text-accent">{user?.name}</span>
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            <RoleBadge role="FARMER" />
            {user?.farmName && (
              <span className="text-sm font-medium opacity-60 flex items-center gap-1">
                <Leaf className="w-4 h-4" />{user.farmName}
              </span>
            )}
            <span className="text-sm opacity-50 font-medium">
              {t.ethiopianDate}: <EthiopianDate className="font-bold text-foreground" />
            </span>
          </div>
        </div>
        <Link href="/" className="flex items-center gap-2 px-5 py-2.5 rounded-2xl glass border border-accent/20 text-accent font-bold hover:bg-accent hover:text-white transition-all self-start">
          <History className="w-4 h-4 -rotate-90" />
          {translations[language].nav.exitHub}
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto p-1.5 bg-foreground/5 rounded-[2rem] border border-white/5 scrollbar-hide">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-5 py-3 rounded-[1.5rem] text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-accent text-white shadow-lg' : 'opacity-50 hover:opacity-100'
              }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Knowledge */}
      {activeTab === 'knowledge' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-3 space-y-8">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'am' ? 'በእውቀት ቋት ውስጥ ፈልግ...' : 'Search knowledge base...'}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-10 pr-4 outline-none focus:border-accent/50 transition-all text-sm"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeCategory === cat.id ? 'bg-accent text-white' : 'glass border border-white/10 hover:bg-white/5'
                    }`}>{cat.label}</button>
              ))}
            </div>

            {/* Results Count */}
            <div className="text-xs opacity-50">
              {filteredArticles.length} {language === 'am' ? 'ውጤቶች ተገኝተዋል' : 'results found'}
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredArticles.length > 0 ? filteredArticles.map(a => <ArticleCard key={a.id} article={a} />) : (
                <div className="col-span-full py-16 text-center glass rounded-3xl opacity-50">
                  <p>{language === 'am' ? 'ምንም ጽሁፍ አልተገኘም' : 'No articles found'}</p>
                  {searchQuery && (
                    <button
                      onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                      className="mt-3 text-accent text-sm underline"
                    >
                      {language === 'am' ? 'ፍለጋን አጽዳ' : 'Clear search'}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Chat */}
      {activeTab === 'chat' && (
        <div>
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
            <div className="w-2 h-7 bg-indigo-500 rounded-full" />
            {language === 'am' ? 'የሠራተኛ መወያያ' : 'Knowledge Sharing'}
          </h2>
          <KnowledgeShareFeed role="STAFF" />
        </div>
      )}

      {/* Tab: Training */}
      {activeTab === 'training' && (
        <div>
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
            <div className="w-2 h-7 bg-purple-500 rounded-full" />
            {t.sections.videoTraining}
          </h2>
          <VideoGrid role="FARMER" />
        </div>
      )}

      {/* Tab: Notes */}
      {activeTab === 'notes' && (
        <div className="space-y-5">
          <h2 className="text-2xl font-bold">{language === 'am' ? 'የእርሻ ማስታወሻዎች' : 'Farm Notes'}</h2>
          <div className="glass p-5 rounded-3xl border border-white/10">
            <textarea
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
              placeholder={language === 'am' ? 'ማስታወሻ ይጻፉ...' : 'Write a note...'}
              className="w-full bg-transparent outline-none resize-none min-h-[100px] text-sm"
            />
            <div className="flex justify-end mt-3">
              <button onClick={() => {
                if (!noteText.trim()) return;
                setNotes([{ id: `n-${Date.now()}`, text: noteText, date: getTodayEthiopian() }, ...notes]);
                setNoteText('');
              }} className="bg-accent text-white px-5 py-2 rounded-xl font-bold text-sm hover:shadow-lg transition-all">
                {language === 'am' ? 'አስቀምጥ' : 'Save'}
              </button>
            </div>
          </div>
          {notes.map(n => (
            <div key={n.id} className="glass p-5 rounded-2xl border border-white/10 flex justify-between items-start gap-4">
              <p className="text-sm leading-relaxed flex-1">{n.text}</p>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] opacity-40">{n.date}</span>
                <button onClick={() => setNotes(notes.filter(x => x.id !== n.id))}
                  className="p-1 hover:text-red-500 opacity-30 hover:opacity-100 transition-all">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FarmerDashboard;
