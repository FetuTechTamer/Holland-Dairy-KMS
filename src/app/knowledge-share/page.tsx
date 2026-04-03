'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import KnowledgeShareFeed from '@/components/dashboard/KnowledgeShareFeed';
import { MessageSquare, Users, TrendingUp, ShieldCheck } from 'lucide-react';

const KnowledgeSharePage = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const t = translations[language].share;

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start gap-12">
              {/* Left Column: Feed */}
              <div className="w-full lg:w-2/3 space-y-10">
                <div>
                  <h1 className="text-4xl font-black mb-4 flex items-center gap-4">
                    <div className="w-4 h-12 bg-accent rounded-full" />
                    Community {t.postTitle}
                  </h1>
                  <p className="text-foreground/50 font-medium text-lg">Collaborate with fellow {user.role.toLowerCase()}s and share your dairy expertise.</p>
                </div>
                
                <KnowledgeShareFeed role={user.role} isAdmin={user.role === 'ADMIN'} />
              </div>

              {/* Right Column: Community Stats & Rules */}
              <div className="w-full lg:w-1/3 space-y-8">
                <div className="glass p-8 rounded-[3rem] border border-white/10 shadow-xl bg-accent/5">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-accent" />
                    Community Pulse
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                      <p className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-1">TOTAL POSTS</p>
                      <p className="text-2xl font-black">1.2k</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                      <p className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-1">ACTIVE NOW</p>
                      <p className="text-2xl font-black text-green-500">45</p>
                    </div>
                  </div>
                </div>

                <div className="glass p-8 rounded-[3rem] border border-white/10 shadow-xl">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-blue-500" />
                    Holland Standards
                  </h3>
                  <ul className="space-y-4">
                    {[
                      'Be respectful and professional',
                      'Share verified information only',
                      'No commercial advertising',
                      'Protect internal factory secrets'
                    ].map((rule, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center shrink-0 mt-0.5">
                           <Users className="w-3 h-3" />
                        </div>
                        <span className="text-sm opacity-70 font-medium">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="glass p-8 rounded-[3rem] border border-white/10 shadow-xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <h3 className="text-xl font-bold mb-4 relative z-10">Need Expert Advice?</h3>
                  <p className="text-sm opacity-60 mb-6 relative z-10 leading-relaxed">Our field officers and quality experts are ready to answer your specific technical questions.</p>
                  <button className="w-full bg-white text-black font-black py-4 rounded-2xl shadow-xl hover:shadow-white/10 active:scale-95 transition-all relative z-10">
                    CONTACT AN OFFICER
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default KnowledgeSharePage;
