'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { chatConversations as initialConversations, Conversation, Message } from '@/lib/chatData';
import { useAuth } from './AuthContext';
import { getTodayEthiopian } from '@/lib/ethiopianCalendar';

interface ChatContextType {
  conversations: Conversation[];
  sendMessage: (conversationId: string, text: string) => void;
  markAsRead: (conversationId: string) => void;
  totalUnreadCount: number;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    // Load from localStorage or use initial data
    const saved = localStorage.getItem('holland_chat_v1');
    if (saved) {
      try {
        setConversations(JSON.parse(saved));
      } catch (e) {
        setConversations(initialConversations);
      }
    } else {
      setConversations(initialConversations);
    }
  }, []);

  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem('holland_chat_v1', JSON.stringify(conversations));
    }
  }, [conversations]);

  const sendMessage = (conversationId: string, text: string) => {
    if (!user) return;

    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const date = getTodayEthiopian();

    const newMessage: Message = {
      id: Date.now(),
      senderId: user.id,
      senderName: user.name,
      senderRole: user.role,
      message: text,
      time,
      date
    };

    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          lastMessage: text,
          lastMessageTime: time,
          lastMessageDate: date,
          messages: [...conv.messages, newMessage]
        };
      }
      return conv;
    }));
  };

  const markAsRead = (conversationId: string) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        return { ...conv, unread: 0 };
      }
      return conv;
    }));
  };

  const totalUnreadCount = conversations.reduce((sum, conv) => sum + conv.unread, 0);

  return (
    <ChatContext.Provider value={{ conversations, sendMessage, markAsRead, totalUnreadCount }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
