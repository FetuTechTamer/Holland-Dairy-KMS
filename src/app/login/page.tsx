'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { translations } from '@/lib/translations';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, ArrowRight, AlertCircle, ChefHat, Globe, Sun, Moon } from 'lucide-react';
import Image from 'next/image';

const LoginPage = () => {
  const { login } = useAuth();
  const { language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const t = translations[language].auth;
  const router = useRouter();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showResetToast, setShowResetToast] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        if (rememberMe) {
          localStorage.setItem('holland_remember_me', 'true');
        } else {
          localStorage.removeItem('holland_remember_me');
        }
        router.push('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setShowResetToast(true);
    setTimeout(() => setShowResetToast(false), 5000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden">
      {/* Toast Notification */}
      {showResetToast && (
        <div className="fixed top-10 right-10 z-[100] glass border border-accent/20 p-4 rounded-2xl shadow-2xl animate-in slide-in-from-right duration-500 max-w-sm">
          <p className="text-sm font-bold text-accent">{t.passwordResetSent}</p>
        </div>
      )}

      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <Image src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=1200" alt="Dairy Bg" fill className="object-cover" />
      </div>

      <div className="w-full max-w-4xl glass rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 border border-white/10 flex flex-col md:flex-row">
        {/* Left Side - Brand Context */}
        <div className="w-full md:w-1/2 bg-green-900/40 p-12 flex flex-col justify-between text-white relative">
          <div className="z-10">
            <Link href="/" className="inline-block mb-12">
              <Image src="/logo-removebg.png" alt="Logo" width={150} height={50} className="brightness-200" />
            </Link>
            <h2 className="text-4xl font-black mb-6 leading-tight">Empowering<br />Ethiopian Dairy.</h2>
            <p className="text-white/60 font-medium leading-relaxed">Access standard operating procedures, expert advice, and our community of farmers.</p>
          </div>
          <div className="z-10 pt-12 border-t border-white/10 flex gap-6 text-[10px] font-black uppercase tracking-widest opacity-40">
            <span>Quality</span>
            <span>Innovation</span>
            <span>Localization</span>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-12 md:p-16 bg-background/40 backdrop-blur-3xl">
          <div className="mb-10">
            {/* Top Row - Back Button + Togglers */}
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

            {/* Title + Subtitle */}
            <h1 className="text-3xl font-black mb-2">{t.loginTitle}</h1>
            <p className="text-foreground/50 font-medium">{t.loginSubtitle}</p>
          </div>

          {/* Demo Credentials */}
          <div className="mb-6">
            <p className="text-[10px] font-black opacity-30 uppercase tracking-widest mb-2">
              {language === 'am' ? 'ፈጣን ሙከራ' : 'Quick Demo'}
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                {
                  label: language === 'am' ? 'አርሶ አደር' : 'Farmer',
                  email: 'farmer@holland.com',
                  pass: 'farmer123',
                  color: 'bg-green-200/30 text-green-700 border-green-300/50'
                },
                {
                  label: language === 'am' ? 'ምርት' : 'Production',
                  email: 'production@holland.com',
                  pass: 'production123',
                  color: 'bg-blue-200/30 text-blue-700 border-blue-300/50'
                },
                {
                  label: language === 'am' ? 'ጥራት' : 'Quality',
                  email: 'quality@holland.com',
                  pass: 'quality123',
                  color: 'bg-amber-200/30 text-amber-700 border-amber-300/50'
                },
                {
                  label: language === 'am' ? 'ሎጂስቲክስ' : 'Logistics',
                  email: 'logistics@holland.com',
                  pass: 'logistics123',
                  color: 'bg-purple-200/30 text-purple-700 border-purple-300/50'
                },
                {
                  label: language === 'am' ? 'አስተዳዳሪ' : 'Admin',
                  email: 'admin@holland.com',
                  pass: 'admin123',
                  color: 'bg-gray-200/30 text-gray-700 border-gray-300/50'
                },
              ].map(demo => (
                <button key={demo.email} type="button"
                  onClick={() => setFormData({ email: demo.email, password: demo.pass })}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-black border transition-all hover:scale-105 ${demo.color}`}>
                  {demo.label}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-500 text-sm font-bold mb-6 animate-in shake duration-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold opacity-60 ml-1">{t.email}</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30" />
                <input
                  type="email"
                  required
                  placeholder="admin@holland.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-3.5 focus:ring-2 focus:ring-accent/50 outline-none transition-all placeholder:opacity-20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold opacity-60">{t.password}</label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-xs font-bold text-accent hover:underline"
                >
                  {t.forgotPassword}
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30" />
                <input
                  type="password"
                  required
                  placeholder="admin123"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-3.5 focus:ring-2 focus:ring-accent/50 outline-none transition-all placeholder:opacity-20"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 ml-1">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-white/10 bg-white/5 text-accent focus:ring-accent/50 cursor-pointer"
              />
              <label htmlFor="remember" className="text-sm font-bold opacity-60 cursor-pointer select-none">
                {t.rememberMe}
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent text-white font-bold py-4 rounded-2xl shadow-xl shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {t.loginBtn}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="pt-6 text-center">
            <Link href="/register" className="text-sm font-bold text-foreground/50 hover:text-accent transition-colors">
              {t.noAccount}
            </Link>
          </div>


        </div>
      </div>
    </div>
  );
};

export default LoginPage;