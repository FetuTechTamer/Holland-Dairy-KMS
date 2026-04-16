import React, { useState } from 'react';
import { CalendarDays, Leaf, TrendingUp, AlertTriangle, Calculator, DollarSign } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const FastingPlanner = () => {
  const { language } = useLanguage();
  const [targetReach, setTargetReach] = useState<number>(50000);
  const [conversionRate, setConversionRate] = useState<number>(5.0);
  const avgPrice = 45; // ETB

  const calculatedRevenue = (targetReach * (conversionRate / 100) * avgPrice).toLocaleString();

  const fastingDays = [
    { name: 'Wednesdays & Fridays', duration: 'Every week', season: 'Year-round', productTarget: 'Soy milk alternative', status: 'PLANNED' },
    { name: 'Lent (Abiy Tsom)', duration: '55 days', season: 'Feb-Mar (Before Easter)', productTarget: 'Plant-based yoghurt (soy/coconut)', status: 'DEVELOPMENT' },
    { name: 'Assumption of Mary (Filseta)', duration: '15 days', season: 'August', productTarget: 'Coconut-based dessert', status: 'PLANNED' },
    { name: 'Christmas Fast (Tsome Gahad)', duration: '43 days', season: 'Nov-Dec', productTarget: 'Oat milk + honey', status: 'UNDER_REVIEW' },
    { name: 'Nineveh Fast (Tsome Nineveh)', duration: '3 days', season: 'Jan-Feb', productTarget: 'Oat yoghurt', status: 'UNDER_REVIEW' },
    { name: 'Apostles Fast (Tsome Hawariat)', duration: '10-40 days', season: 'June', productTarget: 'Fruit cup', status: 'LAUNCHED' },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'DEVELOPMENT': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
      case 'PLANNED': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
      case 'UNDER_REVIEW': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300';
      case 'LAUNCHED': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300';
    }
  };

  const productRecommendations = [
    { period: 'Lent (55 days)', time: 'Feb-Mar', product: 'Plant-based yoghurt (soy/coconut)', price: '90 ETB/500g' },
    { period: 'Wed/Fri Fast', time: 'Year-round', product: 'Single-serve plant-based cups', price: '25 ETB/150g' },
    { period: 'Assumption (15 days)', time: 'August', product: 'Coconut dessert', price: '35 ETB/200g' },
    { period: 'Christmas Fast (43 days)', time: 'Nov-Dec', product: 'Oat milk + honey (plant)', price: '85 ETB/500ml' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-green-500" />
            {language === 'am' ? 'የጾም ቀን መቁጠሪያ እና የእቅድ ዝግጅት' : 'Fasting Calendar & Product Planner'}
          </h2>
          <p className="opacity-60 text-sm mt-1">Ethiopian Context Fasting Impact Strategy</p>
        </div>
        
        <div className="glass px-4 py-2 rounded-2xl flex items-center gap-3 border border-red-500/30">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <div className="text-sm">
            <p className="font-bold text-red-500">Sales Alert: Lent Window</p>
            <p className="text-[10px] opacity-70">Dairy sales drop 60-70% historically.</p>
          </div>
        </div>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-3xl border border-white/10 lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Leaf className="w-5 h-5 text-green-400" />
            <h3 className="font-bold text-lg">Ethiopian Fasting Calendar (2019 EC)</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {fastingDays.map((fast, i) => (
              <div key={i} className="p-4 rounded-2xl border bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800/50 flex flex-col justify-between">
                <div>
                  <h4 className="font-black text-sm">{fast.name}</h4>
                  <p className="text-xs opacity-70 mt-0.5">{fast.season} • <span className="font-bold">{fast.duration}</span></p>
                </div>
                <div className="mt-4 pt-3 border-t border-red-200/50 dark:border-red-800/50 flex justify-between items-end">
                  <div>
                    <p className="text-[10px] uppercase font-bold opacity-70 mb-0.5">Opportunity</p>
                    <p className="text-xs font-medium">{fast.productTarget}</p>
                  </div>
                  <span className={`text-[10px] whitespace-nowrap px-2 py-1 rounded-full font-black ml-2 shadow-sm ${getStatusColor(fast.status)}`}>
                    {fast.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6 rounded-3xl border border-white/10 flex flex-col items-center justify-center text-center bg-gradient-to-br from-green-900/20 to-emerald-900/20">
          <TrendingUp className="w-10 h-10 text-emerald-400 mb-3" />
          <h3 className="font-bold text-xl mb-1">Market Potential</h3>
          <p className="text-xs opacity-60 mb-6 px-4">Capturing the plant-based market during fasting seasons presents significant upside.</p>
          
          <div className="bg-black/20 p-5 rounded-2xl w-full border border-white/5">
            <p className="text-[10px] uppercase font-bold text-emerald-400 mb-1">Estimated Potential</p>
            <p className="text-4xl font-black mb-4 flex items-center justify-center gap-2 text-gray-900 dark:text-white">
              40M <span className="text-xl">ETB</span>
              <TrendingUp className="w-6 h-6 text-green-600" />
            </p>
            
            <p className="text-[10px] uppercase font-bold text-emerald-400 mb-1 border-t border-white/10 pt-4">Target Launch</p>
            <p className="text-sm font-bold">Tir 2020 EC (Before Lent)</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Recommendations */}
        <div className="glass p-6 rounded-3xl border border-white/10 overflow-hidden">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Leaf className="w-5 h-5 text-green-400" />
            Recommended Plant-Based Pipeline
          </h3>
          <table className="w-full text-sm">
            <thead className="bg-white/5">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-bold opacity-60 rounded-tl-xl">Fasting Period</th>
                <th className="py-3 px-4 text-left text-xs font-bold opacity-60">Product</th>
                <th className="py-3 px-4 text-left text-xs font-bold opacity-60 rounded-tr-xl">Target Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 border-t border-white/5">
              {productRecommendations.map((rec, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4">
                    <p className="font-bold">{rec.period}</p>
                    <p className="text-[10px] opacity-60">{rec.time}</p>
                  </td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">{rec.product}</td>
                  <td className="py-3 px-4 font-mono text-xs">{rec.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Opportunity Calculator */}
        <div className="glass p-6 rounded-3xl border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors pointer-events-none" />
          
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-accent" />
            Market Opportunity Calculator
          </h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-end mb-2">
                <label className="text-sm font-medium opacity-80">Target Reach (Individuals)</label>
                <span className="text-xs font-bold px-2 py-1 bg-white/5 rounded-lg font-mono">{targetReach.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min="10000" max="500000" step="10000"
                value={targetReach}
                onChange={(e) => setTargetReach(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
              />
              <div className="flex justify-between text-[10px] opacity-40 mt-1">
                <span>10k</span>
                <span>500k</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-2">
                <label className="text-sm font-medium opacity-80">Expected Conversion</label>
                <span className="text-xs font-bold px-2 py-1 bg-white/5 rounded-lg font-mono">{conversionRate}%</span>
              </div>
              <input 
                type="range" 
                min="0.5" max="25" step="0.5"
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
              />
              <div className="flex justify-between text-[10px] opacity-40 mt-1">
                <span>0.5%</span>
                <span>25%</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
              <div>
                <p className="text-xs font-bold opacity-60">Avg. Product Price</p>
                <p className="text-lg font-bold">{avgPrice} ETB</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-accent uppercase tracking-wider mb-1">Projected Revenue</p>
                <p className="text-3xl font-black flex items-center gap-1 justify-end text-gray-900 dark:text-white">
                  {calculatedRevenue} <DollarSign className="w-6 h-6 opacity-80" />
                  <TrendingUp className="w-5 h-5 text-green-600 ml-1" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FastingPlanner;
