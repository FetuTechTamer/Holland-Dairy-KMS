'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { language } = useLanguage();
  const t = translations[language].faq;

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 w-full space-y-4">
      {t.items.map((faq, index) => (
        <div key={index} className="glass rounded-2xl overflow-hidden border-none transition-shadow hover:shadow-lg">
          <button
            className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
            onClick={() => toggleFAQ(index)}
          >
            <span className="text-xl font-bold font-sans">{faq.q}</span>
            {activeIndex === index ? (
              <ChevronUp className="w-6 h-6 text-accent" />
            ) : (
              <ChevronDown className="w-6 h-6 text-accent" />
            )}
          </button>
          
          <AnimatePresence>
            {activeIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 opacity-80 leading-relaxed">
                  {faq.a}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
