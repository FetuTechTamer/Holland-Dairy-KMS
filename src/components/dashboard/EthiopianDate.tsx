'use client';

import React from 'react';
import { formatEthiopianDateNumeric } from '@/lib/ethiopianCalendar';

interface EthiopianDateProps {
  date?: string | Date;
  className?: string;
}

const EthiopianDate: React.FC<EthiopianDateProps> = ({ date = new Date(), className = '' }) => {
  try {
    const d = typeof date === 'string' ? new Date(date) : date;
    const formatted = formatEthiopianDateNumeric(d);
    return <span className={className}>{formatted}</span>;
  } catch {
    return <span className={className}>—</span>;
  }
};

export default EthiopianDate;
