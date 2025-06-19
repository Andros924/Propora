import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  // TODO: caricare proprietà da Supabase / Zustand

  const properties = [
    { id: 1, name: "Villa Paradiso" },
    { id: 2, name: "Appartamento Mare" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Dashboard Proprietà</h1>
      <ul className="space-y-4">
        {properties.map((property) => (
          <li
            key={property.id}
            className="p-4 bg-white rounded shadow hover:bg-indigo-50"
          >
            <Link to={`/property/${property.id}`} className="text-indigo-600">
              {property.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
