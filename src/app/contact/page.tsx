'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { translations } from '@/lib/translations';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageSquare, ShieldCheck, Globe } from 'lucide-react';

const ContactPage = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const t = translations[language].contact;
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ ...formData, subject: '', message: '' });
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h1 className="text-5xl md:text-6xl font-black mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {t.title}
              </h1>
              <p className="text-xl text-foreground/50 max-w-2xl mx-auto font-medium animate-in fade-in slide-in-from-bottom-6 duration-700">
                {t.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
              {/* Form Section */}
              <div className="glass p-10 md:p-14 rounded-[3.5rem] border border-white/10 shadow-2xl relative overflow-hidden group">
                 <div className="absolute -top-20 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                 
                 {isSuccess ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-in zoom-in-90 duration-500">
                      <div className="w-24 h-24 bg-green-500/20 rounded-[2.5rem] flex items-center justify-center mb-8 ring-8 ring-green-500/5">
                        <CheckCircle2 className="w-12 h-12 text-green-500" />
                      </div>
                      <h2 className="text-3xl font-black mb-4">Message Sent!</h2>
                      <p className="text-foreground/50 text-lg font-medium">{t.form.success}</p>
                    </div>
                 ) : (
                    <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black opacity-40 uppercase tracking-widest ml-3">{t.form.name}</label>
                          <input 
                            type="text" required 
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-accent/20 outline-none transition-all placeholder:opacity-30" 
                            placeholder="Abebe Bikila"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black opacity-40 uppercase tracking-widest ml-3">{t.form.email}</label>
                          <input 
                            type="email" required 
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-accent/20 outline-none transition-all placeholder:opacity-30" 
                            placeholder="abebe@example.com"
                          />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black opacity-40 uppercase tracking-widest ml-3">{t.form.subject}</label>
                        <input 
                          type="text" required 
                          value={formData.subject}
                          onChange={e => setFormData({...formData, subject: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-accent/20 outline-none transition-all placeholder:opacity-30" 
                          placeholder="How can we help?"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black opacity-40 uppercase tracking-widest ml-3">{t.form.message}</label>
                        <textarea 
                          required rows={6} 
                          value={formData.message}
                          onChange={e => setFormData({...formData, message: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-accent/20 outline-none transition-all resize-none placeholder:opacity-30" 
                          placeholder="Tell us everything..."
                        />
                      </div>
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-accent text-white font-black py-6 rounded-3xl shadow-2xl shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-4 text-lg"
                      >
                        {isSubmitting ? <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send className="w-6 h-6" /> {t.form.sendBtn}</>}
                      </button>
                    </form>
                 )}
              </div>

              {/* Info Section */}
              <div className="space-y-8">
                <div className="glass p-10 rounded-[3.5rem] border border-white/10 shadow-xl bg-green-900/40 text-white relative h-full flex flex-col justify-between overflow-hidden group">
                  <div className="absolute bottom-0 right-0 p-12 opacity-5 scale-150 rotate-12 group-hover:scale-[1.8] transition-transform duration-1000">
                    <Globe className="w-64 h-64" />
                  </div>
                  
                  <div className="space-y-10 relative z-10">
                    <h3 className="text-3xl font-black mb-8 border-b border-white/10 pb-6">Direct Channels</h3>
                    
                    <div className="space-y-8">
                      <div className="flex items-start gap-6 group/item">
                        <div className="p-4 bg-white/10 rounded-2xl group-hover/item:bg-accent transition-colors duration-500 shadow-inner">
                           <Phone className="w-8 h-8" />
                        </div>
                        <div>
                           <p className="text-[10px] font-black opacity-50 uppercase tracking-widest mb-1">{t.phone}</p>
                           <p className="text-xl font-bold">+251-11-XXXXXXX</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-6 group/item">
                        <div className="p-4 bg-white/10 rounded-2xl group-hover/item:bg-accent transition-colors duration-500 shadow-inner">
                           <Mail className="w-8 h-8" />
                        </div>
                        <div>
                           <p className="text-[10px] font-black opacity-50 uppercase tracking-widest mb-1">{t.email}</p>
                           <p className="text-xl font-bold">support@holland-dairy.com</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-6 group/item">
                        <div className="p-4 bg-white/10 rounded-2xl group-hover/item:bg-accent transition-colors duration-500 shadow-inner">
                           <MapPin className="w-8 h-8" />
                        </div>
                        <div>
                           <p className="text-[10px] font-black opacity-50 uppercase tracking-widest mb-1">{t.address}</p>
                           <p className="text-xl font-bold">Addis Ababa, Ethiopia</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-6 group/item">
                        <div className="p-4 bg-white/10 rounded-2xl group-hover/item:bg-accent transition-colors duration-500 shadow-inner">
                           <Clock className="w-8 h-8" />
                        </div>
                        <div>
                           <p className="text-[10px] font-black opacity-50 uppercase tracking-widest mb-1">{t.hours}</p>
                           <p className="text-xl font-bold">Mon - Fri: 8:00 AM - 5:00 PM</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-12 relative z-10 pt-10 border-t border-white/10">
                     <div className="flex items-center gap-3 opacity-60">
                        <MessageSquare className="w-5 h-5" />
                        <span className="text-[10px] font-bold uppercase">24/7 Support</span>
                     </div>
                     <div className="flex items-center gap-3 opacity-60">
                        <ShieldCheck className="w-5 h-5" />
                        <span className="text-[10px] font-bold uppercase">Safe & Secure</span>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
