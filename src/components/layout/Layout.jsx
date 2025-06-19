import React from 'react';
import Header from './Header';
import { useStore } from '../../store/useStore';

export default function Layout({ children }) {
  const { isAuthenticated } = useStore();

  if (!isAuthenticated) {
    return children;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}