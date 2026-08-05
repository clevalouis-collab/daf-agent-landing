'use client';

import React, { useState } from 'react';

export default function AgentPreComptableBatch() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<any[]>([]);

  const handleFileChange = (e: any) => {
    if (e.target.files) {
      // Convertit la liste de fichiers en tableau (jusqu'à 100 et plus)
      const selectedFiles = Array.from(e.target.files) as File[];
      setFiles(selectedFiles);
      setError(null);
      setResults([]);
    }
  };

  const handleUploadBatch = async () => {
    if (files.length === 0) {
      setError("Veuillez sélectionner au moins un fichier.");
      return;
    }

    setLoading(true);
    setError(null);
    setResults([]);

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file); // 'files' au pluriel pour correspondre au backend
    });

    try {
      const response = await fetch('https://agent-backend-0atw.onrender.com/extract-batch', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Une erreur est survenue lors de l'analyse en lot.");
      }

      setResults(data.results);
    } catch (err: any) {
      setError(err.message || "Erreur de connexion.");
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour générer et télécharger le fichier CSV compatible ERP
  const exportToCSV = () => {
    if (results.length === 0) return;

    const headers = ["Fichier", "Fournisseur", "Numero Facture", "Date Emission", "Montant HT", "TVA", "Montant TTC", "Devise", "IBAN"];
    let csvContent = "data:text/csv;charset=utf-8," + headers.join(";") + "\n";

    results.forEach((item) => {
      if (item.data) {
        const row = [
          item.filename,
          `"${item.data.fournisseur || ''}"`,
          `"${item.data.numero_facture || ''}"`,
          item.data.date_emission || '',
          item.data.montant_ht || '',
          item.data.tva || '',
          item.data.montant_ttc || '',
          item.data.devise || '',
          item.data.iban || ''
        ];
        csvContent += row.join(";") + "\n";
      }
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "export_comptable_clfinance.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white font-sans selection:bg-blue-500/35 pb-20">
      
      {/* HEADER LUXE : CLFinance */}
      <header className="w-full p-6 flex items-center justify-between border-b border-slate-800/60 bg-slate-900/30 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-amber-300 to-amber-600 shadow-[0_0_15px_rgba(217,119,6,0.4)]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0a0f1c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 uppercase">
            CLFinance
          </h1>
        </div>
        <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">Mode Batch Industriel</span>
      </header>

      {/* CONTENU PRINCIPAL */}
      <main className="max-w-5xl mx-auto px-4 pt-12">
        
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-blue-400 mb-4 tracking-tight">Traitement de Factures en Masse</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Glissez jusqu'à 100 factures (PDF, JPG, PNG) simultanément. L'IA extrait tout en parallèle et génère votre export prêt pour l'ERP.
          </p>
        </div>

        <div className="w-full bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl">
          
          {/* Zone de Drag & Drop Multiple */}
          <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-700 rounded-xl hover:border-blue-500 hover:bg-slate-800/50 transition-all cursor-pointer mb-6 group">
            <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
              <svg className="w-12 h-12 mb-3 text-blue-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <p className="mb-2 text-sm text-slate-300 font-semibold">
                {files.length > 0 ? `${files.length} fichier(s) sélectionné(s)` : "Cliquez ou glissez vos factures ici (jusqu'à 100)"}
              </p>
              <p className="text-xs text-slate-500">Sélection multiple acceptée (PDF, JPG, PNG)</p>
            </div>
            <input type="file" className="hidden" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} />
          </label>

          {/* Bouton d'Analyse Batch */}
          <button 
            onClick={handleUploadBatch}
            disabled={loading || files.length === 0}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              loading || files.length === 0 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]'
            }`}
          >
            {loading ? `Analyse IA en cours de ${files.length} documents...` : `Lancer l'analyse (${files.length} fichiers)`}
          </button>
        </div>

        {/* Affichage des Erreurs */}
        {error && (
          <div className="mt-6 w-full bg-red-950/50 border border-red-900 text-red-400 p-4 rounded-xl flex items-start gap-3">
            <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Résultats et Tableau Global + Bouton Export ERP */}
        {results.length > 0 && (
          <div className="mt-10">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                Résultats du Lot ({results.length} documents traités)
              </h3>
              
              {/* Le bouton magique d'export ERP / CSV */}
              <button 
                onClick={exportToCSV}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-[0_0_15px_rgba(5,150,105,0.4)] transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
                Télécharger l'export ERP (CSV)
              </button>
            </div>

            {/* Tableau global des factures */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-x-auto shadow-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-800/80 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-700">
                    <th className="p-4">Fichier</th>
                    <th className="p-4">Fournisseur</th>
                    <th className="p-4">N° Facture</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">HT</th>
                    <th className="p-4">TVA</th>
                    <th className="p-4">TTC</th>
                    <th className="p-4">IBAN</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-sm">
                  {results.map((item, index) => (
                    <tr key={index} className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-4 font-medium text-slate-300 truncate max-w-[150px]">{item.filename}</td>
                      {item.error ? (
                        <td colSpan={7} className="p-4 text-red-400 italic">Erreur : {item.error}</td>
                      ) : (
                        <>
                          <td className="p-4 text-white font-semibold">{item.data?.fournisseur || <span className="text-slate-600 italic">N/A</span>}</td>
                          <td className="p-4 text-slate-300">{item.data?.numero_facture || <span className="text-slate-600 italic">N/A</span>}</td>
                          <td className="p-4 text-slate-300">{item.data?.date_emission || <span className="text-slate-600 italic">N/A</span>}</td>
                          <td className="p-4 text-slate-200">{item.data?.montant_ht ? `${item.data.montant_ht} ${item.data.devise || ''}` : '-'}</td>
                          <td className="p-4 text-slate-200">{item.data?.tva ? `${item.data.tva} ${item.data.devise || ''}` : '-'}</td>
                          <td className="p-4 text-emerald-400 font-bold">{item.data?.montant_ttc ? `${item.data.montant_ttc} ${item.data.devise || ''}` : '-'}</td>
                          <td className="p-4 text-xs text-slate-400 font-mono">{item.data?.iban || '-'}</td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
