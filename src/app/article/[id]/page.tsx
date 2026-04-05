'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { allArticles, Article } from '@/lib/mockData';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  ChevronLeft,
  Clock,
  Calendar,
  ThumbsUp,
  Bookmark,
  Printer,
  Share2,
  Shield,
  Tag
} from 'lucide-react';
import Image from 'next/image';
import EthiopianDate from '@/components/dashboard/EthiopianDate';

const ArticlePage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language].dashboard.actions;

  const [article, setArticle] = useState<Article | null>(null);
  const [isHelpful, setIsHelpful] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const found = allArticles.find(a => a.id === id);
    if (found) {
      setArticle(found);
    } else {
      router.push('/dashboard');
    }
  }, [id, router]);

  if (!article) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-6 text-foreground">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm font-bold opacity-50 hover:opacity-100 hover:text-accent transition-all mb-8 group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {language === 'am' ? 'ወደ ኋላ ተመለስ' : 'Back to Dashboard'}
          </button>

          <div className="max-w-4xl mx-auto space-y-12">
            {/* Header */}
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-wrap items-center gap-4">
                <span className="px-4 py-1.5 bg-accent/20 text-accent rounded-full text-xs font-black uppercase tracking-widest border border-accent/20 shadow-lg">
                  {translations[language].dashboard.categories[article.category as keyof typeof translations.en.dashboard.categories] || article.category}
                </span>
                <div className="flex items-center gap-4 text-xs font-bold opacity-40 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{article.readTime}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /><EthiopianDate date={article.date} /></span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-foreground">
                {language === 'am' && article.titleAm ? article.titleAm : article.title}
              </h1>

              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-accent text-xl font-black">
                  {article.author.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-black opacity-30 uppercase tracking-widest">WRITTEN BY</p>
                  <p className="font-bold text-foreground">{article.author}</p>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative h-[300px] md:h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 group">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Content & Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              <div className="lg:col-span-3 space-y-8 glass p-8 md:p-12 rounded-[3.5rem] border border-white/10 shadow-xl leading-relaxed text-foreground">
                <div className="text-foreground/80 space-y-6">
                  <p className="text-xl font-bold mb-6 text-foreground leading-relaxed capitalize italic border-l-4 border-accent pl-6">
                    {language === 'am' && article.excerptAm ? article.excerptAm : article.excerpt}
                  </p>
                  <p>{article.content}</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <h3 className="text-2xl font-bold text-foreground">Dutch Standard Protocols</h3>
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                  <ul className="list-disc pl-6 space-y-3">
                    <li>{language === 'am' ? 'ሁልጊዜ የንጽህና ደረጃዎችን ይከተሉ' : 'Always follow the hygiene standards'}</li>
                    <li>{language === 'am' ? 'የለውጥ ወቅቶችዎን ሁለት ጊዜ ይፈትሹ' : 'Check consistency twice per shift'}</li>
                    <li>{language === 'am' ? 'ልዩነቶችን ወዲያው ሪፖርት ያድርጉ' : 'Report deviations immediately'}</li>
                  </ul>
                </div>

                {/* Article Footer Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-12 border-t border-white/10">
                  <div className="flex items-center gap-4">
                    <p className="text-sm font-bold opacity-60">Was this helpful?</p>
                    <button
                      onClick={() => setIsHelpful(!isHelpful)}
                      className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all active:scale-95 ${isHelpful ? 'bg-accent text-white shadow-lg' : 'glass border border-white/10 hover:bg-white/5'
                        }`}
                    >
                      <ThumbsUp className={`w-4 h-4 ${isHelpful ? 'fill-current' : ''}`} />
                      Yes
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsSaved(!isSaved)}
                      className={`p-4 rounded-xl transition-all shadow-md ${isSaved ? 'bg-amber-500 text-white' : 'glass border border-white/10 hover:bg-white/5'
                        }`}
                    >
                      <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                    <button className="p-4 glass rounded-xl border border-white/10 hover:bg-white/5 transition-all shadow-md">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button className="p-4 glass rounded-xl border border-white/10 hover:bg-white/5 transition-all shadow-md">
                      <Printer className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="glass p-8 rounded-[2.5rem] border border-white/10 shadow-lg bg-accent/5">
                  <h4 className="font-bold flex items-center gap-2 mb-6 text-foreground">
                    <Tag className="w-4 h-4 text-accent" />
                    Related Knowledge
                  </h4>
                  <div className="space-y-6">
                    {allArticles.filter(a => a.category === article.category && a.id !== article.id).slice(0, 3).map(rel => (
                      <button
                        key={rel.id}
                        onClick={() => router.push(`/article/${rel.id}`)}
                        className="w-full text-left group"
                      >
                        <p className="text-[10px] font-bold opacity-30 uppercase tracking-widest mb-1">
                          {translations[language].dashboard.categories[rel.category as keyof typeof translations.en.dashboard.categories] || rel.category}
                        </p>
                        <p className="text-sm font-bold group-hover:text-accent transition-colors leading-tight line-clamp-2 text-foreground">{rel.title}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="glass p-8 rounded-[2.5rem] border border-white/10 text-center">
                  <Shield className="w-10 h-10 text-blue-500 mx-auto mb-4 opacity-50" />
                  <p className="text-xs font-bold opacity-40 uppercase tracking-widest mb-2">Holland Note</p>
                  <p className="text-xs leading-relaxed opacity-60">This content is proprietary to Holland Dairy Ethiopia.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ArticlePage;
