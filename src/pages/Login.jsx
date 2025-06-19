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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">Propora</h1>
          <p className="text-gray-600">Gestione proprietà turistiche</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Inserisci la tua email"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Inserisci la password"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-900 hover:bg-blue-800 text-white"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <LoadingSpinner size="sm" className="mr-2" />
                  Accesso in corso...
                </div>
              ) : (
                'Accedi'
              )}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-800">
              <strong>Demo:</strong> Usa le credenziali precompilate per accedere
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}