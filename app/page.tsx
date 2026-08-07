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
    title: "Manuel Opérationnel : Architecture, Isolation Multi-Clients et Industrialisation des Flux Fournisseurs",
    date: "7 août 2026",
    category: "Architecture & Onboarding Enterprise",
    readTime: "7 min",
    summary: "Guide d'implémentation stratégique pour les Directions Administratives et Financières souhaitant industrialiser leur chaîne de traitement des factures d'achats.",
    content: `L'industrialisation des processus administratifs et financiers (AP Automation) ne se résume pas à l'adoption d'un simple outil de numérisation. Elle exige une rigueur architecturale irréprochable garantissant l'étanchéité des données et la fluidité des flux opérationnels.\n\n1. Isolation et Structuration des Portefeuilles Clients\nDans le cadre de structures multi-entités ou de cabinets d'expertise comptable gérant des dizaines de dossiers distincts, l'étanchéité des données est un impératif absolu. L'onglet "Historique Clients" de CLFinance AI segmente chaque entité de manière stricte grâce à une liaison relationnelle sécurisée par l'identifiant utilisateur unique (UUID) et le libellé de l'entité. Chaque flux documentaire est ainsi cloisonné, éliminant tout risque de croisement de données inter-entreprises.\n\n2. Le Traitement en Batch (Batch Upload) et l'Extraction Sémantique\nLa phase d'ingestion s'appuie sur un système de glisser-déposer massif (PDF, JPG, PNG). Contrairement aux solutions d'OCR traditionnelles qui se contentent d'une reconnaissance optique linéaire, notre agent IA procède à une analyse contextuelle globale. Les schémas de données stricts extraient instantanément la matrice complète : entité fournisseur, numéro de facture, date d'émission, ventilation HT/TVA/TTC, devise normalisée et coordonnées bancaires (IBAN).\n\n3. Le paradigme du "Human-in-the-Loop"\nEn finance d'entreprise, la certitude statistique ne suffit pas : la conformité fiscale exige une précision de 100 %. L'interface de résultats instantanés intègre un mécanisme de correction dynamique. Chaque cellule est éditable en temps réel. De plus, un algorithme de cohérence mathématique intégré vérifie en permanence l'adéquation de la formule (HT + TVA = TTC), signalant visuellement toute anomalie avant l'intégration définitive.\n\n4. Restitution et Clôture Comptable\nL'étape finale de la chaîne de valeur réside dans l'export tabulaire structuré. En un clic, l'exportation au format CSV formate les écritures selon les standards normalisés du marché, facilitant l'injection directe dans les progiciels de gestion intégrée (ERP) ou les logiciels comptables de production.`
  },
  {
    id: 2,
    title: "Analyse du Coût Total de Possession (TCO) : Le ROI Mathématique de l'Automatisation des Achats",
    date: "7 août 2026",
    category: "Corporate Finance & ROI",
    readTime: "6 min",
    summary: "Démonstration financière chiffrée de l'impact direct de l'IA sur la réduction des coûts opérationnels et l'optimisation du BFR.",
    content: `Le traitement des factures fournisseurs (Accounts Payable) représente l'un des postes les plus sous-estimés en termes de coûts cachés au sein des PME et ETI. L'accumulation des tâches de saisie manuelle engendre un coût de revient unitaire par facture exorbitant lorsque l'on intègre le temps homme, les taux horaires chargés et les coûts de correction des erreurs de rapprochement.\n\nModélisation financière pour un volume de 500 factures mensuelles :\n\n- Scénario Traditionnel (Saisie Manuelle Humaine) :\nTemps moyen de traitement par facture (réception, ouverture, saisie des lignes, contrôle de TVA, rapprochement et classement) : 6 minutes.\nVolume horaire mensuel consacré : 50 heures.\nCoût salarial chargé (base de 35 € / heure) : 1 750 € par mois, soit 21 000 € par an uniquement alloués à la ressaisie administrative.\n\n- Scénario Augmenté (CLFinance AI) :\nTemps de traitement moyen par document (traitement IA instantané + validation par exception de l'analyste) : 35 secondes.\nVolume horaire mensuel consacré : Moins de 5 heures.\nCoût opérationnel global de la solution : Infrastructure mutualisée et support.\n\nGain net et relèvement de la marge opérationnelle :\nAu-delà de l'économie financière brute dépassant les 18 000 € annuels, le véritable gain se situe sur le plan du Besoin en Fonds de Roulement (BFR). L'accélération du cycle de validation des factures fournisseurs permet d'optimiser les conditions d'escompte, d'éviter les pénalités de retard et d'obtenir une visibilité parfaite sur les flux de trésorerie à court terme (cash-flow forecasting).`
  },
  {
    id: 3,
    title: "Le Mythe de la Disparition des Métiers du Chiffre : Avénement et Puissance du DAF Augmenté",
    date: "5 août 2026",
    category: "Stratégie Managériale & Avenir",
    readTime: "6 min",
    summary: "Pourquoi l'intelligence artificielle générative ne remplace pas le jugement financier humain, mais le propulse vers des fonctions à haute valeur ajoutée stratégique.",
    content: `L'introduction de l'intelligence artificielle dans les directions financières suscite parfois des résistances culturelles légitimes, ancrées dans la crainte d'une obsolescence des compétences traditionnelles. Pourtant, une analyse lucide de la chaîne de valeur montre que l'IA libère le professionnel du chiffre des entraves de la corvée opérationnelle.\n\nLa dichotomie entre la machine et l'analyste :\n- Ce que l'IA accomplit avec excellence : L'extraction syntaxique, la normalisation des formats hétérogènes, la vérification arithmétique et la mise en conformité formelle des pièces justificatives. C'est de la puissance brute de calcul appliquée au traitement documentaire.\n\n- Ce qui demeure strictement exclusif à l'humain (Le Haut Niveau) :\n1. L'interprétation contextuelle des variations de marges ou des dérives budgétaires inexpliquées.\n2. La négociation active avec les créanciers et les directions opérationnelles.\n3. La modélisation prospective des scénarios de croissance externe ou de restructuration financière.\n\nLe Directeur Administratif et Financier (DAF) de demain, épaoulé par des agents intelligents, abandonne définitivement la posture de contrôleur de saisie pour endosser pleinement son rôle de co-pilote stratégique de la direction générale. L'outil ne se substitue pas au cerveau humain : il en multiplie la portée décisionnelle.`
  },
  {
    id: 4,
    title: "Au-delà de l'OCR Traditionnel : Fiabilité Sémantique et Validation par Schémas Stricts (Pydantic / LLM)",
    date: "2 août 2026",
    category: "Ingénierie & Conformité Fiscale",
    readTime: "5 min",
    summary: "Détail technique des architectures neuronales modernes garantissant une précision de lecture absolue sur les pièces fiscales complexes.",
    content: `Pendant deux décennies, les directions informatiques des entreprises ont souffert des limites inhérentes aux moteurs d'OCR (Reconnaissance Optique de Caractères) basés sur des règles heuristiques rigides. Un changement de police typographique, un filigrane en arrière-plan ou un document légèrement inclinés suffisaient à corrompre l'extraction des données.\n\nL'avènement des modèles multimodaux et de la sémantique contextuelle :\nLes architectures d'extraction actuelles ne se focalisent plus sur la position géométrique des pixels, mais sur la compréhension logique du document. Le système comprend qu'un montant situé en bas à droite précédé de la mention "Total à payer" représente l'assiette TTC, indépendamment de sa disposition graphique.\n\nL'importance des schémas de validation stricts :\nPour éliminer tout risque d'hallucination inhérent aux grands modèles de langage, CLFinance AI couple son moteur d'intelligence artificielle à des validateurs de schémas stricts. Les types de données, les formats de dates ISO et les contraintes mathématiques sont vérifiés en amont de l'écriture en base de données. Si une incohérence est détectée, le système bloque la validation aveugle et requiert l'arbitrage de l'analyste, garantissant ainsi une piste d'audit irréprochable en cas de contrôle fiscal.`
  },
  {
    id: 5,
    title: "L'Unification des Canaux d'Acquisition : Comment Résoudre la Fragmentation Documentaire des Achats",
    date: "30 juillet 2026",
    category: "Organisation & Processus AP",
    readTime: "5 min",
    summary: "Gestion unifiée des flux hétérogènes (PDF reçus par e-mail, portails fournisseurs, notes de frais mobiles et reçus papier numérisés).",
    content: `L'une des complexités majeures de la gestion des comptes fournisseurs réside dans la multiplicité des points d'entrée des factures. Entre les abonnements SaaS prélevés par carte bancaire dont la facture arrive dans la boîte mail d'un collaborateur, les factures EDI des grands comptes et les tickets de caisse papiers amassés en déplacement, la dispersion documentaire est maximale.\n\nLa centralisation comme prérequis à l'intelligence :\nPour qu'une automatisation soit performante, elle doit centraliser les flux sans imposer de contraintes excessives aux émetteurs internes. En permettant l'ingestion universelle de tout type de format (documents numériques natifs ou scans de basse qualité), CLFinance AI agit comme un hub centralisateur universel.\n\nL'organisation par dossiers dynamiques et l'accès instantané aux historiques permettent aux équipes financières d'auditer l'état d'un règlement ou d'extraire un justificatif en moins de dix secondes, transformant un archiveur passif en une base de données active et interrogeable.`
  },
  {
    id: 6,
    title: "Sécurité des Données Financières et Conformité RGPD : Le Standard Enterprise de l'Infrastructure Cloud",
    date: "28 juillet 2026",
    category: "Sécurité & Gouvernance SI",
    readTime: "6 min",
    summary: "Analyse des protocoles de chiffrement, de la ségrégation des bases de données et des garanties de confidentialité pour les données sensibles.",
    content: `Le traitement externalisé de données financières hautement sensibles — telles que les plans de comptes, les volumes de CA, les identités des fournisseurs et les coordonnées bancaires (IBAN) — impose le respect des exigences de sécurité les plus strictes du marché.\n\nArchitecture de confiance et cloisonnement des données :\nL'infrastructure repose sur un triptyque sécuritaire de premier plan :\n1. Chiffrement de bout en bout des flux de données en transit (HTTPS / TLS 1.3) et au repos (Chiffrement AES-256 des bases de données relationnelles).\n2. Isolation rigoureuse des sessions par authentification forte et jetons sécurisés, empêchant toute fuite d'information d'un portefeuille client à un autre.\n3. Indépendance et état "stateless" des microservices de traitement, garantissant qu'aucune donnée client persistante ne transite durablement hors des environnements sécurisés.\n\nCette rigueur technique assure aux DAF et aux RSSI (Responsables de la Sécurité des Systèmes d'Information) une sérénité totale lors de l'audit de conformité de l'outil au sein de leur écosystème d'entreprise.`
  },
  {
    id: 7,
    title: "Accélération des Cycles de Clôture Mensuelle : Du Reporting Rétroactif au Pilotage Prédictif",
    date: "24 juillet 2026",
    category: "Performance Financière",
    readTime: "5 min",
    summary: "Comment l'élimination des goulots d'étranglement de saisie permet de réduire le délai de clôture des comptes (Soft Close) de plusieurs jours.",
    content: `Le rituel de la clôture comptable mensuelle est traditionnellement une période de forte tension pour les équipes financières, caractérisée par des heures supplémentaires consacrées à la recherche de factures égarées et à la régularisation d'écritures de charges à payer (FNP).\n\nL'effet levier de l'instantanéité :\nEn automatisant l'extraction des données dès leur réception au fil de l'eau, le volume de factures en attente de traitement en fin de mois chute drastiquement. Les écritures sont qualifiées, ventilées et enregistrées au jour le jour.\n\nConséquence directe sur le pilotage :\nLa direction financière n'attend plus le 15 du mois suivant pour avoir une vision consolidée de ses charges d'exploitation. La disponibilité en temps réel des données d'achats structurées permet d'affiner les tableaux de bord de gestion, d'anticiper les dérives de coûts et d'ajuster la trajectoire budgétaire en cours de période avec une réactivité inédite.`
  },
  {
    id: 8,
    title: "Économie d'Échelle en Cabinet d'Expertise Comptable : Scalabilité du Portefeuille sans Hausse de Masse Salariale",
    date: "20 juillet 2026",
    category: "Stratégie pour Cabinets",
    readTime: "6 min",
    summary: "Étude stratégique sur la mutation du modèle économique des cabinets d'expertise comptable face aux nouveaux standards technologiques.",
    content: `Le marché de l'expertise comptable fait face à une double contrainte structurelle : une pénurie persistante de collaborateurs qualifiés sur le marché du travail et une pression tarifaire constante exercée par les clients finaux sur les prestations de tenue de comptes.\n\nSortir du piège de la croissance linéaire :\nHistoriquement, l'augmentation du chiffre d'affaires d'un cabinet était corrélée de manière linéaire à l'augmentation du nombre d'heures de saisie facturées, nécessitant des recrutements continus.\n\nL'intégration d'un agent pré-comptable spécialisé comme CLFinance AI permet de casser cette corrélation. En confiant l'ingestion et la structuration des factures d'achats à l'intelligence artificielle, un collaborateur junior peut superviser un portefeuille de dossiers étendu de 40% à 50% supplémentaires, en se consacrant exclusivement à la révision des comptes, l'optimisation fiscale et le conseil à haute valeur ajoutée auprès des chefs d'entreprise.`
  },
  {
    id: 9,
    title: "La Mort Programmée du Saisie-Recherche : Vers l'Interopérabilité Native des Systèmes Comptables",
    date: "15 juillet 2026",
    category: "Technologies & Normes",
    readTime: "5 min",
    summary: "Analyse prospective sur l'évolution des formats d'échanges de données financières et la disparition progressive des ressaisies manuelles.",
    content: `L'histoire de la comptabilité moderne est jalonnée de transitions technologiques majeures : du grand livre papier aux logiciels de comptabilité sur poste local, puis vers le mode SaaS collaboratif. Aujourd'hui, l'étape ultime consiste à éliminer la barrière de saisie par l'interopérabilité sémantique.\n\nDu CSV universel aux API natives :\nAlors que l'export tabulaire structuré (CSV) constitue l'étalon-or actuel pour injecter proprement les données dans n'importe quel logiciel du marché (Pennylane, Dext, Sage, Cegid), l'horizon technologique s'oriente vers des synchronisations par API bidirectionnelles en temps réel.\n\nCette fluidité d'échange garantit que la donnée extraite par l'intelligence artificielle se retrouve instantanément catégorisée dans le plan de comptes analytique et général de l'entreprise, sans qu'aucune intervention humaine intermédiaire ne vienne ralentir la chaîne de traitement.`
  },
  {
    id: 10,
    title: "Prospective 2030 : Le Directeur Financier en Mode Agentique et l'Autonomie Budgétaire Intelligente",
    date: "10 juillet 2026",
    category: "Prospective & Leadership",
    readTime: "6 min",
    summary: "Vision à long terme sur l'automatisation intégrale de la chaîne financière et l'émergence des organisations pilotées par des agents autonomes.",
    content: `À l'horizon 2030, la fonction finance aura achevé sa mue numérique. Les logiciels ne seront plus de simples répertoires passifs où l'on archive des pièces, mais des écosystèmes d'agents autonomes capables d'interagir entre eux pour orchestrer la vie financière de l'entreprise.\n\nVers l'autonomie des processus:\nLes factures ne seront plus seulement lues et classées : les agents négocieront automatiquement les délais de paiement en fonction de la trésorerie prévisionnelle, lanceront des alertes sur les anomalies tarifaires par rapport aux contrats cadres négociés, et généreront les liasses fiscales de pré-clôture de manière autonome.\n\nPour le dirigeant et le DAF, cette autonomie opérationnelle marque le passage définitif d'un management par la contrainte administrative à un management par la vision stratégique et la maîtrise souveraine de la croissance.`
  }
];

export default function AgentPreComptableEnterprise() {
  const [activeTab, setActiveTab] = useState<'analyse' | 'historique' | 'blog'>('analyse');
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [authView, setAuthView] = useState<'landing' | 'login' | 'signup'>('landing');

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
      const d = item.data || item;
      const row = [
        item.filename || d.filename || '',
        `"${d.fournisseur || ''}"`,
        `"${d.numero_facture || ''}"`,
        d.date_emission || '',
        d.montant_ht || '',
        d.tva || '',
        d.montant_ttc || '',
        d.devise || '',
        d.iban || ''
      ];
      csvContent += row.join(";") + "\n";
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `export_${label.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

  // --- ECRAN DE CONNEXION / INSCRIPTION OU LANDING PAGE ---
  if (!session) {
    if (authView === 'landing') {
      return (
        <div className="min-h-screen bg-[#0a0f1c] text-white font-sans selection:bg-blue-500/35">
          {/* Landing Header */}
          <header className="w-full p-6 flex items-center justify-between border-b border-slate-800/60 bg-slate-900/30 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-amber-300 to-amber-600 shadow-[0_0_15px_rgba(217,119,6,0.4)]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0a0f1c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
              <h1 className="text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 uppercase">CLFinance AI</h1>
            </div>
            <div className="flex items-center gap-4">
               <button onClick={() => setAuthView('login')} className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">Connexion</button>
               <button onClick={() => setAuthView('signup')} className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)]">Démarrer</button>
            </div>
          </header>

          {/* Hero Section */}
          <section className="max-w-7xl mx-auto px-4 pt-20 pb-16 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-950/60 border border-blue-800/60 text-blue-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
              <span>🚀 Prêt pour la Facture Électronique 2026</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
              L'Agent Pré-Comptable Intelligent pour <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">DAF et Cabinets</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
              Transformez instantanément vos factures fournisseurs en données comptables structurées. Éliminez 100% de la saisie manuelle et sécurisez votre TVA.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={() => setAuthView('signup')} className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all">
                Tester gratuitement l'agent IA
              </button>
              <button onClick={() => setAuthView('login')} className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all">
                Accéder à mon espace
              </button>
            </div>
          </section>

          {/* Pricing & Formules Section */}
          <section className="max-w-7xl mx-auto px-4 py-16 border-t border-slate-800/80">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-3">Tarifs & Formules transparentes</h2>
              <p className="text-slate-400">Choisissez l'option taillée pour votre volume d'achats.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Starter */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl relative">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Starter</h3>
                  <p className="text-slate-400 text-xs mb-4">Indépendants & TPE</p>
                  <div className="text-3xl font-extrabold text-amber-400 mb-6">49 € <span className="text-xs text-slate-400 font-normal">/ mois</span></div>
                  <ul className="space-y-3 text-sm text-slate-300 mb-8">
                    <li>• Jusqu'à 150 factures / mois</li>
                    <li>• Extraction IA (HT, TVA, TTC, IBAN)</li>
                    <li>• Export CSV structuré</li>
                    <li>• Support par e-mail</li>
                  </ul>
                </div>
                <button onClick={() => setAuthView('signup')} className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl text-sm transition-colors">Choisir Starter</button>
              </div>

              {/* Pro DAF */}
              <div className="bg-slate-900 border-2 border-blue-500/80 rounded-2xl p-6 flex flex-col justify-between shadow-2xl relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">Recommandé</div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Pro DAF</h3>
                  <p className="text-slate-400 text-xs mb-4">PME & Directions Financières</p>
                  <div className="text-3xl font-extrabold text-amber-400 mb-6">149 € <span className="text-xs text-slate-400 font-normal">/ mois</span></div>
                  <ul className="space-y-3 text-sm text-slate-300 mb-8">
                    <li>• Jusqu'à 600 factures / mois</li>
                    <li>• Moteur multimodal avancé</li>
                    <li>• Multi-clients et dossiers étanches</li>
                    <li>• Contrôle de cohérence TVA</li>
                  </ul>
                </div>
                <button onClick={() => setAuthView('signup')} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl text-sm transition-colors shadow-[0_0_15px_rgba(37,99,235,0.4)]">Choisir Pro DAF</button>
              </div>

              {/* Cabinet / Scale */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl relative">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Cabinet & Scale</h3>
                  <p className="text-slate-400 text-xs mb-4">Experts-comptables</p>
                  <div className="text-3xl font-extrabold text-amber-400 mb-6">399 € <span className="text-xs text-slate-400 font-normal">/ mois</span></div>
                  <ul className="space-y-3 text-sm text-slate-300 mb-8">
                    <li>• Jusqu'à 2 000 factures / mois</li>
                    <li>• Portefeuille multi-dossiers illimité</li>
                    <li>• Exports groupés par date & client</li>
                    <li>• Support prioritaire</li>
                  </ul>
                </div>
                <button onClick={() => setAuthView('signup')} className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl text-sm transition-colors">Choisir Cabinet</button>
              </div>

              {/* Enterprise */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl relative">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Enterprise</h3>
                  <p className="text-slate-400 text-xs mb-4">Groupes & Multi-filiales</p>
                  <div className="text-3xl font-extrabold text-amber-400 mb-6">Sur devis</div>
                  <ul className="space-y-3 text-sm text-slate-300 mb-8">
                    <li>• Volumes sur mesure illimités</li>
                    <li>• Connexion API custom & ERP</li>
                    <li>• SLA garanti & Hébergement dédié</li>
                    <li>• Account manager dédié</li>
                  </ul>
                </div>
                <button onClick={() => setAuthView('signup')} className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl text-sm transition-colors">Nous contacter</button>
              </div>
            </div>
          </section>

          <footer className="w-full py-8 border-t border-slate-800 text-center text-xs text-slate-500">
            © 2026 CLFinance AI — L'Agent Pré-Comptable Intelligent. Tous droits réservés.
          </footer>
        </div>
      );
    }

    // Vue Formulaire Connexion / Inscription
    return (
      <div className="min-h-screen bg-[#0a0f1c] flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl max-w-md w-full relative">
          <button onClick={() => setAuthView('landing')} className="absolute top-4 left-4 text-xs text-slate-400 hover:text-white transition-colors">
            ← Retour à l'accueil
          </button>
          
          <div className="flex justify-center mb-6 mt-4">
             <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-amber-300 to-amber-600 shadow-[0_0_15px_rgba(217,119,6,0.4)]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0a0f1c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
             </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            {authView === 'login' ? 'Connexion Espace DAF' : 'Créer votre compte CLFinance AI'}
          </h2>
          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Email professionnel" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} className="bg-slate-950 border border-slate-700 text-white rounded-lg p-3 outline-none focus:border-blue-500" />
            <input type="password" placeholder="Mot de passe" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} className="bg-slate-950 border border-slate-700 text-white rounded-lg p-3 outline-none focus:border-blue-500" />
            {authError && <p className="text-red-400 text-sm">{authError}</p>}
            <div className="flex gap-3 mt-4">
               {authView === 'login' ? (
                 <button onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-colors">Se connecter</button>
               ) : (
                 <button onClick={handleSignUp} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-colors">Créer le compte</button>
               )}
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
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${loading ? 'bg-amber-500 animate-ping' : 'bg-green-500'}`}></span> Résultats instantanés
                  </h3>
                  {!loading && results.some(r => r.data) && (
                    <button 
                      onClick={() => exportGroupToCSV(results.filter(r => r.data), `analyse_${activeClientFinal}`)}
                      className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-2 shadow"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      Exporter ces résultats en CSV
                    </button>
                  )}
                </div>
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
                  <h2 className="text-3xl font-bold text-white mb-2">Ressources & Guides Stratégiques DAF</h2>
                  <p className="text-slate-400">Analyses prospectives, architectures et notes d'optimisation financière.</p>
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
                <button onClick={() => setSelectedArticle(null)} className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2 mb-4">← Retour aux analyses</button>
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
