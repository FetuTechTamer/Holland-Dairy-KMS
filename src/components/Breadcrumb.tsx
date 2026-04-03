'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

const Breadcrumb = () => {
  const pathname = usePathname();
  const { language } = useLanguage();
  const t = translations[language].nav;

  const pathSegments = pathname.split('/').filter(segment => segment !== '');
  
  if (pathname === '/') return null;

  return (
    <nav className="flex items-center gap-2 text-xs font-bold mb-6 opacity-60">
      <Link href="/" className="flex items-center gap-1 hover:text-accent transition-colors">
        <Home className="w-3.5 h-3.5" />
        {t.breadcrumbHome}
      </Link>
      
      {pathSegments.map((segment, index) => {
        const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
        const isLast = index === pathSegments.length - 1;
        
        let label = segment.charAt(0).toUpperCase() + segment.slice(1);
        if (segment === 'dashboard') label = t.breadcrumbDashboard;
        if (segment === 'profile') label = t.profile;
        if (segment === 'tickets') label = translations[language].tickets.title;
        if (segment === 'knowledge-share') label = translations[language].dashboard.sections.knowledgeShare;
        if (segment === 'contact') label = t.contact;
        if (segment === 'article') label = translations[language].dashboard.sections.featured;

        return (
          <React.Fragment key={url}>
            <ChevronRight className="w-3 h-3 opacity-40" />
            {isLast ? (
              <span className="text-accent">{label}</span>
            ) : (
              <Link href={url} className="hover:text-accent transition-colors">
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
