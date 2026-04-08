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

    // ✅ UPDATED ROLE LOGIC
    if (role === 'ADMIN' || role === 'STAFF') {
      // Admin & Staff see ALL posts
      setPosts(initialPosts);
    } else if (role === 'FARMER') {
      // Farmers see only farmer + admin posts
      setPosts(initialPosts.filter(
        p => p.authorRole === 'FARMER' || p.authorRole === 'ADMIN'
      ));
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
        return { ...p, likes: p.likes + 1 };
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
          <div className="absolute bottom-4 right-4 text-xs opacity-50">
            {newPostContent.length} / 500
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={handlePost}
            disabled={!newPostContent.trim() || isPosting}
            className="bg-accent text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-accent/20 transition-all flex items-center gap-2 disabled:opacity-50"
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

      {/* Post List */}
      <div className="space-y-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="glass p-6 rounded-3xl border border-white/10 shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-green-900/50">
                    {post.authorName.charAt(0)}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm">{post.authorName}</span>
                      <RoleBadge role={post.authorRole} />
                      {post.authorRole === 'ADMIN' && (
                        <Pin className="w-3 h-3 text-purple-400 rotate-45" />
                      )}
                    </div>
                    <span className="text-[10px] opacity-50">
                      <EthiopianDate date={post.timestamp} />
                    </span>
                  </div>
                </div>

                <button className="p-2 hover:bg-white/5 rounded-full">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              <p className="text-sm leading-relaxed mb-6 whitespace-pre-wrap">
                {post.content}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className="flex items-center gap-1.5 text-xs font-bold hover:text-accent"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    {post.likes} {t.like}
                  </button>

                  <button className="flex items-center gap-1.5 text-xs font-bold hover:text-blue-500">
                    <MessageSquare className="w-4 h-4" />
                    {post.comments.length} {t.comment}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-white/5 rounded-full">
                    <Share2 className="w-4 h-4 opacity-50" />
                  </button>

                  <button className="p-2 hover:bg-red-500/10 text-red-500 rounded-full">
                    <ShieldAlert className="w-4 h-4 opacity-50" />
                  </button>
                </div>
              </div>
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