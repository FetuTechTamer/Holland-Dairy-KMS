'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Filter, 
  ChevronRight, 
  AlertCircle, 
  CheckCircle2, 
  Clock,
  Send,
  X
} from 'lucide-react';
import { Ticket, mockTickets } from '@/lib/mockData';

const TicketsPage = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const t = translations[language].tickets;
  const commonT = translations[language].dashboard;

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({ title: '', description: '', category: 'General', priority: 'MEDIUM' as any });

  useEffect(() => {
    if (user) {
      const userTickets = mockTickets.filter(t => t.userId === user.id);
      const savedTickets = JSON.parse(localStorage.getItem('holland_tickets') || '[]');
      setTickets([...userTickets, ...savedTickets.filter((t: any) => t.userId === user.id)]);
    }
  }, [user]);

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const ticket: Ticket = {
      id: `t-${Date.now()}`,
      userId: user!.id,
      ...newTicket,
      status: 'OPEN',
      timestamp: new Date().toISOString(),
      updates: []
    };
    
    const updatedTickets = [ticket, ...tickets];
    setTickets(updatedTickets);
    
    const savedTickets = JSON.parse(localStorage.getItem('holland_tickets') || '[]');
    localStorage.setItem('holland_tickets', JSON.stringify([ticket, ...savedTickets]));
    
    setIsModalOpen(false);
    setNewTicket({ title: '', description: '', category: 'General', priority: 'MEDIUM' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN': return 'bg-red-500/20 text-red-500 border-red-500/20';
      case 'IN_PROGRESS': return 'bg-blue-500/20 text-blue-500 border-blue-500/20';
      case 'RESOLVED': return 'bg-green-500/20 text-green-500 border-green-500/20';
      default: return 'bg-white/10 text-white border-white/5';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-black mb-2">{t.title}</h1>
              <p className="text-foreground/50 font-medium">Manage your support requests and inquiries.</p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-accent text-white font-black px-8 py-4 rounded-2xl shadow-xl shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-1 active:scale-95 transition-all flex items-center gap-3 w-fit"
            >
              <Plus className="w-5 h-5" />
              {t.newBtn}
            </button>
          </div>

          {/* Filters & Search */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <div className="md:col-span-3 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30" />
              <input 
                type="text" 
                placeholder="Search tickets by title..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-4 focus:ring-2 focus:ring-accent/50 outline-none transition-all group-hover:border-white/20"
              />
            </div>
            <button className="glass border border-white/10 rounded-2xl px-6 py-4 flex items-center justify-center gap-3 font-bold opacity-60 hover:opacity-100 transition-all">
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Tickets List */}
          <div className="space-y-6">
            {tickets.filter(tk => tk.title.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 ? (
              tickets
                .filter(tk => tk.title.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((ticket) => (
                <div key={ticket.id} className="glass group p-8 rounded-[2.5rem] border border-white/10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:border-accent/30 animate-in fade-in slide-in-from-bottom-4">
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex items-start gap-6">
                      <div className={`p-4 rounded-3xl shrink-0 ${getStatusColor(ticket.status)} border shadow-inner`}>
                        {ticket.status === 'RESOLVED' ? <CheckCircle2 className="w-8 h-8" /> : (ticket.priority === 'HIGH' ? <AlertCircle className="w-8 h-8" /> : <MessageSquare className="w-8 h-8" />)}
                      </div>
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="px-3 py-1 glass rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">{ticket.category}</span>
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(ticket.status)}`}>{ticket.status}</span>
                          <span className={`text-[10px] font-black uppercase tracking-widest ${ticket.priority === 'HIGH' ? 'text-red-500' : 'text-amber-500'}`}>• {ticket.priority} PRIORITY</span>
                        </div>
                        <h3 className="text-xl font-bold group-hover:text-accent transition-colors">{ticket.title}</h3>
                        <p className="text-sm opacity-60 line-clamp-2 max-w-2xl leading-relaxed">{ticket.description}</p>
                        <div className="flex items-center gap-4 pt-4 text-[10px] font-bold opacity-40 uppercase tracking-widest">
                          <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" />{new Date(ticket.timestamp).toLocaleDateString()}</span>
                          <span className="flex items-center gap-1.5"><MessageSquare className="w-3 h-3" />{ticket.updates.length} UPDATES</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex md:flex-col justify-end gap-3 min-w-[140px]">
                      <button className="flex-grow md:flex-grow-0 bg-white/5 border border-white/10 font-bold py-3 px-6 rounded-2xl hover:bg-white/10 transition-all text-sm group-hover:border-accent/40">
                        View Details
                      </button>
                      {ticket.status !== 'RESOLVED' && (
                        <button className="flex-grow md:flex-grow-0 bg-accent text-white font-bold py-3 px-6 rounded-2xl shadow-lg shadow-accent/10 hover:shadow-accent/20 active:scale-95 transition-all text-sm">
                          Post Reply
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-24 glass rounded-[3rem] border border-white/5 opacity-40 scale-95 transition-transform">
                <div className="w-20 h-20 bg-white/10 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                   <MessageSquare className="w-10 h-10 opacity-20" />
                </div>
                <p className="text-xl font-bold italic tracking-wide">No tickets found.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Create Ticket Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-2xl glass rounded-[3rem] shadow-2xl p-10 border border-white/10 animate-in zoom-in-95 duration-300">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 p-2 hover:bg-white/10 rounded-full transition-colors opacity-50 hover:opacity-100">
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-3xl font-black mb-2">{t.newBtn}</h2>
            <p className="text-foreground/50 mb-10 font-medium">Describe your issue and we'll respond within 24 hours.</p>
            
            <form onSubmit={handleCreateTicket} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black opacity-40 uppercase tracking-widest ml-2">{t.subject}</label>
                <input 
                  type="text" 
                  required 
                  value={newTicket.title}
                  onChange={(e) => setNewTicket({...newTicket, title: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-accent/50 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black opacity-40 uppercase tracking-widest ml-2">{t.category}</label>
                  <select 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-accent/50 outline-none appearance-none"
                    value={newTicket.category}
                    onChange={(e) => setNewTicket({...newTicket, category: e.target.value})}
                  >
                    <option value="General" className="bg-green-950">General Support</option>
                    <option value="Payments" className="bg-green-950">Payments</option>
                    <option value="Health" className="bg-green-950">Cow Health</option>
                    <option value="Processing" className="bg-green-950">Processing</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black opacity-40 uppercase tracking-widest ml-2">{t.priority}</label>
                  <select 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-accent/50 outline-none appearance-none"
                    value={newTicket.priority}
                    onChange={(e) => setNewTicket({...newTicket, priority: e.target.value})}
                  >
                    <option value="LOW" className="bg-green-950">Low</option>
                    <option value="MEDIUM" className="bg-green-950">Medium</option>
                    <option value="HIGH" className="bg-green-950">High</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black opacity-40 uppercase tracking-widest ml-2">{t.description}</label>
                <textarea 
                  required 
                  rows={4}
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-accent/50 outline-none transition-all resize-none"
                />
              </div>

              <button type="submit" className="w-full bg-accent text-white font-black py-5 rounded-2xl shadow-xl shadow-accent/20 hover:shadow-accent/40 active:scale-95 transition-all flex items-center justify-center gap-3 mt-6">
                <Send className="w-5 h-5" />
                CREATE TICKET NOW
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default TicketsPage;
