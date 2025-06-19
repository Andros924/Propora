import React from 'react';
import Header from './Header';
import { useStore } from '../../store/useStore';

export default function Layout({ children }) {
  const { isAuthenticated } = useStore();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-primary via-background-secondary to-primary-50/30">
      <Header />
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
}