'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { formatEthiopianDate } from '@/lib/ethiopianCalendar';
import { Calendar } from 'lucide-react';

const EthiopianDate = () => {
  const { language } = useLanguage();
  const etDate = formatEthiopianDate(language);

  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/10 border border-accent/20 text-accent font-bold text-xs animate-in fade-in slide-in-from-top-2 duration-700">
      <Calendar className="w-4 h-4" />
      <span>{etDate}</span>
    </div>
  );
};

export default EthiopianDate;
