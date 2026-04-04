'use client';

import React, { useState } from 'react';
import { Calculator, Wheat, Droplets, ArrowRight, Save } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const KnowledgeCalculator = () => {
  const { language } = useLanguage();
  const [cowWeight, setCowWeight] = useState(400);
  const [milkYield, setMilkYield] = useState(15);

  // Dutch standards simulation logic
  const concentrateFeed = (milkYield / 2.5).toFixed(1);
  const waterNeeds = (cowWeight * 0.1 + milkYield * 3).toFixed(0);

  return (
    <div className="glass p-8 rounded-[2rem] border border-white/10 shadow-xl space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-2xl bg-accent/20 flex items-center justify-center text-accent">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-lg">Dutch Standard Calculator</h3>
          <p className="text-xs opacity-50">Optimize your farm yield</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-[10px] font-bold opacity-40 uppercase tracking-widest block mb-2">
            Cow Weight (KG)
          </label>
          <input 
            type="range" 
            min="200" 
            max="800" 
            value={cowWeight}
            onChange={(e) => setCowWeight(Number(e.target.value))}
            className="w-full accent-accent"
          />
          <div className="flex justify-between text-xs font-bold mt-1">
            <span>200kg</span>
            <span className="text-accent">{cowWeight}kg</span>
            <span>800kg</span>
          </div>
        </div>

        <div>
          <label className="text-[10px] font-bold opacity-40 uppercase tracking-widest block mb-2">
            Expected Milk Yield (Liters/Day)
          </label>
          <input 
            type="range" 
            min="5" 
            max="40" 
            value={milkYield}
            onChange={(e) => setMilkYield(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
          <div className="flex justify-between text-xs font-bold mt-1">
            <span>5L</span>
            <span className="text-blue-500">{milkYield}L</span>
            <span>40L</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
          <Wheat className="w-4 h-4 text-accent mb-2" />
          <p className="text-[10px] opacity-50 mb-1 uppercase font-bold">CONCENTRATE FEED</p>
          <p className="text-xl font-bold">{concentrateFeed} kg/day</p>
        </div>
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
          <Droplets className="w-4 h-4 text-blue-500 mb-2" />
          <p className="text-[10px] opacity-50 mb-1 uppercase font-bold">WATER NEEDS</p>
          <p className="text-xl font-bold">{waterNeeds} Liters/day</p>
        </div>
      </div>

      <button className="w-full py-4 rounded-2xl bg-foreground text-background font-bold text-sm hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group">
        Save Recommendation
        <Save className="w-4 h-4 group-hover:rotate-12 transition-transform" />
      </button>

      <p className="text-[10px] text-center opacity-30 italic leading-tight">
        *Recommendations based on Holland Dairy European standards adapted for Ethiopian climates.
      </p>
    </div>
  );
};

export default KnowledgeCalculator;
