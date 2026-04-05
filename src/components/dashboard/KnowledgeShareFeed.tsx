'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, ThumbsUp, Share2, MoreVertical, ShieldAlert, Send, Plus, Pin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { translations } from '@/lib/translations';
import { Post, mockPosts, Role } from '@/lib/mockData';
import RoleBadge from './RoleBadge';
import EthiopianDate from './EthiopianDate';

interface KnowledgeShareFeedProps {
  role: Role;
  isAdmin?: boolean;
}

const KnowledgeShareFeed: React.FC<KnowledgeShareFeedProps> = ({ role, isAdmin = false }) => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const t = translations[language].share;
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [activeTab, setActiveTab] = useState<'recent' | 'popular' | 'pinned'>('recent');

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('holland_posts') || '[]');
    const initialPosts = [...mockPosts, ...savedPosts].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    
    // Filter by role context (FARMER sees farmer tips, STAFF sees staff tips, ADMIN sees all)
    if (role === 'ADMIN') {
      setPosts(initialPosts);
    } else {
      setPosts(initialPosts.filter(p => p.authorRole === role || p.authorRole === 'ADMIN'));
    }
  }, [role]);

  const handlePost = async () => {
    if (!newPostContent.trim() || !user) return;
    
    setIsPosting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newPost: Post = {
      id: `p-${Date.now()}`,
      authorName: user.name,
      authorRole: user.role,
      content: newPostContent,
      timestamp: new Date().toISOString(),
      likes: 0,
      category: 'General',
      comments: []
    };
    
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    
    const savedPosts = JSON.parse(localStorage.getItem('holland_posts') || '[]');
    localStorage.setItem('holland_posts', JSON.stringify([newPost, ...savedPosts]));
    
    setNewPostContent('');
    setIsPosting(false);
  };

  const toggleLike = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, likes: p.likes + 1 }; // Simple like increment
      }
      return p;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Create Post */}
      <div className="glass p-6 rounded-3xl border border-white/10 shadow-lg">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5 text-accent" />
          {t.postTitle}
        </h3>
        <div className="relative">
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder={t.placeholder}
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all resize-none text-sm"
          />
          <div className="absolute bottom-4 right-4 flex items-center gap-2 text-xs font-medium opacity-50">
            {newPostContent.length} / 500
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handlePost}
            disabled={!newPostContent.trim() || isPosting}
            className="bg-accent text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-accent/20 transition-all flex items-center gap-2 disabled:opacity-50 disabled:scale-100 active:scale-95"
          >
            {isPosting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                {t.postBtn}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Feed Filter */}
      <div className="flex gap-2 p-1 bg-foreground/5 rounded-2xl w-fit">
        {['recent', 'popular', 'pinned'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab ? 'bg-white text-black shadow-md' : 'opacity-50 hover:opacity-100'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Post List */}
      <div className="space-y-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="glass p-6 rounded-3xl border border-white/10 shadow-md group animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-green-900/50`}>
                    {post.authorName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm">{post.authorName}</span>
                      <RoleBadge role={post.authorRole} />
                      {post.authorRole === 'ADMIN' && <Pin className="w-3 h-3 text-purple-400 rotate-45" />}
                    </div>
                    <span className="text-[10px] opacity-50">
                      <EthiopianDate date={post.timestamp} />
                    </span>
                  </div>
                </div>
                <button className="p-2 hover:bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              <p className="text-sm leading-relaxed mb-6 whitespace-pre-wrap">{post.content}</p>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => toggleLike(post.id)}
                    className="flex items-center gap-1.5 text-xs font-bold hover:text-accent transition-colors group"
                  >
                    <ThumbsUp className="w-4 h-4 group-active:scale-125 transition-transform" />
                    {post.likes} {t.like}
                  </button>
                  <button className="flex items-center gap-1.5 text-xs font-bold hover:text-blue-500 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    {post.comments.length} {t.comment}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-white/5 rounded-full transition-colors" title="Share">
                    <Share2 className="w-4 h-4 opacity-50" />
                  </button>
                  <button className="p-2 hover:bg-red-500/10 text-red-500 rounded-full transition-colors" title="Report">
                    <ShieldAlert className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                  </button>
                </div>
              </div>

              {/* Comments Preview */}
              {post.comments.length > 0 && (
                <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
                  {post.comments.map(comment => (
                    <div key={comment.id} className="flex gap-3 bg-white/5 p-3 rounded-2xl">
                      <div className="w-6 h-6 rounded-full bg-green-800 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                        {comment.authorName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold">{comment.authorName}</span>
                          <span className="text-[8px] opacity-40">{new Date(comment.timestamp).toLocaleDateString()}</span>
                        </div>
                        <p className="text-[11px] opacity-80">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="p-12 text-center glass rounded-3xl border border-white/5 opacity-50">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>No knowledge shares yet. Be the first to post!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowledgeShareFeed;
