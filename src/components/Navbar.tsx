'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language].nav;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-3 shadow-lg' : 'bg-transparent py-5'
        }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center text-foreground">
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
          <Link href="#about" className="hover:text-accent transition-colors">{t.about}</Link>
          <Link href="#products" className="hover:text-accent transition-colors">{t.products}</Link>
          <Link href="#resources" className="hover:text-accent transition-colors">{t.resources}</Link>
          <Link href="#faq" className="hover:text-accent transition-colors">{t.faq}</Link>

          <div className="flex items-center gap-4 ml-4 border-l border-foreground/10 pl-6">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 hover:text-accent transition-colors text-sm font-bold"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4" />
              {language === 'am' ? 'EN' : 'አማ'}
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-foreground/5 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <Link
              href="#resources"
              className="bg-primary text-white px-5 py-2 rounded-full hover:scale-105 transition-all shadow-md"
            >
              {t.hub}
            </Link>
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-4 md:hidden">
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
        <div className="md:hidden absolute top-full left-0 w-full glass shadow-2xl p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
          <Link href="#about" onClick={() => setIsMobileMenuOpen(false)}>{t.about}</Link>
          <Link href="#products" onClick={() => setIsMobileMenuOpen(false)}>{t.products}</Link>
          <Link href="#resources" onClick={() => setIsMobileMenuOpen(false)}>{t.resources}</Link>
          <Link href="#faq" onClick={() => setIsMobileMenuOpen(false)}>{t.faq}</Link>
          <button
            onClick={() => {
              toggleLanguage();
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 font-bold text-accent"
          >
            <Globe className="w-5 h-5" />
            {language === 'am' ? 'Switch to English' : 'ወደ አማርኛ ይቀይሩ'}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
