import React from 'react';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/button';

export default function Header() {
  const { user, logout, sidebarOpen, setSidebarOpen } = useStore();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex-shrink-0 flex items-center ml-4 lg:ml-0">
              <h1 className="text-2xl font-bold text-blue-900">Propora</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user && (
              <>
                <div className="flex items-center space-x-3">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user.avatar}
                    alt={user.name}
                  />
                  <span className="text-sm font-medium text-gray-700 hidden sm:block">
                    {user.name}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                >
                  Esci
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}