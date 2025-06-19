import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { LoadingSpinner } from "../components/ui/loading";
import { useStore } from "../store/useStore";
import { authenticateUser } from "../../lib/fakeApi";

export default function Login() {
  const navigate = useNavigate();
  const { setUser, addNotification } = useStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "demo@propora.com",
    password: "demo123"
  });

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await authenticateUser(formData.email, formData.password);
      setUser(user);
      addNotification({
        type: 'success',
        title: 'Accesso effettuato',
        message: `Benvenuto, ${user.name}!`
      });
      navigate("/dashboard");
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Errore di accesso',
        message: error.message
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-secondary-400/20 to-primary-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Logo and title */}
        <div className="text-center animate-slide-down">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-strong">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent mb-2">
            Propora
          </h1>
          <p className="text-lg text-neutral-600 font-medium">Gestione Proprietà Turistiche</p>
          <p className="text-sm text-neutral-500 mt-2">La piattaforma professionale per i tuoi immobili</p>
        </div>
        
        {/* Login form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-strong p-8 border border-neutral-200/60 animate-scale-in">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-3">
                Indirizzo Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl shadow-soft placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white/70"
                placeholder="Inserisci la tua email"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-neutral-700 mb-3">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl shadow-soft placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white/70"
                placeholder="Inserisci la password"
              />
            </div>

            <Button
              type="submit"
              className="w-full text-lg py-4"
              disabled={loading}
              size="lg"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <LoadingSpinner size="sm" className="mr-3" />
                  Accesso in corso...
                </div>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Accedi alla Dashboard
                </>
              )}
            </Button>
          </form>

          {/* Demo credentials */}
          <div className="mt-8 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl border border-primary-200/50">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-primary-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-primary-800 mb-1">Account Demo</p>
                <p className="text-sm text-primary-700">
                  Usa le credenziali precompilate per accedere alla demo completa della piattaforma
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}