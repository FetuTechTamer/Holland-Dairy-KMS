'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, ArrowRight, AlertCircle, ChefHat } from 'lucide-react';
import Image from 'next/image';

const LoginPage = () => {
  const { login } = useAuth();
  const { language } = useLanguage();
  const t = translations[language].auth;
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(email, password);
      if (success) {
        router.push('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side: Visual/Branding */}
      <div className="hidden md:flex md:w-1/2 relative bg-green-900 items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <Image 
            src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=1200" 
            alt="Dairy Farm" 
            fill 
            className="object-cover"
          />
        </div>
        <div className="relative z-10 text-white max-w-lg">
          <div className="p-4 bg-accent/20 backdrop-blur-xl rounded-3xl inline-block mb-8 border border-white/20">
            <ChefHat className="w-12 h-12 text-accent" />
          </div>
          <h1 className="text-5xl font-black mb-6 leading-tight">
            Ethiopian Heart,<br />
            <span className="text-accent underline decoration-4 underline-offset-8">Dutch Technology.</span>
          </h1>
          <p className="text-xl text-white/70 leading-relaxed">
            Welcome to the Holland Dairy Knowledge Hub. Your central resource for premium dairy standards and collaboration.
          </p>
        </div>
        {/* Abstract Shapes */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-green-500/20 rounded-full blur-3xl" />
      </div>

      {/* Right Side: Form */}
      <div className="w-full md:w-1/2 bg-background flex items-center justify-center p-8 md:p-20">
        <div className="w-full max-w-md space-y-10 animate-in fade-in slide-in-from-right-8 duration-500">
          <div className="text-center md:text-left">
            <Link href="/" className="inline-block mb-8">
              <Image src="/logo-removebg.png" alt="Logo" width={180} height={60} className="dark:brightness-110" />
            </Link>
            <h2 className="text-3xl font-bold mb-2">{t.loginTitle}</h2>
            <p className="text-foreground/50 font-medium">{t.loginSubtitle}</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-3 text-red-500 text-sm font-bold animate-in shake duration-300">
              <AlertCircle className="w-5 h-5 shrink-0" />
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-foreground/5 border border-foreground/10 rounded-2xl px-12 py-4 focus:ring-2 focus:ring-accent/50 outline-none transition-all placeholder:opacity-30"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-bold opacity-60">{t.password}</label>
                <button type="button" className="text-[10px] font-bold text-accent hover:underline">FORGOT?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30" />
                <input
                  type="password"
                  required
                  placeholder="admin123"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-foreground/5 border border-foreground/10 rounded-2xl px-12 py-4 focus:ring-2 focus:ring-accent/50 outline-none transition-all placeholder:opacity-30"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent text-white font-bold py-5 rounded-2xl shadow-xl shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:translate-y-0"
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
          
          <div className="pt-10 border-t border-foreground/5 grid grid-cols-3 gap-4">
             <div className="text-center">
               <p className="text-[10px] font-bold opacity-40 uppercase mb-1">Admin</p>
               <p className="text-[8px] opacity-30">admin@holland.com</p>
             </div>
             <div className="text-center">
               <p className="text-[10px] font-bold opacity-40 uppercase mb-1">Farmer</p>
               <p className="text-[8px] opacity-30">abebe@farmer.com</p>
             </div>
             <div className="text-center">
               <p className="text-[10px] font-bold opacity-40 uppercase mb-1">Staff</p>
               <p className="text-[8px] opacity-30">sara@staff.com</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
