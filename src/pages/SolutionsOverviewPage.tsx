import React from 'react';
import { Cpu, ArrowRight, Building2, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import './SolutionsOverviewPage.css';

export const SolutionsOverviewPage: React.FC = () => {
  const { navigatePath, lang } = useLanguage();
  const isEs = lang === 'es';

  const handleCtaClick = (path: string) => {
    navigatePath(path);
  };

  const handleContactClick = (serviceKey: string) => {
    const contactPath = lang === 'en' ? `/en/contact/?service=${serviceKey}` : `/es/contacto/?service=${serviceKey}`;
    navigatePath(contactPath);
  };

  return (
    <div className="solutions-overview-page page-with-top-padding">
      <div className="container">
        {/* Breadcrumbs */}
        <nav className="page-breadcrumbs" aria-label="Breadcrumb">
          <a href={isEs ? '/es/' : '/en/'} onClick={(e) => { e.preventDefault(); navigatePath(isEs ? '/es/' : '/en/'); }}>
            {isEs ? 'Inicio' : 'Home'}
          </a>
          <span className="crumb-sep">/</span>
          <span className="crumb-active">{isEs ? 'Soluciones' : 'Solutions'}</span>
        </nav>

        {/* Header Hero */}
        <header className="page-header text-center">
          <span className="section-kicker">
            {isEs ? 'MODELOS DE ARQUITECTURA TECNOLÓGICA' : 'TECHNOLOGY ARCHITECTURE MODELS'}
          </span>
          <h1 className="page-title">
            {isEs ? 'Arquitecturas Tecnológicas Adaptativas para VFX y Posproducción' : 'Adaptive Technology Architectures for VFX & Post-Production'}
          </h1>
          <p className="page-subtitle">
            {isEs
              ? 'Diseños de infraestructura dimensionados según la escala operativa del estudio, optimizando ancho de banda de red, IOPS de almacenamiento y capacidad de renderizado.'
              : 'Infrastructure blueprints scaled to studio operational velocity, optimizing network throughput, storage IOPS, and render capacity.'}
          </p>
        </header>

        {/* Solutions Grid */}
        <section className="sol-overview-grid margin-top-xl">
          {/* Mid-Tier Card */}
          <div className="sol-tier-card corp-panel">
            <div className="tier-header-badge">
              <Cpu size={24} className="tier-icon" />
              <span className="tier-tag">{isEs ? '10 A 30 PUESTOS' : '10 TO 30 SEATS'}</span>
            </div>
            <h2 className="tier-card-title">
              {isEs ? 'Infraestructura Mid-Tier' : 'Mid-Tier Infrastructure'}
            </h2>
            <p className="tier-card-desc">
              {isEs
                ? 'Arquitectura optimizada para estudios de tamaño medio en fase de crecimiento, combinando almacenamiento centralizado ZFS/NVMe Tier-0 con conmutación de alta velocidad 10/25GbE.'
                : 'Optimized architecture for growing mid-sized studios, pairing Tier-0 ZFS/NVMe centralized storage with high-speed 10/25GbE switching.'}
            </p>
            <ul className="tier-feature-list">
              <li>
                <CheckCircle2 size={16} className="feat-icon" />
                <span>{isEs ? 'Conmutación de red 10/25GbE de baja latencia' : 'Low-latency 10/25GbE network switching'}</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="feat-icon" />
                <span>{isEs ? 'Caché NVMe Tier-0 + Pools ZFS autoreparables' : 'Tier-0 NVMe cache + Self-healing ZFS pools'}</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="feat-icon" />
                <span>{isEs ? 'Orquestación de render Deadline & Licencias flotantes' : 'Deadline render orchestration & Floating licensing'}</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="feat-icon" />
                <span>{isEs ? 'Estrategia de resguardo 3-2-1-1 inmutable' : 'Immutable 3-2-1-1 backup strategy'}</span>
              </li>
            </ul>
            <div className="tier-actions">
              <button
                type="button"
                className="btn-corporate-primary"
                onClick={() => handleCtaClick(isEs ? '/es/soluciones-mid-tier/' : '/en/solutions-mid-tier/')}
              >
                <span>{isEs ? 'VER ARQUITECTURA MID-TIER' : 'EXPLORE MID-TIER ARCHITECTURE'}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Enterprise Card */}
          <div className="sol-tier-card corp-panel highlight-tier">
            <div className="tier-header-badge">
              <Building2 size={24} className="tier-icon enterprise-icon" />
              <span className="tier-tag enterprise-tag">{isEs ? '30+ PUESTOS MULTISEDE' : '30+ SEATS MULTI-SITE'}</span>
            </div>
            <h2 className="tier-card-title">
              {isEs ? 'Infraestructura Enterprise' : 'Enterprise Infrastructure'}
            </h2>
            <p className="tier-card-desc">
              {isEs
                ? 'Plataforma de alta disponibilidad para grandes producciones y entornos multisede, equipada con redes troncales 40/100GbE, almacenamiento distribuido NVMe-oF y controles TPN/MPA.'
                : 'High-availability platform for enterprise productions and multi-site studios, featuring 40/100GbE backbones, NVMe-oF distributed storage, and TPN/MPA compliance.'}
            </p>
            <ul className="tier-feature-list">
              <li>
                <CheckCircle2 size={16} className="feat-icon" />
                <span>{isEs ? 'Redes troncales Spine-Leaf 40/100GbE (MLAG redundante)' : '40/100GbE Spine-Leaf backbones (Redundant MLAG)'}</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="feat-icon" />
                <span>{isEs ? 'Almacenamiento NVMe-oF / ZFS SAN de alto throughput' : 'High-throughput NVMe-oF / ZFS SAN storage'}</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="feat-icon" />
                <span>{isEs ? 'Cloud Bursting & Orquestación Clustered >100 nodos' : 'Cloud Bursting & Clustered Orchestration >100 nodes'}</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="feat-icon" />
                <span>{isEs ? 'Seguridad Zero Trust & Cumplimiento TPN / MPA' : 'Zero Trust Security & TPN / MPA Compliance'}</span>
              </li>
            </ul>
            <div className="tier-actions">
              <button
                type="button"
                className="btn-corporate-primary btn-hero-lg"
                onClick={() => handleCtaClick(isEs ? '/es/soluciones-enterprise/' : '/en/solutions-enterprise/')}
              >
                <span>{isEs ? 'VER ARQUITECTURA ENTERPRISE' : 'EXPLORE ENTERPRISE ARCHITECTURE'}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* Global Architecture Value Banner */}
        <section className="sol-global-banner corp-panel margin-top-xl text-center">
          <h3 className="global-banner-title">
            {isEs ? '¿Necesitas un dimensionamiento a medida para tu estudio?' : 'Need a custom infrastructure sizing for your studio?'}
          </h3>
          <p className="global-banner-desc">
            {isEs
              ? 'Realizamos diagnósticos de ingeniería consultiva analizando IOPS de almacenamiento, cuellos de botella de red y rendimiento de render antes de proponer cualquier inversión.'
              : 'We perform consultative engineering assessments analyzing storage IOPS, network bottlenecks, and render farm throughput before proposing hardware investments.'}
          </p>
          <div className="margin-top-md">
            <button
              type="button"
              className="btn-corporate-primary btn-hero-lg"
              onClick={() => handleContactClick('solutions-assessment')}
            >
              <span>{isEs ? 'SOLICITAR DIAGNÓSTICO TÉCNICO' : 'REQUEST TECHNICAL ASSESSMENT'}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
