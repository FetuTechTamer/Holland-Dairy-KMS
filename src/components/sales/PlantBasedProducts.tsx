'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { Leaf } from 'lucide-react';

export default function PlantBasedProducts() {
  const { language } = useLanguage();
  const t = translations[language].sales;

  const products = [
    { name: t.products.almondMilk, stock: t.inStock, count: 1250 },
    { name: t.products.soyYoghurt, stock: t.inStock, count: 850 },
    { name: t.products.oatDrink, stock: t.outOfStock, count: 0 },
    { name: t.products.coconutCream, stock: t.lowStock, count: 45 },
  ];

  return (
    <div className="bg-white dark:bg-black/40 border border-border rounded-3xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
          <Leaf className="w-5 h-5" />
        </div>
        <h3 className="font-bold text-lg">{t.plantBasedTitle}</h3>
      </div>
      <div className="space-y-4">
        {products.map((p, i) => (
          <div key={i} className="flex justify-between items-center p-3 rounded-xl hover:bg-foreground/5 transition-colors">
            <div>
              <p className="font-medium">{p.name}</p>
              <p className={`text-sm font-bold mt-1 ${
                p.stock === t.inStock ? "text-green-500" :
                p.stock === t.outOfStock ? "text-red-500" : "text-yellow-500"
              }`}>{p.stock}</p>
            </div>
            <span className="font-bold text-xl">{p.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
