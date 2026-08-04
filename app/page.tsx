"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
      setError("");
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsLoading(true);
    setError("");
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Appel vers ton API Render avec la nouvelle route
      const response = await fetch("https://agent-backend-0atw.onrender.com/extract-pdf", {
        method: "POST",
        body: formData, 
      });

      if (!response.ok) throw new Error("Erreur lors du traitement du document");
      
      const data = await response.json();
      setResult(data.data);
    } catch (err) {
      setError("Erreur de communication avec le serveur d'extraction IA.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center py-20 px-4">
      <div className="max-w-3xl w-full space-y-8">
        
        {/* EN-TÊTE */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            Agent Pré-Comptable IA
          </h1>
          <p className="text-slate-400 text-lg">
            Glissez ou sélectionnez votre facture (PDF). L'agent extrait les données pour validation instantanée.
          </p>
        </div>

        {/* ZONE DE DEPOT DE FICHIER */}
        <div className="bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-700 text-center space-y-4">
          <div className="border-2 border-dashed border-slate-600 rounded-xl p-8 hover:border-blue-500 transition-colors cursor-pointer relative">
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="space-y-2">
              <span className="text-3xl">📄</span>
              <p className="text-slate-300 font-medium">
                {file ? file.name : "Glissez votre facture ici ou cliquez pour parcourir"}
              </p>
              <p className="text-xs text-slate-500">Formats acceptés : PDF, PNG, JPG</p>
            </div>
          </div>
          
          <button
            onClick={handleUpload}
            disabled={isLoading || !file}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold py-3 px-6 rounded-xl transition-all"
          >
            {isLoading ? "Analyse du document par l'IA..." : "Lancer l'analyse du document"}
          </button>
        </div>

        {/* RÉSULTATS */}
        {error && <p className="text-red-400 text-center">{error}</p>}
        
        {result && (
          <div className="bg-emerald-900/30 border border-emerald-500/50 p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
              ✓ Document analysé (En attente de validation DAF)
            </h2>
            <div className="grid grid-cols-2 gap-4 text-slate-300">
              <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                <span className="text-xs text-slate-500 uppercase tracking-wider block">Fournisseur</span>
                <span className="font-semibold">{result.fournisseur || "N/A"}</span>
              </div>
              <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                <span className="text-xs text-slate-500 uppercase tracking-wider block">Montant TTC</span>
                <span className="font-semibold text-white">{result.montant_ttc} €</span>
              </div>
              <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                <span className="text-xs text-slate-500 uppercase tracking-wider block">TVA</span>
                <span className="font-semibold">{result.tva} €</span>
              </div>
              <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                <span className="text-xs text-slate-500 uppercase tracking-wider block">IBAN</span>
                <span className="font-mono text-sm">{result.iban || "N/A"}</span>
              </div>
            </div>
            <button className="mt-6 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-xl transition-all">
              Valider et injecter dans l'ERP
            </button>
          </div>
        )}
        
      </div>
    </div>
  );
}
