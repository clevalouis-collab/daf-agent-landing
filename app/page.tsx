'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gfzgpsmazicmpzykwsht.supabase.co'; 
const supabaseKey = 'sb_publishable_EC1AjbMq9Uy-EbBA845sZg_4MkqlhzC';
const supabase = createClient(supabaseUrl, supabaseKey);
const BACKEND_URL = "https://agent-backend-0atw.onrender.com";

const BLOG_ARTICLES = [
  {
    id: 1,
    title: "Guide d'utilisation : Comment exploiter tout le potentiel de CLFinance AI",
    date: "7 août 2026",
    category: "Onboarding & Tutoriel",
    readTime: "4 min",
    summary: "Manuel complet pour prendre en main l'agent pré-comptable, organiser vos clients et automatiser vos factures fournisseurs.",
    content: `Bienvenue sur CLFinance AI. Ce guide complet vous accompagne pas à pas pour exploiter 100% de la puissance de votre agent pré-comptable et automatiser le traitement de vos factures fournisseurs.\n\nÉtape 1 : Organiser vos dossiers clients\nDans l'onglet "Historique Clients", chaque entreprise ou client dispose de son propre espace étanche. Lors de votre première analyse, sélectionnez ou créez un nouveau client pour associer directement les factures au bon dossier.\n\nÉtape 2 : Le glisser-déposer intelligent (Batch Upload)\nRendez-vous sur l'onglet "Nouvelle Analyse IA". Vous pouvez glisser simultanément plusieurs fichiers (PDF, JPG ou PNG). Le moteur analyse chaque document en quelques secondes et extrait automatiquement : le fournisseur, le numéro de facture, la date d'émission, le montant HT, la TVA, le montant TTC, la devise et l'IBAN.\n\nÉtape 3 : Le contrôle et la validation (Human-in-the-Loop)\nLe tableau de résultats instantanés vous permet de modifier directement n'importe quelle cellule en cas de scan flou ou d'erreur de lecture. Une alerte visuelle vous prévient si le calcul mathématique (HT + TVA = TTC) nécessite votre attention.\n\nÉtape 4 : L'exportation comptable\nEn un clic sur le bouton vert "CSV" de chaque dossier ou date, téléchargez un fichier tabulaire structuré et prêt à être injecté dans votre logiciel de comptabilité ou transmis à votre expert-comptable.`
  },
  {
    id: 2,
    title: "Pourquoi utiliser l'IA en pré-comptabilité a une vraie valeur ajoutée (Exemple chiffré)",
    date: "7 août 2026",
    category: "Optimisation & ROI",
    readTime: "3 min",
    summary: "Découvrez le calcul exact des économies réalisées par une entreprise en automatisant le traitement de ses factures fournisseurs.",
    content: `La saisie manuelle des factures est la tâche la plus chronophage des directions financières. Entre les erreurs de frappe, les retards de validation et le temps perdu à classer des fichiers, le coût réel pour une entreprise est colossal.\n\nLe calcul de l'impact (Le ROI de l'agent IA) :\nPrenons une PME standard qui traite environ 200 factures par mois.\n- En mode manuel (Humain) : 5 minutes par facture (ouverture, lecture, saisie, vérification TVA). Soit 16,6 heures de travail par mois. Coût estimé : 498 € / mois (base 30€/h chargée).\n- Avec CLFinance AI : 3 secondes d'analyse IA + 30 secondes de validation par l'humain. Soit moins de 2 heures par mois. Coût réel : 60 € / mois.\n\nLa vraie valeur ajoutée :\n1. Économie financière directe : Plus de 430 € économisés chaque mois uniquement sur la saisie (plus de 5 000 € par an).\n2. Zéro erreur humaine : Les schémas d'extraction stricts éliminent les confusions de chiffres et sécurisent la TVA.\n3. Focus sur le conseil : Le DAF ou le comptable quitte les tâches ingrates pour se consacrer à l'analyse de la marge et de la trésorerie.`
  },
  {
    id: 3,
    title: "L'IA va-t-elle remplacer les comptables ? La vérité sur le rôle du DAF augmenté",
    date: "5 août 2026",
    category: "Réassurance & Avenir",
    readTime: "4 min",
    summary: "Entre fantasmes et réalité du terrain : pourquoi l'intelligence artificielle est le meilleur copilote du comptable et non son remplaçant.",
    content: `C'est la peur numéro un lorsqu'on évoque l'intelligence artificielle dans les cabinets d'expertise comptable ou les directions financières : "Est-ce que l'IA va remplacer mon poste ?". La réponse claire et cash est : non.\n\nCe que l'IA fait parfaitement (et qu'on déteste faire) :\nL'IA excelle dans la répétition : lire un PDF de travers, extraire une date, repérer un numéro de TVA intracommunautaire, aligner des chiffres dans un tableau. C'est de la machinerie pure et rapide.\n\nCe que l'IA ne fera jamais (et où l'humain est irplaçable) :\n- Le jugement stratégique : Analyser pourquoi un fournisseur a augmenté ses tarifs de 15% ce trimestre.\n- La relation client : Discuter de la santé financière de l'entreprise avec le dirigeant.\n- La validation finale (Human-in-the-Loop) : Même ultra-performante, l'IA propose, mais c'est le comptable ou le DAF qui valide l'écriture avant l'export définitif.\n\nConclusion : L'IA ne remplace pas le comptable. En revanche, le comptable qui utilise l'IA remplacera celui qui ne l'utilise pas.`
  },
  {
    id: 4,
    title: "Précision et conformité : Comment l'IA moderne élimine les erreurs de TVA",
    date: "2 août 2026",
    category: "Performance & Sécurité",
    readTime: "3 min",
    summary: "Fini les hallucinations des anciennes IA. Découvrez comment les schémas de données stricts garantissent une fiabilité de 99,9% sur vos factures.",
    content: `Pendant longtemps, les outils d'OCR traditionnels décevaient. Ils confondaient un 8 et un 0, mélangeaient le HT et le TTC, ou rataient la TVA sur des factures mal scannées. Résultat : une vérification manuelle quasi-intégrale était requise.\n\nLa rupture technologique des modèles actuels :\nLes nouvelles architectures comprennent le contexte sémantique du document financier grâce à des modèles de pointe comme Gemini Flash.\n\nL'apport des structures strictes :\nSur CLFinance AI, le moteur est configuré pour interdire toute approximation. Si l'addition (HT + TVA) ne correspond pas au TTC, l'application alerte immédiatement l'utilisateur pour garantir une conformité fiscale irréprochable.`
  },
  {
    id: 5,
    title: "Le cauchemar des factures fournisseurs en vrac : comment y mettre fin définitivement",
    date: "30 juillet 2026",
    category: "Gestion Opérationnelle",
    readTime: "4 min",
    summary: "Entre les reçus froissés en JPEG, les PDF reçus sur des bruits de couloir et les notes de frais éparpillées, voici la méthode pour centraliser vos achats.",
    content: `Le traitement des factures fournisseurs est souvent le parent pauvre de la numérisation des entreprises. Alors que les factures clients sont lissées, les achats arrivent de partout : boîtes mail personnelles, portails fournisseurs, reçus de taxi en photo.\n\nCentraliser sans effort :\nGrâce à l'interface multi-clients de CLFinance AI, vous glissez tout au même endroit, quel que soit le format (PDF, PNG, JPG). L'intelligence artificielle normalise instantanément le bazar organisationnel en un flux de données propre, trié par client et par date.`
  },
  {
    id: 6,
    title: "Sécurité et confidentialité des données financières : ce que garantit une architecture moderne",
    date: "28 juillet 2026",
    category: "Sécurité & RGPD",
    readTime: "5 min",
    summary: "IBAN, montants, noms de fournisseurs : la protection des données sensibles est la pierre angulaire de notre infrastructure cloud.",
    content: `Lorsqu'on traite des données comptables et des IBAN bancaires, la sécurité n'est pas négociable. Chaque entreprise est en droit de exiger une étanchéité parfaite de ses flux.\n\nIsolation et chiffrement :\nGrâce à une authentification rigoureuse et une base de données relationnelle sécurisée (Supabase), chaque utilisateur ne voit que ses propres données et celles des clients qui lui sont rattachés. Les flux d'analyse transite de manière chiffrée, garantissant un respect total des normes de confidentialité professionnelles.`
  },
  {
    id: 7,
    title: "Comment automatiser le rapprochement des factures d'achats pour gagner 15h par mois",
    date: "24 juillet 2026",
    category: "Productivité",
    readTime: "3 min",
    summary: "Passez d'une saisie ligne par ligne à un contrôle global. Guide pratique pour alléger la charge de travail de vos équipes administratives.",
    content: `Quinze heures par mois, c'est le volume horaire moyen gaspillé par une équipe administrative de taille modeste à recopier des numéros de factures et des montants dans des tableurs.\n\nLe basculement vers l'automatisation :\nEn déléguant la lecture brute à l'agent IA, votre équipe passe d'un rôle de "saisisseur de données" à un rôle de "contrôleur qualité". Le gain de temps se traduit immédiatement par une baisse du stress de fin de mois et une accélération de la clôture comptable.`
  },
  {
    id: 8,
    title: "Cabinets d'expertise comptable : comment scaler votre portefeuille clients sans recruter",
    date: "20 juillet 2026",
    category: "Stratégie Cabinet",
    readTime: "4 min",
    summary: "La pénurie de talents dans les métiers du chiffre pousse les cabinets à automatiser les tâches répétitives pour absorber plus de mandats.",
    common: "Cabinet",
    content: `Le modèle traditionnel des cabinets d'expertise comptable repose sur une équation simple : plus vous avez de clients, plus vous devez embaucher de collaborateurs pour la saisie.\n\nBriser l'équation linéaire :\nEn équipant vos collaborateurs d'un outil de pré-comptabilité instantané par IA, la productivité par collaborateur est multipliée par trois. Vous pouvez ainsi accepter de nouveaux clients TPE/PME sans alourdir votre masse salariale ni rogner sur vos marges.`
  },
  {
    id: 9,
    title: "La fin du fichier Excel manuel : l'ère de l'export CSV instantané et structuré",
    date: "15 juillet 2026",
    category: "Outils & Intégration",
    readTime: "3 min",
    summary: "Pourquoi les exports tabulaires sur-mesure facilitent la transition vers les logiciels comptables de nouvelle génération.",
    content: `Le tableur Excel reste l'outil universel de la comptabilité, mais le remplir à la main est une hérésie moderne. \n\nL'export ciblé par dossier :\nAvec la génération de CSV par lot ou par date proposée par CLFinance AI, vous obtenez en un clic un fichier parfaitement formaté (séparateurs, colonnes HT, TVA, TTC, IBAN) prêt à être injecté partout. Fini les erreurs de copier-coller de cellules.`
  },
  {
    id: 10,
    title: "L'avenir de la DAF augmentée à l'horizon 2030 : de la saisie à la stratégie financière",
    date: "10 juillet 2026",
    category: "Vision & Avenir",
    readTime: "5 min",
    summary: "Analyse prospective sur l'évolution du métier de Directeur Administratif et Financier à l'ère de l'intelligence artificielle générale.",
    content: `À mesure que les tâches administratives et la saisie des factures fournisseurs s'automatisent totalement, le rôle du DAF subit une métamorphose profonde.\n\nDu rétroviseur au pare-brise :\nLe DAF de demain ne passe plus son temps à regarder le passé pour justifier des chiffres de l'an dernier. Déchargé de la charge opérationnelle, il devient le véritable co-pilote stratégique du CEO, focalisé sur l'optimisation du cash-flow, la gestion des risques et la croissance externe.`
  }
];

export default function AgentPreComptableEnterprise() {
  const [activeTab, setActiveTab] = useState<'analyse' | 'historique' | 'blog'>('analyse');
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [selectedClient, setSelectedClient] = useState("");
  const [customClient, setCustomClient] = useState("");
  const [filterClient, setFilterClient] = useState("TOUS");
  
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [progressText, setProgressText] = useState("");
  const [results, setResults] = useState<any[]>([]);
  
  const [history, setHistory] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});
  
  const [session, setSession] = useState<any>(null);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

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

  const fetchHistory = async (userId: string) => {
    setLoadingHistory(true);
    const { data } = await supabase.from('invoices').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    if (data) {
      setHistory(data);
      const uniqueClients = Array.from(new Set(data.map(i => i.client_name).filter(Boolean)));
      if (uniqueClients.length > 0 && !selectedClient) setSelectedClient(uniqueClients[0] as string);
    }
    setLoadingHistory(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true); setAuthError(null);
    const { error } = await supabase.auth.signInWithPassword({ email: authEmail, password: authPassword });
    if (error) setAuthError(error.message);
    setAuthLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true); setAuthError(null);
    const { error } = await supabase.auth.signUp({ email: authEmail, password: authPassword });
    if (error) setAuthError(error.message);
    setAuthLoading(false);
  };

  const handleLogout = async () => { await supabase.auth.signOut(); };

  const existingClients = Array.from(new Set(history.map(item => item.client_name).filter(Boolean)));
  const getActiveClientName = () => selectedClient === "AUTRE" ? customClient.trim() : (selectedClient || existingClients[0] || "Client par défaut");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files) as File[]);
      setResults([]);
    }
  };

  const handleUploadBatch = async () => {
    const finalClient = getActiveClientName();
    if (files.length === 0 || !finalClient) {
      alert("Veuillez sélectionner ou saisir un nom de client valide.");
      return;
    }
    setLoading(true);
    setResults(files.map(file => ({ filename: file.name, status: 'en_attente' })));

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setProgressText(`Analyse du document ${i + 1} sur ${files.length} (${file.name})...`);
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch(`${BACKEND_URL}/extract-pdf`, { method: 'POST', body: formData });
        const data = await response.json();

        setResults(prev => {
          const updated = [...prev];
          updated[i] = !response.ok ? { filename: file.name, error: data.detail || "Erreur d'analyse" } : data;
          return updated;
        });

        if (response.ok && data.data && session?.user?.id) {
           await supabase.from('invoices').insert([{
              user_id: session.user.id,
              filename: file.name,
              client_name: finalClient,
              fournisseur: data.data.fournisseur,
              numero_facture: data.data.numero_facture,
              date_emission: data.data.date_emission ? new Date(data.data.date_emission).toISOString() : null,
              montant_ht: data.data.montant_ht,
              tva: data.data.tva,
              montant_ttc: data.data.montant_ttc,
              devise: data.data.devise,
              iban: data.data.iban,
              created_at: new Date().toISOString(),
           }]);
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
    const updated = [...results];
    if (updated[index]?.data) {
      updated[index].data[field] = value;
      setResults(updated);
    }
  };

  const checkMathConsistency = (data: any) => {
    if (!data || data.montant_ht == null || data.montant_ttc == null) return true;
    const ht = parseFloat(data.montant_ht) || 0, tva = parseFloat(data.tva) || 0, ttc = parseFloat(data.montant_ttc) || 0;
    return ttc === 0 || Math.abs((ht + tva) - ttc) < 0.1;
  };

  const exportGroupToCSV = (items: any[], label: string) => {
    const headers = ["Fichier", "Fournisseur", "N° Facture", "Date", "HT", "TVA", "TTC", "Devise", "IBAN"];
    let csvContent = "data:text/csv;charset=utf-8," + headers.join(";") + "\n";
    items.forEach(item => {
      csvContent += [item.filename, `"${item.fournisseur || ''}"`, `"${item.numero_facture || ''}"`, item.date_emission || '', item.montant_ht || '', item.tva || '', item.montant_ttc || '', item.devise || '', item.iban || ''].join(";") + "\n";
    });
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `export_${label.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
  };

  const groupHistory = () => {
    const clientsMap: Record<string, Record<string, any[]>> = {};
    const filtered = filterClient === "TOUS" ? history : history.filter(item => item.client_name === filterClient);

    filtered.forEach(item => {
      const client = item.client_name || "Client par défaut";
      const dateKey = new Date(item.created_at || Date.now()).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      if (!clientsMap[client]) clientsMap[client] = {};
      if (!clientsMap[client][dateKey]) clientsMap[client][dateKey] = [];
      clientsMap[client][dateKey].push(item);
    });
    return clientsMap;
  };

  const toggleFolder = (key: string) => setOpenFolders(prev => ({ ...prev, [key]: !prev[key] }));

  if (authLoading) return <div className="min-h-screen bg-[#0a0f1c] flex items-center justify-center text-blue-400 font-bold">Chargement de l'espace sécurisé...</div>;

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
          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
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

  const groupedHistory = groupHistory();
  const activeClientFinal = getActiveClientName();

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white font-sans selection:bg-blue-500/35 pb-20">
      <header className="w-full p-6 flex items-center justify-between border-b border-slate-800/60 bg-slate-900/30 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-amber-300 to-amber-600 shadow-[0_0_15px_rgba(217,119,6,0.4)]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0a0f1c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <h1 className="text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 uppercase">CLFinance AI</h1>
        </div>
        <div className="flex items-center gap-4">
           <span className="text-sm text-amber-400 font-medium bg-amber-950/40 px-3 py-1 rounded-full border border-amber-800/50">Connecté : {session.user.email}</span>
           <button onClick={handleLogout} className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-md border border-slate-700 text-slate-300 transition-colors">Déconnexion</button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="flex space-x-4 border-b border-slate-800 pb-px">
          <button onClick={() => { setActiveTab('analyse'); setSelectedArticle(null); }} className={`py-3 px-6 text-sm font-bold border-b-2 transition-colors ${activeTab === 'analyse' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>Nouvelle Analyse IA</button>
          <button onClick={() => { setActiveTab('historique'); setSelectedArticle(null); }} className={`py-3 px-6 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'historique' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
            Historique Clients <span className="bg-slate-800 text-slate-300 py-0.5 px-2 rounded-full text-xs">{history.length}</span>
          </button>
          <button onClick={() => { setActiveTab('blog'); setSelectedArticle(null); }} className={`py-3 px-6 text-sm font-bold border-b-2 transition-colors ${activeTab === 'blog' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>Blog & Guide</button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 pt-8">
        {activeTab === 'analyse' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">L'Agent Pré-Comptable Intelligent</h2>
              <p className="text-slate-400 max-w-xl mx-auto">Sélectionnez le client, glissez vos factures fournisseurs, et l'IA s'occupe du reste.</p>
            </div>

            <div className="w-full bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl">
              <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Client concerné :</label>
                  <select value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white outline-none focus:border-blue-500 font-medium">
                    {existingClients.length === 0 && <option value="Client par défaut">Client par défaut</option>}
                    {existingClients.map((c: any) => <option key={c} value={c}>{c}</option>)}
                    <option value="AUTRE">+ Ajouter un nouveau client...</option>
                  </select>
                </div>
                {(selectedClient === "AUTRE" || existingClients.length === 0) && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Nom du nouveau client :</label>
                    <input type="text" value={customClient} onChange={(e) => setCustomClient(e.target.value)} placeholder="Ex: Entreprise Dupont" className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white outline-none focus:border-blue-500 font-medium" />
                  </div>
                )}
              </div>

              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-700 rounded-xl hover:border-blue-500 hover:bg-slate-800/50 transition-all cursor-pointer mb-6 group">
                <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                  <svg className="w-10 h-10 mb-2 text-blue-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                  <p className="text-sm text-slate-300 font-semibold">{files.length > 0 ? `${files.length} fichier(s) sélectionné(s)` : "Glissez vos factures fournisseurs ici (PDF, JPG, PNG)"}</p>
                </div>
                <input type="file" className="hidden" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} />
              </label>

              <button onClick={handleUploadBatch} disabled={loading || files.length === 0} className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${loading || files.length === 0 ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]'}`}>
                {loading ? (progressText || "Analyse en cours...") : `Lancer l'analyse pour "${activeClientFinal}" (${files.length} fichiers)`}
              </button>
            </div>

            {results.length > 0 && (
              <div className="mt-10">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${loading ? 'bg-amber-500 animate-ping' : 'bg-green-500'}`}></span> Résultats instantanés
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

        {activeTab === 'historique' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Historique par Client</h2>
                <p className="text-slate-400 text-sm">Filtrez par client pour afficher uniquement ses documents.</p>
              </div>
              <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-2 rounded-xl">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider pl-2">Filtrer :</span>
                <select value={filterClient} onChange={(e) => setFilterClient(e.target.value)} className="bg-slate-950 border border-slate-700 text-white rounded-lg px-3 py-1.5 text-sm outline-none focus:border-blue-500">
                  <option value="TOUS">Tous les clients</option>
                  {existingClients.map((c: any) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {loadingHistory ? (
              <div className="p-10 text-center text-slate-500 bg-slate-900 border border-slate-800 rounded-2xl">Chargement de l'historique...</div>
            ) : Object.keys(groupedHistory).length === 0 ? (
              <div className="p-10 text-center text-slate-500 bg-slate-900 border border-slate-800 rounded-2xl">Aucune facture trouvée pour ce filtre.</div>
            ) : (
              <div className="space-y-8">
                {Object.entries(groupedHistory).map(([clientName, datesMap]) => (
                  <div key={clientName} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                    <h3 className="text-xl font-bold text-amber-400 mb-4 pb-3 border-b border-slate-800 flex items-center gap-3">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> {clientName}
                    </h3>
                    <div className="space-y-4 pl-2 sm:pl-6">
                      {Object.entries(datesMap).map(([dateKey, items]) => {
                        const folderKey = `${clientName}_${dateKey}`;
                        const isOpen = openFolders[folderKey] !== false;
                        return (
                          <div key={dateKey} className="bg-slate-950/60 border border-slate-800 rounded-xl overflow-hidden">
                            <button onClick={() => toggleFolder(folderKey)} className="w-full flex items-center justify-between p-4 bg-slate-800/40 hover:bg-slate-800 transition-colors">
                              <div className="flex items-center gap-3">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg>
                                <span className="font-semibold text-white capitalize">{dateKey}</span>
                                <span className="bg-blue-950 text-blue-400 border border-blue-900 py-0.5 px-2.5 rounded-full text-xs font-semibold">{items.length} facture{items.length > 1 ? 's' : ''}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <button onClick={(e) => { e.stopPropagation(); exportGroupToCSV(items, `${clientName}_${dateKey}`); }} className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shadow">CSV</button>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
                              </div>
                            </button>
                            {isOpen && (
                              <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse text-sm">
                                  <thead>
                                    <tr className="bg-slate-900 text-slate-400 text-xs uppercase tracking-wider border-t border-b border-slate-800">
                                      <th className="p-3 w-20">Heure</th><th className="p-3">Fichier</th><th className="p-3">Fournisseur</th><th className="p-3">N° Facture</th><th className="p-3">Date Em.</th><th className="p-3">HT</th><th className="p-3">TVA</th><th className="p-3">TTC</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-900 text-slate-300">
                                    {items.map((inv, idx) => (
                                      <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                                        <td className="p-3 font-mono text-xs text-slate-500">{inv.created_at ? new Date(inv.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : '-'}</td>
                                        <td className="p-3 truncate max-w-[130px] text-xs text-slate-400">{inv.filename}</td>
                                        <td className="p-3 font-medium text-white">{inv.fournisseur || '-'}</td>
                                        <td className="p-3 text-amber-100">{inv.numero_facture || '-'}</td>
                                        <td className="p-3">{inv.date_emission ? new Date(inv.date_emission).toLocaleDateString() : '-'}</td>
                                        <td className="p-3">{inv.montant_ht ? `${inv.montant_ht} ${inv.devise || '€'}` : '-'}</td>
                                        <td className="p-3 text-slate-500">{inv.tva || '-'}</td>
                                        <td className="p-3 font-bold text-emerald-400">{inv.montant_ttc ? `${inv.montant_ttc} ${inv.devise || '€'}` : '-'}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'blog' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
            {!selectedArticle ? (
              <div>
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold text-white mb-2">Ressources & Guide d'Utilisation</h2>
                  <p className="text-slate-400">Tout comprendre sur l'automatisation comptable et la prise en main de l'outil.</p>
                </div>
                <div className="space-y-4">
                  {BLOG_ARTICLES.map((article) => (
                    <div key={article.id} onClick={() => setSelectedArticle(article)} className="bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-6 shadow-xl transition-all cursor-pointer group">
                      <div className="flex items-center justify-between text-xs text-amber-400 font-semibold uppercase tracking-wider mb-2">
                        <span>{article.category}</span>
                        <span className="text-slate-500">{article.date} • {article.readTime}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2">{article.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{article.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
                <button onClick={() => setSelectedArticle(null)} className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2 mb-4">← Retour aux articles</button>
                <div className="flex items-center gap-3 text-xs text-amber-400 font-semibold uppercase tracking-wider">
                  <span>{selectedArticle.category}</span><span>•</span><span>{selectedArticle.date}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">{selectedArticle.title}</h2>
                <div className="text-slate-300 space-y-4 leading-relaxed whitespace-pre-line text-sm sm:text-base border-t border-slate-800 pt-6">
                  {selectedArticle.content}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
