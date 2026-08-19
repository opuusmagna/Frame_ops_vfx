import React from 'react';
import { Cloud, Zap, Layers, Server, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import './VfxOrchestrationPage.css';

export const VfxOrchestrationPage: React.FC = () => {
  const { t, navigatePath, lang } = useLanguage();
  const orch = (t as any).orchestrationPage || {
    kicker: 'ORQUESTACIÓN & PIPELINE VFX',
    title: 'Gestión Inteligente de Render Farms y Workloads de Producción',
    subtitle: 'Optimización de colas de render, bursting híbrido a la nube y orquestación automatizada para eliminar cuellos de botella en entregas críticas.',
    scopeTitle: 'Alcance de la Orquestación de Pipeline',
    o1Title: 'Gestión Centralizada de Render Farms',
    o1Desc: 'Despliegue y administración de AWS Thinkbox Deadline, OpenCue o Tractor ajustados a tus motores de render.',
    o2Title: 'Hybrid Cloud Bursting',
    o2Desc: 'Desbordamiento automático de render a AWS, GCP o Azure durante picos de entrega sin cambios en el flujo del artista.',
    o3Title: 'Optimización Dinámica de Licencias',
    o3Desc: 'Gestión inteligente de servidores de licencias flotantes para maximizar la utilización de software.',
    o4Title: 'Automatización de Caches & Storage Sync',
    o4Desc: 'Sincronización automatizada de secuencias y caches entre sedes y clusters de renderizados.',
    metricsTitle: 'Métricas de Rendimiento del Pipeline',
    k1Label: 'Disponibilidad Farm',
    k1Val: '99.9% Uptime garantizado',
    k2Label: 'Escalabilidad Cloud',
    k2Val: 'Bursting automático en minutos',
    k3Label: 'Eficiencia de Nodos',
    k3Val: 'Telemetry & Auto-healing',
    k4Label: 'Soporte Software',
    k4Val: 'Multi-Engine & Cross-Platform',
    ctaTitle: '¿Tu render farm se satura durante los cierres de proyecto?',
    ctaSubtitle: 'Diseñamos e implantamos orquestación de render híbrida y escalable.',
    ctaBtn: 'SOLICITAR CONSULTORÍA DE PIPELINE',
  };

  const breadcrumbs = t.nav?.breadcrumbs || {
    home: 'Inicio',
    services: 'Servicios',
    orchestration: 'Orquestación VFX',
  };

  const handleCtaClick = () => {
    const contactPath = lang === 'en' ? '/en/contact/?service=orchestration' : '/es/contacto/?service=orquestacion';
    navigatePath(contactPath);
  };

  const pillars = [
    { icon: Server, title: orch.o1Title, desc: orch.o1Desc },
    { icon: Cloud, title: orch.o2Title, desc: orch.o2Desc },
    { icon: Zap, title: orch.o3Title, desc: orch.o3Desc },
    { icon: Layers, title: orch.o4Title, desc: orch.o4Desc },
  ];

  return (
    <div className="orchestration-page page-with-top-padding">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav className="page-breadcrumbs" aria-label="Breadcrumb">
          <a href={lang === 'en' ? '/en/' : '/es/'} onClick={(e) => { e.preventDefault(); navigatePath(lang === 'en' ? '/en/' : '/es/'); }}>{breadcrumbs.home}</a>
          <span className="crumb-sep">/</span>
          <a href={lang === 'en' ? '/en/services/' : '/es/servicios/'} onClick={(e) => { e.preventDefault(); navigatePath(lang === 'en' ? '/en/services/' : '/es/servicios/'); }}>{breadcrumbs.services}</a>
          <span className="crumb-sep">/</span>
          <span className="crumb-active">{breadcrumbs.orchestration}</span>
        </nav>

        {/* Header Hero */}
        <header className="page-header text-center">
          <span className="section-kicker">{orch.kicker}</span>
          <h1 className="page-title">{orch.title}</h1>
          <p className="page-subtitle">{orch.subtitle}</p>
        </header>

        {/* Core Pillars Grid */}
        <section className="orch-section corp-panel">
          <h2 className="orch-section-title">{orch.scopeTitle}</h2>
          <div className="orch-grid">
            {pillars.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="orch-card">
                  <div className="orch-icon-wrap">
                    <IconComp size={22} />
                  </div>
                  <h3 className="orch-card-title">{item.title}</h3>
                  <p className="orch-card-desc">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Pipeline Metrics */}
        <section className="orch-section corp-panel">
          <h2 className="orch-section-title">{orch.metricsTitle}</h2>
          <div className="orch-metrics-grid">
            <div className="orch-metric-card">
              <span className="metric-label">{orch.k1Label}</span>
              <span className="metric-val">{orch.k1Val}</span>
            </div>
            <div className="orch-metric-card">
              <span className="metric-label">{orch.k2Label}</span>
              <span className="metric-val">{orch.k2Val}</span>
            </div>
            <div className="orch-metric-card">
              <span className="metric-label">{orch.k3Label}</span>
              <span className="metric-val">{orch.k3Val}</span>
            </div>
            <div className="orch-metric-card">
              <span className="metric-label">{orch.k4Label}</span>
              <span className="metric-val">{orch.k4Val}</span>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="orch-cta-banner text-center">
          <h3>{orch.ctaTitle}</h3>
          <p>{orch.ctaSubtitle}</p>
          <button type="button" className="btn-corporate-primary" onClick={handleCtaClick}>
            <span>{orch.ctaBtn}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
