'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { translations } from '@/lib/translations';
import { mockUsers, mockTickets, allArticles, mockContactMessages, tutorialVideos } from '@/lib/mockData';
import RoleBadge from './RoleBadge';
import KnowledgeShareFeed from './KnowledgeShareFeed';
import EthiopianDate from './EthiopianDate';
import Breadcrumb from '../Breadcrumb';
import Link from 'next/link';
import {
  Users as UsersIcon, FileText, BarChart3,
  Megaphone, Plus, Edit, Trash2, Edit3, X,
  History, Mail as MailIcon, CheckCircle, TrendingUp,
  BookOpen, MessageCircle, MoveRight
} from 'lucide-react';
import { getTodayEthiopian } from '@/lib/ethiopianCalendar';

type AdminTab = 'overview' | 'content' | 'users' | 'messages' | 'broadcast' | 'chat' | 'notes';

const AdminDashboard = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const t = translations[language].dashboard;
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [users, setUsers] = useState(mockUsers);
  const [broadcastSent, setBroadcastSent] = useState(false);
  const [broadcastForm, setBroadcastForm] = useState({ recipients: 'all', title: '', message: '' });

  const handleDeleteUser = (userId: string) => {
    if (window.confirm(t.admin.confirmDelete)) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  // Notes state
  const [notes, setNotes] = useState<{ id: string; text: string; date: string }[]>([
    { id: 'note1', text: 'Remember to clean water troughs before morning collection.', date: '1/9/2019' },
  ]);
  const [noteText, setNoteText] = useState('');

  const [filterRole, setFilterRole] = useState('ALL');

  const filteredUsers = users.filter(user => {
    if (filterRole === 'ALL') return true;
    return user.role === filterRole;
  });

  const adminTabs = [
    { id: 'overview', label: language === 'am' ? 'አጠቃላይ ዕይታ' : 'Overview', icon: BarChart3 },
    { id: 'content', label: language === 'am' ? 'ይዘት' : 'Content', icon: FileText },
    { id: 'users', label: language === 'am' ? 'ተጠቃሚዎች' : 'Users', icon: UsersIcon },
    { id: 'messages', label: language === 'am' ? 'መልዕክቶች' : 'Messages', icon: MailIcon },
    { id: 'broadcast', label: language === 'am' ? 'ስርጭት' : 'Broadcast', icon: Megaphone },
    { id: 'chat', label: language === 'am' ? 'ውይይት' : 'Chat', icon: MessageCircle },
    { id: 'notes', label: language === 'am' ? 'ማስታወሻዎች' : 'Notes', icon: Edit3 },
  ];

  const roleColor = (role: string) =>
    role === 'ADMIN' ? 'bg-purple-500/20 text-purple-500' :
      role === 'STAFF' ? 'bg-blue-500/20 text-blue-500' :
        'bg-green-500/20 text-green-500';

  const farmerCount = mockUsers.filter(u => u.role === 'FARMER').length;
  const staffCount = mockUsers.filter(u => u.role === 'STAFF').length;

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-6 py-8 space-y-8">
        <Breadcrumb />

        {/* Header - Hero style */}
        <div className="relative rounded-3xl overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-transparent" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 py-8 px-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
                {t.welcome}, <span className="text-purple-500">{user?.name}</span>
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <RoleBadge role="ADMIN" />
                <span className="text-sm opacity-60 font-medium">
                  {t.ethiopianDate}: <EthiopianDate className="font-bold text-foreground" />
                </span>
              </div>
            </div>
            <Link href="/" className="group flex items-center gap-2 px-6 py-3 rounded-full glass border border-purple-500/20 text-purple-500 font-bold hover:bg-purple-500 hover:text-white transition-all duration-300 self-start">
              <History className="w-4 h-4 -rotate-90 group-hover:rotate-0 transition-transform" />
              {translations[language].nav.exitHub}
            </Link>
          </div>
        </div>

        {/* Tabs - Pill style like home page */}
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          {adminTabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as AdminTab)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${activeTab === tab.id
                ? 'bg-purple-500 text-white shadow-lg scale-105'
                : 'glass text-foreground hover:bg-white/10 opacity-70 hover:opacity-100'
                }`}>
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW ── */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* User breakdown */}
              <div className="glass rounded-3xl p-6 border border-white/10 hover:border-purple-500/30 transition-all group">
                <h3 className="font-bold mb-5 flex items-center gap-2">
                  <UsersIcon className="w-5 h-5 text-purple-500" />
                  {language === 'am' ? 'ተጠቃሚ ሁኔታ' : 'User Breakdown'}
                </h3>
                <div className="space-y-4">
                  {[
                    { label: language === 'am' ? 'አርሶ አደሮች' : 'Farmers', count: farmerCount, total: '4,000+', color: 'bg-green-500' },
                    { label: language === 'am' ? 'ሰራተኞች' : 'Staff', count: staffCount, total: '85–200', color: 'bg-blue-500' },
                    { label: language === 'am' ? 'አስተዳዳሪዎች' : 'Admins', count: 1, total: '1', color: 'bg-purple-500' },
                  ].map((r, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm font-bold mb-2">
                        <span className="opacity-70">{r.label}</span>
                        <span className="text-purple-500">{r.total}</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${r.color} transition-all duration-500`}
                          style={{ width: `${Math.min((r.count / 7) * 100, 100)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Knowledge base */}
              <div className="glass rounded-3xl p-6 border border-white/10 hover:border-purple-500/30 transition-all group">
                <h3 className="font-bold mb-5 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-500" />
                  {language === 'am' ? 'የእውቀት ቤዝ' : 'Knowledge Base'}
                </h3>
                <div className="space-y-3">
                  {[
                    { label: language === 'am' ? 'ጠቅላላ ጽሁፎች' : 'Total Articles', value: allArticles.length },
                    { label: language === 'am' ? 'ቪዲዮ ስልጠናዎች' : 'Video Tutorials', value: tutorialVideos.length },
                    { label: language === 'am' ? 'ለአርሶ አደር' : 'Farmer Access', value: allArticles.filter(a => a.role === 'FARMER' || a.role === 'BOTH').length },
                    { label: language === 'am' ? 'ለሰራተኛ' : 'Staff Access', value: allArticles.filter(a => a.role === 'STAFF' || a.role === 'BOTH').length },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                      <span className="text-sm opacity-70">{item.label}</span>
                      <span className="font-bold text-purple-500 text-lg">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* System status */}
              <div className="glass rounded-3xl p-6 border border-white/10 hover:border-purple-500/30 transition-all group">
                <h3 className="font-bold mb-5 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  {language === 'am' ? 'የስርዓት ሁኔታ' : 'System Status'}
                </h3>
                <div className="space-y-3">
                  {[
                    { label: language === 'am' ? 'ኦፋይን ድጋፍ' : 'Offline Support', status: 'OK' },
                    { label: language === 'am' ? 'ቀዝቃዛ ማሸጊያ' : 'Cold Storage', status: 'OK' },
                    { label: language === 'am' ? 'QC ስርዓት' : 'QC System', status: 'OK' },
                    { label: language === 'am' ? 'SMS ስርጭት' : 'SMS Gateway', status: 'OK' },
                  ].map((s, i) => (
                    <div key={i} className="flex justify-between items-center py-2">
                      <span className="text-sm opacity-70">{s.label}</span>
                      <span className="flex items-center gap-1 text-green-500 font-bold text-xs">
                        <CheckCircle className="w-3.5 h-3.5" />{s.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── CONTENT ── */}
        {activeTab === 'content' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-3xl font-bold tracking-tight">
                {language === 'am' ? 'የእውቀት አስተዳደር' : 'Knowledge Management'}
              </h2>
              <button className="bg-purple-500 text-white font-bold px-6 py-3 rounded-full flex items-center gap-2 hover:scale-105 transition-all duration-300 shadow-lg">
                <Plus className="w-4 h-4" />
                {language === 'am' ? 'አዲስ ጽሁፍ' : 'Create Article'}
              </button>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/quality-dashboard"
                className="glass px-5 py-3 rounded-full flex items-center gap-2 font-bold text-sm hover:bg-purple-500/10 transition-all">
                <BarChart3 className="w-4 h-4 text-purple-500" />
                {language === 'am' ? 'QC ዳሽቦርድ' : 'QC Dashboard'}
              </Link>
              <Link href="/recipes"
                className="glass px-5 py-3 rounded-full flex items-center gap-2 font-bold text-sm hover:bg-purple-500/10 transition-all">
                <FileText className="w-4 h-4 text-purple-500" />
                {language === 'am' ? 'ቀመሮች ቤተ-መጻሕፍት' : 'Recipe Library'}
              </Link>
            </div>

            <div className="glass rounded-3xl border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead className="bg-purple-500/10">
                    <tr className="text-xs uppercase font-bold">
                      <th className="px-6 py-4 text-left text-purple-500">{language === 'am' ? 'ርዕስ' : 'Title'}</th>
                      <th className="px-6 py-4 text-left text-purple-500">{language === 'am' ? 'ዘርፍ' : 'Category'}</th>
                      <th className="px-6 py-4 text-left text-purple-500">{language === 'am' ? 'ደረጃ' : 'Access'}</th>
                      <th className="px-6 py-4 text-left text-purple-500">{language === 'am' ? 'ቀን' : 'Date'}</th>
                      <th className="px-6 py-4 text-right text-purple-500">{language === 'am' ? 'ድርጊቶች' : 'Actions'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {allArticles.slice(0, 5).map(article => (
                      <tr key={article.id} className="hover:bg-white/5 transition-colors group">
                        <td className="px-6 py-4 font-bold text-sm">
                          <Link href={`/article/${article.id}`} className="hover:text-purple-500 transition-colors">
                            {language === 'am' && article.titleAm ? article.titleAm : article.title}
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-xs font-bold opacity-60 uppercase">
                          {t.categories[article.category as keyof typeof t.categories] || article.category}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${roleColor(article.role)}`}>
                            {article.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm opacity-60"><EthiopianDate date={article.date} /></td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 hover:bg-purple-500/20 rounded-lg text-purple-500"><Edit className="w-4 h-4" /></button>
                            <button className="p-1.5 hover:bg-red-500/20 rounded-lg text-red-500"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── USERS ── */}
        {activeTab === 'users' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <h2 className="text-3xl font-bold tracking-tight">
                {language === 'am' ? 'ሁሉም ተጠቃሚዎች' : 'User Management'}
              </h2>
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  {['ALL', 'ADMIN', 'STAFF', 'FARMER'].map(role => (
                    <button key={role} onClick={() => setFilterRole(role)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${filterRole === role
                        ? 'bg-purple-500 text-white shadow-lg'
                        : 'glass hover:bg-white/10 opacity-70 hover:opacity-100'
                        }`}>
                      {role === 'ALL' ? (language === 'am' ? 'ሁሉም' : 'All') : role}
                    </button>
                  ))}
                </div>
                <span className="text-sm opacity-60">{filteredUsers.length} / {users.length} {language === 'am' ? 'ተጠቃሚዎች' : 'users'}</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map(u => (
                <div key={u.id} className="glass rounded-3xl p-6 border border-white/10 hover:border-purple-500/30 hover:scale-[1.02] transition-all duration-300 group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-500 font-bold text-xl">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-lg">{u.name}</p>
                        <p className="text-xs opacity-60 truncate max-w-[140px]">{u.email}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 hover:bg-purple-500/20 rounded-lg text-purple-500"><Edit className="w-3.5 h-3.5" /></button>
                      <button onClick={() => handleDeleteUser(u.id)} className="p-1.5 hover:bg-red-500/20 rounded-lg text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${roleColor(u.role)}`}>{u.role}</span>
                    {u.department && <span className="px-2 py-1 rounded-full text-xs font-bold bg-white/10 opacity-60">{u.department}</span>}
                    {u.farmName && <span className="px-2 py-1 rounded-full text-xs font-bold bg-white/10 opacity-60">{u.farmName}</span>}
                  </div>
                  <p className="text-xs opacity-40">{language === 'am' ? 'ተቀላቀለ:' : 'Joined:'} {u.joinDate}</p>
                </div>
              ))}
            </div>
            {filteredUsers.length === 0 && (
              <div className="py-20 text-center glass rounded-3xl">
                <p className="opacity-60">{language === 'am' ? 'ምንም ተጠቃሚ አልተገኘም' : 'No users found'}</p>
              </div>
            )}
          </div>
        )}

        {/* ── MESSAGES ── */}
        {activeTab === 'messages' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <h2 className="text-3xl font-bold tracking-tight">
              {language === 'am' ? 'የአድራሻ መልዕክቶች' : 'Contact Form Messages'}
            </h2>
            <div className="space-y-4">
              {mockContactMessages.map(msg => (
                <div key={msg.id} className="glass rounded-3xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-500 font-bold">
                        {msg.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <p className="font-bold">{msg.name}</p>
                          <p className="text-xs opacity-60">{msg.email}</p>
                          <p className="text-xs opacity-40">{msg.date}</p>
                        </div>
                        <p className="text-sm font-bold text-purple-500 mb-1">{msg.subject}</p>
                        <p className="text-sm opacity-70 leading-relaxed">{msg.message}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="bg-purple-500 text-white text-xs font-bold px-5 py-2 rounded-full hover:scale-105 transition-all duration-300">
                        {language === 'am' ? 'ምላሽ' : 'Reply'}
                      </button>
                      <button className="glass text-xs font-bold px-4 py-2 rounded-full hover:bg-red-500/10 text-red-500 transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── BROADCAST ── */}
        {activeTab === 'broadcast' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <h2 className="text-3xl font-bold tracking-tight">
              {language === 'am' ? 'ቢሾፍቱ ስርጭት ስርዓት' : 'Bishoftu Central Broadcast'}
            </h2>

            {broadcastSent && (
              <div className="flex items-center gap-3 p-4 bg-green-500/20 border border-green-500/30 rounded-2xl text-green-500 font-bold animate-in slide-in-from-top-4">
                <CheckCircle className="w-5 h-5" />
                {language === 'am' ? 'ስርጭቱ ተልኳል!' : 'Broadcast sent successfully!'}
              </div>
            )}

            <div className="max-w-2xl glass rounded-3xl p-8 border border-white/10 shadow-xl space-y-6">
              <div>
                <label className="block text-xs font-bold opacity-60 uppercase tracking-wider mb-2">
                  {language === 'am' ? 'ተቀባዮች' : 'Recipients'}
                </label>
                <select value={broadcastForm.recipients} onChange={e => setBroadcastForm({ ...broadcastForm, recipients: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-purple-500/30 transition-all">
                  <option value="all">{language === 'am' ? 'ሁሉም ድርጅቶች — 4,009 ሰዎች' : 'ALL — 4,009 Members'}</option>
                  <option value="farmers">{language === 'am' ? 'አርሶ አደሮች ብቻ — 4,000+' : 'Farmers Only — 4,000+'}</option>
                  <option value="staff">{language === 'am' ? 'ሠራተኞች ብቻ — 85-200' : 'Staff Only — 85-200'}</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold opacity-60 uppercase tracking-wider mb-2">
                  {language === 'am' ? 'ርዕስ' : 'Title'}
                </label>
                <input type="text" value={broadcastForm.title}
                  onChange={e => setBroadcastForm({ ...broadcastForm, title: e.target.value })}
                  placeholder={language === 'am' ? 'ለምሳሌ: አዲስ የወተት ጥራት ደረጃ' : 'e.g. New Milk Quality Standards'}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold opacity-60 uppercase tracking-wider mb-2">
                  {language === 'am' ? 'መልዕክት' : 'Message'}
                </label>
                <textarea value={broadcastForm.message}
                  onChange={e => setBroadcastForm({ ...broadcastForm, message: e.target.value })}
                  placeholder={language === 'am' ? 'አስፈላጊ ማስታወቂያ....' : 'Important announcement...'}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 min-h-[140px] outline-none focus:ring-2 focus:ring-purple-500/30 transition-all resize-none"
                />
              </div>
              <button
                onClick={() => {
                  if (!broadcastForm.title || !broadcastForm.message) return;
                  setBroadcastSent(true);
                  setBroadcastForm({ recipients: 'all', title: '', message: '' });
                  setTimeout(() => setBroadcastSent(false), 4000);
                }}
                className="w-full bg-purple-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 text-lg"
              >
                <Megaphone className="w-5 h-5" />
                {language === 'am' ? 'ስርጭት ላክ' : 'SEND BROADCAST'}
              </button>
            </div>

            <div className="max-w-2xl">
              <h3 className="font-bold mb-3 opacity-60">{language === 'am' ? 'ቅርብ ጊዜ ስርጭቶች' : 'Recent Broadcasts'}</h3>
              <div className="space-y-3">
                {[
                  { title: language === 'am' ? 'የወተት ዋጋ ዝማኔ' : 'Milk Price Update', recipients: language === 'am' ? 'አርሶ አደሮች' : 'Farmers', date: '15/9/2019' },
                  { title: language === 'am' ? 'FMD ማስጠንቀቂያ' : 'FMD Disease Alert', recipients: language === 'am' ? 'ሁሉም' : 'Everyone', date: '18/9/2019' },
                ].map((b, i) => (
                  <div key={i} className="glass rounded-2xl p-4 border border-white/10 flex justify-between items-center hover:border-purple-500/30 transition-all">
                    <div>
                      <p className="font-bold text-sm">{b.title}</p>
                      <p className="text-xs opacity-40">{b.recipients} • {b.date}</p>
                    </div>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── CHAT ── */}
        {activeTab === 'chat' && (
          <div className="animate-in fade-in duration-500">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <div className="w-1 h-8 bg-purple-500 rounded-full" />
              {language === 'am' ? 'ዓለም አቀፍ እንቅስቃሴ' : 'Global Activity Feed'}
            </h2>
            <KnowledgeShareFeed role="ADMIN" />
          </div>
        )}

        {/* ── NOTES ── */}
        {activeTab === 'notes' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <h2 className="text-3xl font-bold tracking-tight">
              {language === 'am' ? 'የእርሻ ማስታወሻዎች' : 'Farm Notes'}
            </h2>
            <div className="glass rounded-3xl p-6 border border-white/10">
              <textarea
                value={noteText}
                onChange={e => setNoteText(e.target.value)}
                placeholder={language === 'am' ? 'ማስታወሻ ይጻፉ...' : 'Write a note...'}
                className="w-full bg-transparent outline-none resize-none min-h-[120px] text-base"
              />
              <div className="flex justify-end mt-4">
                <button onClick={() => {
                  if (!noteText.trim()) return;
                  setNotes([{ id: `n-${Date.now()}`, text: noteText, date: getTodayEthiopian() }, ...notes]);
                  setNoteText('');
                }}
                  className="bg-purple-500 text-white px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition-all duration-300">
                  {language === 'am' ? 'አስቀምጥ' : 'Save'}
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {notes.map(n => (
                <div key={n.id} className="glass rounded-2xl p-5 border border-white/10 flex justify-between items-start gap-4 hover:border-purple-500/30 transition-all">
                  <p className="text-sm leading-relaxed flex-1">{n.text}</p>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs opacity-40">{n.date}</span>
                    <button onClick={() => setNotes(notes.filter(x => x.id !== n.id))}
                      className="p-1 hover:text-red-500 opacity-30 hover:opacity-100 transition-all">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminDashboard;