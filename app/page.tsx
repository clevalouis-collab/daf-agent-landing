"use client";

import { useState } from "react";

export default function Home() {
  const [invoiceText, setInvoiceText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleExtract = async () => {
    if (!invoiceText) return;
    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      // C'EST ICI LE PONT VERS TON CERVEAU IA (RENDER)
      const response = await fetch("https://agent-backend-0atw.onrender.com/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text_content: invoiceText }),
      });

      if (!response.ok) throw new Error("Erreur de communication avec l'API");
      
      const data = await response.json();
      setResult(data.data); // On récupère les données IA
    } catch (err) {
      setError("Le serveur IA est en train de démarrer ou est inaccessible. Réessayez dans 10 secondes.");
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
            Collez le texte brut de votre facture. Notre IA (MVP) extrait les données instantanément pour validation.
          </p>
        </div>

        {/* ZONE DE SAISIE */}
        <div className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700">
          <textarea
            className="w-full h-48 bg-slate-900 border border-slate-600 rounded-xl p-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="Exemple : Facture 2024-08, Fournisseur : TechCorp SAS, Montant total : 1200€ TTC, TVA 200€..."
            value={invoiceText}
            onChange={(e) => setInvoiceText(e.target.value)}
          ></textarea>
          
          <button
            onClick={handleExtract}
            disabled={isLoading || !invoiceText}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold py-3 px-6 rounded-xl transition-all"
          >
            {isLoading ? "Extraction IA en cours..." : "Lancer l'analyse"}
          </button>
        </div>

        {/* AFFICHAGE DES RÉSULTATS (HUMAN-IN-THE-LOOP) */}
        {error && <p className="text-red-400 text-center">{error}</p>}
        
        {result && (
          <div className="bg-emerald-900/30 border border-emerald-500/50 p-6 rounded-2xl animate-fade-in">
            <h2 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
              ✓ Extraction réussie (En attente de validation DAF)
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
              Valider et envoyer à l'ERP (Démo)
            </button>
          </div>
        )}
        
      </div>
    </div>
  );
}
