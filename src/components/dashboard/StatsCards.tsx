'use client';

import React from 'react';
import { Milk, CreditCard, Bookmark, Clock, CheckCircle, Users, BookOpen, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { Role } from '@/lib/mockData';

interface StatsCardsProps {
  role: Role;
}

const StatsCards: React.FC<StatsCardsProps> = ({ role }) => {
  const { language } = useLanguage();
  const t = translations[language].dashboard.stats;

  const statItems = {
    FARMER: [
      { label: t.milkDelivered, value: '1,250 L', icon: Milk, color: 'text-blue-500', bg: 'bg-blue-500/10' },
      { label: t.paymentPending, value: '15,400 ETB', icon: CreditCard, color: 'text-green-500', bg: 'bg-green-500/10' },
      { label: t.articlesSaved, value: '8', icon: Bookmark, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    ],
    STAFF: [
      { label: t.shiftHours, value: '38h', icon: Clock, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
      { label: t.ticketsResolved, value: '24', icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
      { label: 'Articles Contributed', value: '5', icon: BookOpen, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    ],
    ADMIN: [
      { label: t.totalUsers, value: '5,240', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
      { label: t.totalArticles, value: '156', icon: BookOpen, color: 'text-amber-500', bg: 'bg-amber-500/10' },
      { label: t.openTickets, value: '12', icon: MessageCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
    ]
  };

  const currentStats = statItems[role] || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {currentStats.map((stat, index) => (
        <div key={index} className="glass p-6 rounded-3xl border border-white/10 hover:shadow-xl transition-all group hover:-translate-y-1">
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm opacity-60 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
