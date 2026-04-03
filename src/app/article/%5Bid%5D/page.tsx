'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { farmerArticles, staffArticles, Article } from '@/lib/mockData';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ChevronLeft, Clock, Tag, Calendar, User, ThumbsUp, Bookmark, Printer, Share2, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const ArticlePage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language].dashboard.actions;
  
  const [article, setArticle] = useState<Article | null>(null);
  const [isHelpful, setIsHelpful] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const allArticles = [...farmerArticles, ...staffArticles];
    const found = allArticles.find(a => a.id === id);
    if (found) {
      setArticle(found);
    } else {
      router.push('/dashboard');
    }
  }, [id, router]);

  if (!article) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-6">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm font-bold opacity-50 hover:opacity-100 hover:text-accent transition-all mb-8 group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </button>

          <div className="max-w-4xl mx-auto space-y-12">
            {/* Header */}
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-wrap items-center gap-4">
                <span className="px-4 py-1.5 bg-accent/20 text-accent rounded-full text-xs font-black uppercase tracking-widest border border-accent/20 shadow-lg">
                  {article.category}
                </span>
                <div className="flex items-center gap-4 text-xs font-bold opacity-40 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{article.readTime}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{article.date}</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                {article.title}
              </h1>
              
              <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-accent text-xl font-black">
                  {article.author.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-black opacity-30 uppercase tracking-widest">WRITTEN BY</p>
                  <p className="font-bold">{article.author}</p>
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
              <div className="lg:col-span-3 space-y-8 glass p-8 md:p-12 rounded-[3.5rem] border border-white/10 shadow-xl leading-relaxed">
                <div className="prose prose-invert prose-lg max-w-none">
                  <p className="text-xl font-bold mb-6 text-foreground/80 leading-relaxed capitalize italic border-l-4 border-accent pl-6">
                    {article.excerpt}
                  </p>
                  <div className="text-foreground/70 space-y-6">
                    <p>{article.content}</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <h3 className="text-2xl font-bold text-foreground">Dutch Standard Protocols</h3>
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <ul className="list-disc pl-6 space-y-3">
                      <li>Always follow the 2-step hygiene process</li>
                      <li>Calibrate sensors every 24 hours</li>
                      <li>Report deviations to your supervisor immediately</li>
                    </ul>
                  </div>
                </div>

                {/* Article Footer Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-12 border-t border-white/5">
                  <div className="flex items-center gap-4">
                    <p className="text-sm font-bold opacity-60">Was this helpful?</p>
                    <button 
                      onClick={() => setIsHelpful(!isHelpful)}
                      className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all active:scale-95 ${
                        isHelpful ? 'bg-accent text-white shadow-lg' : 'glass border border-white/10 hover:bg-white/5'
                      }`}
                    >
                      <ThumbsUp className={`w-4 h-4 ${isHelpful ? 'fill-current' : ''}`} />
                      Yes
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 rounded-2xl glass border border-white/10 hover:bg-white/5 font-bold transition-all active:scale-95">
                      No
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setIsSaved(!isSaved)}
                      className={`p-4 rounded-xl transition-all shadow-md ${
                        isSaved ? 'bg-amber-500 text-white' : 'glass border border-white/10 hover:bg-white/5'
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
                  <h4 className="font-bold flex items-center gap-2 mb-6">
                    <Tag className="w-4 h-4 text-accent" />
                    Related Knowledge
                  </h4>
                  <div className="space-y-6">
                    {(article.role === 'FARMER' ? farmerArticles : staffArticles).slice(0, 3).filter(a => a.id !== article.id).map(rel => (
                      <button 
                        key={rel.id}
                        onClick={() => router.push(`/article/${rel.id}`)}
                        className="w-full text-left group"
                      >
                        <p className="text-[10px] font-bold opacity-30 uppercase tracking-widest mb-1">{rel.category}</p>
                        <p className="text-sm font-bold group-hover:text-accent transition-colors leading-tight line-clamp-2">{rel.title}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="glass p-8 rounded-[2.5rem] border border-white/10 text-center">
                  <Shield className="w-10 h-10 text-blue-500 mx-auto mb-4 opacity-50" />
                  <p className="text-xs font-bold opacity-40 uppercase tracking-widest mb-2">Internal Note</p>
                  <p className="text-xs leading-relaxed opacity-60">This article contains Holland Dairy proprietary protocols. Do not share externally.</p>
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
