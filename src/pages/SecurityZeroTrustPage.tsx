import React from 'react';
import { Lock, Key, Activity, FileCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import './SecurityZeroTrustPage.css';

export const SecurityZeroTrustPage: React.FC = () => {
  const { t, navigatePath, lang } = useLanguage();
  const sec = (t as any).securityPage || {
    kicker: 'CIBERSEGURIDAD & CUMPLIMIENTO TPN',
    title: 'Arquitectura Zero Trust para Proteger los Assets Audiovisuales de tu Estudio',
    subtitle: 'Microsegmentación de red, autenticación estricta y aislamiento de proyectos para garantizar el cumplimiento de auditorías TPN/MPA y evitar fugas de contenido sensible.',
    scopeTitle: 'Pilares de la Ciberseguridad Zero Trust',
    p1Title: 'Microsegmentación de Red & NGFW',
    p1Desc: 'Aislamiento de VLANs por proyecto, firewalls Next-Gen y políticas de acceso de mínimo privilegio.',
    p2Title: 'Identidad IAM & MFA Estricto',
    p2Desc: 'Autenticación multifactor obligatoria, control de acceso basado en roles y single sign-on (SSO).',
    p3Title: 'Protección EDR/XDR & Anti-Ransomware',
    p3Desc: 'Monitorización continua de endpoints en tiempo real con detección proactiva de amenazas.',
    p4Title: 'Preparación y Cumplimiento TPN / MPA',
    p4Desc: 'Evaluación técnica, endurecimiento de infraestructura y acompañamiento en auditorías de seguridad.',
    matrixTitle: 'Matriz de Controles de Seguridad',
    m1Label: 'Control de Acceso',
    m1Val: 'ZXT / RBAC + MFA 802.1X',
    m2Label: 'Segmentación',
    m2Val: 'VLANs dedicadas por producción',
    m3Label: 'Auditoría TPN',
    m3Val: 'Cumplimiento de estándares MPA',
    m4Label: 'Cifrado de Datos',
    m4Val: 'AES-256 en reposo y en tránsito',
    ctaTitle: '¿Tu estudio necesita superar una auditoría TPN o blindar su pipeline?',
    ctaSubtitle: 'Diseñamos e implantamos arquitecturas Zero Trust adaptadas a flujos de trabajo VFX.',
    ctaBtn: 'SOLICITAR AUDITORÍA DE SEGURIDAD',
  };

  const breadcrumbs = t.nav?.breadcrumbs || {
    home: 'Inicio',
    services: 'Servicios',
    zeroTrust: 'Seguridad Zero Trust',
  };

  const handleCtaClick = () => {
    const contactPath = lang === 'en' ? '/en/contact/?service=zero-trust' : '/es/contacto/?service=seguridad';
    navigatePath(contactPath);
  };

  const pillars = [
    { icon: Lock, title: sec.p1Title, desc: sec.p1Desc },
    { icon: Key, title: sec.p2Title, desc: sec.p2Desc },
    { icon: Activity, title: sec.p3Title, desc: sec.p3Desc },
    { icon: FileCheck, title: sec.p4Title, desc: sec.p4Desc },
  ];

  return (
    <div className="security-page page-with-top-padding">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav className="page-breadcrumbs" aria-label="Breadcrumb">
          <a href={lang === 'en' ? '/en/' : '/es/'} onClick={(e) => { e.preventDefault(); navigatePath(lang === 'en' ? '/en/' : '/es/'); }}>{breadcrumbs.home}</a>
          <span className="crumb-sep">/</span>
          <a href={lang === 'en' ? '/en/services/' : '/es/servicios/'} onClick={(e) => { e.preventDefault(); navigatePath(lang === 'en' ? '/en/services/' : '/es/servicios/'); }}>{breadcrumbs.services}</a>
          <span className="crumb-sep">/</span>
          <span className="crumb-active">{breadcrumbs.zeroTrust}</span>
        </nav>

        {/* Header Hero */}
        <header className="page-header text-center">
          <span className="section-kicker">{sec.kicker}</span>
          <h1 className="page-title">{sec.title}</h1>
          <p className="page-subtitle">{sec.subtitle}</p>
        </header>

        {/* Core Pillars Grid */}
        <section className="sec-section corp-panel">
          <h2 className="sec-section-title">{sec.scopeTitle}</h2>
          <div className="sec-grid">
            {pillars.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="sec-card">
                  <div className="sec-icon-wrap">
                    <IconComp size={22} />
                  </div>
                  <h3 className="sec-card-title">{item.title}</h3>
                  <p className="sec-card-desc">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Security Controls Matrix */}
        <section className="sec-section corp-panel">
          <h2 className="sec-section-title">{sec.matrixTitle}</h2>
          <div className="sec-matrix-grid">
            <div className="sec-matrix-card">
              <span className="matrix-label">{sec.m1Label}</span>
              <span className="matrix-val">{sec.m1Val}</span>
            </div>
            <div className="sec-matrix-card">
              <span className="matrix-label">{sec.m2Label}</span>
              <span className="matrix-val">{sec.m2Val}</span>
            </div>
            <div className="sec-matrix-card">
              <span className="matrix-label">{sec.m3Label}</span>
              <span className="matrix-val">{sec.m3Val}</span>
            </div>
            <div className="sec-matrix-card">
              <span className="matrix-label">{sec.m4Label}</span>
              <span className="matrix-val">{sec.m4Val}</span>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="sec-cta-banner text-center">
          <h3>{sec.ctaTitle}</h3>
          <p>{sec.ctaSubtitle}</p>
          <button type="button" className="btn-corporate-primary" onClick={handleCtaClick}>
            <span>{sec.ctaBtn}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
