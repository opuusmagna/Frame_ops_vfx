import React from 'react';
import { Building2, Server, CheckCircle2, ArrowRight, Network, Lock, Cloud } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import './EnterpriseSolutionsPage.css';

export const EnterpriseSolutionsPage: React.FC = () => {
  const { navigatePath, lang } = useLanguage();
  const isEs = lang === 'es';

  const handleCtaClick = () => {
    const contactPath = lang === 'en' ? '/en/contact/?service=enterprise-solutions' : '/es/contacto/?service=enterprise-solutions';
    navigatePath(contactPath);
  };

  const capabilities = [
    {
      icon: Network,
      title: isEs ? 'Redes Troncales Spine-Leaf 40/100GbE' : '40/100GbE Spine-Leaf Backbones',
      desc: isEs
        ? 'Arquitecturas troncales de ultra baja latencia (<300ns) con trunking MLAG y redundancia activo-activo para transferencia masiva de datos sin cuellos de botella (100% neutral de marca).'
        : 'Ultra-low latency (<300ns) backbone architectures with MLAG trunking and active-active redundancy for massive data transfers without bottlenecks (vendor-neutral).',
    },
    {
      icon: Server,
      title: isEs ? 'Almacenamiento Distribuido NVMe-oF / ZFS SAN' : 'NVMe-oF / ZFS SAN Distributed Storage',
      desc: isEs
        ? 'Pools de datos por capas diseñados para combinar IOPS aleatorios masivos (cachés de simulación en Houdini) con throughput secuencial sostenido para la granja de render.'
        : 'Tiered data pools engineered to combine massive random IOPS (Houdini simulation caches) with sustained sequential throughput for render farm nodes.',
    },
    {
      icon: Cloud,
      title: isEs ? 'Cloud Bursting & Orquestación Clustered >100 Nodos' : 'Cloud Bursting & Clustered Orchestration >100 Nodes',
      desc: isEs
        ? 'Despliegue y optimización de granjas Deadline CPU/GPU con escalado híbrido a la nube cuando se requiera capacidad de renderizado masiva durante cierres de producción.'
        : 'Deadline CPU/GPU render farm deployment and optimization with automated hybrid cloud bursting when massive compute capacity is needed for production crunch times.',
    },
    {
      icon: Lock,
      title: isEs ? 'Seguridad Zero Trust & Auditorías TPN / MPA' : 'Zero Trust Security & TPN / MPA Audit Readiness',
      desc: isEs
        ? 'Microsegmentación ZTNA, autenticación multifactor MFA y perímetros de red aislados para superar evaluaciones de seguridad TPN y MPA Content Security Best Practices.'
        : 'ZTNA micro-segmentation, MFA authentication, and isolated perimeters aligned with TPN assessments and MPA Content Security Best Practices.',
    },
  ];

  return (
    <div className="enterprise-solutions-page page-with-top-padding">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav className="page-breadcrumbs" aria-label="Breadcrumb">
          <a href={isEs ? '/es/' : '/en/'} onClick={(e) => { e.preventDefault(); navigatePath(isEs ? '/es/' : '/en/'); }}>
            {isEs ? 'Inicio' : 'Home'}
          </a>
          <span className="crumb-sep">/</span>
          <a href={isEs ? '/es/soluciones/' : '/en/solutions/'} onClick={(e) => { e.preventDefault(); navigatePath(isEs ? '/es/soluciones/' : '/en/solutions/'); }}>
            {isEs ? 'Soluciones' : 'Solutions'}
          </a>
          <span className="crumb-sep">/</span>
          <span className="crumb-active">{isEs ? 'Infraestructura Enterprise' : 'Enterprise Infrastructure'}</span>
        </nav>

        {/* Header Hero */}
        <header className="page-header text-center">
          <span className="section-kicker">
            {isEs ? 'ESTUDIOS GRANDES Y ENTORNOS MULTISEDE (30+ PUESTOS)' : 'ENTERPRISE & MULTI-SITE STUDIOS (30+ WORKSTATIONS)'}
          </span>
          <h1 className="page-title">
            {isEs ? 'Infraestructura Tecnológica Enterprise para VFX y Posproducción' : 'Enterprise Technology Infrastructure for VFX & Post-Production'}
          </h1>
          <p className="page-subtitle">
            {isEs
              ? 'Plataforma de ingeniería de alta disponibilidad diseñada para grandes estudios, producciones de gran escala y auditorías de contenido TPN/MPA.'
              : 'High-availability engineering platform designed for enterprise studios, major production pipelines, and TPN/MPA content audits.'}
          </p>
        </header>

        {/* Capabilities Grid */}
        <section className="ent-capabilities-section corp-panel margin-top-xl">
          <h2 className="section-title text-center margin-bottom-lg">
            {isEs ? 'Pilares Tecnológicos de la Arquitectura Enterprise' : 'Enterprise Architecture Core Pillars'}
          </h2>
          <div className="ent-grid">
            {capabilities.map((cap, idx) => {
              const IconComp = cap.icon;
              return (
                <div key={idx} className="ent-cap-card">
                  <div className="ent-icon-box">
                    <IconComp size={24} />
                  </div>
                  <h3 className="ent-cap-title">{cap.title}</h3>
                  <p className="ent-cap-desc">{cap.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Target Specs Summary */}
        <section className="ent-specs-box corp-panel margin-top-lg">
          <div className="specs-header-row">
            <Building2 size={22} className="specs-icon enterprise-color" />
            <h3>{isEs ? 'Especificaciones Tipo de Arquitectura Enterprise' : 'Enterprise Architecture Target Specifications'}</h3>
          </div>
          <div className="specs-bullets-grid margin-top-md">
            <div className="spec-bullet-item">
              <CheckCircle2 size={16} className="bullet-icon enterprise-color" />
              <span>{isEs ? 'Puestos de Trabajo: 30+ a 200+ nodos de artistas multisede' : 'Workstations: 30+ to 200+ multi-site artist seats'}</span>
            </div>
            <div className="spec-bullet-item">
              <CheckCircle2 size={16} className="bullet-icon enterprise-color" />
              <span>{isEs ? 'Almacenamiento: Pools NVMe-oF / ZFS SAN de 200TB a Petabytes' : 'Storage: NVMe-oF / ZFS SAN pools from 200TB to Petabyte scale'}</span>
            </div>
            <div className="spec-bullet-item">
              <CheckCircle2 size={16} className="bullet-icon enterprise-color" />
              <span>{isEs ? 'Red: Core Troncal Spine-Leaf 40/100GbE + 25GbE a puestos' : 'Networking: 40/100GbE Spine-Leaf Core + 25GbE to seats'}</span>
            </div>
            <div className="spec-bullet-item">
              <CheckCircle2 size={16} className="bullet-icon enterprise-color" />
              <span>{isEs ? 'Seguridad & Cumplimiento: Microsegmentación ZTNA y evaluación TPN/MPA' : 'Security & Compliance: ZTNA micro-segmentation and TPN/MPA audit readiness'}</span>
            </div>
          </div>
        </section>

        {/* Contextual CTA */}
        <div className="text-center margin-top-xl">
          <button type="button" className="btn-corporate-primary btn-hero-lg" onClick={handleCtaClick}>
            <span>{isEs ? 'SOLICITAR DIAGNÓSTICO ENTERPRISE' : 'REQUEST ENTERPRISE ASSESSMENT'}</span>
            <ArrowRight size={18} className="btn-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};
