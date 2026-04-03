'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Globe, User, LogOut, LayoutDashboard, Settings } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { translations } from '@/lib/translations';
import NotificationBell from './dashboard/NotificationBell';
import ContactModal from './ContactModal';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const { user, status, logout } = useAuth();
  const t = translations[language].nav;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'bg-purple-500';
      case 'STAFF': return 'bg-blue-500';
      case 'FARMER': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-3 shadow-lg' : 'bg-transparent py-5'
          }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center text-foreground">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-removebg.png"
              alt="Holland Dairy Logo"
              width={150}
              height={50}
              className="object-contain dark:brightness-110"
              priority
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 font-medium">
            <Link href="/" className="hover:text-accent transition-colors flex items-center gap-2">
              {t.home}
            </Link>
            <Link href="/#about" className="hover:text-accent transition-colors">
              {t.about}
            </Link>
            <Link href="/#products" className="hover:text-accent transition-colors">
              {t.products}
            </Link>
            <Link href="/#resources" className="hover:text-accent transition-colors">
              {t.resources}
            </Link>
            
            <button 
              onClick={() => setIsContactOpen(true)}
              className="hover:text-accent transition-colors"
            >
              {t.contact}
            </button>

            {/* Controls */}
            <div className="flex items-center gap-4 ml-4 border-l border-foreground/10 pl-6">
              {/* Language */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1 hover:text-accent transition-colors text-sm font-bold"
                aria-label="Toggle language"
              >
                <Globe className="w-4 h-4" />
                {language === 'am' ? 'EN' : 'አማ'}
              </button>

              {/* Theme */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-foreground/5 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </button>

              {/* Notification Bell */}
              {user && <NotificationBell />}

              {/* Hub/Auth Logic */}
              {status === 'loading' ? (
                <div className="w-10 h-10 rounded-full bg-foreground/5 animate-pulse" />
              ) : user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-foreground/5 transition-all border border-foreground/10"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs ${getRoleColor(user.role)} shadow-sm`}>
                      {user.name.charAt(0)}
                    </div>
                    <div className="flex flex-col items-start leading-none group text-left">
                       <span className="text-[10px] font-black opacity-40 uppercase tracking-tighter">{user.role}</span>
                       <span className="text-[11px] font-bold truncate max-w-[80px]">{user.name.split(' ')[0]}</span>
                    </div>
                  </button>

                  {isProfileOpen && (
                    <>
                      <div className="fixed inset-0" onClick={() => setIsProfileOpen(false)} />
                      <div className="absolute right-0 mt-2 w-56 glass rounded-2xl shadow-2xl z-50 overflow-hidden border border-foreground/10 animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-4 border-b border-foreground/10 bg-foreground/5 fle">
                          <p className="text-sm font-bold truncate">{user.name}</p>
                          <p className="text-[10px] opacity-60 truncate">{user.email}</p>
                        </div>
                        <div className="p-2">
                          <Link 
                            href="/dashboard"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent hover:text-white transition-all group"
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            <span className="text-sm font-medium">{t.dashboard}</span>
                          </Link>
                          <Link 
                            href="/profile"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent hover:text-white transition-all group"
                          >
                            <User className="w-4 h-4" />
                            <span className="text-sm font-medium">{t.profile}</span>
                          </Link>
                          <Link 
                            href="/"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-600 hover:text-white transition-all group"
                          >
                            <LayoutDashboard className="w-4 h-4 -rotate-90" />
                            <span className="text-sm font-medium">{t.goHome}</span>
                          </Link>
                          <button 
                            onClick={() => {
                              logout();
                              setIsProfileOpen(false);
                            }}
                            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-500 hover:text-white transition-all group mt-1"
                          >
                            <LogOut className="w-4 h-4" />
                            <span className="text-sm font-medium">{t.logout}</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-2.5 rounded-full transition-all shadow-lg hover:scale-105"
                >
                  {t.login}
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-4 md:hidden">
            {user && <NotificationBell />}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-foreground/5"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button
              className="p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full glass shadow-2xl p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
            <Link href="/#about" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-foreground/5">{t.about}</Link>
            <Link href="/#products" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-foreground/5">{t.products}</Link>
            <Link href="/#resources" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-foreground/5">{t.resources}</Link>
            <button 
              onClick={() => {
                setIsContactOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-foreground/5"
            >
              {t.contact}
            </button>

            {user ? (
              <>
                <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-foreground/5 font-bold text-accent">{t.dashboard}</Link>
                <button 
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left py-2 text-red-500 font-bold"
                >
                  {t.logout}
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-accent text-white font-bold p-4 rounded-2xl text-center shadow-lg"
              >
                {t.login}
              </Link>
            )}

            <button
              onClick={() => {
                toggleLanguage();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 p-3 font-bold text-accent"
            >
              <Globe className="w-5 h-5" />
              {language === 'am' ? 'English' : 'አማርኛ'}
            </button>
          </div>
        )}
      </nav>
      
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
};

export default Navbar;