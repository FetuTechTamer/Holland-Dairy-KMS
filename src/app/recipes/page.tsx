'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { recipes } from '@/lib/mockData';
import { ChefHat, ChevronDown, ChevronUp, Calculator } from 'lucide-react';

export default function RecipesPage() {
  const { user, status } = useAuth();
  const { language } = useLanguage();
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<string | null>('r1');
  const [scale, setScale] = useState<Record<string, number>>({});

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
    if (status === 'authenticated' && user?.role === 'FARMER') router.push('/dashboard');
  }, [status, user, router]);

  if (status === 'loading' || !user) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );

  const getScale = (id: string) => scale[id] || 1;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-grow container mx-auto px-6 pt-32 pb-20">
        <Breadcrumb />

        <div className="mb-10">
          <h1 className="text-4xl font-black mb-2 flex items-center gap-3">
            <ChefHat className="w-9 h-9 text-accent" />
            {language === 'am' ? 'የምርት ቀመሮች ቤተ-መጻሕፍት' : 'Recipe Library'}
          </h1>
          <p className="opacity-50">{language === 'am' ? 'ሁሉም ቀመሮች ለ 1,000 ሊትር ባቹ ናቸው' : 'All recipes are calibrated for 1,000L production batches.'}</p>
        </div>

        <div className="space-y-6 max-w-4xl">
          {recipes.map(r => {
            const s = getScale(r.id);
            return (
              <div key={r.id} className="glass rounded-3xl border border-white/10 overflow-hidden hover:border-accent/20 transition-all">
                {/* Header */}
                <button
                  className="w-full flex items-center justify-between p-6 text-left"
                  onClick={() => setExpandedId(expandedId === r.id ? null : r.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
                      <ChefHat className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h2 className="text-xl font-black">{language === 'am' && r.nameAm ? r.nameAm : r.name}</h2>
                      <p className="text-xs opacity-40">{language === 'am' ? 'ዕትም' : 'Version'} {r.version} • {language === 'am' ? 'ዝማኔ:' : 'Updated:'} {r.lastUpdated} • {r.author}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold px-3 py-1 bg-accent/10 text-accent rounded-full">{r.batchSizeLiters}L</span>
                    {expandedId === r.id ? <ChevronUp className="w-5 h-5 opacity-50" /> : <ChevronDown className="w-5 h-5 opacity-50" />}
                  </div>
                </button>

                {expandedId === r.id && (
                  <div className="px-6 pb-6 border-t border-white/5 animate-in slide-in-from-top-2 duration-200">
                    {/* Batch scale calculator */}
                    <div className="mt-5 mb-6 p-4 bg-accent/5 rounded-2xl border border-accent/10 flex items-center gap-4 flex-wrap">
                      <Calculator className="w-5 h-5 text-accent shrink-0" />
                      <span className="text-sm font-bold opacity-60">{language === 'am' ? 'ባቹ ስሌት:' : 'Batch Scale:'}</span>
                      {[0.5, 1, 1.5, 2].map(s => (
                        <button key={s} onClick={() => setScale({...scale, [r.id]: s})}
                          className={`px-4 py-1.5 rounded-xl text-sm font-bold transition-all ${getScale(r.id) === s ? 'bg-accent text-white' : 'glass hover:bg-white/5'}`}>
                          {s}x = {r.batchSizeLiters * s}L
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Ingredients */}
                      <div>
                        <h3 className="font-black mb-3 flex items-center gap-2">
                          <span className="w-2 h-6 bg-accent rounded-full inline-block" />
                          {language === 'am' ? 'ጥሬ ዕቃዎች' : 'Ingredients'}
                        </h3>
                        <div className="space-y-2">
                          {r.ingredients.map((ing, i) => (
                            <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                              <span className="text-sm opacity-70">{ing.name}</span>
                              <span className="font-black text-accent">{(parseFloat(ing.amount) * s).toFixed(1)} {ing.unit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Steps */}
                      <div>
                        <h3 className="font-black mb-3 flex items-center gap-2">
                          <span className="w-2 h-6 bg-blue-500 rounded-full inline-block" />
                          {language === 'am' ? 'ሂደት' : 'Process Steps'}
                        </h3>
                        <div className="space-y-3">
                          {r.steps.map((step, i) => (
                            <div key={i} className="flex gap-3">
                              <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">{i + 1}</span>
                              <p className="text-sm opacity-70 leading-relaxed">{step}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
