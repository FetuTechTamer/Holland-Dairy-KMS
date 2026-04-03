'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import FarmerDashboard from '@/components/dashboard/FarmerDashboard';
import StaffDashboard from '@/components/dashboard/StaffDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const DashboardPage = () => {
  const { user, status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
          <p className="text-sm font-bold opacity-50 uppercase tracking-widest animate-pulse">
            Authenticating...
          </p>
        </div>
      </div>
    );
  }

  const renderDashboard = () => {
    switch (user?.role) {
      case 'ADMIN':
        return <AdminDashboard />;
      case 'STAFF':
        return <StaffDashboard />;
      case 'FARMER':
        return <FarmerDashboard />;
      default:
        return <FarmerDashboard />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-accent selection:text-white">
      <Navbar />
      <main className="flex-grow container mx-auto px-6 pt-32">
        {renderDashboard()}
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
