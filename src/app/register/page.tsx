'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Lock, ArrowRight, UserCircle2, Briefcase, Flower2 } from 'lucide-react';
import Image from 'next/image';
import { Role } from '@/lib/mockData';

const RegisterPage = () => {
  const { register } = useAuth();
  const { language } = useLanguage();
  const t = translations[language].auth;
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'FARMER' as Role,
    farmName: '',
    department: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      setError(t.errorMinChar);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError(t.passwordsDontMatch);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await register(
        formData.name,
        formData.email,
        formData.role,
        formData.farmName,
        formData.department
      );

      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(t[result.error as keyof typeof t] || 'Registration failed');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <Image src="https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&q=80&w=1200" alt="Farm Bg" fill className="object-cover" />
      </div>

      <div className="w-full max-w-5xl glass rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 border border-white/10 flex flex-col md:flex-row">
        {/* Progress Sidebar (Visual) */}
        <div className="w-full md:w-1/4 bg-green-900/40 p-10 flex flex-col justify-between text-white border-r border-white/5">
          <div className="space-y-12">
            <Link href="/" className="inline-block transition-transform hover:scale-105">
              <Image src="/logo-removebg.png" alt="Logo" width={150} height={50} className="brightness-200" />
            </Link>
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold text-sm ring-4 ring-accent/20">1</div>
                <span className="font-bold">Initial Info</span>
              </div>
              <div className="flex items-center gap-4 opacity-50">
                <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center font-bold text-sm">2</div>
                <span className="font-bold">Verification</span>
              </div>
            </div>
          </div>
          <div className="pt-10 border-t border-white/10">
            <p className="text-xs font-medium opacity-60">Join 5,000+ local Ethiopian farmers.</p>
          </div>
        </div>

        <div className="w-full md:w-3/4 p-10 md:p-14 bg-background/40 backdrop-blur-3xl">
          <div className="mb-10 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-black mb-2">{t.registerTitle}</h1>
              <p className="text-foreground/50 font-medium">{t.registerSubtitle}</p>
            </div>

            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 glass rounded-full hover:bg-accent/10 transition-colors"
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
              <span className="text-sm font-bold">Home</span>
            </Link>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl text-red-500 text-sm font-bold mb-8 animate-in shake duration-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold opacity-60 ml-1">{t.name}</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-3 focus:ring-2 focus:ring-accent/50 outline-none transition-all placeholder:opacity-30"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold opacity-60 ml-1">{t.email}</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-3 focus:ring-2 focus:ring-accent/50 outline-none transition-all placeholder:opacity-30"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold opacity-60 ml-1">{t.role}</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'FARMER' })}
                  className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${formData.role === 'FARMER'
                    ? 'border-accent bg-accent/10'
                    : 'border-white/10 glass hover:bg-white/5 opacity-60'
                    }`}
                >
                  <Flower2 className={`w-6 h-6 shrink-0 ${formData.role === 'FARMER' ? 'text-accent' : ''}`} />
                  <div className="text-left">
                    <p className="font-bold text-xs leading-tight">{t.farmer}</p>
                    <p className="text-[10px] opacity-60 uppercase font-black">Farm Owner</p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'STAFF' })}
                  className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${formData.role === 'STAFF'
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-white/10 glass hover:bg-white/5 opacity-60'
                    }`}
                >
                  <Briefcase className={`w-6 h-6 shrink-0 ${formData.role === 'STAFF' ? 'text-blue-500' : ''}`} />
                  <div className="text-left">
                    <p className="font-bold text-xs leading-tight">{t.staff}</p>
                    <p className="text-[10px] opacity-60 uppercase font-black">Factory Team</p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'ADMIN' })}
                  className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${formData.role === 'ADMIN'
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-white/10 glass hover:bg-white/5 opacity-60'
                    }`}
                >
                  <Briefcase className={`w-6 h-6 shrink-0 ${formData.role === 'ADMIN' ? 'text-purple-500' : ''}`} />
                  <div className="text-left">
                    <p className="font-bold text-xs leading-tight">{t.admin}</p>
                    <p className="text-[10px] opacity-60 uppercase font-black">Management</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Conditional Fields */}
            <div className="animate-in slide-in-from-top-2 duration-300">
              {formData.role === 'FARMER' && (
                <div className="space-y-2">
                  <label className="text-sm font-bold opacity-60 ml-1">{t.farmName}</label>
                  <input
                    type="text" required
                    value={formData.farmName}
                    onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-3 focus:ring-2 focus:ring-accent/50 outline-none transition-all placeholder:opacity-30"
                  />
                </div>
              )}
              {formData.role === 'STAFF' && (
                <div className="space-y-2">
                  <label className="text-sm font-bold opacity-60 ml-1">{t.department}</label>
                  <select
                    required
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-3 focus:ring-2 focus:ring-accent/50 outline-none transition-all appearance-none"
                  >
                    <option value="" disabled>Select Department</option>
                    <option value="Processing" className="bg-green-950">Processing</option>
                    <option value="Quality" className="bg-green-950">Quality Control</option>
                    <option value="Logistics" className="bg-green-950">Logistics</option>
                  </select>
                </div>
              )}

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold opacity-60 ml-1">{t.password}</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30" />
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-3 focus:ring-2 focus:ring-accent/50 outline-none transition-all placeholder:opacity-30"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold opacity-60 ml-1">{t.confirmPassword}</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30" />
                  <input
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-3 focus:ring-2 focus:ring-accent/50 outline-none transition-all placeholder:opacity-30"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent text-white font-bold py-5 rounded-2xl shadow-xl shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {t.registerBtn}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link href="/login" className="text-sm font-bold text-foreground/50 hover:text-accent transition-colors">
              {t.hasAccount}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
