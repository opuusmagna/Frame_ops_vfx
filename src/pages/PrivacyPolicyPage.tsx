import React, { useEffect } from 'react';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import { legalConfig } from '../config/legal';
import './LegalPages.css';

export const PrivacyPolicyPage: React.FC = () => {
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
                ? 'Este documento constituye una estructura borradora de la política de privacidad. Los datos fiscales y la razón social definitiva se publicarán tras la validación jurídica formal de la entidad comercial.'
                : 'This document represents a technical draft structure for the privacy policy. Official tax identifiers and company name will be published following formal legal verification.'}
            </p>
          </div>
        </div>

        <header className="legal-header">
          <h1 className="legal-title">{isEs ? 'Política de Privacidad' : 'Privacy Policy'}</h1>
          <p className="legal-meta">{isEs ? `Última actualización: ${legalConfig.lastUpdated}` : `Last updated: August 16, 2026`}</p>
        </header>

        <article className="legal-content corp-panel">
          <section className="legal-section">
            <h2>{isEs ? '1. Identificación del Responsable' : '1. Data Controller Identification'}</h2>
            <p>
              {isEs
                ? `El responsable del tratamiento de los datos recabados en este sitio web es Frame Ops VFX (${legalConfig.companyName}), con correo de contacto técnico ${legalConfig.contactEmail}.`
                : `The data controller responsible for personal data processed through this website is Frame Ops VFX (${legalConfig.companyName}), reachable at ${legalConfig.contactEmail}.`}
            </p>
          </section>

          <section className="legal-section">
            <h2>{isEs ? '2. Finalidad del Tratamiento' : '2. Purpose of Data Processing'}</h2>
            <p>
              {isEs
                ? 'Los datos personales facilitados a través del formulario de contacto y estimador técnico (nombre, correo corporativo, empresa, teléfono y detalles de infraestructura) se utilizan exclusivamente para atender solicitudes de diagnóstico de arquitectura, elaborar propuestas técno-comerciales y responder a consultas B2B.'
                : 'Personal data submitted through our contact forms and technical estimator (name, business email, company, phone, and infrastructure requirements) are used solely to process assessment requests, prepare technical proposals, and respond to B2B inquiries.'}
            </p>
          </section>

          <section className="legal-section">
            <h2>{isEs ? '3. Base Legítima' : '3. Legal Basis'}</h2>
            <p>
              {isEs
                ? 'La base legal para el tratamiento de sus datos es el consentimiento explícito otorgado al marcar la casilla de verificación previa al envío de cualquier solicitud de contacto o auditoría.'
                : 'The legal basis for processing your data is explicit consent granted when checking the privacy consent checkbox prior to submitting any contact or audit request.'}
            </p>
          </section>

          <section className="legal-section">
            <h2>{isEs ? '4. Conservación de Datos' : '4. Data Retention'}</h2>
            <p>
              {isEs
                ? 'Los datos se conservarán durante el tiempo estrictamente necesario para gestionar la consulta comercial o la relación profesional derivada, salvo obligación legal de conservación superior.'
                : 'Data will be retained strictly for the duration necessary to fulfill your inquiry or commercial engagement, unless longer retention is required by applicable law.'}
            </p>
          </section>

          <section className="legal-section">
            <h2>{isEs ? '5. Derechos del Usuario (ARCO / RGPD)' : '5. User Rights (GDPR)'}</h2>
            <p>
              {isEs
                ? 'Puede ejercitar sus derechos de acceso, rectificación, supresión, limitación del tratamiento, portabilidad y oposición dirigiendo un correo electrónico a info@frameopsvfx.com.'
                : 'You may exercise your rights of access, rectification, erasure, restriction of processing, data portability, and objection by sending an email to info@frameopsvfx.com.'}
            </p>
          </section>
        </article>
      </div>
    </div>
  );
};
