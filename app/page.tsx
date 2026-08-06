'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gfzgpsmazicmpzykwsht.supabase.co'; 
const supabaseKey = 'sb_publishable_EC1AjbMq9Uy-EbBA845sZg_4MkqlhzC';
const supabase = createClient(supabaseUrl, supabaseKey);
const BACKEND_URL = "https://agent-backend-0atw.onrender.com";

export default function AgentPreComptableEnterprise() {
  const [activeTab, setActiveTab] = useState<'analyse' | 'historique'>('analyse');
  const [selectedClient, setSelectedClient] = useState("Client par défaut");
  
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) fetchHistory(session.user.id);
    });
  }, []);

  const fetchHistory = async (userId: string) => {
    const { data } = await supabase.from('invoices').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    if (data) setHistory(data);
  };

  // --- LOGIQUE CSV ---
  const exportGroupToCSV = (items: any[], label: string) => {
    const headers = ["Fichier", "Fournisseur", "N° Facture", "Date", "HT", "TVA", "TTC", "Devise", "IBAN"];
    let csv = headers.join(";") + "\n";
    items.forEach(i => {
      csv += [i.filename, i.fournisseur, i.numero_facture, i.date_emission, i.montant_ht, i.tva, i.montant_ttc, i.devise, i.iban].join(";") + "\n";
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Export_${label.replace(/\s+/g, '_')}.csv`;
    a.click();
  };

  // --- LOGIQUE D'ANALYSE ---
  const handleUploadBatch = async () => {
    setLoading(true);
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch(`${BACKEND_URL}/extract-pdf`, { method: 'POST', body: formData });
      const data = await res.json();
      
      if (res.ok) {
        await supabase.from('invoices').insert([{
          ...data.data,
          user_id: (await supabase.auth.getSession()).data.session?.user.id,
          filename: file.name,
          client_name: selectedClient,
          created_at: new Date().toISOString()
        }]);
      }
    }
    fetchHistory((await supabase.auth.getSession()).data.session!.user.id);
    setLoading(false);
    setFiles([]);
    alert("Analyse terminée et classée pour " + selectedClient);
  };

  // --- GROUPEMENT ---
  const groupedData = history.reduce((acc, inv) => {
    const client = inv.client_name || "Sans Client";
    const date = new Date(inv.created_at).toLocaleDateString('fr-FR');
    if (!acc[client]) acc[client] = {};
    if (!acc[client][date]) acc[client][date] = [];
    acc[client][date].push(inv);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-amber-500 mb-8">CLFinance Dashboard</h1>
        
        <div className="flex gap-4 mb-6 border-b border-slate-800">
           <button onClick={() => setActiveTab('analyse')} className={`pb-2 ${activeTab === 'analyse' ? 'border-b-2 border-blue-500 text-blue-400' : ''}`}>Nouvelle Analyse</button>
           <button onClick={() => setActiveTab('historique')} className={`pb-2 ${activeTab === 'historique' ? 'border-b-2 border-blue-500 text-blue-400' : ''}`}>Historique Clients</button>
        </div>

        {activeTab === 'analyse' ? (
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <label className="block mb-2 text-sm text-slate-400">Sélectionner le Client</label>
            <input 
              type="text" 
              className="w-full bg-slate-950 border border-slate-700 p-3 rounded-lg mb-4"
              placeholder="Nom du client (ex: Entreprise A)"
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
            />
            <input type="file" multiple onChange={(e) => setFiles(Array.from(e.target.files || []))} className="mb-4 block" />
            <button onClick={handleUploadBatch} disabled={loading} className="bg-blue-600 px-6 py-3 rounded-lg w-full">
              {loading ? "Analyse..." : `Analyser pour ${selectedClient}`}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedData).map(([client, dates]: any) => (
              <div key={client} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h2 className="text-xl font-bold text-blue-400 mb-4 border-b border-slate-800 pb-2">{client}</h2>
                {Object.entries(dates).map(([date, items]: any) => (
                  <div key={date} className="mb-4 ml-4">
                    <div className="flex justify-between items-center bg-slate-800 p-3 rounded-lg mb-2">
                       <span className="font-semibold text-slate-200">Le {date} ({items.length} factures)</span>
                       <button onClick={() => exportGroupToCSV(items, `${client}_${date}`)} className="text-xs bg-emerald-600 px-3 py-1 rounded">Exporter CSV</button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
