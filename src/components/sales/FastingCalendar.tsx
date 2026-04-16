'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { Calendar } from 'lucide-react';

export default function FastingCalendar() {
  const { language } = useLanguage();
  const t = translations[language].sales;

  const periods = [
    { name: t.fastingPeriods.abiyTsome, status: "Active" },
    { name: t.fastingPeriods.filseta, status: "Upcoming" },
    { name: t.fastingPeriods.nenewe, status: "Passed" },
    { name: t.fastingPeriods.tsige, status: "Upcoming" },
  ];

  return (
    <div className="bg-white dark:bg-black/40 border border-border rounded-3xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
          <Calendar className="w-5 h-5" />
        </div>
        <h3 className="font-bold text-lg">{t.fastingCalendarTitle}</h3>
      </div>
      <div className="space-y-4">
        {periods.map((period, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 rounded-xl hover:bg-foreground/5 transition-colors">
            <span className="font-medium">{period.name}</span>
            <span className={`text-xs px-2 py-1 rounded-full font-bold ${
              period.status === "Active" ? "bg-accent/10 text-accent" :
              period.status === "Passed" ? "bg-foreground/10 text-foreground" :
              "bg-blue-500/10 text-blue-500"
            }`}>
              {period.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
