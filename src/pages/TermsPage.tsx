import React, { useEffect } from 'react';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import { legalConfig } from '../config/legal';
import './LegalPages.css';

export const TermsPage: React.FC = () => {
  const { lang, navigatePath } = useLanguage();
  const isEs = lang === 'es';

  useEffect(() => {
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', 'noindex, nofollow');
  }, []);

  const handleBackHome = () => {
    navigatePath(isEs ? '/es/' : '/en/');
  };

  return (
    <div className="legal-page page-with-top-padding">
      <div className="container container-narrow">
        <button type="button" className="btn-back-link" onClick={handleBackHome}>
          <ArrowLeft size={16} />
          <span>{isEs ? 'Volver al Inicio' : 'Return to Home'}</span>
        </button>

        {/* Draft Warning Banner */}
        <div className="draft-warning-banner" role="alert">
          <ShieldAlert size={24} className="banner-icon" />
          <div>
            <h4>{isEs ? 'BORRADOR INFORMATIVO EN PROCESO DE VALIDACIÓN CORPORATIVA' : 'INFORMATIONAL DRAFT UNDER CORPORATE VALIDATION'}</h4>
            <p>
              {isEs
                ? 'Este documento constituye un borrador de los términos y condiciones de uso del sitio web. La versión jurídica vinculante se publicará tras la validación de la entidad comercial.'
                : 'This document represents a technical draft for terms of service. Binding legal terms will be finalized upon formal corporate validation.'}
            </p>
          </div>
        </div>

        <header className="legal-header">
          <h1 className="legal-title">{isEs ? 'Términos de Servicio' : 'Terms of Service'}</h1>
          <p className="legal-meta">{isEs ? `Última actualización: ${legalConfig.lastUpdated}` : `Last updated: August 16, 2026`}</p>
        </header>

        <article className="legal-content corp-panel">
          <section className="legal-section">
            <h2>{isEs ? '1. Carácter Informativo y Diagnóstico' : '1. Informational & Diagnostic Scope'}</h2>
            <p>
              {isEs
                ? 'Los contenidos, herramientas de diagnóstico, medidores de estrés y configuradores estimativos presentes en este sitio web tienen carácter estrictamente informativo y orientativo. No constituyen una oferta comercial vinculante, un contrato de prestación de servicios ni una recomendación cerrada de adquisición de equipamiento.'
                : 'All contents, diagnostic tools, stress meters, and estimators presented on this website are strictly informational. They do not constitute a binding commercial offer, contract, or equipment purchasing requirement.'}
            </p>
          </section>

          <section className="legal-section">
            <h2>{isEs ? '2. Alcance Contractual de los Servicios' : '2. Contractual Scope of Services'}</h2>
            <p>
              {isEs
                ? 'Cualquier prestación de servicios de ingeniería, mantenimiento, monitorización, backup o soporte en entornos de producción se regirá exclusivamente por la propuesta formal, presupuesto y SLA debidamente suscritos entre las partes.'
                : 'Any engineering, maintenance, monitoring, backup, or support services will be governed exclusively by formal proposals, contracts, and SLAs executed between the parties.'}
            </p>
          </section>
        </article>
      </div>
    </div>
  );
};
