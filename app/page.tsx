'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// --- CONFIGURATION SUPABASE ---
const supabaseUrl = 'https://gfzgpsmazicmpzykwsht.supabase.co'; 
const supabaseKey = 'sb_publishable_EC1AjbMq9Uy-EbBA845sZg_4MkqlhzC';
const supabase = createClient(supabaseUrl, supabaseKey);

const BACKEND_URL = "https://agent-backend-0atw.onrender.com";

export default function AgentPreComptableEnterprise() {
  const [activeTab, setActiveTab] = useState<'analyse' | 'historique'>('analyse');
  
  // États de l'analyse
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [progressText, setProgressText] = useState("");
  const [results, setResults] = useState<any[]>([]);
  
  // État de l'historique et des dossiers
  const [history, setHistory] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});
  
  // États d'authentification
  const [session, setSession] = useState<any>(null);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  // --- INITIALISATION & AUTHENTIFICATION ---
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
      if (session) fetchHistory(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchHistory(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  // --- FONCTION POUR RECUPERER L'HISTORIQUE ---
  const fetchHistory = async (userId: string) => {
    setLoadingHistory(true);
    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false }); // Trie du plus récent au plus ancien
    
    if (data) {
      setHistory(data);
    }
    setLoadingHistory(false);
  };

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

  // --- LOGIQUE D'ANALYSE ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files) as File[];
      setFiles(selectedFiles);
      setResults([]);
    }
  };

  const handleUploadBatch = async () => {
    if (files.length === 0) return;
    setLoading(true);
    
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

        // Sauvegarde en base
        if (response.ok && data.data && session?.user?.id) {
           const newInvoice = {
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
              created_at: new Date().toISOString(), // On force l'heure exacte de l'analyse
            };
           await supabase.from('invoices').insert([newInvoice]);
           // On met à jour l'historique en direct
           fetchHistory(session.user.id);
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

  // --- LOGIQUE DES DOSSIERS DE DATE ---
  const groupHistoryByDate = (historyArray: any[]) => {
    const groups: Record<string, any[]> = {};
    historyArray.forEach(item => {
      // Si la date d'analyse n'existe pas, on prend la date du jour par défaut
      const dateObj = item.created_at ? new Date(item.created_at) : new Date();
      // On formate la date en beau français (ex: "jeudi 6 août 2026")
      const dateKey = dateObj.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(item);
    });
    return groups;
  };

  const toggleFolder = (dateKey: string) => {
    setOpenFolders(prev => ({ ...prev, [dateKey]: prev[dateKey] === false ? true : false }));
  };

  const groupedHistory = groupHistoryByDate(history);

  // --- ECRAN 1 : CHARGEMENT INITIAL ---
  if (authLoading) return <div className="min-h-screen bg-[#0a0f1c] flex items-center justify-center text-blue-400 font-bold">Chargement de l'espace sécurisé...</div>;

  // --- ECRAN 2 : CONNEXION ---
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
            <input type="email" placeholder="Email professionnel" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} className="bg-slate-950 border border-slate-700 text-white rounded-lg p-3 outline-none focus:border-blue-500" />
            <input type="password" placeholder="Mot de passe" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} className="bg-slate-950 border border-slate-700 text-white rounded-lg p-3 outline-none focus:border-blue-500" />
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

  // --- ECRAN 3 : L'APPLICATION ---
  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white font-sans selection:bg-blue-500/35 pb-20">
      
      {/* HEADER */}
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

      {/* NAVIGATION (ONGLETS) */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="flex space-x-4 border-b border-slate-800 pb-px">
          <button 
            onClick={() => setActiveTab('analyse')}
            className={`py-3 px-6 text-sm font-bold border-b-2 transition-colors ${activeTab === 'analyse' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
          >
            Nouvelle Analyse IA
          </button>
          <button 
            onClick={() => setActiveTab('historique')}
            className={`py-3 px-6 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'historique' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
          >
            Mon Historique
            <span className="bg-slate-800 text-slate-300 py-0.5 px-2 rounded-full text-xs">{history.length}</span>
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 pt-8">
        
        {/* ONGLET 1 : ANALYSE */}
        {activeTab === 'analyse' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Agent Pré-Comptable</h2>
              <p className="text-slate-400 max-w-xl mx-auto">Glissez vos factures pour extraire les données. Elles seront automatiquement sauvegardées.</p>
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
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${loading ? 'bg-amber-500 animate-ping' : 'bg-green-500'}`}></span>
                  Résultats immédiats
                </h3>
                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-x-auto shadow-2xl">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-800/80 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-700">
                        <th className="p-4">Fichier</th><th className="p-4">Fournisseur</th><th className="p-4">N° Facture</th><th className="p-4">Date Em.</th><th className="p-4">HT</th><th className="p-4">TVA</th><th className="p-4">TTC</th><th className="p-4">Devise</th><th className="p-4">IBAN</th>
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
          </div>
        )}

        {/* ONGLET 2 : HISTORIQUE AVEC DOSSIERS DEROULANTS */}
        {activeTab === 'historique' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-end mb-6">
               <div>
                 <h2 className="text-2xl font-bold text-white mb-2">Historique des analyses</h2>
                 <p className="text-slate-400 text-sm">Vos extractions classées par date de traitement.</p>
               </div>
            </div>

            {loadingHistory ? (
              <div className="p-10 text-center text-slate-500 bg-slate-900 border border-slate-800 rounded-2xl">Chargement de vos dossiers...</div>
            ) : Object.keys(groupedHistory).length === 0 ? (
              <div className="p-10 text-center text-slate-500 bg-slate-900 border border-slate-800 rounded-2xl">Aucune facture dans votre historique pour le moment.</div>
            ) : (
              <div className="space-y-4">
                {Object.keys(groupedHistory).map(dateKey => {
                  const isOpen = openFolders[dateKey] !== false; // Ouvert par défaut
                  const items = groupedHistory[dateKey];
                  
                  return (
                    <div key={dateKey} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                      {/* En-tête du dossier (cliquable) */}
                      <button 
                        onClick={() => toggleFolder(dateKey)} 
                        className="w-full flex items-center justify-between p-4 bg-slate-800/50 hover:bg-slate-800 transition-colors border-b border-slate-700/50"
                      >
                        <div className="flex items-center gap-3">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                            <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>
                          </svg>
                          <span className="font-bold text-white capitalize">{dateKey}</span>
                          <span className="bg-blue-900/50 border border-blue-800/50 text-blue-300 py-0.5 px-2.5 rounded-full text-xs font-semibold">
                            {items.length} facture{items.length > 1 ? 's' : ''}
                          </span>
                        </div>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                          <path d="m6 9 6 6 6-6"/>
                        </svg>
                      </button>
                      
                      {/* Contenu du dossier (le tableau) */}
                      {isOpen && (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-800">
                                <th className="p-4 w-20">Heure</th>
                                <th className="p-4">Fichier</th>
                                <th className="p-4">Fournisseur</th>
                                <th className="p-4">N° Facture</th>
                                <th className="p-4">Date Em.</th>
                                <th className="p-4">HT</th>
                                <th className="p-4">TVA</th>
                                <th className="p-4">TTC</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60 text-sm text-slate-300">
                              {items.map((invoice, index) => {
                                const time = invoice.created_at ? new Date(invoice.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : '-';
                                return (
                                  <tr key={index} className="hover:bg-slate-800/40 transition-colors">
                                    <td className="p-4 font-mono text-xs text-slate-500">{time}</td>
                                    <td className="p-4 truncate max-w-[150px] text-xs text-slate-400">{invoice.filename}</td>
                                    <td className="p-4 font-medium text-white">{invoice.fournisseur || '-'}</td>
                                    <td className="p-4 text-amber-100">{invoice.numero_facture || '-'}</td>
                                    <td className="p-4">{invoice.date_emission ? new Date(invoice.date_emission).toLocaleDateString() : '-'}</td>
                                    <td className="p-4">{invoice.montant_ht ? `${invoice.montant_ht} ${invoice.devise || '€'}` : '-'}</td>
                                    <td className="p-4 text-slate-500">{invoice.tva || '-'}</td>
                                    <td className="p-4 font-bold text-emerald-400">{invoice.montant_ttc ? `${invoice.montant_ttc} ${invoice.devise || '€'}` : '-'}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
