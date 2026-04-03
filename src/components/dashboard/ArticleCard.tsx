'use client';

import React from 'react';
import { Clock, Tag, ChevronRight, Bookmark, ThumbsUp, Printer, Share2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { Article } from '@/lib/mockData';
import Image from 'next/image';
import Link from 'next/link';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const { language } = useLanguage();
  const t = translations[language].dashboard.actions;

  const getCategoryLabel = (cat: string) => {
    const cats = translations[language].dashboard.categories;
    return (cats as any)[cat] || cat;
  };

  return (
    <div className="glass group rounded-3xl border border-white/10 overflow-hidden hover:shadow-2xl hover:shadow-accent/5 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1 glass rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/20">
            {getCategoryLabel(article.category)}
          </span>
          {article.version && (
            <span className="px-3 py-1 bg-accent/90 text-white rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg">
              {article.version}
            </span>
          )}
        </div>
        
        <button className="absolute top-4 right-4 p-2 glass rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-accent hover:text-white transform translate-y-[-10px] group-hover:translate-y-0">
          <Bookmark className="w-4 h-4" />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-[10px] font-bold opacity-50 uppercase tracking-widest mb-3">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.readTime}
          </span>
          <span className="flex items-center gap-1">
            <Tag className="w-3 h-3" />
            {article.date}
          </span>
        </div>

        <h3 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-accent transition-colors duration-300">
          {article.title}
        </h3>
        
        <p className="text-sm opacity-60 line-clamp-3 mb-6 flex-grow leading-relaxed">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-auto">
          <Link 
            href={`/article/${article.id}`}
            className="flex items-center gap-2 text-sm font-bold text-accent group-hover:gap-3 transition-all"
          >
            {t.readMore}
            <ChevronRight className="w-4 h-4" />
          </Link>
          
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors" title="Like">
              <ThumbsUp className="w-4 h-4 opacity-40 hover:opacity-100" />
            </button>
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors" title="Print">
              <Printer className="w-4 h-4 opacity-40 hover:opacity-100" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
