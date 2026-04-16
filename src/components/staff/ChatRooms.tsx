'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, Send, Hash, User as UserIcon, 
  Search, Pin, Users, Factory, FlaskConical, 
  Truck, Globe, Paperclip, Smile, MoreHorizontal,
  ChevronRight, Activity, X, Menu, TrendingUp
} from 'lucide-react';
import { useStaffCommunication } from '@/context/StaffCommunicationContext';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

const ChatRooms = () => {
  const { chatRooms, messages, sendMessage } = useStaffCommunication();
  const { user } = useAuth();
  const { language } = useLanguage();
  const [activeRoomId, setActiveRoomId] = useState(chatRooms[0]?.id || 'general');
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showParticipants, setShowParticipants] = useState(false);
  const [showRoomList, setShowRoomList] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isFirstLoad = useRef(true);
  const previousRoomId = useRef(activeRoomId);

  const t = translations[language].dashboard.staffConnect;

  const activeRoom = chatRooms.find(r => r.id === activeRoomId) || chatRooms[0];
  const activeMessages = messages
    .filter(m => m.roomId === activeRoomId)
    .filter(m => m.text.toLowerCase().includes(searchQuery.toLowerCase()));

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    chatEndRef.current?.scrollIntoView({ behavior });
  };

  // ✅ Optimized Scroll Logic: Don't scroll on initial load or room change unless requested
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    if (previousRoomId.current !== activeRoomId) {
       // Room changed - user doesn't want automatic scroll to bottom/input
       previousRoomId.current = activeRoomId;
       return;
    }

    // New message added to current room - scroll to show it
    scrollToBottom();
  }, [activeMessages.length, activeRoomId]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(activeRoomId, inputText);
    setInputText('');
  };

  const getRoomIcon = (id: string) => {
    switch (id) {
      case 'production': return <Factory className="w-4 h-4" />;
      case 'quality': return <FlaskConical className="w-4 h-4" />;
      case 'logistics': return <Truck className="w-4 h-4" />;
      case 'sales': return <TrendingUp className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  const departmentalRooms = chatRooms.filter(r => r.type === 'departmental');
  const generalRooms = chatRooms.filter(r => r.type === 'general');

  return (
    <div className="flex flex-col lg:flex-row h-[80vh] min-h-[500px] lg:h-[700px] glass rounded-[1.5rem] lg:rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl animate-in fade-in duration-500 relative">
      
      {/* 📱 Mobile Backdrop for Room List */}
      {showRoomList && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-all duration-300"
          onClick={() => setShowRoomList(false)}
        />
      )}

      {/* Sidebar: Room List (Drawer on mobile) */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-background/95 backdrop-blur-xl border-r border-white/10 transform transition-transform duration-300 lg:static lg:block lg:translate-x-0 bg-white/5
        ${showRoomList ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-black text-sm uppercase tracking-widest opacity-40">{t.chatRooms}</h3>
            <Activity className="w-4 h-4 text-accent animate-pulse" />
          </div>
          <button onClick={() => setShowRoomList(false)} className="lg:hidden p-2 hover:bg-white/5 rounded-full">
            <X className="w-5 h-5 opacity-40" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide pb-20 lg:pb-4">
          {/* Departmental Groups */}
          <div>
            <h4 className="px-3 text-[10px] font-black uppercase tracking-tighter opacity-30 mb-3 flex items-center gap-2">
               <ChevronRight className="w-3 h-3" /> {t.departmental}
            </h4>
            <div className="space-y-1">
              {departmentalRooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => {
                    setActiveRoomId(room.id);
                    setShowRoomList(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all group ${
                    activeRoomId === room.id 
                    ? 'bg-accent text-white shadow-lg shadow-accent/20' 
                    : 'hover:bg-white/5 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${activeRoomId === room.id ? 'bg-white/20' : 'bg-white/5 group-hover:bg-white/10'} transition-colors`}>
                      {getRoomIcon(room.id)}
                    </div>
                    <span className="text-sm font-bold truncate max-w-[120px]">{room.name.replace('#', '')}</span>
                  </div>
                  {room.unreadCount > 0 && activeRoomId !== room.id && (
                    <span className="bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full ring-2 ring-black/10">
                      {room.unreadCount}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* General Groups */}
          <div>
            <h4 className="px-3 text-[10px] font-black uppercase tracking-tighter opacity-30 mb-3 flex items-center gap-2">
               <ChevronRight className="w-3 h-3" /> {t.general}
            </h4>
            <div className="space-y-1">
              {generalRooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => {
                    setActiveRoomId(room.id);
                    setShowRoomList(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all group ${
                    activeRoomId === room.id 
                    ? 'bg-accent text-white shadow-lg shadow-accent/20' 
                    : 'hover:bg-white/5 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${activeRoomId === room.id ? 'bg-white/20' : 'bg-white/5 group-hover:bg-white/10'} transition-colors`}>
                      <Hash className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold">{room.name.replace('#', '')}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main: Chat Area */}
      <div className="flex-1 flex flex-col bg-background/20 relative w-full overflow-hidden">
        
        {/* Chat Header */}
        <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-3 lg:gap-4 overflow-hidden">
             <button 
                onClick={() => setShowRoomList(true)}
                className="lg:hidden p-2 hover:bg-white/5 rounded-xl transition-colors bg-white/5 border border-white/10"
              >
                <Menu className="w-5 h-5 text-accent" />
             </button>
             <div className="min-w-0">
                <h4 className="font-black text-sm lg:text-lg flex items-center gap-2 truncate">
                  {activeRoom?.name}
                  {activeRoom?.type === 'departmental' && <span className="hidden sm:inline-block text-[9px] bg-accent/20 text-accent px-1.5 py-0.5 rounded-md uppercase tracking-widest font-black">Official</span>}
                </h4>
                <div className="flex items-center gap-3 mt-0.5">
                   <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-sm" />
                      <span className="text-[10px] font-bold opacity-40 truncate">
                        {activeRoom?.members} {language === 'am' ? 'አባላት' : 'Members'}
                      </span>
                   </div>
                </div>
             </div>
          </div>
          
          <div className="flex items-center gap-2">
             <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 opacity-30" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchMessages}
                  className="bg-white/5 border border-white/10 rounded-full py-1.5 pl-9 pr-4 text-xs outline-none focus:border-accent/50 w-32 lg:w-44 transition-all"
                />
             </div>
             <button 
                onClick={() => setShowParticipants(true)}
                className="p-2 hover:bg-white/5 rounded-full transition-all text-accent"
              >
                <Users className="w-5 h-5" />
             </button>
             <button className="p-2 hover:bg-white/5 rounded-full transition-all">
                <MoreHorizontal className="w-5 h-5 opacity-40" />
             </button>
          </div>
        </div>

        {/* Pinned Message */}
        {activeRoom?.pinnedMessage && (
          <div className="bg-accent/5 border-b border-accent/10 p-2.5 px-4 lg:px-6 flex items-center gap-4 group">
             <div className="p-1.5 bg-accent/10 rounded-lg text-accent shrink-0">
                <Pin className="w-3.5 h-3.5" />
             </div>
             <div className="flex-1 min-w-0">
                <p className="text-[10px] font-black text-accent uppercase tracking-widest leading-none mb-1">{t.pinnedMessage}</p>
                <p className="text-xs truncate font-medium opacity-80">{activeRoom.pinnedMessage.text}</p>
             </div>
          </div>
        )}

        {/* Messages List */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6 lg:space-y-8 scroll-smooth scrollbar-hide"
        >
          {activeMessages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-10">
              <MessageSquare className="w-20 h-20 mb-4" />
              <p className="text-sm lg:text-xl font-black uppercase tracking-[0.2em]">{language === 'am' ? 'ምንም መልእክት የለም' : 'Silence...'}</p>
            </div>
          ) : (
            activeMessages.map((msg, i) => {
              const prevMsg = activeMessages[i-1];
              const showAvatar = !prevMsg || prevMsg.authorId !== msg.authorId;
              const isOwn = msg.authorId === user?.id;

              return (
                <div key={msg.id} className={`flex flex-col group ${isOwn ? 'items-end' : 'items-start'} ${!showAvatar ? '-mt-4 lg:-mt-6' : ''}`}>
                  <div className={`flex items-end gap-2 lg:gap-3 max-w-[90%] sm:max-w-[70%] ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
                    
                    {/* Avatar */}
                    {showAvatar ? (
                      <div className={`w-8 h-8 lg:w-9 lg:h-9 rounded-xl lg:rounded-2xl flex items-center justify-center text-white text-[10px] lg:text-xs font-black shrink-0 shadow-lg ${
                        isOwn ? 'bg-accent' : 'bg-gradient-to-br from-indigo-500 to-blue-600'
                      }`}>
                        {msg.authorName.charAt(0)}
                      </div>
                    ) : (
                      <div className="w-8 lg:w-9 shrink-0" />
                    )}

                    <div className="space-y-1 min-w-0">
                      {showAvatar && (
                        <div className={`flex items-center gap-2 text-[9px] lg:text-[10px] font-black uppercase tracking-tighter mb-1 px-1 ${isOwn ? 'flex-row-reverse' : ''}`}>
                          <span className="opacity-80 truncate">{msg.authorName}</span>
                          <span className="opacity-30">•</span>
                          <span className="opacity-40">{msg.authorSubRole}</span>
                        </div>
                      )}
                      
                      <div className={`px-3 lg:px-4 py-2.5 lg:py-3 rounded-[1.2rem] lg:rounded-[1.5rem] shadow-sm relative transition-all group-hover:shadow-md ${
                        isOwn 
                        ? 'bg-accent text-white rounded-tr-none' 
                        : 'glass border border-white/10 rounded-tl-none'
                      }`}>
                        <p className="text-[12px] lg:text-[13px] leading-relaxed font-medium break-words">{msg.text}</p>
                        <span className={`text-[7px] lg:text-[8px] mt-1 lg:mt-1.5 block opacity-40 font-bold ${isOwn ? 'text-right' : 'text-left'}`}>
                          {msg.timestamp.split(' ')[1] || msg.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 lg:p-4 border-t border-white/5 bg-white/5 backdrop-blur-xl">
          <form onSubmit={handleSend} className="flex gap-2 lg:gap-3 items-center">
            <div className="hidden sm:flex gap-1">
                <button type="button" className="p-2 lg:p-2.5 hover:bg-white/10 rounded-xl transition-all opacity-40 hover:opacity-100">
                    <Paperclip className="w-5 h-5" />
                </button>
                <button type="button" className="p-2 lg:p-2.5 hover:bg-white/10 rounded-xl transition-all opacity-40 hover:opacity-100">
                    <Smile className="w-5 h-5" />
                </button>
            </div>
            
            <div className="flex-1 relative">
                <input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Message ${activeRoom?.name}...`}
                  className="w-full bg-white/5 border border-white/10 rounded-xl lg:rounded-2xl px-4 lg:px-5 py-3 lg:py-3.5 text-xs lg:text-sm outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-medium"
                />
            </div>

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="bg-accent text-white p-3 lg:p-3.5 rounded-xl lg:rounded-2xl shadow-xl shadow-accent/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:scale-100 shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* 📱 Mobile Backdrop for Participants */}
      {showParticipants && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-all duration-300"
          onClick={() => setShowParticipants(false)}
        />
      )}

      {/* Right Sidebar: Active Members (Drawer on mobile) */}
      <div className={`
         fixed inset-y-0 right-0 z-40 w-72 bg-background/95 backdrop-blur-xl border-l border-white/10 transform transition-transform duration-300 lg:static lg:block lg:translate-x-0 bg-white/5
         ${showParticipants ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h3 className="font-black text-sm uppercase tracking-widest opacity-40 flex items-center gap-2">
               <Users className="w-4 h-4" /> {t.membersOnline}
            </h3>
            <button onClick={() => setShowParticipants(false)} className="lg:hidden p-2 hover:bg-white/5 rounded-full">
               <X className="w-5 h-5 opacity-40" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide pb-20 lg:pb-4">
            {activeRoom?.participants && activeRoom.participants.length > 0 ? (
               <div className="space-y-1">
                  {activeRoom.participants.map(member => (
                    <div key={member.id} className="flex items-center gap-3 p-2 rounded-xl transition-all hover:bg-white/5 group">
                        <div className="relative shrink-0">
                           <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-xs font-bold ring-1 ring-white/10 group-hover:scale-110 transition-transform">
                              {member.name.charAt(0)}
                           </div>
                           {member.isOnline && (
                             <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background shadow-sm" />
                           )}
                        </div>
                        <div className="min-w-0">
                           <p className={`text-xs font-bold truncate ${member.isOnline ? 'opacity-100' : 'opacity-40'}`}>{member.name}</p>
                           <p className="text-[9px] font-black uppercase tracking-widest opacity-30 leading-none mt-0.5 truncate">{member.role}</p>
                        </div>
                    </div>
                  ))}
               </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center opacity-20 text-center px-4">
                 <UserIcon className="w-10 h-10 mb-2" />
                 <p className="text-xs font-bold">{t.noMembers}</p>
              </div>
            )}
          </div>
          
          <div className="p-6 bg-accent/5 mt-auto hidden lg:block">
             <div className="bg-white/5 rounded-2xl p-4 border border-white/5 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 mb-2">Room Stats</p>
                <div className="flex justify-between items-center text-xs font-bold">
                   <span className="opacity-40">Messages:</span>
                   <span>{activeMessages.length}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold mt-1">
                   <span className="opacity-40">Active:</span>
                   <span className="text-green-500">{activeRoom?.participants?.filter(p => p.isOnline).length || 0}</span>
                </div>
             </div>
          </div>
      </div>
    </div>
  );
};

export default ChatRooms;
