'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { TrendingUp, DollarSign, Activity } from 'lucide-react';

export default function SalesMetrics() {
  const { language } = useLanguage();
  const t = translations[language].sales;

  const metrics = [
    { label: t.totalSales, value: "45,231", icon: Activity, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: t.revenue, value: "$124,500", icon: DollarSign, color: "text-green-500", bg: "bg-green-500/10" },
    { label: t.growth, value: "+12.5%", icon: TrendingUp, color: "text-accent", bg: "bg-accent/10" },
  ];

  return (
    <div className="bg-white dark:bg-black/40 border border-border rounded-3xl p-6 shadow-sm mb-8 mt-6">
      <h3 className="font-bold text-lg mb-6">{t.metricsTitle}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((m, i) => (
          <div key={i} className="p-4 rounded-2xl bg-foreground/5 flex items-center gap-4 hover:scale-105 transition-transform">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${m.bg} ${m.color}`}>
              <m.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm opacity-70">{m.label}</p>
              <p className="text-2xl font-bold">{m.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
