'use client';

import React, { useState } from 'react';
import { X, Send, User } from 'lucide-react';
import { User as UserType } from '@/lib/mockData';

interface DirectMessageModalProps {
  recipient: UserType;
  onClose: () => void;
}

const DirectMessageModal: React.FC<DirectMessageModalProps> = ({ recipient, onClose }) => {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    // Mock sending message
    setSent(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-md glass rounded-3xl border border-white/10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-accent/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <User className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-bold">{recipient.name}</h3>
              <p className="text-[10px] opacity-50 uppercase tracking-tighter">
                {recipient.staffSubRole || recipient.role}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-all">
            <X className="w-5 h-5 opacity-40" />
          </button>
        </div>

        <div className="p-6">
          {sent ? (
            <div className="py-10 text-center animate-in zoom-in duration-300">
              <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8" />
              </div>
              <p className="font-bold text-lg">Message Sent!</p>
              <p className="text-sm opacity-50">Closing window...</p>
            </div>
          ) : (
            <form onSubmit={handleSend} className="space-y-4">
              <textarea
                autoFocus
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Type your message to ${recipient.name.split(' ')[0]}...`}
                className="w-full min-h-[150px] bg-white/5 border border-white/10 rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-accent/50 transition-all resize-none"
              />
              <button
                type="submit"
                disabled={!message.trim()}
                className="w-full bg-accent text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg active:scale-95 transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default DirectMessageModal;
