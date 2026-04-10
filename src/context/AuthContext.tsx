'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role, StaffSubRole, mockUsers } from '@/lib/mockData';

interface AuthContextType {
  user: User | null;
  status: 'idle' | 'loading' | 'authenticated' | 'unauthenticated';
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, role: Role, staffSubRole?: StaffSubRole, farmName?: string, department?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_CREDENTIALS: Record<string, string> = {
  'admin@holland.com': 'admin123',
  'farmer@holland.com': 'farmer123',
  'staff@holland.com': 'staff123',
  'production@holland.com': 'production123',
  'quality@holland.com': 'quality123',
  'logistics@holland.com': 'logistics123',
  'kebede@holland.com': 'farmer123',
  'tigist@holland.com': 'farmer123',
  'yohannes@holland.com': 'farmer123',
  'almaz@holland.com': 'farmer123',
  'daniel@holland.com': 'staff123',
  'hiwot@holland.com': 'staff123',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'authenticated' | 'unauthenticated'>('loading');
  const [sessionUsers, setSessionUsers] = useState<User[]>(mockUsers);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('holland_user');
      const savedExtraUsers = localStorage.getItem('holland_extra_users');
      if (savedExtraUsers) setSessionUsers([...mockUsers, ...JSON.parse(savedExtraUsers)]);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
        setStatus('authenticated');
      } else {
        setStatus('unauthenticated');
      }
    } catch {
      setStatus('unauthenticated');
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setStatus('loading');
    await new Promise(resolve => setTimeout(resolve, 700));

    const expectedPassword = MOCK_CREDENTIALS[email.toLowerCase()];
    if (!expectedPassword || password !== expectedPassword) {
      setStatus('unauthenticated');
      return false;
    }

    const allUsers = [...mockUsers, ...JSON.parse(localStorage.getItem('holland_extra_users') || '[]')];
    const foundUser = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

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
    staffSubRole?: StaffSubRole,
    farmName?: string,
    department?: string
  ): Promise<{ success: boolean; error?: string }> => {
    setStatus('loading');
    await new Promise(resolve => setTimeout(resolve, 700));

    const allUsers = [...mockUsers, ...JSON.parse(localStorage.getItem('holland_extra_users') || '[]')];
    if (allUsers.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      setStatus('unauthenticated');
      return { success: false, error: 'emailExists' };
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role,
      staffSubRole: role === 'STAFF' ? staffSubRole : undefined,
      joinDate: new Date().toISOString().split('T')[0],
      farmName: role === 'FARMER' ? farmName : undefined,
      department: role === 'STAFF' ? department : role === 'ADMIN' ? 'Management' : undefined,
    };

    const extraUsers = JSON.parse(localStorage.getItem('holland_extra_users') || '[]');
    localStorage.setItem('holland_extra_users', JSON.stringify([...extraUsers, newUser]));
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
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
