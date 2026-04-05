'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useRouter } from 'next/navigation';
import { qcRecords, maintenanceLogs } from '@/lib/mockData';
import { FlaskConical, Thermometer, AlertTriangle, CheckCircle, XCircle, TrendingUp } from 'lucide-react';

export default function QualityDashboardPage() {
  const { user, status } = useAuth();
  const { language } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
    if (status === 'authenticated' && user?.role === 'FARMER') router.push('/dashboard');
  }, [status, user, router]);

  if (status === 'loading' || !user) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );

  const passed = qcRecords.filter(q => q.status === 'PASS').length;
  const warned = qcRecords.filter(q => q.status === 'WARNING').length;
  const failed = qcRecords.filter(q => q.status === 'FAIL').length;
  const passRate = Math.round((passed / qcRecords.length) * 100);

  const avgFat = (qcRecords.reduce((s, q) => s + q.fat, 0) / qcRecords.length).toFixed(2);
  const avgProtein = (qcRecords.reduce((s, q) => s + q.protein, 0) / qcRecords.length).toFixed(2);
  const avgPH = (qcRecords.reduce((s, q) => s + q.pH, 0) / qcRecords.length).toFixed(2);

  const statusIcon = (s: string) => {
    if (s === 'PASS') return <CheckCircle className="w-4 h-4 text-green-500" />;
    if (s === 'WARNING') return <AlertTriangle className="w-4 h-4 text-amber-500" />;
    return <XCircle className="w-4 h-4 text-red-500" />;
  };
  const statusClass = (s: string) => s === 'PASS' ? 'bg-green-500/20 text-green-500' : s === 'WARNING' ? 'bg-amber-500/20 text-amber-500' : 'bg-red-500/20 text-red-500';

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-grow container mx-auto px-6 pt-32 pb-20">
        <Breadcrumb />

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black mb-2 flex items-center gap-3">
              <FlaskConical className="w-9 h-9 text-blue-500" />
              {language === 'am' ? 'QC ዳሽቦርድ' : 'Quality Control Dashboard'}
            </h1>
            <p className="opacity-50 text-sm">{language === 'am' ? 'ቢሾፍቱ ፋብሪካ — ያለፉት 30 ቀናት' : 'Bishoftu Plant — Last 30 Days (2019 EC)'}</p>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: language === 'am' ? 'የማለፊያ ደረጃ' : 'Pass Rate', value: `${passRate}%`, icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-500/10' },
            { label: language === 'am' ? 'አጠቃላይ ምርመራ' : 'Total Inspections', value: qcRecords.length, icon: FlaskConical, color: 'text-blue-500', bg: 'bg-blue-500/10' },
            { label: language === 'am' ? 'ማስጠንቀቂያዎች' : 'Warnings', value: warned, icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-500/10' },
            { label: language === 'am' ? 'ያልተሳኩ' : 'Failed', value: failed, icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
          ].map((k, i) => (
            <div key={i} className="glass p-5 rounded-3xl border border-white/10">
              <div className={`w-10 h-10 rounded-2xl ${k.bg} flex items-center justify-center mb-3`}>
                <k.icon className={`w-5 h-5 ${k.color}`} />
              </div>
              <p className={`text-3xl font-black ${k.color}`}>{k.value}</p>
              <p className="text-xs opacity-50 mt-1 font-bold">{k.label}</p>
            </div>
          ))}
        </div>

        {/* Averages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            { label: language === 'am' ? 'አማካይ ቅባት %' : 'Avg Fat %', value: avgFat, target: '3.5–4.2', ok: parseFloat(avgFat) >= 3.5 },
            { label: language === 'am' ? 'አማካይ ፕሮቲን %' : 'Avg Protein %', value: avgProtein, target: '3.0–3.5', ok: parseFloat(avgProtein) >= 3.0 },
            { label: language === 'am' ? 'አማካይ pH' : 'Avg pH', value: avgPH, target: '4.4–4.7', ok: parseFloat(avgPH) >= 4.4 && parseFloat(avgPH) <= 4.7 },
          ].map((m, i) => (
            <div key={i} className={`glass p-5 rounded-3xl border ${m.ok ? 'border-green-500/20' : 'border-amber-500/20'}`}>
              <p className="text-[10px] opacity-40 font-bold uppercase mb-1">{m.label}</p>
              <p className="text-3xl font-black">{m.value}</p>
              <p className={`text-xs font-bold mt-2 ${m.ok ? 'text-green-500' : 'text-amber-500'}`}>
                {language === 'am' ? 'ዒላማ' : 'Target'}: {m.target} — {m.ok ? (language === 'am' ? '✓ ጥሩ' : '✓ OK') : (language === 'am' ? '⚠ ክልል ውጪ' : '⚠ Out of range')}
              </p>
            </div>
          ))}
        </div>

        {/* Full QC Table */}
        <div className="glass rounded-[2rem] border border-white/10 overflow-x-auto mb-10">
          <div className="px-6 py-4 border-b border-white/5">
            <h2 className="font-black text-lg">{language === 'am' ? 'ሙሉ QC ምዝገባ' : 'Full QC Records'}</h2>
          </div>
          <table className="w-full min-w-[800px]">
            <thead className="bg-white/5">
              <tr className="text-[10px] uppercase font-bold opacity-50">
                <th className="px-6 py-3 text-left">{language === 'am' ? 'ቀን' : 'Date'}</th>
                <th className="px-6 py-3 text-left">Batch</th>
                <th className="px-6 py-3 text-left">Fat %</th>
                <th className="px-6 py-3 text-left">Protein %</th>
                <th className="px-6 py-3 text-left">Bacteria/mL</th>
                <th className="px-6 py-3 text-left">pH</th>
                <th className="px-6 py-3 text-left">Temp °C</th>
                <th className="px-6 py-3 text-left">{language === 'am' ? 'ሁኔታ' : 'Status'}</th>
                <th className="px-6 py-3 text-left">{language === 'am' ? 'ተቆጣጣሪ' : 'Inspector'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {qcRecords.map(q => (
                <tr key={q.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-3 text-sm font-bold">{q.date}</td>
                  <td className="px-6 py-3 font-mono text-[10px] opacity-60">{q.batchId}</td>
                  <td className="px-6 py-3 text-sm">{q.fat}</td>
                  <td className="px-6 py-3 text-sm">{q.protein}</td>
                  <td className={`px-6 py-3 text-sm font-bold ${q.bacteria > 100000 ? 'text-red-500' : q.bacteria > 30000 ? 'text-amber-500' : ''}`}>
                    {q.bacteria.toLocaleString()}
                  </td>
                  <td className="px-6 py-3 text-sm">{q.pH}</td>
                  <td className={`px-6 py-3 text-sm ${q.temperature > 5 ? 'text-amber-500 font-bold' : ''}`}>{q.temperature}</td>
                  <td className="px-6 py-3">
                    <span className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-black w-fit ${statusClass(q.status)}`}>
                      {statusIcon(q.status)}{q.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-xs opacity-60">{q.inspector}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cold Storage */}
        <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
          <Thermometer className="w-6 h-6 text-blue-400" />
          {language === 'am' ? 'ቀዝቃዛ ማሸጊያ ሁኔታ ($2M ተቋም)' : 'Cold Storage Status ($2M Facility)'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { zone: language === 'am' ? 'ዞን A – እርጎ' : 'Zone A – Yoghurt', temp: 3.8, capacity: 78, status: 'OK' },
            { zone: language === 'am' ? 'ዞን B – ወተት' : 'Zone B – Milk', temp: 4.1, capacity: 55, status: 'OK' },
            { zone: language === 'am' ? 'ዞን C – ቋት' : 'Zone C – Buffer', temp: 5.6, capacity: 22, status: 'WARNING' },
          ].map((z, i) => (
            <div key={i} className={`glass p-6 rounded-3xl border ${z.status === 'OK' ? 'border-green-500/20' : 'border-amber-500/30'}`}>
              <div className="flex justify-between items-start mb-2">
                <p className="font-bold">{z.zone}</p>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${z.status === 'OK' ? 'bg-green-500/20 text-green-500' : 'bg-amber-500/20 text-amber-500'}`}>{z.status}</span>
              </div>
              <p className="text-4xl font-black mt-2">{z.temp}°C</p>
              <div className="mt-3 h-1.5 w-full bg-white/10 rounded-full">
                <div className="h-full rounded-full bg-blue-400" style={{ width: `${z.capacity}%` }} />
              </div>
              <p className="text-[10px] opacity-40 mt-1">{z.capacity}% {language === 'am' ? 'ሙሉ' : 'capacity used'}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
