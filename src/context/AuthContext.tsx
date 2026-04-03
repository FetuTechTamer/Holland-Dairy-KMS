'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role, mockUsers } from '@/lib/mockData';

interface AuthContextType {
  user: User | null;
  status: 'idle' | 'loading' | 'authenticated' | 'unauthenticated';
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    name: string,
    email: string,
    role: Role,
    farmName?: string,
    department?: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'authenticated' | 'unauthenticated'>('loading');

  useEffect(() => {
    const savedUser = localStorage.getItem('holland_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setStatus('authenticated');
    } else {
      setStatus('unauthenticated');
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setStatus('loading');
    // Mock login logic
    const foundUser = mockUsers.find(u => u.email === email);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Admin default account
    if (email === 'admin@holland.com' && password === 'admin123') {
      const adminUser = mockUsers[0];
      setUser(adminUser);
      localStorage.setItem('holland_user', JSON.stringify(adminUser));
      setStatus('authenticated');
      return true;
    }

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('holland_user', JSON.stringify(foundUser));
      setStatus('authenticated');
      return true;
    }

    setStatus('unauthenticated');
    return false;
  };

  const register = async (
    name: string,
    email: string,
    role: Role,
    farmName?: string,
    department?: string
  ): Promise<{ success: boolean; error?: string }> => {
    setStatus('loading');
    await new Promise(resolve => setTimeout(resolve, 800));



    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role,
      joinDate: new Date().toISOString().split('T')[0],
      farmName: role === 'FARMER' ? farmName : undefined,
      department: role === 'STAFF' ? department : (role === 'ADMIN' ? 'Management' : undefined)
    };

    setUser(newUser);
    localStorage.setItem('holland_user', JSON.stringify(newUser));
    setStatus('authenticated');
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('holland_user');
    setStatus('unauthenticated');
  };

  return (
    <AuthContext.Provider value={{ user, status, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
