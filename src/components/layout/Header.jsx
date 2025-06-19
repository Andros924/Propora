import React from 'react';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/button';

export default function Header() {
  const { user, logout, sidebarOpen, setSidebarOpen } = useStore();

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-soft border-b border-neutral-200/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-xl text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 lg:hidden"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex-shrink-0 flex items-center ml-4 lg:ml-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-soft">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                    Propora
                  </h1>
                  <p className="text-xs text-neutral-500 -mt-1">Property Management</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user && (
              <>
                <div className="flex items-center space-x-3 bg-neutral-50 rounded-xl px-4 py-2 border border-neutral-200/60">
                  <img
                    className="h-8 w-8 rounded-lg object-cover shadow-soft"
                    src={user.avatar}
                    alt={user.name}
                  />
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-neutral-900">{user.name}</p>
                    <p className="text-xs text-neutral-500">{user.role}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="hover:bg-error-50 hover:border-error-300 hover:text-error-700"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
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