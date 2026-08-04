"use client";

import { FormEvent, useState } from "react";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  company: string;
  revenue: string;
  employees: string;
  canton: string;
  accountingSoftware: string;
  monthlyDocuments: string;
  challenge: string;
  consent: boolean;
};

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  company: "",
  revenue: "",
  employees: "",
  canton: "",
  accountingSoftware: "",
  monthlyDocuments: "",
  challenge: "",
  consent: false,
};

const inputClassName =
  "w-full rounded-md border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-50 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

const labelClassName = "block text-sm font-medium text-slate-300 mb-1.5";

export default function EligibilityForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    field: keyof FormData,
    value: string | boolean,
  ) {
    setFormData((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!formData.consent) {
      setError("Vous devez accepter le traitement de vos données pour continuer.");
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600/20 text-blue-400">
          <svg
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-slate-50">
          Demande enregistrée
        </h3>
        <p className="mt-3 text-slate-400 leading-relaxed">
          Merci {formData.firstName}. Notre équipe analyse votre profil sous 48 h
          ouvrées et vous recontacte à{" "}
          <span className="text-slate-300">{formData.email}</span>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelClassName}>
            Prénom *
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            className={inputClassName}
            value={formData.firstName}
            onChange={(event) => handleChange("firstName", event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClassName}>
            Nom *
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
            className={inputClassName}
            value={formData.lastName}
            onChange={(event) => handleChange("lastName", event.target.value)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelClassName}>
          Email professionnel *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClassName}
          placeholder="prenom.nom@entreprise.ch"
          value={formData.email}
          onChange={(event) => handleChange("email", event.target.value)}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="role" className={labelClassName}>
            Fonction *
          </label>
          <select
            id="role"
            name="role"
            required
            className={inputClassName}
            value={formData.role}
            onChange={(event) => handleChange("role", event.target.value)}
          >
            <option value="">Sélectionner</option>
            <option value="daf">DAF / CFO</option>
            <option value="directeur-financier">Directeur financier</option>
            <option value="controleur-gestion">Contrôleur de gestion</option>
            <option value="responsable-comptabilite">Responsable comptabilité</option>
            <option value="autre">Autre</option>
          </select>
        </div>
        <div>
          <label htmlFor="company" className={labelClassName}>
            Entreprise *
          </label>
          <input
            id="company"
            name="company"
            type="text"
            required
            autoComplete="organization"
            className={inputClassName}
            value={formData.company}
            onChange={(event) => handleChange("company", event.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="revenue" className={labelClassName}>
            Chiffre d&apos;affaires annuel *
          </label>
          <select
            id="revenue"
            name="revenue"
            required
            className={inputClassName}
            value={formData.revenue}
            onChange={(event) => handleChange("revenue", event.target.value)}
          >
            <option value="">Sélectionner</option>
            <option value="10-50m">CHF 10 – 50 M</option>
            <option value="50-250m">CHF 50 – 250 M</option>
            <option value="250m+">CHF 250 M+</option>
            <option value="moins-10m">Moins de CHF 10 M</option>
          </select>
        </div>
        <div>
          <label htmlFor="employees" className={labelClassName}>
            Effectif *
          </label>
          <select
            id="employees"
            name="employees"
            required
            className={inputClassName}
            value={formData.employees}
            onChange={(event) => handleChange("employees", event.target.value)}
          >
            <option value="">Sélectionner</option>
            <option value="50-250">50 – 250 collaborateurs</option>
            <option value="250-1000">250 – 1 000 collaborateurs</option>
            <option value="1000+">Plus de 1 000 collaborateurs</option>
            <option value="moins-50">Moins de 50 collaborateurs</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="canton" className={labelClassName}>
            Canton du siège *
          </label>
          <select
            id="canton"
            name="canton"
            required
            className={inputClassName}
            value={formData.canton}
            onChange={(event) => handleChange("canton", event.target.value)}
          >
            <option value="">Sélectionner</option>
            <option value="VD">Vaud</option>
            <option value="GE">Genève</option>
            <option value="ZH">Zurich</option>
            <option value="BE">Berne</option>
            <option value="BS">Bâle-Ville</option>
            <option value="BL">Bâle-Campagne</option>
            <option value="NE">Neuchâtel</option>
            <option value="FR">Fribourg</option>
            <option value="VS">Valais</option>
            <option value="TI">Tessin</option>
            <option value="autre">Autre canton suisse</option>
          </select>
        </div>
        <div>
          <label htmlFor="accountingSoftware" className={labelClassName}>
            Logiciel comptable / ERP *
          </label>
          <input
            id="accountingSoftware"
            name="accountingSoftware"
            type="text"
            required
            className={inputClassName}
            placeholder="Ex. Abacus, SAP, Oracle, Bexio…"
            value={formData.accountingSoftware}
            onChange={(event) =>
              handleChange("accountingSoftware", event.target.value)
            }
          />
        </div>
      </div>

      <div>
        <label htmlFor="monthlyDocuments" className={labelClassName}>
          Volume mensuel de pièces comptables *
        </label>
        <select
          id="monthlyDocuments"
          name="monthlyDocuments"
          required
          className={inputClassName}
          value={formData.monthlyDocuments}
          onChange={(event) =>
            handleChange("monthlyDocuments", event.target.value)
          }
        >
          <option value="">Sélectionner</option>
          <option value="500-2000">500 – 2 000 pièces</option>
          <option value="2000-5000">2 000 – 5 000 pièces</option>
          <option value="5000+">Plus de 5 000 pièces</option>
          <option value="moins-500">Moins de 500 pièces</option>
        </select>
      </div>

      <div>
        <label htmlFor="challenge" className={labelClassName}>
          Principal défi de clôture aujourd&apos;hui *
        </label>
        <textarea
          id="challenge"
          name="challenge"
          required
          rows={4}
          className={`${inputClassName} resize-y min-h-[120px]`}
          placeholder="Saisie manuelle, délais de clôture, réconciliation bancaire, contrôle des factures…"
          value={formData.challenge}
          onChange={(event) => handleChange("challenge", event.target.value)}
        />
      </div>

      <div className="rounded-lg border border-slate-700 bg-slate-900/40 p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="consent"
            required
            checked={formData.consent}
            onChange={(event) => handleChange("consent", event.target.checked)}
            className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-900 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm leading-6 text-slate-400">
            J&apos;accepte que mes données soient traitées conformément au RGPD
            et à la LPD suisse, exclusivement dans le cadre de l&apos;audit
            d&apos;éligibilité au programme Design Partner. *
          </span>
        </label>
      </div>

      {error ? (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        className="w-full rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-blue-500 sm:w-auto"
      >
        Soumettre ma demande d&apos;éligibilité
      </button>
    </form>
  );
}
