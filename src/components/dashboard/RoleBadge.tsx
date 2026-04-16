'use client';

import React from 'react';
import { Role } from '@/lib/mockData';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

interface RoleBadgeProps {
  role: Role | string;
  className?: string;
  subRole?: string;
}

const RoleBadge: React.FC<RoleBadgeProps> = ({ role, subRole, className = '' }) => {
  const { language } = useLanguage();
  const t = translations[language].auth;

  const getRoleStyles = () => {
    const effectiveRole = subRole || role;
    switch (effectiveRole) {
      case 'FARMER':
        return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
      case 'PRODUCTION':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
      case 'QUALITY':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300';
      case 'LOGISTICS':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
      case 'SALES':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-300';
      case 'ADMIN':
        return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
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
