import React from "react";
import { useParams } from "react-router-dom";

export default function Report() {
  const { id } = useParams();

  // TODO: generare report PDF e mostrare anteprima

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Report Proprietà #{id}</h1>
      <p>Report PDF mensile sarà mostrato qui.</p>
    </div>
  );
}