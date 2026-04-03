'use client';

import React from 'react';
import { Role } from '@/lib/mockData';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

interface RoleBadgeProps {
  role: Role;
  className?: string;
}

const RoleBadge: React.FC<RoleBadgeProps> = ({ role, className = '' }) => {
  const { language } = useLanguage();
  const t = translations[language].auth;

  const getRoleStyles = () => {
    switch (role) {
      case 'ADMIN':
        return 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800';
      case 'STAFF':
        return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800';
      case 'FARMER':
        return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getRoleLabel = () => {
    switch (role) {
      case 'ADMIN': return t.admin;
      case 'STAFF': return t.staff;
      case 'FARMER': return t.farmer;
      default: return role;
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getRoleStyles()} ${className}`}>
      {getRoleLabel()}
    </span>
  );
};

export default RoleBadge;
