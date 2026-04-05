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
import RoleBadge from './RoleBadge';
import Breadcrumb from '../Breadcrumb';
import EthiopianDate from './EthiopianDate';
import Link from 'next/link';
import { getTodayEthiopian } from '@/lib/ethiopianCalendar';
import {
  History, Shield, Settings, ClipboardList, HardHat,
  BookOpen, FlaskConical, Wrench, Thermometer, ChefHat, X,
  Users, AlertCircle, CheckCircle, Clock, Plus, MessageCircle, GraduationCap,
  Notebook
} from 'lucide-react';

type StaffTab = 'knowledge' | 'batches' | 'qc' | 'maintenance' | 'recipes' | 'farmers' | 'chat' | 'training' | 'notes';

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

  const staffAllowedCats = ['cat1', 'cat2', 'cat3', 'cat6', 'cat7', 'cat9', 'cat10', 'cat11'];
  const staffBaseArticles = allArticles.filter(a =>
    (a.role === 'STAFF' || a.role === 'BOTH') && staffAllowedCats.includes(a.category)
  );
  const filteredArticles = filterArticles(staffBaseArticles, searchQuery, activeCategory);

  const categories = [
    { id: 'all', label: t.categories.all },
    { id: 'cat1', label: t.categories.cat1 },
    { id: 'cat2', label: t.categories.cat2 },
    { id: 'cat6', label: t.categories.cat6 },
    { id: 'cat7', label: t.categories.cat7 },
    { id: 'cat9', label: t.categories.cat9 },
  ];

  const tabs = [
    { id: 'knowledge', label: language === 'am' ? 'እውቀት' : 'Knowledge', icon: BookOpen },
    { id: 'batches', label: language === 'am' ? 'ምርት ባቹ' : 'Batches', icon: ClipboardList },
    { id: 'qc', label: language === 'am' ? 'QC ላብ' : 'QC Lab', icon: FlaskConical },
    { id: 'maintenance', label: language === 'am' ? 'ጥገና' : 'Maintenance', icon: Wrench },
    { id: 'recipes', label: language === 'am' ? 'ምግብ ቀመሮች' : 'Recipes', icon: ChefHat },
    { id: 'farmers', label: language === 'am' ? 'አርሶ አደሮች' : 'Farmers Support', icon: Users },
    { id: 'chat', label: language === 'am' ? 'ውይይት' : 'Chat', icon: MessageCircle },
    { id: 'training', label: language === 'am' ? 'ስልጠና' : 'Training', icon: GraduationCap },
    { id: 'notes', label: language === 'am' ? 'ማስታወሻዎች' : 'Notes', icon: Notebook },
  ];

  const statusColor = (status: string) => {
    if (status === 'OK' || status === 'COMPLETED' || status === 'PASS') return 'bg-green-500/20 text-green-500';
    if (status === 'DUE' || status === 'WARNING' || status === 'QC_HOLD') return 'bg-amber-500/20 text-amber-500';
    return 'bg-red-500/20 text-red-500';
  };

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
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── KNOWLEDGE ── */}
      {activeTab === 'knowledge' && (
        <div className="space-y-8">
          {/* Categories & Articles Section */}
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeCategory === cat.id ? 'bg-blue-500 text-white' : 'glass border border-white/10 hover:bg-white/5'
                    }`}>{cat.label}</button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredArticles.map(a => <ArticleCard key={a.id} article={a} />)}
              {filteredArticles.length === 0 && (
                <div className="col-span-full py-16 text-center glass rounded-3xl opacity-50">
                  <p>{language === 'am' ? 'ምንም ጽሁፍ አልተገኘም' : 'No articles found'}</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Below all categories and articles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <div className="glass p-6 rounded-3xl border border-white/10">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-500" />
                {language === 'am' ? 'ፈጣን ድርጊቶች' : 'Quick Actions'}
              </h3>
              <div className="space-y-3">
                {[
                  { label: language === 'am' ? 'ደህንነት ሪፖርት' : 'Report Safety Issue', icon: Shield, color: 'bg-red-500/10 text-red-500 hover:bg-red-500' },
                  { label: language === 'am' ? 'ጥገና ጠይቅ' : 'Request Maintenance', icon: Wrench, color: 'bg-amber-500/10 text-amber-500 hover:bg-amber-500' },
                  { label: language === 'am' ? 'QC ዳሽቦርድ' : 'QC Dashboard', icon: FlaskConical, color: 'bg-blue-500/10 text-blue-500 hover:bg-blue-500', href: '/quality-dashboard' },
                ].map((action, i) => action.href ? (
                  <Link key={i} href={action.href}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-2xl ${action.color} hover:text-white transition-all group text-sm font-bold`}>
                    <action.icon className="w-4 h-4" />
                    {action.label}
                  </Link>
                ) : (
                  <button key={i} className={`w-full flex items-center gap-3 p-3.5 rounded-2xl ${action.color} hover:text-white transition-all group text-sm font-bold`}>
                    <action.icon className="w-4 h-4" />{action.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Maintenance due alerts */}
            <div className="glass p-6 rounded-3xl border border-white/10">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                {language === 'am' ? 'ጥገና ማሳወቂያ' : 'Maintenance Alerts'}
              </h3>
              <div className="space-y-3">
                {maintenanceLogs.filter(m => m.status !== 'OK').map(m => (
                  <div key={m.id} className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                    <p className="text-xs font-bold text-amber-500">{m.status === 'OVERDUE' ? (language === 'am' ? 'ዘግይቷል' : '⚠ OVERDUE') : (language === 'am' ? 'ሊደርስ' : 'DUE')}</p>
                    <p className="text-sm font-bold mt-1">{m.equipment}</p>
                    <p className="text-[10px] opacity-50">{language === 'am' ? 'ቀጣይ:' : 'Due:'} {m.nextService}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Training progress */}
            <div className="glass p-6 rounded-3xl border border-white/10">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <HardHat className="w-5 h-5 text-emerald-500" />
                {language === 'am' ? 'ሥልጠናዬ' : 'My Training'}
              </h3>
              {[
                { title: 'Dutch Quality Standards', progress: 100 },
                { title: 'Chemical Safety v2', progress: 45 },
                { title: 'Machine Operation Cert', progress: 0 },
              ].map((tr, i) => (
                <div key={i} className="mb-4">
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="opacity-70">{tr.title}</span>
                    <span className={tr.progress === 100 ? 'text-emerald-500' : 'text-amber-500'}>{tr.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full">
                    <div className={`h-full rounded-full ${tr.progress === 100 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${tr.progress}%` }} />
                  </div>
                </div>
              ))}
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
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{language === 'am' ? 'QC ላብ ዳሽቦርድ' : 'QC Lab Dashboard'}</h2>
            <Link href="/quality-dashboard" className="text-sm font-bold text-blue-500 hover:underline flex items-center gap-1">
              {language === 'am' ? 'ሙሉ ዳሽቦርድ' : 'Full Dashboard'} →
            </Link>
          </div>
          {/* Summary cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: language === 'am' ? 'የአለፉ' : 'Passed', value: qcRecords.filter(q => q.status === 'PASS').length, color: 'text-green-500' },
              { label: language === 'am' ? 'ማስጠንቀቂያ' : 'Warnings', value: qcRecords.filter(q => q.status === 'WARNING').length, color: 'text-amber-500' },
              { label: language === 'am' ? 'ያልተሳኩ' : 'Failed', value: qcRecords.filter(q => q.status === 'FAIL').length, color: 'text-red-500' },
              { label: language === 'am' ? 'አጠቃላይ' : 'Total', value: qcRecords.length, color: 'text-blue-500' },
            ].map((s, i) => (
              <div key={i} className="glass p-5 rounded-2xl border border-white/10 text-center">
                <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
                <p className="text-xs opacity-50 font-bold mt-1">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="glass rounded-3xl border border-white/10 overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="bg-white/5">
                <tr className="text-[10px] uppercase font-bold opacity-50">
                  <th className="px-5 py-3 text-left">{language === 'am' ? 'ቀን' : 'Date'}</th>
                  <th className="px-5 py-3 text-left">Batch ID</th>
                  <th className="px-5 py-3 text-left">Fat %</th>
                  <th className="px-5 py-3 text-left">Protein %</th>
                  <th className="px-5 py-3 text-left">pH</th>
                  <th className="px-5 py-3 text-left">Temp °C</th>
                  <th className="px-5 py-3 text-left">{language === 'am' ? 'ሁኔታ' : 'Status'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {qcRecords.map(q => (
                  <tr key={q.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-5 py-3 text-xs font-bold">{q.date}</td>
                    <td className="px-5 py-3 font-mono text-[10px] opacity-60">{q.batchId}</td>
                    <td className="px-5 py-3 text-sm">{q.fat}</td>
                    <td className="px-5 py-3 text-sm">{q.protein}</td>
                    <td className="px-5 py-3 text-sm">{q.pH}</td>
                    <td className="px-5 py-3 text-sm">{q.temperature}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black ${statusColor(q.status)}`}>{q.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Cold Storage */}
          <h3 className="text-xl font-bold mt-8 flex items-center gap-2">
            <Thermometer className="w-5 h-5 text-blue-400" />
            {language === 'am' ? 'ቀዝቃዛ ማሸጊያ ሁኔታ' : 'Cold Storage Status'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {coldStorage.map((z, i) => (
              <div key={i} className={`glass p-6 rounded-2xl border ${z.status === 'OK' ? 'border-green-500/20' : 'border-amber-500/20'}`}>
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-sm">{z.zone}</h4>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${statusColor(z.status)}`}>{z.status}</span>
                </div>
                <p className="text-3xl font-black mb-1">{z.temp}°C</p>
                <div className="h-1.5 w-full bg-white/10 rounded-full mt-3">
                  <div className="h-full rounded-full bg-blue-400" style={{ width: `${z.capacity}%` }} />
                </div>
                <p className="text-[10px] opacity-40 mt-1">{z.capacity}% {language === 'am' ? 'ሙሉ' : 'capacity'}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── MAINTENANCE ── */}
      {activeTab === 'maintenance' && (
        <div className="space-y-5">
          <h2 className="text-2xl font-bold">{language === 'am' ? 'የደች መሣሪያ ጥገና ምዝገባ' : 'Dutch Machinery Maintenance Logs'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {maintenanceLogs.map(m => (
              <div key={m.id} className={`glass p-6 rounded-3xl border ${m.status === 'OK' ? 'border-green-500/20' : m.status === 'DUE' ? 'border-amber-500/20' : 'border-red-500/30'} transition-all`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-black text-lg">{m.equipment}</p>
                    <p className="text-xs opacity-50">{language === 'am' ? 'ቴክኒሻን:' : 'Technician:'} {m.technician}</p>
                  </div>
                  <span className={`text-[10px] font-black px-3 py-1 rounded-full ${statusColor(m.status)}`}>{m.status}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-[10px] opacity-40 font-bold uppercase">{language === 'am' ? 'ካለፈ ጥገና' : 'Last Service'}</p>
                    <p className="font-bold">{m.lastService}</p>
                  </div>
                  <div>
                    <p className="text-[10px] opacity-40 font-bold uppercase">{language === 'am' ? 'ቀጣይ ጥገና' : 'Next Service'}</p>
                    <p className={`font-bold ${m.status !== 'OK' ? 'text-amber-500' : ''}`}>{m.nextService}</p>
                  </div>
                </div>
                {m.notes && <p className="text-xs opacity-50 mt-3 border-t border-white/5 pt-3">{m.notes}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── RECIPES ── */}
      {activeTab === 'recipes' && (
        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{language === 'am' ? 'የምርት ቀመሮች (1,000L)' : 'Recipe Library (1,000L Batches)'}</h2>
            <Link href="/recipes" className="text-sm font-bold text-blue-500 hover:underline">{language === 'am' ? 'ሁሉም ቀመሮች' : 'View All'} →</Link>
          </div>
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

      {/* ── FARMER ISSUES ── */}
      {activeTab === 'farmers' && (
        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{language === 'am' ? 'የአርሶ አደር ጥያቄዎች' : 'Farmer Issues & Support'}</h2>
            <Link href="/farmers" className="text-sm font-bold text-blue-500 hover:underline">{language === 'am' ? 'ሁሉም አርሶ አደሮች' : 'All Farmers'} →</Link>
          </div>
          <div className="space-y-4">
            {farmerIssues.map(issue => (
              <div key={issue.id} className="glass p-6 rounded-3xl border border-white/10 hover:border-blue-500/20 transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-2xl ${issue.priority === 'HIGH' ? 'bg-red-500/20 text-red-500' : 'bg-amber-500/20 text-amber-500'}`}>
                      <AlertCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-black">{issue.farmer}</p>
                      <p className="text-sm opacity-70 mt-1">{issue.issue}</p>
                      <p className="text-[10px] opacity-40 mt-2">{issue.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${issue.status === 'OPEN' ? 'bg-red-500/20 text-red-500' : 'bg-blue-500/20 text-blue-500'}`}>
                      {issue.status}
                    </span>
                    <button className="bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-xl hover:shadow-lg transition-all">
                      {language === 'am' ? 'ምላሽ' : 'Respond'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── CHATS── */}
      {activeTab === 'chat' && (
        <div>
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
            <div className="w-2 h-7 bg-indigo-500 rounded-full" />
            {language === 'am' ? 'የሠራተኛ መወያያ' : 'Staff Discussion'}
          </h2>
          <KnowledgeShareFeed role="STAFF" />
        </div>
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

    </div>
  );
};

export default StaffDashboard;
