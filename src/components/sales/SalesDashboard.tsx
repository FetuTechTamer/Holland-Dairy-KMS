'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import SalesMetrics from './SalesMetrics';
import FastingCalendar from './FastingCalendar';
import PlantBasedProducts from './PlantBasedProducts';

export default function SalesDashboard() {
  const { language } = useLanguage();
  const t = translations[language].sales;

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">{t.title}</h2>
      </div>

      <SalesMetrics />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FastingCalendar />
        <PlantBasedProducts />
      </div>
    </div>
  );
}
