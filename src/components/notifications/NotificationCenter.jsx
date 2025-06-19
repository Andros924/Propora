import React, { useEffect } from 'react';
import { useStore } from '../../store/useStore';

export default function NotificationCenter() {
  const { notifications, removeNotification } = useStore();

  useEffect(() => {
    notifications.forEach(notification => {
      if (notification.type !== 'error') {
        setTimeout(() => {
          removeNotification(notification.id);
        }, 5000);
      }
    });
  }, [notifications, removeNotification]);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-6 right-6 z-50 space-y-3 max-w-sm w-full">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`bg-white/95 backdrop-blur-sm shadow-strong rounded-2xl pointer-events-auto ring-1 ring-black/5 overflow-hidden transform transition-all duration-500 ease-out animate-slide-down border-l-4 ${
            notification.type === 'error' ? 'border-error-500' :
            notification.type === 'success' ? 'border-success-500' :
            notification.type === 'warning' ? 'border-warning-500' :
            'border-primary-500'
          }`}
        >
          <div className="p-5">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  notification.type === 'success' ? 'bg-success-100' :
                  notification.type === 'error' ? 'bg-error-100' :
                  notification.type === 'warning' ? 'bg-warning-100' :
                  'bg-primary-100'
                }`}>
                  {notification.type === 'success' && (
                    <svg className="h-5 w-5 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {notification.type === 'error' && (
                    <svg className="h-5 w-5 text-error-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {notification.type === 'warning' && (
                    <svg className="h-5 w-5 text-warning-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  )}
                  {notification.type === 'info' && (
                    <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
              </div>
              <div className="ml-4 w-0 flex-1">
                <p className="text-sm font-semibold text-neutral-900">
                  {notification.title}
                </p>
                <p className="mt-1 text-sm text-neutral-600">
                  {notification.message}
                </p>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  className="bg-white rounded-xl inline-flex text-neutral-400 hover:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-200 p-1"
                  onClick={() => removeNotification(notification.id)}
                >
                  <span className="sr-only">Chiudi</span>
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}