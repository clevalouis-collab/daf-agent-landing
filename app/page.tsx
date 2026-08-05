'use client';

import React, { useState } from 'react';

export default function AgentPreComptable() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Veuillez sélectionner un fichier.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Appel direct à ton serveur Render
      const response = await fetch('https://agent-backend-0atw.onrender.com/extract-pdf', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Une erreur est survenue lors de l'analyse.");
      }

      setResult(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white font-sans selection:bg-blue-500/30">
      
      {/* HEADER LUXE : CLFinance */}
      <header className="absolute top-0 left-0 w-full p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Logo Géométrique Or/Luxe */}
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-amber-300 to-amber-600 shadow-[0_0_15px_rgba(217,119,6,0.4)]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0a0f1c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 uppercase">
            CLFinance
          </h1>
        </div>
      </header>

      {/* CONTENU PRINCIPAL */}
      <main className="flex flex-col items-center justify-center min-h-screen px-4 pt-20">
        
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-blue-400 mb-4 tracking-tight">Agent Pré-Comptable IA</h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            Glissez ou sélectionnez votre facture (PDF, JPG, PNG). L'agent extrait les données clés pour validation instantanée.
          </p>
        </div>

        <div className="w-full max-w-2xl bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-2xl">
          
          {/* Zone de Drag & Drop */}
          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-700 rounded-xl hover:border-blue-500 hover:bg-slate-800/50 transition-all cursor-pointer mb-6 group">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-10 h-10 mb-3 text-blue-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <p className="mb-2 text-sm text-slate-300 font-semibold">
                {file ? file.name : "Cliquez pour choisir un fichier"}
              </p>
              <p className="text-xs text-slate-500">PDF, JPG, PNG acceptés</p>
            </div>
            {/* ICI : Le front-end accepte enfin les images ! */}
            <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} />
          </label>

          {/* Bouton d'Analyse */}
          <button 
            onClick={handleUpload}
            disabled={loading || !file}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              loading || !file 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]'
            }`}
          >
            {loading ? "Analyse IA en cours..." : "Lancer l'analyse du document"}
          </button>
        </div>

        {/* Affichage des Erreurs */}
        {error && (
          <div className="mt-6 w-full max-w-2xl bg-red-950/50 border border-red-900 text-red-400 p-4 rounded-xl flex items-start gap-3">
            <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Affichage des Résultats (Tableau) */}
        {result && (
          <div className="mt-8 w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl animate-fade-in-up">
            <div className="bg-slate-800 px-6 py-4 border-b border-slate-700">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Données Extraites avec Succès
              </h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(result).map(([key, value]) => (
                <div key={key} className="bg-slate-950/50 p-3 rounded-lg border border-slate-800/50">
                  <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    {key.replace('_', ' ')}
                  </span>
                  <span className="block text-sm text-slate-200 font-medium">
                    {value || <span className="text-slate-600 italic">Non détecté</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
