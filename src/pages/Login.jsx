import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function Login() {
  const navigate = useNavigate();

  function handleLogin() {
    // TODO: implementare login con Supabase
    navigate("/dashboard");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">Propora Login</h1>
      <button
        onClick={handleLogin}
        className="px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Accedi
      </button>
    </div>
  );
}
