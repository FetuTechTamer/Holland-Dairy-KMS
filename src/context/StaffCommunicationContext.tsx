'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  Announcement, 
  ChatMessage, 
  ChatRoom, 
  KnowledgeTip, 
  mockAnnouncements, 
  mockChatMessages, 
  mockChatRooms, 
  mockKnowledgeTips 
} from '@/lib/staffCommunicationData';
import { useAuth } from './AuthContext';
import { getTodayEthiopian } from '@/lib/ethiopianCalendar';

interface StaffCommunicationContextType {
  announcements: Announcement[];
  chatRooms: ChatRoom[];
  messages: ChatMessage[];
  tips: KnowledgeTip[];
  postAnnouncement: (title: string, message: string, isUrgent: boolean) => void;
  markAsRead: (id: string) => void;
  sendMessage: (roomId: string, text: string) => void;
  postTip: (title: string, text: string, category: KnowledgeTip['category']) => void;
  toggleHelpful: (tipId: string) => void;
}

const StaffCommunicationContext = createContext<StaffCommunicationContextType | undefined>(undefined);

export const StaffCommunicationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>(mockChatRooms);
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [tips, setTips] = useState<KnowledgeTip[]>(mockKnowledgeTips);

  const postAnnouncement = (title: string, message: string, isUrgent: boolean) => {
    if (user?.role !== 'ADMIN') return;
    const newAnn: Announcement = {
      id: `ann-${Date.now()}`,
      title,
      message,
      author: user.name,
      authorRole: 'ADMIN',
      timestamp: getTodayEthiopian(),
      isUrgent,
      readBy: []
    };
    setAnnouncements([newAnn, ...announcements]);
  };

  const markAsRead = (id: string) => {
    if (!user) return;
    setAnnouncements(announcements.map(ann => 
      ann.id === id ? { ...ann, readBy: [...ann.readBy, user.id] } : ann
    ));
  };

  const sendMessage = (roomId: string, text: string) => {
    if (!user) return;
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      roomId,
      authorId: user.id,
      authorName: user.name,
      authorSubRole: (user.staffSubRole || (user.role === 'ADMIN' ? 'ADMIN' : 'PRODUCTION')) as any,
      text,
      timestamp: getTodayEthiopian() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);
    
    // Reset unread count for this room if we were the one who sent the message (mock behavior)
    setChatRooms(chatRooms.map(room => 
      room.id === roomId ? { ...room, unreadCount: 0 } : room
    ));
  };

  const postTip = (title: string, text: string, category: KnowledgeTip['category']) => {
    if (!user || user.role !== 'STAFF') return;
    const newTip: KnowledgeTip = {
      id: `tip-${Date.now()}`,
      title,
      text,
      author: user.name,
      authorSubRole: user.staffSubRole || 'PRODUCTION',
      timestamp: 'Just now',
      likes: 0,
      helpfulCount: 0,
      comments: 0,
      category
    };
    setTips([newTip, ...tips]);
  };

  const toggleHelpful = (tipId: string) => {
    setTips(tips.map(tip => 
      tip.id === tipId ? { ...tip, helpfulCount: tip.helpfulCount + 1 } : tip
    ));
  };

  return (
    <StaffCommunicationContext.Provider value={{ 
      announcements, 
      chatRooms, 
      messages, 
      tips, 
      postAnnouncement, 
      markAsRead, 
      sendMessage, 
      postTip,
      toggleHelpful
    }}>
      {children}
    </StaffCommunicationContext.Provider>
  );
};

export const useStaffCommunication = () => {
  const context = useContext(StaffCommunicationContext);
  if (!context) throw new Error('useStaffCommunication must be used within a StaffCommunicationProvider');
  return context;
};
