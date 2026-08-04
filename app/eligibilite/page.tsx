import Link from "next/link";
import EligibilityForm from "@/components/EligibilityForm";

const criteria = [
  "ETI basée en Suisse (50 à 1 000+ collaborateurs)",
  "DAF ou direction financière impliquée dans la clôture",
  "Volume significatif de pièces comptables mensuelles",
  "Stack comptable identifiable (ERP ou logiciel métier)",
  "Engagement sur un pilote de 90 jours avec retours structurés",
];

export default function EligibilitePage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <header className="border-b border-slate-800 bg-slate-900/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-12">
          <Link
            href="/"
            className="text-sm font-medium text-slate-400 transition-colors hover:text-slate-200"
          >
            ← Retour à l&apos;accueil
          </Link>
          <span className="rounded-full border border-slate-700 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
            3 places restantes
          </span>
        </div>
      </header>

      <section className="px-6 py-16 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <aside>
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-400">
              Programme Design Partner
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-50 lg:text-4xl">
              Vérifier votre éligibilité
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-400">
              Complétez cet audit en 3 minutes. Nous évaluons si votre ETI
              correspond au profil cible de notre agent pré-comptable souverain.
            </p>

            <div className="mt-10 rounded-xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                Critères d&apos;éligibilité
              </h2>
              <ul className="mt-4 space-y-3">
                {criteria.map((criterion) => (
                  <li
                    key={criterion}
                    className="flex items-start gap-3 text-sm leading-6 text-slate-400"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                    {criterion}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-8 text-sm text-slate-500">
              Données hébergées en Suisse. Aucune revente à des tiers. Réponse
              sous 48 h ouvrées.
            </p>
          </aside>

          <div
            id="formulaire-audit"
            className="rounded-xl border border-slate-800 bg-slate-900/30 p-6 sm:p-8"
          >
            <h2 className="mb-6 text-xl font-semibold text-slate-50">
              Formulaire d&apos;audit d&apos;éligibilité
            </h2>
            <EligibilityForm />
          </div>
        </div>
      </section>
    </main>
  );
}
