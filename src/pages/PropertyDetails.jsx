import React from "react";
import { useParams, Link } from "react-router-dom";

export default function PropertyDetails() {
  const { id } = useParams();

  // TODO: recupera dati proprietà e prenotazioni da Supabase

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dettagli Proprietà #{id}</h1>
      <p>Qui ci sarà il calendario prenotazioni e stato check-in/out</p>

      <Link
        to={`/report/${id}`}
        className="mt-6 inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Visualizza Report
      </Link>
    </div>
  );
}
