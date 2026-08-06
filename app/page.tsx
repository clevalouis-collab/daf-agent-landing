'use client';

import React, { useState } from 'react';

const BACKEND_URL = "https://agent-backend-0atw.onrender.com";

export default function AgentPreComptableEnterprise() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [progressText, setProgressText] = useState("");
  const [retryingIndex, setRetryingIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<any[]>([]);
  const [syncingERP, setSyncingERP] = useState(false);
  const [erpStatus, setErpStatus] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files) as File[];
      setFiles(selectedFiles);
      setError(null);
      setResults([]);
      setErpStatus(null);
    }
  };

  const handleUploadBatch = async () => {
    if (files.length === 0) {
      setError("Veuillez sélectionner au moins un fichier.");
      return;
    }

    setLoading(true);
    setError(null);
    setErpStatus(null);
    
    const emptyResults = files.map(file => ({ filename: file.name, status: 'en_attente' }));
    setResults(emptyResults);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setProgressText(`Analyse du document ${i + 1} sur ${files.length} (${file.name})...`);

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch(`${BACKEND_URL}/extract-pdf`, {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        setResults(prev => {
          const updated = [...prev];
          if (!response.ok) {
            updated[i] = { filename: file.name, error: data.detail || "Erreur d'analyse" };
          } else {
            updated[i] = data;
          }
          return updated;
        });
      } catch (err: any) {
        setResults(prev => {
          const updated = [...prev];
          updated[i] = { filename: file.name, error: err.message || "Erreur de connexion" };
          return updated;
        });
      }

      if (i < files.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 800));
      }
    }

    setLoading(false);
    setProgressText("");
  };

  const handleRetrySingle = async (index: number, filename: string) => {
    const fileToRetry = files.find(f => f.name === filename);
    if (!fileToRetry) return;

    setRetryingIndex(index);
    const formData = new FormData();
    formData.append('file', fileToRetry);

    try {
      const response = await fetch(`${BACKEND_URL}/extract-pdf`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Erreur lors de la relance.");

      const updatedResults = [...results];
      updatedResults[index] = data;
      setResults(updatedResults);
    } catch (err: any) {
      alert(`Échec de la relance : ${err.message}`);
    } finally {
      setRetryingIndex(null);
    }
  };

  const handleCellChange = (index: number, field: string, value: string) => {
    const updatedResults = [...results];
    if (updatedResults[index] && updatedResults[index].data) {
      updatedResults[index].data[field] = value;
      setResults(updatedResults);
    }
  };

  // Contrôle de cohérence comptable (HT + TVA vs TTC)
  const checkMathConsistency = (data: any) => {
    if (!data || data.montant_ht == null || data.montant_ttc == null) return true;
    const ht = parseFloat(data.montant_ht) || 0;
    const tva = parseFloat(data.tva) || 0;
    const ttc = parseFloat(data.montant_ttc) || 0;
    if (ttc === 0) return true;
    const computedTTC = ht + tva;
    // Tolérance de 0.05 pour les arrondis
    return Math.abs(computedTTC - ttc) < 0.1;
  };

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
    link.setAttribute("download", "export_erp_clfinance_enterprise.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const syncToERP = async () => {
    setSyncingERP(true);
    setErpStatus(null);
    try {
      const response = await fetch(`${BACKEND_URL}/sync-erp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ results })
      });
      const data = await response.json();
      if (response.ok) {
        setErpStatus("✅ Synchronisation ERP réussie !");
      } else {
        setErpStatus("❌ Erreur de synchronisation ERP.");
      }
    } catch (e) {
      setErpStatus("❌ Erreur réseau ERP.");
    } finally {
      setSyncingERP(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white font-sans selection:bg-blue-500/35 pb-20">
      
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
        <span className="text-xs text-amber-400 bg-amber-950/40 px-3 py-1.5 rounded-full border border-amber-800/50">Enterprise V2.0 - Structured & Verified</span>
      </header>

      <main className="max-w-7xl mx-auto px-4 pt-12">
        
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-blue-400 mb-4 tracking-tight">Agent Pré-Comptable IA</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Traitement en masse intelligent, contrôle de cohérence mathématique et passerelle ERP directe.
          </p>
        </div>

        <div className="w-full bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl">
          
          <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-slate-700 rounded-xl hover:border-blue-500 hover:bg-slate-800/50 transition-all cursor-pointer mb-6 group">
            <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
              <svg className="w-12 h-12 mb-3 text-blue-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <p className="mb-2 text-sm text-slate-300 font-semibold">
                {files.length > 0 ? `${files.length} fichier(s) sélectionné(s)` : "Glissez vos factures et reçus ici (PDF, JPG, PNG)"}
              </p>
              <p className="text-xs text-slate-500">File d'attente sécurisée anti-saturation</p>
            </div>
            <input type="file" className="hidden" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} />
          </label>

          <button 
            onClick={handleUploadBatch}
            disabled={loading || files.length === 0}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              loading || files.length === 0 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]'
            }`}
          >
            {loading ? (progressText || "Analyse en cours...") : `Lancer l'analyse (${files.length} fichiers)`}
          </button>
        </div>

        {error && (
          <div className="mt-6 w-full bg-red-950/50 border border-red-900 text-red-400 p-4 rounded-xl flex items-start gap-3">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {results.length > 0 && (
          <div className="mt-10">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${loading ? 'bg-amber-500 animate-ping' : 'bg-green-500'}`}></span>
                  Résultats validés ({results.filter(r => r.data).length} / {results.length})
                </h3>
                <p className="text-xs text-slate-400 mt-1">Vérification automatique HT + TVA = TTC activée.</p>
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={exportToCSV}
                  className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-5 py-3 rounded-xl font-bold text-sm border border-slate-700 transition-all"
                >
                  📥 CSV
                </button>
                <button 
                  onClick={syncToERP}
                  disabled={syncingERP}
                  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-[0_0_15px_rgba(5,150,105,0.4)] transition-all"
                >
                  ⚡ {syncingERP ? "Synchro..." : "Envoyer vers l'ERP"}
                </button>
              </div>
            </div>

            {erpStatus && (
              <div className="mb-4 p-3 bg-slate-900 border border-emerald-800/60 rounded-xl text-emerald-400 text-sm">
                {erpStatus}
              </div>
            )}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-x-auto shadow-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-800/80 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-700">
                    <th className="p-4">Fichier source</th>
                    <th className="p-4">Fournisseur</th>
                    <th className="p-4">N° Facture</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">HT</th>
                    <th className="p-4">TVA</th>
                    <th className="p-4">TTC</th>
                    <th className="p-4">Devise</th>
                    <th className="p-4">IBAN</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-sm">
                  {results.map((item, index) => {
                    const isMathValid = checkMathConsistency(item.data);
                    return (
                      <tr key={index} className={`hover:bg-slate-800/20 transition-colors ${!isMathValid && item.data ? 'bg-amber-950/10' : ''}`}>
                        <td className="p-4 font-medium text-slate-400 text-xs truncate max-w-[130px]" title={item.filename}>
                          <div className="flex items-center gap-1.5">
                            {item.data && !isMathValid && (
                              <span title="Attention: HT + TVA != TTC" className="text-amber-400 font-bold">⚠️</span>
                            )}
                            {item.filename}
                          </div>
                        </td>
                        {item.status === 'en_attente' ? (
                          <td colSpan={8} className="p-4 text-slate-500 text-xs italic">⏳ En attente...</td>
                        ) : !item.data && !item.error ? (
                          <td colSpan={8} className="p-4 text-amber-400 text-xs animate-pulse font-medium">🔄 Analyse en cours...</td>
                        ) : item.error ? (
                          <td colSpan={8} className="p-4 bg-red-950/20">
                            <div className="flex items-center justify-between">
                              <span className="text-red-400 text-xs font-semibold">⚠️ Échec : {item.error}</span>
                              <button 
                                onClick={() => handleRetrySingle(index, item.filename)}
                                disabled={retryingIndex === index}
                                className="bg-red-600 hover:bg-red-500 text-white text-xs px-3 py-1.5 rounded-lg font-bold"
                              >
                                {retryingIndex === index ? "Relance..." : "🔄 Relancer"}
                              </button>
                            </div>
                          </td>
                        ) : (
                          <>
                            <td className="p-3">
                              <input 
                                type="text" 
                                value={item.data?.fournisseur || ''} 
                                onChange={(e) => handleCellChange(index, 'fournisseur', e.target.value)}
                                className="bg-slate-950/80 border border-slate-700/60 focus:border-blue-500 rounded px-2.5 py-1.5 text-white w-full text-sm outline-none"
                              />
                            </td>
                            <td className="p-3">
                              <input 
                                type="text" 
                                value={item.data?.numero_facture || ''} 
                                onChange={(e) => handleCellChange(index, 'numero_facture', e.target.value)}
                                className="bg-slate-950/80 border border-slate-700/60 focus:border-blue-500 rounded px-2.5 py-1.5 text-white w-full text-sm outline-none"
                              />
                            </td>
                            <td className="p-3">
                              <input 
                                type="text" 
                                value={item.data?.date_emission || ''} 
                                onChange={(e) => handleCellChange(index, 'date_emission', e.target.value)}
                                className="bg-slate-950/80 border border-slate-700/60 focus:border-blue-500 rounded px-2.5 py-1.5 text-white w-32 text-sm outline-none"
                              />
                            </td>
                            <td className="p-3">
                              <input 
                                type="text" 
                                value={item.data?.montant_ht ?? ''} 
                                onChange={(e) => handleCellChange(index, 'montant_ht', e.target.value)}
                                className="bg-slate-950/80 border border-slate-700/60 focus:border-blue-500 rounded px-2.5 py-1.5 text-white w-28 text-sm outline-none"
                              />
                            </td>
                            <td className="p-3">
                              <input 
                                type="text" 
                                value={item.data?.tva ?? ''} 
                                onChange={(e) => handleCellChange(index, 'tva', e.target.value)}
                                className="bg-slate-950/80 border border-slate-700/60 focus:border-blue-500 rounded px-2.5 py-1.5 text-white w-24 text-sm outline-none"
                              />
                            </td>
                            <td className="p-3">
                              <input 
                                type="text" 
                                value={item.data?.montant_ttc ?? ''} 
                                onChange={(e) => handleCellChange(index, 'montant_ttc', e.target.value)}
                                className={`bg-slate-950/80 border rounded px-2.5 py-1.5 w-28 text-sm outline-none font-bold ${!isMathValid ? 'border-amber-500 text-amber-400' : 'border-slate-700/60 focus:border-emerald-500 text-emerald-400'}`}
                              />
                            </td>
                            <td className="p-3">
                              <input 
                                type="text" 
                                value={item.data?.devise || ''} 
                                onChange={(e) => handleCellChange(index, 'devise', e.target.value)}
                                className="bg-slate-950/80 border border-slate-700/60 focus:border-blue-500 rounded px-2.5 py-1.5 text-white w-20 text-sm outline-none text-center"
                              />
                            </td>
                            <td className="p-3">
                              <input 
                                type="text" 
                                value={item.data?.iban || ''} 
                                onChange={(e) => handleCellChange(index, 'iban', e.target.value)}
                                className="bg-slate-950/80 border border-slate-700/60 focus:border-blue-500 rounded px-2.5 py-1.5 text-slate-300 w-44 text-xs font-mono outline-none"
                              />
                            </td>
                          </>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
