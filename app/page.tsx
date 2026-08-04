"use client";

import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError("");
      setData(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setError("");
    setData(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://agent-backend-0atw.onrender.com/extract-pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || "Erreur de communication avec le serveur IA.");
      }

      const result = await response.json();
      setData(result.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 flex flex-col items-center py-12 px-4 font-sans">
      <div className="max-w-3xl w-full space-y-8">
        
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            Agent Pré-Comptable IA
          </h1>
          <p className="text-slate-400 text-lg">
            Glissez ou sélectionnez votre facture (PDF). L'agent extrait les données clés pour validation instantanée.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-800/50 transition-colors relative">
            <input 
              type="file" 
              accept=".pdf" 
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {file ? (
              <>
                <FileText className="w-12 h-12 text-blue-400 mb-4" />
                <p className="text-lg font-semibold text-slate-200">{file.name}</p>
                <p className="text-sm text-slate-500 mt-1">Cliquez pour changer de fichier</p>
              </>
            ) : (
              <>
                <Upload className="w-12 h-12 text-slate-500 mb-4" />
                <p className="text-lg font-medium text-slate-300">Sélectionnez une facture au format PDF</p>
                <p className="text-sm text-slate-500 mt-1">Formats acceptés : PDF uniquement</p>
              </>
            )}
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!file || loading}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 text-lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Analyse IA en cours...
              </>
            ) : (
              "Lancer l'analyse du document"
            )}
          </button>
        </div>

        {error && (
          <div className="bg-red-950/50 border border-red-900 text-red-400 p-4 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-6 h-6 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* AFFICHAGE COMPLET DE TOUTES LES INFOS DAF */}
        {data && (
          <div className="bg-green-950/20 border border-green-800/50 rounded-2xl p-6 animate-in fade-in duration-300 space-y-4">
            <div className="flex items-center gap-2 text-green-400 border-b border-green-900/50 pb-4">
              <CheckCircle2 className="w-6 h-6" />
              <h2 className="text-xl font-bold">Document analysé (En attente de validation DAF)</h2>
            </div>
            
            {/* Ligne 1 : Fournisseur & N° Facture & Date */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Fournisseur</p>
                <p className="text-base font-bold text-slate-100">{data.fournisseur || "N/A"}</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">N° de Facture</p>
                <p className="text-base font-medium text-slate-200">{data.numero_facture || "N/A"}</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Date d'émission</p>
                <p className="text-base font-medium text-slate-200">{data.date_emission || "N/A"}</p>
              </div>
            </div>

            {/* Ligne 2 : Montants HT, TVA, TTC */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Montant HT</p>
                <p className="text-lg font-bold text-slate-200">{data.montant_ht} €</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">TVA</p>
                <p className="text-lg font-medium text-slate-400">{data.tva} €</p>
              </div>
              <div className="bg-blue-950/40 p-4 rounded-xl border border-blue-900/50">
                <p className="text-xs text-blue-400 uppercase tracking-wider mb-1">Montant TTC</p>
                <p className="text-xl font-black text-white">{data.montant_ttc} €</p>
              </div>
            </div>

            {/* Ligne 3 : IBAN */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Coordonnées Bancaires (IBAN)</p>
              <p className="text-base font-mono text-slate-300">{data.iban || "N/A"}</p>
            </div>

            <button className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg text-lg">
              Valider et injecter dans l'ERP
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
