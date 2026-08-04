export default function HeroSection() {
  return (
    <section className="bg-slate-900 text-white py-24 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto text-center">
        <span className="text-sm font-semibold tracking-wider text-slate-400 uppercase border border-slate-700 px-4 py-1 rounded-full">
          Conformité RGPD & LPD Suisse Garantie
        </span>
        <h1 className="mt-8 text-5xl font-extrabold tracking-tight lg:text-6xl text-slate-50">
          Automatisez vos opérations financières.
          <br />
          <span className="text-blue-500">Sécurisez vos données critiques.</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-300 max-w-3xl mx-auto">
          L&apos;agent pré-comptable autonome qui élimine 80 % de la saisie
          manuelle et divise vos délais de clôture par deux. Hébergé sur des
          serveurs souverains. Conçu exclusivement pour les DAF d&apos;ETI.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/eligibilite"
            className="rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 transition-all"
          >
            Vérifier notre éligibilité
          </a>
        </div>
        <p className="mt-4 text-sm text-slate-500">
          Programme Design Partner : 3 places restantes.
        </p>
      </div>
    </section>
  );
}
