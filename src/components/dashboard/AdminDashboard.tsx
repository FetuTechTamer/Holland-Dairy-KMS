'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { translations } from '@/lib/translations';
import { Article, Ticket, User, mockUsers, mockTickets, farmerArticles, staffArticles } from '@/lib/mockData';
import StatsCards from './StatsCards';
import StaffDashboard from './StaffDashboard';
import RoleBadge from './RoleBadge';
import { 
  Users as UsersIcon, 
  FileText, 
  MessageSquare, 
  BarChart3, 
  ShieldCheck, 
  Megaphone, 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash2, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const t = translations[language].dashboard;
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'users' | 'tickets' | 'moderation' | 'broadcast'>('overview');

  const adminTabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'users', label: 'Users', icon: UsersIcon },
    { id: 'tickets', label: 'Tickets', icon: MessageSquare },
    { id: 'moderation', label: 'Moderation', icon: ShieldCheck },
    { id: 'broadcast', label: 'Broadcast', icon: Megaphone },
  ];

  const renderAdminContent = () => {
    switch (activeTab) {
      case 'overview':
        return <StaffDashboard />; // Overview is the regular staff view + extra stats
      
      case 'content':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Content Management</h2>
              <button className="bg-accent text-white font-bold px-6 py-2 rounded-xl flex items-center gap-2 hover:shadow-lg transition-all">
                <Plus className="w-4 h-4" />
                Create New Article
              </button>
            </div>
            <div className="glass rounded-[2rem] border border-white/10 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-[10px] uppercase font-bold tracking-widest opacity-50">
                  <tr>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[...farmerArticles, ...staffArticles].slice(0, 8).map((article) => (
                    <tr key={article.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4 font-bold text-sm">{article.title}</td>
                      <td className="px-6 py-4"><RoleBadge role={article.role === 'BOTH' ? 'STAFF' : article.role as any} /></td>
                      <td className="px-6 py-4 text-xs opacity-60">{article.category}</td>
                      <td className="px-6 py-4 text-xs opacity-60">{article.date}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 hover:bg-accent/20 rounded-lg text-accent"><Edit className="w-4 h-4" /></button>
                          <button className="p-2 hover:bg-red-500/20 rounded-lg text-red-500"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold mb-8">User Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockUsers.map(u => (
                <div key={u.id} className="glass p-6 rounded-3xl border border-white/10 hover:border-accent/30 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent font-bold text-xl">
                      {u.name.charAt(0)}
                    </div>
                    <button className="p-2 hover:bg-white/10 rounded-full"><MoreVertical className="w-4 h-4 opacity-40" /></button>
                  </div>
                  <h3 className="font-bold mb-1">{u.name}</h3>
                  <p className="text-xs opacity-50 mb-4">{u.email}</p>
                  <div className="flex justify-between items-center">
                    <RoleBadge role={u.role} />
                    <span className="text-[10px] opacity-40">Joined {u.joinDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'tickets':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold mb-8">Global Ticket Support</h2>
            <div className="space-y-4">
              {mockTickets.map(ticket => (
                <div key={ticket.id} className="glass p-6 rounded-3xl border border-white/10 hover:bg-white/5 transition-all">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-2xl ${
                        ticket.priority === 'HIGH' ? 'bg-red-500/20 text-red-500' : 'bg-amber-500/20 text-amber-500'
                      }`}>
                        <AlertCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest">{ticket.category}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            ticket.status === 'OPEN' ? 'bg-red-500/20 text-red-500' : 'bg-blue-500/20 text-blue-500'
                          }`}>{ticket.status}</span>
                        </div>
                        <h4 className="font-bold text-lg mb-2">{ticket.title}</h4>
                        <p className="text-sm opacity-60 mb-4">{ticket.description}</p>
                        <div className="flex items-center gap-4 text-[10px] font-bold">
                          <span className="opacity-40">FROM: {mockUsers.find(u => u.id === ticket.userId)?.name}</span>
                          <span className="opacity-40">DATE: {new Date(ticket.timestamp).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 min-w-[150px]">
                      <button className="w-full bg-accent text-white font-bold py-2.5 rounded-xl text-sm shadow-lg hover:shadow-accent/20 transition-all">
                        Respond Now
                      </button>
                      <button className="w-full glass py-2.5 rounded-xl text-sm font-bold border border-white/5 hover:bg-white/5 transition-all">
                        Assign Staff
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'moderation':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold mb-8">Community Moderation</h2>
            <div className="p-20 text-center glass rounded-[3rem] border border-white/10 opacity-50">
              <ShieldCheck className="w-16 h-16 mx-auto mb-6 opacity-20" />
              <h3 className="text-xl font-bold mb-2">No Reported Content</h3>
              <p className="text-sm">Everything looks good! The community is maintaining Dutch standards.</p>
            </div>
          </div>
        );

      case 'broadcast':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold mb-8">Global Holland Broadcast</h2>
            <div className="max-w-2xl glass p-8 rounded-[3rem] border border-white/10 shadow-xl">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold opacity-60 mb-3">RECIPIENTS</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 focus:ring-accent focus:border-accent outline-none">
                    <option value="all" className="bg-green-950">ALL (Farmers & Staff)</option>
                    <option value="farmers" className="bg-green-950">Farmers Only</option>
                    <option value="staff" className="bg-green-950">Staff Only</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold opacity-60 mb-3">ANNOUNCEMENT TITLE</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 focus:ring-accent outline-none" placeholder="Important price update..." />
                </div>
                <div>
                  <label className="block text-sm font-bold opacity-60 mb-3">MESSAGE CONTENT</label>
                  <textarea className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 min-h-[150px] focus:ring-accent outline-none resize-none" placeholder="Enter the details of the broadcast..." />
                </div>
                <button className="w-full bg-accent text-white font-extrabold py-5 rounded-2xl shadow-2xl hover:shadow-accent/40 active:scale-95 transition-all flex items-center justify-center gap-3">
                  <Megaphone className="w-6 h-6" />
                  SEND BROADCAST NOW
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return <StaffDashboard />;
    }
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            {t.welcome}, <span className="text-purple-500">{user?.name}</span>
          </h1>
          <div className="flex items-center gap-3">
            <RoleBadge role="ADMIN" />
            <span className="text-sm opacity-50 font-medium tracking-wide">
              CENTRAL MANAGEMENT HUB
            </span>
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex gap-2 overflow-x-auto p-1 bg-foreground/5 rounded-[2rem] w-full max-w-4xl border border-white/5">
        {adminTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-3 rounded-[1.5rem] text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === tab.id 
                ? 'bg-white text-black shadow-xl ring-1 ring-black/5' 
                : 'opacity-50 hover:opacity-100 hover:bg-white/5'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Stats Cards (Admin Specific) */}
      {activeTab === 'overview' && <StatsCards role="ADMIN" />}

      {/* Main Content Area */}
      <div className="pt-4">
        {renderAdminContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
