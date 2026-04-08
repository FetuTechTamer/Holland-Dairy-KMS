'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Zap, HeartPulse } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

const icons = [BookOpen, Zap, HeartPulse];
const colors = ["bg-accent/20", "bg-primary/20", "bg-red-500/10"];
const slugs = ["dairy-farming-guide", "dutch-technology-processing", "nutrition-health-benefits"];

const KnowledgeCards = () => {
  const { language } = useLanguage();
  const t = translations[language].resources;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
      {t.items.map((item, index) => {
        const Icon = icons[index];
        return (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, translateY: -10 }}
            className="glass p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all border-none flex flex-col items-center text-center group"
          >
            <div className={`p-5 rounded-2xl ${colors[index]} mb-6 group-hover:bg-opacity-40 transition-all duration-300`}>
              <Icon className="w-10 h-10 text-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
            <p className="opacity-80 leading-relaxed mb-6">
              {item.desc}
            </p>
            <Link href={`/resources/${slugs[index]}`} className="mt-auto">
              <button className="w-full px-6 py-2 rounded-full border-2 border-accent text-accent font-semibold hover:bg-accent hover:text-white transition-all">
                {t.learnMore}
              </button>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
};

export default KnowledgeCards;
