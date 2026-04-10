'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { translations } from '@/lib/translations';
import { allArticles, maintenanceLogs, qcRecords, recipes, tutorialVideos } from '@/lib/mockData';
import { filterArticles } from '@/lib/searchHelpers';
import ArticleCard from './ArticleCard';
import KnowledgeShareFeed from './KnowledgeShareFeed';
import VideoGrid from './VideoGrid';
import Link from 'next/link';
import RoleBadge from './RoleBadge';
import Breadcrumb from '../Breadcrumb';
import EthiopianDate from './EthiopianDate';
import LegacyStories from '../staff/LegacyStories';
import StaffConnect from '../staff/StaffConnect';
import { Search, Globe } from 'lucide-react';
import { getTodayEthiopian } from '@/lib/ethiopianCalendar';
import {
  History, ClipboardList,
  BookOpen, FlaskConical, Thermometer, ChefHat, X, AlertTriangle,
  Users, AlertCircle, User, CheckCircle, TrendingUp, XCircle, Plus, MessageCircle, GraduationCap,
  Notebook
} from 'lucide-react';

type StaffTab = 'knowledge' | 'batches' | 'qc' | 'recipes' | 'connect' | 'chat' | 'training' | 'notes' | 'analytics' | 'legacy';

// Quality Control Dashboard Component
const QualityDashboard = ({ language }: { language: string }) => {
  const passed = qcRecords.filter(q => q.status === 'PASS').length;
  const warned = qcRecords.filter(q => q.status === 'WARNING').length;
  const failed = qcRecords.filter(q => q.status === 'FAIL').length;
  const passRate = Math.round((passed / qcRecords.length) * 100);

  const avgFat = (qcRecords.reduce((s, q) => s + q.fat, 0) / qcRecords.length).toFixed(2);
  const avgProtein = (qcRecords.reduce((s, q) => s + q.protein, 0) / qcRecords.length).toFixed(2);
  const avgPH = (qcRecords.reduce((s, q) => s + q.pH, 0) / qcRecords.length).toFixed(2);

  const statusIcon = (s: string) => {
    if (s === 'PASS') return <CheckCircle className="w-4 h-4 text-green-500" />;
    if (s === 'WARNING') return <AlertTriangle className="w-4 h-4 text-amber-500" />;
    return <XCircle className="w-4 h-4 text-red-500" />;
  };
  const statusClass = (s: string) => s === 'PASS' ? 'bg-green-500/20 text-green-500' : s === 'WARNING' ? 'bg-amber-500/20 text-amber-500' : 'bg-red-500/20 text-red-500';

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <FlaskConical className="w-6 h-6 text-blue-500" />
          {language === 'am' ? 'የጥራት ቁጥጥር ዳሽቦርድ' : 'Quality Control Dashboard'}
        </h2>
        <p className="text-sm opacity-50">{language === 'am' ? 'ቢሾፍቱ ፋብሪካ — ያለፉት 30 ቀናት' : 'Bishoftu Plant KPI— Last 30 Days'}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: language === 'am' ? 'የማለፊያ ደረጃ' : 'Pass Rate', value: `${passRate}%`, icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-500/10' },
          { label: language === 'am' ? 'አጠቃላይ ምርመራ' : 'Total Inspections', value: qcRecords.length, icon: FlaskConical, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: language === 'am' ? 'ማስጠንቀቂያዎች' : 'Warnings', value: warned, icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: language === 'am' ? 'ያልተሳኩ' : 'Failed', value: failed, icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
        ].map((k, i) => (
          <div key={i} className="glass p-5 rounded-3xl border border-white/10">
            <div className={`w-10 h-10 rounded-2xl ${k.bg} flex items-center justify-center mb-3`}>
              <k.icon className={`w-5 h-5 ${k.color}`} />
            </div>
            <p className={`text-3xl font-black ${k.color}`}>{k.value}</p>
            <p className="text-xs opacity-50 mt-1 font-bold">{k.label}</p>
          </div>
        ))}
      </div>

      {/* Averages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: language === 'am' ? 'አማካይ ቅባት %' : 'Avg Fat %', value: avgFat, target: '3.5–4.2', ok: parseFloat(avgFat) >= 3.5 },
          { label: language === 'am' ? 'አማካይ ፕሮቲን %' : 'Avg Protein %', value: avgProtein, target: '3.0–3.5', ok: parseFloat(avgProtein) >= 3.0 },
          { label: language === 'am' ? 'አማካይ pH' : 'Avg pH', value: avgPH, target: '4.4–4.7', ok: parseFloat(avgPH) >= 4.4 && parseFloat(avgPH) <= 4.7 },
        ].map((m, i) => (
          <div key={i} className={`glass p-5 rounded-3xl border ${m.ok ? 'border-green-500/20' : 'border-amber-500/20'}`}>
            <p className="text-[10px] opacity-40 font-bold uppercase mb-1">{m.label}</p>
            <p className="text-3xl font-black">{m.value}</p>
            <p className={`text-xs font-bold mt-2 ${m.ok ? 'text-green-500' : 'text-amber-500'}`}>
              {language === 'am' ? 'ዒላማ' : 'Target'}: {m.target} — {m.ok ? (language === 'am' ? '✓ ጥሩ' : '✓ OK') : (language === 'am' ? '⚠ ክልል ውጪ' : '⚠ Out of range')}
            </p>
          </div>
        ))}
      </div>

      {/* Full QC Table */}
      <div className="glass rounded-[2rem] border border-white/10 overflow-x-auto">
        <div className="px-6 py-4 border-b border-white/5">
          <h3 className="font-black text-lg">{language === 'am' ? 'ሙሉ QC ምዝገባ' : 'Full QC Records'}</h3>
        </div>
        <table className="w-full min-w-[800px]">
          <thead className="bg-white/5">
            <tr className="text-[10px] uppercase font-bold opacity-50">
              <th className="px-6 py-3 text-left">{language === 'am' ? 'ቀን' : 'Date'}</th>
              <th className="px-6 py-3 text-left">Batch</th>
              <th className="px-6 py-3 text-left">Fat %</th>
              <th className="px-6 py-3 text-left">Protein %</th>
              <th className="px-6 py-3 text-left">Bacteria/mL</th>
              <th className="px-6 py-3 text-left">pH</th>
              <th className="px-6 py-3 text-left">Temp °C</th>
              <th className="px-6 py-3 text-left">{language === 'am' ? 'ሁኔታ' : 'Status'}</th>
              <th className="px-6 py-3 text-left">{language === 'am' ? 'ተቆጣጣሪ' : 'Inspector'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {qcRecords.map(q => (
              <tr key={q.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-3 text-sm font-bold">{q.date}</td>
                <td className="px-6 py-3 font-mono text-[10px] opacity-60">{q.batchId}</td>
                <td className="px-6 py-3 text-sm">{q.fat}</td>
                <td className="px-6 py-3 text-sm">{q.protein}</td>
                <td className={`px-6 py-3 text-sm font-bold ${q.bacteria > 100000 ? 'text-red-500' : q.bacteria > 30000 ? 'text-amber-500' : ''}`}>
                  {q.bacteria.toLocaleString()}
                </td>
                <td className="px-6 py-3 text-sm">{q.pH}</td>
                <td className={`px-6 py-3 text-sm ${q.temperature > 5 ? 'text-amber-500 font-bold' : ''}`}>{q.temperature}</td>
                <td className="px-6 py-3">
                  <span className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-black w-fit ${statusClass(q.status)}`}>
                    {statusIcon(q.status)}{q.status}
                  </span>
                </td>
                <td className="px-6 py-3 text-xs opacity-60">{q.inspector}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cold Storage */}
      <h3 className="text-xl font-bold flex items-center gap-2 mt-6">
        <Thermometer className="w-5 h-5 text-blue-400" />
        {language === 'am' ? 'ቀዝቃዛ ማሸጊያ ሁኔታ' : 'Cold Storage Status'}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { zone: language === 'am' ? 'ዞን A – እርጎ' : 'Zone A – Yoghurt', temp: 3.8, capacity: 78, status: 'OK' },
          { zone: language === 'am' ? 'ዞን B – ወተት' : 'Zone B – Milk', temp: 4.1, capacity: 55, status: 'OK' },
          { zone: language === 'am' ? 'ዞን C – ቋት' : 'Zone C – Buffer', temp: 5.6, capacity: 22, status: 'WARNING' },
        ].map((z, i) => (
          <div key={i} className={`glass p-5 rounded-2xl border ${z.status === 'OK' ? 'border-green-500/20' : 'border-amber-500/30'}`}>
            <div className="flex justify-between items-start mb-2">
              <p className="font-bold text-sm">{z.zone}</p>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${z.status === 'OK' ? 'bg-green-500/20 text-green-500' : 'bg-amber-500/20 text-amber-500'}`}>{z.status}</span>
            </div>
            <p className="text-3xl font-black mt-2">{z.temp}°C</p>
            <div className="mt-3 h-1.5 w-full bg-white/10 rounded-full">
              <div className="h-full rounded-full bg-blue-400" style={{ width: `${z.capacity}%` }} />
            </div>
            <p className="text-[10px] opacity-40 mt-1">{z.capacity}% {language === 'am' ? 'ሙሉ' : 'capacity used'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const StaffDashboard = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const t = translations[language].dashboard;
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTab, setActiveTab] = useState<StaffTab>('knowledge');

  // Batch records state
  const [batches, setBatches] = useState([
    { id: 'B-2019-0920', product: 'Natural Yoghurt', liters: 1000, date: '20/9/2019', status: 'COMPLETED', inspector: 'Sara S.' },
    { id: 'B-2019-0919', product: 'Strawberry Yoghurt', liters: 1000, date: '19/9/2019', status: 'COMPLETED', inspector: 'Daniel M.' },
    { id: 'B-2019-0918', product: 'Mango Drink', liters: 500, date: '18/9/2019', status: 'QC_HOLD', inspector: 'Sara S.' },
    { id: 'B-2019-0917', product: 'Natural Yoghurt', liters: 1000, date: '17/9/2019', status: 'COMPLETED', inspector: 'Daniel M.' },
  ]);
  const [showBatchForm, setShowBatchForm] = useState(false);
  const [batchForm, setBatchForm] = useState({ product: 'Natural Yoghurt', liters: '1000' });
  // Notes state
  const [notes, setNotes] = useState<{ id: string; text: string; date: string }[]>([
    { id: 'note1', text: 'Remember to clean water troughs before morning collection.', date: '1/9/2019' },
  ]);
  const [noteText, setNoteText] = useState('');

  const getAllowedCategories = () => {
    if (user?.role === 'ADMIN') return ['cat1', 'cat2', 'cat3', 'cat4', 'cat5', 'cat6', 'cat7', 'cat8', 'cat9', 'cat10', 'cat11', 'manufacturing', 'suppliers', 'demographics', 'insights'];
    if (user?.staffSubRole === 'PRODUCTION') return ['cat1', 'cat7', 'cat10'];
    if (user?.staffSubRole === 'QUALITY') return ['cat2', 'cat4', 'cat6'];
    if (user?.staffSubRole === 'LOGISTICS') return ['cat3', 'cat9', 'cat11'];
    return ['cat1', 'cat2', 'cat3'];
  };

  const staffAllowedCats = getAllowedCategories();
  const staffBaseArticles = allArticles.filter(a =>
    (a.role === 'STAFF' || a.role === 'BOTH') && staffAllowedCats.includes(a.category)
  );
  const filteredArticles = filterArticles(staffBaseArticles, searchQuery, activeCategory);

  const categories = [
    { id: 'all', label: t.categories.all },
    ...[
      { id: 'cat1', label: t.categories.cat1 },
      { id: 'cat2', label: t.categories.cat2 },
      { id: 'cat3', label: t.categories.cat3 },
      { id: 'cat4', label: t.categories.cat4 },
      { id: 'cat5', label: t.categories.cat5 },
      { id: 'cat6', label: t.categories.cat6 },
      { id: 'cat7', label: t.categories.cat7 },
      { id: 'cat8', label: t.categories.cat8 },
      { id: 'cat9', label: t.categories.cat9 },
      { id: 'cat10', label: t.categories.cat10 },
      { id: 'cat11', label: t.categories.cat11 },
      { id: 'manufacturing', label: t.categories.manufacturing || 'Manufacturing Processes' },
      { id: 'suppliers', label: t.categories.suppliers || 'Supplier Management' },
      { id: 'demographics', label: t.categories.demographics || 'Sales & Demographics' },
      { id: 'insights', label: t.categories.insights || 'Customer Insights' },
    ].filter(cat => staffAllowedCats.includes(cat.id))
  ];

  const tabs = [
    { id: 'knowledge', label: language === 'am' ? 'እውቀት' : 'Knowledge', icon: BookOpen },
    { id: 'batches', label: language === 'am' ? 'ምርት ባቹ' : 'Batches', icon: ClipboardList, access: ['PRODUCTION', 'QUALITY'] },
    { id: 'qc', label: language === 'am' ? 'QC ላብ' : 'Quality Control Lab', icon: FlaskConical, access: ['QUALITY'] },
    { id: 'recipes', label: language === 'am' ? 'ምግብ ቀመሮች' : 'Recipes', icon: ChefHat, access: ['PRODUCTION'] },
    { id: 'connect', label: language === 'am' ? 'የሰራተኞች ትስስር' : 'Staff Connect', icon: Globe },
    { id: 'chat', label: language === 'am' ? 'ውይይት' : 'Chat', icon: MessageCircle },
    { id: 'training', label: language === 'am' ? 'ስልጠና' : 'Training', icon: GraduationCap },
    { id: 'legacy', label: language === 'am' ? 'የተማርናቸው ትምህርቶች' : 'Lessons Learned', icon: BookOpen },
    { id: 'notes', label: language === 'am' ? 'ማስታወሻዎች' : 'Notes', icon: User },
    { id: 'analytics', label: language === 'am' ? 'ትንታኔ' : 'Analytics', access: ['QUALITY', 'PRODUCTION'] },
  ].filter(tab => !tab.access || user?.role === 'ADMIN' || (user?.staffSubRole && tab.access.includes(user.staffSubRole)));


  const addBatch = () => {
    const today = new Date();
    const d = today.getDate(), m = today.getMonth() + 1, y = today.getFullYear();
    const etDate = `${d}/${m >= 9 ? m - 8 : m + 4}/2019`;
    setBatches([{ id: `B-${Date.now()}`, product: batchForm.product, liters: Number(batchForm.liters), date: etDate, status: 'IN_PROGRESS', inspector: user?.name || 'Staff' }, ...batches]);
    setShowBatchForm(false);
  };

  // Cold storage mock data
  const coldStorage = [
    { zone: 'Zone A – Yoghurt', temp: 3.8, capacity: 78, status: 'OK' },
    { zone: 'Zone B – Milk', temp: 4.1, capacity: 55, status: 'OK' },
    { zone: 'Zone C – Buffer', temp: 5.6, capacity: 22, status: 'WARNING' },
  ];

  // Farmer issues (from mock tickets)
  const farmerIssues = [
    { id: 'ti1', farmer: 'Abebe Bikila', issue: 'Payment missing for Nehase 1 delivery', date: '5/8/2019', priority: 'HIGH', status: 'IN_PROGRESS' },
    { id: 'ti2', farmer: 'Kebede Molla', issue: 'Cow showing respiratory symptoms', date: '10/9/2019', priority: 'HIGH', status: 'OPEN' },
    { id: 'ti3', farmer: 'Almaz Worku', issue: 'Request for clover forage supplier contacts', date: '12/9/2019', priority: 'LOW', status: 'OPEN' },
  ];

  return (
    <div className="space-y-6 pb-20">
      <Breadcrumb />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {t.welcome}, <span className="text-blue-500">{user?.name}</span>
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            <RoleBadge role="STAFF" />
            {user?.department && (
              <span className="text-xs font-bold px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full">{user.department}</span>
            )}
            <span className="text-sm opacity-50 font-medium">
              {t.ethiopianDate}: <EthiopianDate className="font-bold text-foreground" />
            </span>
          </div>
        </div>
        <Link href="/" className="flex items-center gap-2 px-5 py-2.5 rounded-2xl glass border border-blue-500/20 text-blue-500 font-bold hover:bg-blue-500 hover:text-white transition-all self-start">
          <History className="w-4 h-4 -rotate-90" />
          {translations[language].nav.exitHub}
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto p-1.5 bg-foreground/5 rounded-[2rem] border border-white/5 scrollbar-hide">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as StaffTab)}
            className={`flex items-center gap-2 px-5 py-3 rounded-[1.5rem] text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-blue-500 text-white shadow-lg' : 'opacity-50 hover:opacity-100'
              }`}>
            {tab.icon && <tab.icon className="w-4 h-4" />}
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

      {/* ── BATCH RECORDS ── */}
      {activeTab === 'batches' && (
        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{language === 'am' ? 'የምርት ባቹ መዝገቦች' : 'Production Batch Records'}</h2>
            <button onClick={() => setShowBatchForm(!showBatchForm)}
              className="flex items-center gap-2 bg-blue-500 text-white px-5 py-2.5 rounded-2xl font-bold hover:shadow-lg transition-all">
              <Plus className="w-4 h-4" />{language === 'am' ? 'ባቹ አክል' : 'New Batch'}
            </button>
          </div>
          {showBatchForm && (
            <div className="glass p-6 rounded-3xl border border-blue-500/30 animate-in slide-in-from-top-4 duration-300 max-w-xl">
              <h3 className="font-bold mb-4">{language === 'am' ? 'አዲስ ምርት ባቹ' : 'New Production Batch'}</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs font-bold opacity-50 mb-1 block">{language === 'am' ? 'ምርት' : 'Product'}</label>
                  <select value={batchForm.product} onChange={e => setBatchForm({ ...batchForm, product: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/40">
                    <option>Natural Yoghurt</option>
                    <option>Strawberry Yoghurt</option>
                    <option>Mango Drink</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold opacity-50 mb-1 block">{language === 'am' ? 'ሊትር' : 'Liters'}</label>
                  <input type="number" value={batchForm.liters} onChange={e => setBatchForm({ ...batchForm, liters: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/40" />
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={addBatch} className="bg-blue-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:shadow-lg transition-all flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />{language === 'am' ? 'አስቀምጥ' : 'Save'}
                </button>
                <button onClick={() => setShowBatchForm(false)} className="glass px-6 py-2.5 rounded-xl font-bold text-sm">{language === 'am' ? 'ሰርዝ' : 'Cancel'}</button>
              </div>
            </div>
          )}
          <div className="glass rounded-3xl border border-white/10 overflow-hidden">
            <table className="w-full min-w-[600px]">
              <thead className="bg-white/5">
                <tr className="text-[10px] uppercase font-bold opacity-50">
                  <th className="px-6 py-3 text-left">Batch ID</th>
                  <th className="px-6 py-3 text-left">{language === 'am' ? 'ምርት' : 'Product'}</th>
                  <th className="px-6 py-3 text-left">{language === 'am' ? 'ሊትር' : 'Liters'}</th>
                  <th className="px-6 py-3 text-left">{language === 'am' ? 'ቀን' : 'Date'}</th>
                  <th className="px-6 py-3 text-left">{language === 'am' ? 'ሁኔታ' : 'Status'}</th>
                  <th className="px-6 py-3 text-left">{language === 'am' ? 'ተቆጣጣሪ' : 'Inspector'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {batches.map(b => (
                  <tr key={b.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs font-bold">{b.id}</td>
                    <td className="px-6 py-4 text-sm font-bold">{b.product}</td>
                    <td className="px-6 py-4 text-sm font-bold text-blue-500">{b.liters}L</td>
                    <td className="px-6 py-4 text-xs opacity-60">{b.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black ${statusColor(b.status)}`}>{b.status}</span>
                    </td>
                    <td className="px-6 py-4 text-xs opacity-60">{b.inspector}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── QC LAB ── */}
      {activeTab === 'qc' && (
        <QualityDashboard language={language} />
      )}

      {/* ── RECIPES ── */}
      {activeTab === 'recipes' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {recipes.map(r => (
              <div key={r.id} className="glass p-6 rounded-3xl border border-white/10 hover:border-blue-500/20 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-black text-lg">{language === 'am' && r.nameAm ? r.nameAm : r.name}</h3>
                    <p className="text-xs opacity-40">{language === 'am' ? 'ዕትም' : 'Version'} {r.version} • {r.lastUpdated}</p>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full">{r.batchSizeLiters}L</span>
                </div>
                <div className="space-y-1 mb-4">
                  <p className="text-[10px] font-black opacity-40 uppercase">{language === 'am' ? 'ጥሬ ዕቃዎች' : 'Ingredients'}</p>
                  {r.ingredients.map((ing, i) => (
                    <div key={i} className="flex justify-between text-xs">
                      <span className="opacity-70">{ing.name}</span>
                      <span className="font-bold">{ing.amount} {ing.unit}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/5 pt-3">
                  <p className="text-[10px] font-black opacity-40 uppercase mb-1">{language === 'am' ? 'ደረጃዎች' : 'Steps'}: {r.steps.length}</p>
                  <p className="text-xs opacity-50 leading-relaxed line-clamp-2">{r.steps[0]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── STAFF CONNECT ── */}
      {activeTab === 'connect' && (
        <StaffConnect />
      )}

      {/* ── TRAINING── */}
      {activeTab === 'training' && (
        <div>
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
            <div className="w-2 h-7 bg-purple-500 rounded-full" />{t.sections.videoTraining}
          </h2>
          <VideoGrid role="STAFF" />
        </div>
      )}

      {/* ── LEGACY STORIES ── */}
      {activeTab === 'legacy' && (
        <LegacyStories />
      )}

      {/* ── ANALYTICS ── */}
      {activeTab === 'analytics' && (
        <div className="space-y-6 animate-in fade-in duration-500">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-500" />
            {language === 'am' ? 'የምርት አፈጻጸም ትንታኔ' : 'Product Performance Analytics'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Best Selling Products */}
            <div className="glass p-5 rounded-3xl border border-white/10 flex flex-col items-stretch">
              <h3 className="text-sm font-bold opacity-60 uppercase mb-4">{language === 'am' ? 'ምርጥ የሚሸጡ ምርቶች' : 'Best Selling Products'}</h3>
              <ul className="space-y-3 flex-1 flex flex-col justify-center">
                <li className="flex justify-between items-center bg-blue-500/10 p-4 rounded-2xl">
                  <span className="font-bold">#1 Natural Yoghurt</span>
                  <span className="text-[10px] uppercase font-black bg-blue-500 text-white px-3 py-1 rounded-full whitespace-nowrap">35% Margin</span>
                </li>
                <li className="flex justify-between items-center bg-pink-500/10 p-4 rounded-2xl">
                  <span className="font-bold">#2 Strawberry Yoghurt</span>
                  <span className="text-[10px] uppercase font-black bg-pink-500 text-white px-3 py-1 rounded-full whitespace-nowrap">40% Margin</span>
                </li>
                <li className="flex justify-between items-center bg-amber-500/10 p-4 rounded-2xl">
                  <span className="font-bold">#3 Mango Drink</span>
                  <span className="text-[10px] uppercase font-black bg-amber-500 text-white px-3 py-1 rounded-full whitespace-nowrap">38% Margin</span>
                </li>
              </ul>
            </div>

            {/* Quality & Returns */}
            <div className="glass p-5 rounded-3xl border border-white/10 space-y-6">
              <div>
                <h3 className="text-sm font-bold opacity-60 uppercase mb-3">{language === 'am' ? 'የጥራት ውድቅ ምጣኔ' : 'Quality Rejection Rate'}</h3>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-4xl font-black text-green-500">1.2%</span>
                  <span className="text-xs opacity-50 mb-1">by batch</span>
                </div>
                <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full rounded-full" style={{ width: '98.8%' }}></div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold opacity-60 uppercase mb-3">{language === 'am' ? 'የደንበኛ መመለስ ምጣኔ' : 'Customer Return Rate'}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                    <span>Natural Yoghurt</span>
                    <span className="font-bold bg-green-500/10 text-green-400 px-2.5 py-1 rounded-xl">0.05%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Strawberry Yoghurt</span>
                    <span className="font-bold bg-amber-500/10 text-amber-500 px-2.5 py-1 rounded-xl">0.12%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Production Volume */}
            <div className="glass p-6 rounded-3xl border border-white/10 md:col-span-2 lg:col-span-1 border-t-4 border-t-blue-500">
              <h3 className="text-sm font-bold opacity-60 uppercase mb-1">{language === 'am' ? 'ወርሃዊ ምርት መጠን' : 'Monthly Production Volume'}</h3>
              <p className="text-[10px] opacity-40 mb-5 font-bold uppercase">{language === 'am' ? 'ያለፉት 6 ወራት (በኢት. አቆጣጠር)' : 'Last 6 months (Ethiopian Calendar)'}</p>

              <div className="space-y-4">
                {[
                  { month: 'Meskerem', vol: 120000, color: 'bg-blue-400' },
                  { month: 'Tikimt', vol: 115000, color: 'bg-blue-400' },
                  { month: 'Hidar', vol: 130000, color: 'bg-blue-500' },
                  { month: 'Tahsas', vol: 145000, color: 'bg-blue-600' },
                  { month: 'Tir', vol: 140000, color: 'bg-blue-500' },
                  { month: 'Yekatit', vol: 155000, color: 'bg-blue-500' },
                ].map((m, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-16 text-[10px] font-black uppercase opacity-60">{m.month}</span>
                    <div className="flex-1 bg-white/5 h-3.5 rounded-full overflow-hidden">
                      <div className={`h-full ${m.color} rounded-r-full shadow-lg transition-all duration-1000 ease-in-out`} style={{ width: `${(m.vol / 160000) * 100}%` }}></div>
                    </div>
                    <span className="w-16 text-xs text-right font-bold text-blue-400">{m.vol.toLocaleString()}L</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notes */}
      {activeTab === 'notes' && (
        <div className="space-y-5">
          <h2 className="text-2xl font-bold">{language === 'am' ? 'የሰራተኛ ማስታወሻዎች' : 'Staff Notes'}</h2>
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

      {/* ── CHATS── */}
      {activeTab === 'chat' && (
        <div>
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
            <div className="w-2 h-7 bg-indigo-500 rounded-full" />
            {language === 'am' ? 'የሠራተኛ መወያያ' : 'Knowledge Sharing'}
          </h2>
          <KnowledgeShareFeed role="STAFF" />
        </div>
      )}

    </div>
  );
};

export default StaffDashboard;