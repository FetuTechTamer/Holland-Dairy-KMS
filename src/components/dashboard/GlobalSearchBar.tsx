'use client';

import React, { useState, useEffect } from 'react';
import { Search, X, History, FileText, MessageSquare, LifeBuoy } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

interface GlobalSearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const GlobalSearchBar: React.FC<GlobalSearchBarProps> = ({ onSearch, placeholder }) => {
  const { language } = useLanguage();
  const t = translations[language].dashboard;
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showRecent, setShowRecent] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('holland_recent_searches');
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  const handleSearch = (q: string) => {
    setQuery(q);
    onSearch(q);
    
    if (q.trim() && !recentSearches.includes(q)) {
      const newRecent = [q, ...recentSearches.slice(0, 4)];
      setRecentSearches(newRecent);
      localStorage.setItem('holland_recent_searches', JSON.stringify(newRecent));
    }
    setShowRecent(false);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto z-40">
      <div className="relative group">
        <div className="absolute inset-0 bg-accent/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity rounded-full" />
        <div className="relative flex items-center glass rounded-full border border-white/10 shadow-lg px-6 py-4 focus-within:border-accent/50 transition-all bg-white/5 backdrop-blur-xl">
          <Search className="w-5 h-5 opacity-50 mr-4" />
          <input
            type="text"
            value={query}
            onFocus={() => setShowRecent(true)}
            onChange={(e) => {
              setQuery(e.target.value);
              onSearch(e.target.value);
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
            placeholder={placeholder || t.searchPlaceholder}
            className="w-full bg-transparent border-none focus:ring-0 text-lg outline-none placeholder:opacity-50"
          />
          {query && (
            <button 
              onClick={clearSearch}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {showRecent && recentSearches.length > 0 && (
        <>
          <div className="fixed inset-0" onClick={() => setShowRecent(false)} />
          <div className="absolute top-full mt-4 w-full glass rounded-3xl shadow-2xl border border-white/10 p-6 animate-in slide-in-from-top-4 duration-300 z-50">
            <h4 className="flex items-center gap-2 text-sm font-bold opacity-50 mb-4 uppercase tracking-wider">
              <History className="w-4 h-4" />
              Recent Searches
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {recentSearches.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSearch(s)}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent/10 text-left transition-all group"
                >
                  <Search className="w-4 h-4 opacity-30 group-hover:opacity-100 group-hover:text-accent" />
                  <span className="text-sm font-medium">{s}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Search Categories Quick Links (Visual only) */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/5 text-xs font-bold opacity-60 hover:opacity-100 cursor-pointer hover:border-accent/30 transition-all">
          <FileText className="w-3 h-3 text-blue-500" />
          Articles
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/5 text-xs font-bold opacity-60 hover:opacity-100 cursor-pointer hover:border-accent/30 transition-all">
          <MessageSquare className="w-3 h-3 text-green-500" />
          Community
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/5 text-xs font-bold opacity-60 hover:opacity-100 cursor-pointer hover:border-accent/30 transition-all">
          <LifeBuoy className="w-3 h-3 text-red-500" />
          Tickets
        </div>
      </div>
    </div>
  );
};

export default GlobalSearchBar;
