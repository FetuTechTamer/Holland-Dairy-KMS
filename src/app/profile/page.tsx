'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RoleBadge from '@/components/dashboard/RoleBadge';
import { User, Mail, Calendar, Shield, Settings, Bell, Lock, LogOut } from 'lucide-react';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const { language } = useLanguage();
  const t = translations[language].nav;
  const authT = translations[language].auth;

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-black mb-10">{t.profile}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sidebar: Profile Summary */}
            <div className="md:col-span-1 space-y-6">
              <div className="glass p-8 rounded-[2.5rem] border border-white/10 text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-24 h-24 bg-accent/20 rounded-[2rem] mx-auto mb-6 flex items-center justify-center text-accent text-4xl font-black shadow-inner">
                  {user.name.charAt(0)}
                </div>
                <h2 className="text-xl font-bold mb-1">{user.name}</h2>
                <p className="text-xs opacity-50 mb-6 font-medium tracking-wide uppercase">{user.email}</p>
                <RoleBadge role={user.role} className="mb-8" />
                
                <button 
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-red-500/10 text-red-500 font-bold hover:bg-red-500 hover:text-white transition-all active:scale-95 shadow-lg shadow-red-500/5 group"
                >
                  <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  {t.logout}
                </button>
              </div>

              <div className="glass p-6 rounded-[2rem] border border-white/10 space-y-2">
                <p className="text-[10px] font-black opacity-30 uppercase tracking-widest px-2">Account Stats</p>
                <div className="flex justify-between items-center p-3 rounded-xl hover:bg-white/5 transition-colors">
                  <span className="text-sm opacity-60">Join Date</span>
                  <span className="text-sm font-bold">{user.joinDate}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl hover:bg-white/5 transition-colors">
                  <span className="text-sm opacity-60">Status</span>
                  <span className="text-sm font-bold text-green-500 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Active
                  </span>
                </div>
              </div>
            </div>

            {/* Main Content: Settings */}
            <div className="md:col-span-2 space-y-8">
              {/* Personal Info */}
              <div className="glass p-8 md:p-10 rounded-[2.5rem] border border-white/10 shadow-xl">
                <div className="flex items-center gap-3 mb-8">
                  <Settings className="w-6 h-6 text-accent" />
                  <h3 className="text-xl font-bold">Account Settings</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black opacity-40 uppercase tracking-widest ml-2">{authT.name}</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30" />
                        <input 
                          type="text" 
                          defaultValue={user.name} 
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-3 focus:ring-2 focus:ring-accent/50 outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black opacity-40 uppercase tracking-widest ml-2">{authT.email}</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30" />
                        <input 
                          type="email" 
                          defaultValue={user.email} 
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-3 focus:ring-2 focus:ring-accent/50 outline-none transition-all opacity-50" 
                          disabled
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black opacity-40 uppercase tracking-widest ml-2">Security</label>
                    <button className="w-full flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all group">
                      <div className="flex items-center gap-3">
                        <Lock className="w-5 h-5 opacity-50" />
                        <span className="text-sm font-bold">Change Password</span>
                      </div>
                      <div className="h-1.5 w-1.5 bg-accent rounded-full" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Preferences */}
              <div className="glass p-8 md:p-10 rounded-[2.5rem] border border-white/10 shadow-xl">
                <div className="flex items-center gap-3 mb-8">
                  <Bell className="w-6 h-6 text-blue-500" />
                  <h3 className="text-xl font-bold">Preferences</h3>
                </div>
                
                <div className="space-y-4">
                  {[
                    { title: 'Email Notifications', desc: 'New articles and ticket updates', default: true },
                    { title: 'Community Alerts', desc: 'Likes and comments on your posts', default: true },
                    { title: 'Marketing', desc: 'Updates about Holland Dairy products', default: false }
                  ].map((pref, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all">
                      <div>
                        <p className="text-sm font-bold">{pref.title}</p>
                        <p className="text-[10px] opacity-40">{pref.desc}</p>
                      </div>
                      <div className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer ${pref.default ? 'bg-accent' : 'bg-white/10'}`}>
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${pref.default ? 'translate-x-6' : ''}`} />
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full bg-accent text-white font-black py-5 rounded-2xl shadow-xl shadow-accent/20 mt-10 hover:shadow-accent/40 hover:-translate-y-1 active:scale-95 transition-all">
                  SAVE ALL CHANGES
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
