'use client';

import React from 'react';
import { MessageSquare } from 'lucide-react';
import { useChat } from '@/context/ChatContext';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

const ChatBell = () => {
  const { totalUnreadCount } = useChat();
  const { user } = useAuth();

  if (!user) return null;

  const dashboardLink = user.role === 'ADMIN' ? '/dashboard/admin' : user.role === 'STAFF' ? '/dashboard/staff' : '/dashboard/farmer';

  return (
    <div className="relative">
      <Link 
        href={`${dashboardLink}?tab=chat`}
        className="p-2 rounded-full hover:bg-foreground/10 transition-colors relative block"
        aria-label="Chat Messages"
      >
        <MessageSquare className="w-5 h-5 text-accent" />
        {totalUnreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full border-2 border-background animate-pulse">
            {totalUnreadCount}
          </span>
        )}
      </Link>
    </div>
  );
};

export default ChatBell;
