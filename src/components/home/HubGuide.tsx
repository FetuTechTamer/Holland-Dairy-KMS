'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { BookOpen, Users, MessageSquare, Lightbulb, Calendar, History, MoveRight, Briefcase, Shield, Zap } from 'lucide-react';

export default function HubGuide() {
  const { language } = useLanguage();
  const t = translations[language].hubGuide;

  const features = [
    { icon: BookOpen, title: t.features.knowledgeBase },
    { icon: Users, title: t.features.community },
    { icon: MessageSquare, title: t.features.chat },
    { icon: Lightbulb, title: t.features.innovationHub },
    { icon: Calendar, title: t.features.fastingCalendar },
    { icon: History, title: t.features.legacyStories },
  ];

  const roles = [
    { title: t.farmerRole, icon: Users, color: 'bg-green-500/10 text-green-500' },
    { title: t.staffRole, icon: Briefcase, color: 'bg-blue-500/10 text-blue-500' },
    { title: t.adminRole, icon: Shield, color: 'bg-purple-500/10 text-purple-500' },
    { title: t.quickSteps, icon: Zap, color: 'bg-yellow-500/10 text-yellow-500' },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block bg-accent/10 text-accent px-4 py-1 rounded-full font-bold text-sm tracking-wider uppercase">
            {t.etCustoms}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">{t.title}</h2>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {roles.map((role, idx) => (
            <Link href="/login" key={idx} className="glass p-6 rounded-3xl text-center hover:scale-105 transition-transform block">
              <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 ${role.color}`}>
                <role.icon className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg">{role.title}</h3>
            </Link>
          ))}
        </div>

        <div className="bg-foreground/5 rounded-[40px] p-8 md:p-12 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center shadow-lg text-accent">
                  <feature.icon className="w-6 h-6" />
                </div>
                <span className="font-semibold">{feature.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register">
            <button className="bg-accent text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-all flex items-center gap-2 shadow-xl shadow-accent/20 w-full sm:w-auto justify-center">
              {t.getStarted} <MoveRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}


