'use client';

import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { useNotifications } from '@/context/NotificationContext';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import Link from 'next/link';

const NotificationBell = () => {
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[language].nav;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-foreground/10 transition-colors relative"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-background">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute right-0 mt-2 w-80 glass rounded-2xl shadow-2xl z-50 overflow-hidden border border-foreground/10 animate-in fade-in zoom-in duration-200">
            <div className="p-4 border-b border-foreground/10 flex justify-between items-center">
              <h3 className="font-bold">{t.notifications}</h3>
              {unreadCount > 0 && (
                <span className="text-xs text-accent font-medium">{unreadCount} new</span>
              )}
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notif) => (
                  <Link
                    key={notif.id}
                    href={notif.link || '#'}
                    onClick={() => {
                      markAsRead(notif.id);
                      setIsOpen(false);
                    }}
                    className={`block p-4 hover:bg-foreground/5 transition-colors border-b border-foreground/5 last:border-0 ${
                      !notif.read ? 'bg-accent/5' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-sm font-bold">{notif.title}</span>
                      <span className="text-[10px] text-foreground/50">
                        {new Date(notif.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-foreground/70 line-clamp-2">{notif.message}</p>
                    {!notif.read && (
                      <div className="w-2 h-2 bg-accent rounded-full mt-2" />
                    )}
                  </Link>
                ))
              ) : (
                <div className="p-8 text-center text-foreground/50 text-sm">
                  No notifications yet
                </div>
              )}
            </div>
            <div className="p-3 bg-foreground/5 text-center">
              <button 
                className="text-xs font-bold text-accent hover:underline"
                onClick={() => setIsOpen(false)}
              >
                View all notifications
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationBell;
