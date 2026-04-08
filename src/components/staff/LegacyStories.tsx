'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { legacyStories } from '@/lib/legacyStoriesData';
import { Search, ThumbsUp, MessageCircle, Pin, Clock, User, Plus, Send } from 'lucide-react';
import { getTodayEthiopian } from '@/lib/ethiopianCalendar';
import { useAuth } from '@/context/AuthContext';

export default function LegacyStories() {
    const { language } = useLanguage();
    const { user } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [stories, setStories] = useState(legacyStories);

    // New Lesson Form State
    const [showForm, setShowForm] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');

    const filteredStories = stories.filter(story =>
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddLesson = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle.trim() || !newContent.trim()) return;

        const newStory = {
            id: `l-${Date.now()}`,
            authorName: user?.name || 'Anonymous Staff',
            authorRole: user?.department || 'Staff',
            yearsOfExperience: 0,
            retirementDate: getTodayEthiopian(),
            title: newTitle,
            content: newContent,
            likes: 0,
            comments: 0,
            isPinned: false
        };

        setStories([newStory, ...stories]);
        setNewTitle('');
        setNewContent('');
        setShowForm(false);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <span className="text-2xl">👴</span>
                        {language === 'am' ? 'የተማርናቸው ትምህርቶች' : 'Lessons Learned'}
                    </h2>
                    <p className="text-sm opacity-60 mt-1 font-bold">
                        {language === 'am' ? 'ከልምድ ካላቸው ሰራተኞች ጥበብ' : 'Wisdom from Experienced Staff'}
                    </p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 bg-amber-500 text-white px-5 py-2.5 rounded-2xl font-bold hover:shadow-lg hover:shadow-amber-500/20 transition-all"
                >
                    <Plus className="w-5 h-5" />
                    {language === 'am' ? 'ትምህርትዎን ያጋሩ' : 'Share Your Lesson'}
                </button>
            </div>

            {showForm && (
                <div className="glass p-6 rounded-3xl border border-amber-500/30 animate-in slide-in-from-top-4 duration-300">
                    <form onSubmit={handleAddLesson} className="space-y-4">
                        <div>
                            <label className="text-xs font-bold opacity-50 mb-1 block">
                                {language === 'am' ? 'ርዕስ' : 'Title'}
                            </label>
                            <input
                                type="text"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                placeholder={language === 'am' ? 'ለምሳሌ፡ የጥራት ቁጥጥር አስፈላጊነት' : 'e.g. The importance of daily equipment checks'}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500/40"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold opacity-50 mb-1 block">
                                {language === 'am' ? 'ትምህርት (ታሪክ)' : 'Your Lesson (Story)'}
                            </label>
                            <textarea
                                value={newContent}
                                onChange={(e) => setNewContent(e.target.value)}
                                placeholder={language === 'am' ? 'ተሞክሮዎን እዚህ ይጻፉ...' : 'Share your experience and advice here...'}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500/40 min-h-[120px] resize-none"
                                required
                            />
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="px-6 py-2.5 rounded-xl font-bold bg-white/5 hover:bg-white/10 transition-colors"
                            >
                                {language === 'am' ? 'ሰርዝ' : 'Cancel'}
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2.5 rounded-xl font-bold bg-amber-500 text-white hover:bg-amber-600 transition-colors flex items-center gap-2"
                            >
                                <Send className="w-4 h-4" />
                                {language === 'am' ? 'አትም' : 'Publish Lesson'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="relative max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={language === 'am' ? 'ትምህርቶችን ይፈልጉ...' : 'Search lessons learned...'}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-amber-500/40 transition-all text-sm"
                />
            </div>

            <div className="grid grid-cols-1 gap-6">
                {filteredStories.map((story) => (
                    <div key={story.id} className="glass p-6 rounded-3xl border border-white/10 hover:border-amber-500/20 transition-all flex flex-col gap-4 relative overflow-hidden group">
                        {/* Background design */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full -z-10 group-hover:bg-amber-500/10 transition-colors"></div>

                        <div className="flex justify-between items-start z-10">
                            <div className="flex gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center border border-white/10 shrink-0">
                                    <User className="w-7 h-7 text-amber-500" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl">{story.title}</h3>
                                    <p className="text-sm opacity-70 flex flex-wrap items-center gap-x-2 gap-y-1 mt-1">
                                        <span className="font-black text-amber-400">{story.authorName}</span>
                                        <span>•</span>
                                        <span className="font-bold">{story.authorRole}</span>
                                        {story.yearsOfExperience > 0 && (
                                            <>
                                                <span>•</span>
                                                <span className="opacity-70">{story.yearsOfExperience} {language === 'am' ? 'ዓመታት ልምድ' : 'years exp.'}</span>
                                            </>
                                        )}
                                    </p>
                                    <p className="text-[10px] uppercase font-black text-amber-500/70 mt-2 flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {language === 'am' ? 'የታተመበት/ጡረታ:' : 'Date/Retiring:'} <span className="text-white opacity-80">{story.retirementDate}</span>
                                    </p>
                                </div>
                            </div>
                            {story.isPinned && (
                                <div className="bg-amber-500/10 text-amber-500 p-2.5 rounded-full z-10" title={language === 'am' ? 'ተሰክቷል' : 'Pinned'}>
                                    <Pin className="w-5 h-5 fill-amber-500/20" />
                                </div>
                            )}
                        </div>

                        <div className="bg-foreground/5 p-5 rounded-2xl border-l-4 border-amber-500 z-10">
                            <p className="text-sm leading-relaxed italic opacity-90">"{story.content}"</p>
                        </div>

                        {/* Interactions */}
                        <div className="flex gap-5 mt-2 z-10">
                            <button
                                onClick={() => setStories(stories.map(s => s.id === story.id ? { ...s, likes: s.likes + 1 } : s))}
                                className="flex items-center gap-2 text-xs font-bold opacity-50 hover:opacity-100 hover:text-amber-500 transition-colors"
                            >
                                <ThumbsUp className="w-4 h-4" />
                                {story.likes} {language === 'am' ? 'ወደውታል' : 'Likes'}
                            </button>
                            <button className="flex items-center gap-2 text-xs font-bold opacity-50 hover:opacity-100 hover:text-amber-500 transition-colors">
                                <MessageCircle className="w-4 h-4" />
                                {story.comments} {language === 'am' ? 'አስተያየቶች' : 'Comments'}
                            </button>
                        </div>
                    </div>
                ))}

                {filteredStories.length === 0 && (
                    <div className="text-center py-16 glass rounded-3xl opacity-50 flex flex-col items-center">
                        <Search className="w-10 h-10 mb-4 opacity-20" />
                        <p>{language === 'am' ? 'ምንም ትምህርት አልተገኘም' : 'No lessons learned found matching your search.'}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
