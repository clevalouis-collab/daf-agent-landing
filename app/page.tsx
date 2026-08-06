'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// --- CONFIGURATION SUPABASE ---
const supabaseUrl = 'https://gfzgpsmazicmpzykwsht.supabase.co'; 
const supabaseKey = 'sb_publishable_EC1AjbMq9Uy-EbBA845sZg_4MkqlhzC';
const supabase = createClient(supabaseUrl, supabaseKey);

const BACKEND_URL = "https://agent-backend-0atw.onrender.com";

export default function AgentPreComptableEnterprise() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [progressText, setProgressText] = useState("");
  const [retryingIndex, setRetryingIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<any[]>([]);
  
  // --- ÉTATS AUTHENTIFICATION ---
  const [session, setSession] = useState<any>(null);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  // Vérifier si on est déjà connecté au chargement de la page
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // --- ACTIONS AUTHENTIFICATION ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);
    const { error } = await supabase.auth.signInWithPassword({ email: authEmail, password: authPassword });
    if (error) setAuthError(error.message);
    setAuthLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);
    const { error } = await supabase.auth.signUp({ email: authEmail, password: authPassword });
    if (error) setAuthError(error.message);
    setAuthLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // --- LOGIQUE METIER (Upload, Analyse, etc.) ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files) as File[];
      setFiles(selectedFiles);
      setError(null);
      setResults([]);
    }
  };

  const handleUploadBatch = async () => {
    if (files.length === 0) return;
    setLoading(true);
    setError(null);
    
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

        // SAUVEGARDE EN BASE DE DONNÉES SUPABASE
        if (response.ok && data.data && session?.user?.id) {
           await supabase.from('invoices').insert([{
              user_id: session.user.id,
              filename: file.name,
              fournisseur: data.data.fournisseur,
              numero_facture: data.data.numero_facture,
              date_emission: data.data.date_emission ? new Date(data.data.date_emission).toISOString() : null,
              montant_ht: data.data.montant_ht,
              tva: data.data.tva,
              montant_ttc: data.data.montant_ttc,
              devise: data.data.devise,
              iban: data.data.iban,
            }]);
        }
      } catch (err: any) {
        setResults(prev => {
          const updated = [...prev];
          updated[i] = { filename: file.name, error: err.message || "Erreur réseau" };
          return updated;
        });
      }
      if (i < files.length - 1) await new Promise(resolve => setTimeout(resolve, 800));
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
      const response = await fetch(`${BACKEND_URL}/extract-pdf`, { method: 'POST', body: formData });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Erreur.");
      const updatedResults = [...results];
      updatedResults[index] = data;
      setResults(updatedResults);
    } catch (err: any) {
      alert(`Échec : ${err.message}`);
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

  const checkMathConsistency = (data: any) => {
    if (!data || data.montant_ht == null || data.montant_ttc == null) return true;
    const ht = parseFloat(data.montant_ht) || 0;
    const tva = parseFloat(data.tva) || 0;
    const ttc = parseFloat(data.montant_ttc) || 0;
    if (ttc === 0) return true;
    return Math.abs((ht + tva) - ttc) < 0.1;
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

  // --- ECRAN 1 : CHARGEMENT INITIAL ---
  if (authLoading) {
    return <div className="min-h-screen bg-[#0a0f1c] flex items-center justify-center text-blue-400 font-bold">Chargement de l'espace sécurisé...</div>;
  }

  // --- ECRAN 2 : CONNEXION (Si pas connecté) ---
  if (!session) {
    return (
      <div className="min-h-screen bg-[#0a0f1c] flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl max-w-md w-full">
          <div className="flex justify-center mb-6">
             <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-amber-300 to-amber-600 shadow-[0_0_15px_rgba(217,119,6,0.4)]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0a0f1c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
             </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Connexion DAF</h2>
          
          <form className="flex flex-col gap-4">
            <input 
              type="email" placeholder="Email professionnel" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-white rounded-lg p-3 outline-none focus:border-blue-500"
            />
            <input 
              type="password" placeholder="Mot de passe" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-white rounded-lg p-3 outline-none focus:border-blue-500"
            />
            {authError && <p className="text-red-400 text-sm">{authError}</p>}
            <div className="flex gap-3 mt-4">
               <button onClick={handleLogin} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-colors">Connexion</button>
               <button onClick={handleSignUp} className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-lg border border-slate-700">Créer compte</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // --- ECRAN 3 : L'APP COMPLETE (Si connecté) ---
  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white font-sans selection:bg-blue-500/35 pb-20">
      
      <header className="w-full p-6 flex items-center justify-between border-b border-slate-800/60 bg-slate-900/30 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-amber-300 to-amber-600 shadow-[0_0_15px_rgba(217,119,6,0.4)]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0a0f1c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <h1 className="text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 uppercase">
            CLFinance
          </h1>
        </div>
        <div className="flex items-center gap-4">
           <span className="text-sm text-amber-400 font-medium bg-amber-950/40 px-3 py-1 rounded-full border border-amber-800/50">
             Connecté : {session.user.email}
           </span>
           <button onClick={handleLogout} className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-md border border-slate-700 text-slate-300 transition-colors">Déconnexion</button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pt-12">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-blue-400 mb-4 tracking-tight">Agent Pré-Comptable IA</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Vos données sont désormais sauvegardées de manière chiffrée sur votre espace personnel.</p>
        </div>

        <div className="w-full bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-slate-700 rounded-xl hover:border-blue-500 hover:bg-slate-800/50 transition-all cursor-pointer mb-6 group">
            <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
              <svg className="w-12 h-12 mb-3 text-blue-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
              <p className="mb-2 text-sm text-slate-300 font-semibold">{files.length > 0 ? `${files.length} fichier(s) sélectionné(s)` : "Glissez vos factures ici (PDF, JPG, PNG)"}</p>
            </div>
            <input type="file" className="hidden" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} />
          </label>
          <button onClick={handleUploadBatch} disabled={loading || files.length === 0} className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${loading || files.length === 0 ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]'}`}>
            {loading ? (progressText || "Analyse en cours...") : `Lancer l'analyse sécurisée (${files.length} fichiers)`}
          </button>
        </div>

        {results.length > 0 && (
          <div className="mt-10">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${loading ? 'bg-amber-500 animate-ping' : 'bg-green-500'}`}></span>
                  Résultats validés
                </h3>
              </div>
              <button onClick={exportToCSV} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-[0_0_15px_rgba(5,150,105,0.4)] transition-all">
                Télécharger Export CSV
              </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-x-auto shadow-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-800/80 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-700">
                    <th className="p-4">Fichier</th><th className="p-4">Fournisseur</th><th className="p-4">N° Facture</th><th className="p-4">Date</th><th className="p-4">HT</th><th className="p-4">TVA</th><th className="p-4">TTC</th><th className="p-4">Devise</th><th className="p-4">IBAN</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-sm">
                  {results.map((item, index) => {
                    const isMathValid = checkMathConsistency(item.data);
                    return (
                      <tr key={index} className="hover:bg-slate-800/20">
                        <td className="p-4 text-xs truncate max-w-[130px]">{item.filename}</td>
                        {item.status === 'en_attente' ? <td colSpan={8} className="p-4 text-slate-500 italic">⏳ Attente...</td>
                        : !item.data && !item.error ? <td colSpan={8} className="p-4 text-amber-400 font-medium">🔄 Analyse...</td>
                        : item.error ? <td colSpan={8} className="p-4 text-red-400 font-bold">⚠️ Échec : {item.error}</td>
                        : (
                          <>
                            <td className="p-3"><input type="text" value={item.data?.fournisseur || ''} onChange={(e) => handleCellChange(index, 'fournisseur', e.target.value)} className="bg-slate-950/80 border border-slate-700/60 rounded px-2.5 py-1.5 w-full outline-none text-white" /></td>
                            <td className="p-3"><input type="text" value={item.data?.numero_facture || ''} onChange={(e) => handleCellChange(index, 'numero_facture', e.target.value)} className="bg-slate-950/80 border border-slate-700/60 rounded px-2.5 py-1.5 w-full outline-none text-white" /></td>
                            <td className="p-3"><input type="text" value={item.data?.date_emission || ''} onChange={(e) => handleCellChange(index, 'date_emission', e.target.value)} className="bg-slate-950/80 border border-slate-700/60 rounded px-2.5 py-1.5 w-24 outline-none text-white" /></td>
                            <td className="p-3"><input type="text" value={item.data?.montant_ht ?? ''} onChange={(e) => handleCellChange(index, 'montant_ht', e.target.value)} className="bg-slate-950/80 border border-slate-700/60 rounded px-2.5 py-1.5 w-20 outline-none text-white" /></td>
                            <td className="p-3"><input type="text" value={item.data?.tva ?? ''} onChange={(e) => handleCellChange(index, 'tva', e.target.value)} className="bg-slate-950/80 border border-slate-700/60 rounded px-2.5 py-1.5 w-16 outline-none text-white" /></td>
                            <td className="p-3"><input type="text" value={item.data?.montant_ttc ?? ''} onChange={(e) => handleCellChange(index, 'montant_ttc', e.target.value)} className={`bg-slate-950/80 border rounded px-2.5 py-1.5 w-24 outline-none font-bold ${!isMathValid ? 'border-amber-500 text-amber-400' : 'border-slate-700/60 text-emerald-400'}`} /></td>
                            <td className="p-3"><input type="text" value={item.data?.devise || ''} onChange={(e) => handleCellChange(index, 'devise', e.target.value)} className="bg-slate-950/80 border border-slate-700/60 rounded px-2.5 py-1.5 w-16 outline-none text-white" /></td>
                            <td className="p-3"><input type="text" value={item.data?.iban || ''} onChange={(e) => handleCellChange(index, 'iban', e.target.value)} className="bg-slate-950/80 border border-slate-700/60 rounded px-2.5 py-1.5 w-32 text-xs font-mono outline-none text-white" /></td>
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
