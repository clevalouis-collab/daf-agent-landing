{/* Affichage des Résultats (Tableau Pro) */}
        {result && (
          <div className="mt-8 w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl animate-fade-in-up">
            <div className="bg-slate-800 px-6 py-4 border-b border-slate-700">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Données Extraites avec Succès
              </h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(result).map(([key, value]) => {
                // On cache la case "devise" seule pour l'intégrer aux montants
                if (key === 'devise') return null;

                let displayValue = value ? value.toString() : null;

                // Si c'est un montant et qu'on a une devise, on colle le sigle à côté !
                if (['montant_ht', 'tva', 'montant_ttc'].includes(key) && displayValue && result.devise) {
                  displayValue = `${displayValue} ${result.devise}`;
                }

                return (
                  <div key={key} className="bg-slate-950/50 p-3 rounded-lg border border-slate-800/50">
                    <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                      {key.replace('_', ' ')}
                    </span>
                    <span className="block text-sm text-slate-200 font-medium">
                      {displayValue || <span className="text-slate-600 italic">Non détecté</span>}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
