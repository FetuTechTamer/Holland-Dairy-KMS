'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { translations } from '@/lib/translations';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Lock, ArrowRight, UserCircle2, Briefcase, Flower2, Globe, Sun, Moon, Droplet, Shield, Users } from 'lucide-react';
import Image from 'next/image';
import { Role, StaffSubRole } from '@/lib/mockData';

const RegisterPage = () => {
  const { register } = useAuth();
  const { language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const t = translations[language].auth;
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'FARMER' as Role,
    staffSubRole: 'PRODUCTION' as StaffSubRole,
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
        formData.role === 'STAFF' ? formData.staffSubRole : undefined,
        formData.farmName,
        formData.department
      );

      if (result.success) {
        router.push('/dashboard');
      } else {
        const errorKey = result.error;

        const message =
          typeof errorKey === 'string'
            ? (t[errorKey as keyof typeof t] ?? errorKey)
            : 'Registration failed';

        setError(message);
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
        <Image src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=1200" alt="Farm Bg" fill className="object-cover" />
      </div>

      <div className="w-full max-w-4xl glass rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 border border-white/10 flex flex-col md:flex-row">
        {/* Left Side - Brand Context (Simplified) */}
        <div className="w-full md:w-1/3 bg-green-900/40 p-10 flex flex-col justify-between text-white">
          <div className="z-10">
            <Link href="/" className="inline-block mb-12 transition-transform hover:scale-105">
              <Image src="/logo-removebg.png" alt="Logo" width={130} height={45} className="brightness-200" />
            </Link>

            <div className="space-y-6">
              <h3 className="text-2md font-black leading-tight">Join Holand <br></br>Knowledge Hub</h3>

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3">
                  <Droplet className="w-5 h-5 text-accent" />
                  <span className="text-sm font-medium">Quality yoghurt production</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-accent" />
                  <span className="text-sm font-medium">SOPs & best practices</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-accent" />
                  <span className="text-sm font-medium">Farmer community</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-white/10">
            <p className="text-xs font-medium opacity-60">📚 Holland Knowledge Hub — Empowering Ethiopian Dairy</p>
          </div>
        </div>

        <div className="w-full md:w-2/3 p-10 md:p-14 bg-background/40 backdrop-blur-3xl">
          <div className="mb-8">
            {/* Top Row - Home Button + Togglers */}
            <div className="flex items-center justify-between gap-3 mb-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full hover:bg-accent/10 transition-all hover:scale-105 active:scale-95"
              >
                <ArrowRight className="w-5 h-5 rotate-180" />
                <span className="text-sm font-bold">Home</span>
              </Link>

              {/* Language & Theme Togglers */}
              <div className="flex items-center gap-2">
                {/* Language Toggler */}
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-1 px-3 py-2 glass rounded-full hover:bg-accent/10 transition-all text-sm font-bold"
                  aria-label="Toggle language"
                >
                  <Globe className="w-4 h-4" />
                  {language === 'am' ? 'EN' : 'አማ'}
                </button>

                {/* Theme Toggler */}
                <button
                  onClick={toggleTheme}
                  className="p-2 glass rounded-full hover:bg-accent/10 transition-all"
                  aria-label="Toggle theme"
                >
                  {theme === 'light' ? (
                    <Moon className="w-4 h-4" />
                  ) : (
                    <Sun className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <h1 className="text-2xl font-black mb-1">{t.registerTitle}</h1>
              <p className="text-foreground/50 text-sm font-medium">{t.registerSubtitle}</p>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl text-red-500 text-xs font-bold mb-6 animate-in shake duration-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-xs font-bold opacity-60 ml-1">{t.name}</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-2.5 text-sm focus:ring-2 focus:ring-accent/50 outline-none transition-all placeholder:opacity-30"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold opacity-60 ml-1">{t.email}</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-2.5 text-sm focus:ring-2 focus:ring-accent/50 outline-none transition-all placeholder:opacity-30"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold opacity-60 ml-1">{t.role}</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'FARMER' })}
                  className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all text-center ${formData.role === 'FARMER'
                    ? 'border-accent bg-accent/10'
                    : 'border-white/10 glass hover:bg-white/5 opacity-70'
                    }`}
                >
                  <Flower2 className={`w-5 h-5 ${formData.role === 'FARMER' ? 'text-accent' : ''}`} />
                  <p className="font-bold text-[10px] leading-tight">{t.farmer}</p>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'STAFF' })}
                  className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all text-center ${formData.role === 'STAFF'
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-white/10 glass hover:bg-white/5 opacity-70'
                    }`}
                >
                  <Briefcase className={`w-5 h-5 ${formData.role === 'STAFF' ? 'text-blue-500' : ''}`} />
                  <p className="font-bold text-[10px] leading-tight">{t.staff}</p>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'ADMIN' })}
                  className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all text-center ${formData.role === 'ADMIN'
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-white/10 glass hover:bg-white/5 opacity-70'
                    }`}
                >
                  <Briefcase className={`w-5 h-5 ${formData.role === 'ADMIN' ? 'text-purple-500' : ''}`} />
                  <p className="font-bold text-[10px] leading-tight">{t.admin}</p>
                </button>
              </div>
            </div>

            {/* Conditional Fields */}
            <div className="animate-in slide-in-from-top-2 duration-300">
              {formData.role === 'FARMER' && (
                <div className="space-y-1">
                  <label className="text-xs font-bold opacity-60 ml-1">{t.farmName}</label>
                  <input
                    type="text"
                    required
                    placeholder="Your farm name"
                    value={formData.farmName}
                    onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-accent/50 outline-none transition-all placeholder:opacity-30"
                  />
                </div>
              )}
              {formData.role === 'STAFF' && (
                <div className="space-y-1">
                  <label className="text-xs font-bold opacity-60 ml-1">Staff Type</label>
                  <select
                    required
                    value={formData.staffSubRole}
                    onChange={(e) => setFormData({ ...formData, staffSubRole: e.target.value as StaffSubRole, department: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-accent/50 outline-none transition-all"
                  >
                    <option value="PRODUCTION" className="bg-green-950">Production Staff (Factory & Operations)</option>
                    <option value="QUALITY" className="bg-green-950">Quality Staff (Lab & Compliance)</option>
                    <option value="LOGISTICS" className="bg-green-950">Logistics Staff (Supply Chain & Distribution)</option>
                  </select>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-xs font-bold opacity-60 ml-1">{t.password}</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
                  <input
                    type="password"
                    required
                    placeholder="••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-2.5 text-sm focus:ring-2 focus:ring-accent/50 outline-none transition-all placeholder:opacity-30"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold opacity-60 ml-1">{t.confirmPassword}</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
                  <input
                    type="password"
                    required
                    placeholder="••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-2.5 text-sm focus:ring-2 focus:ring-accent/50 outline-none transition-all placeholder:opacity-30"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent text-white font-bold py-3.5 rounded-xl shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {t.registerBtn}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/login" className="text-xs font-bold text-foreground/50 hover:text-accent transition-colors">
              {t.hasAccount}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;