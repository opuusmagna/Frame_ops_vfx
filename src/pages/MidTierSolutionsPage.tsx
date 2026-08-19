import React from 'react';
import { Server, HardDrive, ShieldCheck, CheckCircle2, ArrowRight, Network, Workflow } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import './MidTierSolutionsPage.css';

export const MidTierSolutionsPage: React.FC = () => {
  const { navigatePath, lang } = useLanguage();
  const isEs = lang === 'es';

  const handleCtaClick = () => {
    const contactPath = lang === 'en' ? '/en/contact/?service=mid-tier-solutions' : '/es/contacto/?service=mid-tier-solutions';
    navigatePath(contactPath);
  };

  const capabilities = [
    {
      icon: Network,
      title: isEs ? 'Conmutación de Red 10/25GbE de Baja Latencia' : 'Low-Latency 10/25GbE Network Switching',
      desc: isEs
        ? 'Enlaces de alta velocidad a estaciones de composición Nuke, 3D y salas de edición para evitar parones en la reproducción concurrente de secuencias máster EXR y DPX.'
        : 'High-speed links to Nuke comp, 3D workstations, and edit suites avoiding playout drops during concurrent uncompressed EXR and DPX master streaming.',
    },
    {
      icon: HardDrive,
      title: isEs ? 'Almacenamiento Centralizado ZFS / NVMe Tier-0' : 'Tier-0 ZFS / NVMe Centralized Storage',
      desc: isEs
        ? 'Cachés NVMe de alta velocidad combinadas con pools ZFS ajustados a 1MB de recordsize para absorber IOPS aleatorios y garantizar lectura secuencial sostenida.'
        : 'High-speed NVMe caching layered over ZFS pools tuned with 1MB recordsize to absorb random IOPS and ensure sustained sequential reads.',
    },
    {
      icon: Workflow,
      title: isEs ? 'Orquestación de Render Farm & Licencias' : 'Render Farm & License Orchestration',
      desc: isEs
        ? 'Integración de AWS Thinkbox Deadline para gestión de colas CPU/GPU y control dinámico de licencias flotantes multi-engine.'
        : 'AWS Thinkbox Deadline integration for CPU/GPU queue control and dynamic multi-engine floating license management.',
    },
    {
      icon: ShieldCheck,
      title: isEs ? 'Resguardo Inmutable 3-2-1-1 & Resiliencia' : 'Immutable 3-2-1-1 Backup & Resilience',
      desc: isEs
        ? 'Protección integral de proyectos con copias inmutables locales, réplica externa y aislamiento de datos para garantizar la recuperación ante desastres.'
        : 'Comprehensive project data protection with local immutable backups, off-site replication, and air-gapped isolation for disaster recovery.',
    },
  ];

  return (
    <div className="mid-tier-solutions-page page-with-top-padding">
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
          <span className="crumb-active">{isEs ? 'Infraestructura Mid-Tier' : 'Mid-Tier Infrastructure'}</span>
        </nav>

        {/* Header Hero */}
        <header className="page-header text-center">
          <span className="section-kicker">
            {isEs ? 'ESTUDIOS ESPECIALIZADOS Y MEDIANOS (10 - 30 PUESTOS)' : 'SPECIALIZED & MID-SIZE STUDIOS (10 - 30 WORKSTATIONS)'}
          </span>
          <h1 className="page-title">
            {isEs ? 'Infraestructura Tecnológica Mid-Tier para VFX y Posproducción' : 'Mid-Tier Technology Infrastructure for VFX & Post-Production'}
          </h1>
          <p className="page-subtitle">
            {isEs
              ? 'Arquitectura tecnológica optimizada para estudios en fase de crecimiento, garantizando alta disponibilidad, cero parones de red y protección inmutable del proyecto.'
              : 'Optimized infrastructure blueprint for growing studios, ensuring high availability, zero network stalls, and immutable project data protection.'}
          </p>
        </header>

        {/* Capabilities Grid */}
        <section className="mid-capabilities-section corp-panel margin-top-xl">
          <h2 className="section-title text-center margin-bottom-lg">
            {isEs ? 'Pilares Tecnológicos de la Arquitectura Mid-Tier' : 'Mid-Tier Architecture Core Pillars'}
          </h2>
          <div className="mid-grid">
            {capabilities.map((cap, idx) => {
              const IconComp = cap.icon;
              return (
                <div key={idx} className="mid-cap-card">
                  <div className="mid-icon-box">
                    <IconComp size={24} />
                  </div>
                  <h3 className="mid-cap-title">{cap.title}</h3>
                  <p className="mid-cap-desc">{cap.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Target Specs Summary */}
        <section className="mid-specs-box corp-panel margin-top-lg">
          <div className="specs-header-row">
            <Server size={22} className="specs-icon" />
            <h3>{isEs ? 'Especificaciones Tipo de Arquitectura Mid-Tier' : 'Mid-Tier Architecture Target Specifications'}</h3>
          </div>
          <div className="specs-bullets-grid margin-top-md">
            <div className="spec-bullet-item">
              <CheckCircle2 size={16} className="bullet-icon" />
              <span>{isEs ? 'Puestos de Trabajo: 10 a 30 nodos de artistas' : 'Workstations: 10 to 30 artist seats'}</span>
            </div>
            <div className="spec-bullet-item">
              <CheckCircle2 size={16} className="bullet-icon" />
              <span>{isEs ? 'Almacenamiento: ZFS NVMe 50TB - 200TB Tier-0' : 'Storage: ZFS NVMe 50TB - 200TB Tier-0'}</span>
            </div>
            <div className="spec-bullet-item">
              <CheckCircle2 size={16} className="bullet-icon" />
              <span>{isEs ? 'Red: Conmutación 10/25GbE con Jumbo Frames 9000 MTU' : 'Networking: 10/25GbE switching with 9000 MTU Jumbo Frames'}</span>
            </div>
            <div className="spec-bullet-item">
              <CheckCircle2 size={16} className="bullet-icon" />
              <span>{isEs ? 'Granja de Render: 10 a 40 nodos CPU/GPU controlados en Deadline' : 'Render Farm: 10 to 40 CPU/GPU nodes managed in Deadline'}</span>
            </div>
          </div>
        </section>

        {/* Contextual CTA */}
        <div className="text-center margin-top-xl">
          <button type="button" className="btn-corporate-primary btn-hero-lg" onClick={handleCtaClick}>
            <span>{isEs ? 'SOLICITAR DIAGNÓSTICO MID-TIER' : 'REQUEST MID-TIER ASSESSMENT'}</span>
            <ArrowRight size={18} className="btn-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};
