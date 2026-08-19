import React from 'react';
import { HardDrive, Database, Layers, ShieldCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import './StorageDataSystemsPage.css';

export const StorageDataSystemsPage: React.FC = () => {
  const { t, navigatePath, lang } = useLanguage();

  const isEs = lang === 'es';

  const st = (t as any).storagePage || {
    kicker: isEs ? 'ALMACENAMIENTO & DATOS DE ALTO ANCHO DE BANDA' : 'HIGH-THROUGHPUT STORAGE & DATA',
    title: isEs ? 'Arquitecturas de Almacenamiento NVMe/ZFS para Pipelines VFX' : 'NVMe/ZFS Tiered Storage Architectures for VFX Pipelines',
    subtitle: isEs
      ? 'Sistemas de datos por capas diseñados para combinar IOPS aleatorios masivos (cachés de Houdini y mapas de texturas) con throughput secuencial sostenido para la granja de render.'
      : 'Tiered data systems engineered to combine massive random IOPS (Houdini caches & textures) with sustained sequential throughput for render pools.',
    scopeTitle: isEs ? 'Tecnologías de Almacenamiento de Grado Producción' : 'Production-Grade Storage Technologies',
    p1Title: isEs ? 'Capas NVMe-oF & ZFS ZPOOLs Enterprise' : 'NVMe-oF Layering & Enterprise ZFS ZPOOLs',
    p1Desc: isEs ? 'Cachés NVMe ultrarrápidas sobre redes fabric combinadas con pools ZFS autoreparables con protección contra la corrupción silenciosa de datos.' : 'Ultra-fast NVMe fabrics combined with self-healing ZFS pools protecting against silent data corruption.',
    p2Title: isEs ? 'Integración Multi-Protocolo (NFSv4.1, SMB3 & SAN/NAS)' : 'Multi-Protocol Integration (NFSv4.1, SMB3 & SAN/NAS)',
    p2Desc: isEs ? 'Acceso de alto ancho de banda optimizado para estaciones Linux (Nuke/Houdini/Maya), macOS (Flame/DaVinci) y Windows.' : 'High-throughput access optimized for Linux workstations (Nuke/Houdini/Maya), macOS (Flame/DaVinci), and Windows.',
    p3Title: isEs ? 'Snapshots ZFS Inmutables Automatizados' : 'Automated Immutable ZFS Snapshots',
    p3Desc: isEs ? 'Instantáneas horarias sin penalización de rendimiento para recuperación inmediata de proyectos o rollback ante ataques.' : 'Hourly snapshots with zero performance impact for instant project rollbacks and ransomware resilience.',
    p4Title: isEs ? 'Replicación Cifrada Offsite & Archivo LTO-8/9' : 'Encrypted Offsite Replication & LTO-8/9 Archiving',
    p4Desc: isEs ? 'Flujos de preservación digital y archivo a cinta aislada (air-gapped) en conformidad con los estándares de entrega de los majors de Hollywood.' : 'Digital preservation workflows and air-gapped tape archives compliant with Hollywood studio delivery standards.',
    metricsTitle: isEs ? 'Métricas de Rendimiento del Almacenamiento' : 'Storage Performance Metrics',
    k1Label: isEs ? 'Rendimiento Sostenido' : 'Sustained Throughput',
    k1Val: isEs ? 'Multi-Gb/s Lectura / Escritura' : 'Multi-Gb/s Read / Write',
    k2Label: isEs ? 'Integridad de Datos' : 'Data Integrity',
    k2Val: isEs ? 'ZFS Checksums & Self-Healing' : 'ZFS Checksums & Self-Healing',
    k3Label: isEs ? 'Protección Inmutable' : 'Immutable Protection',
    k3Val: isEs ? 'Snapshots sin penalización' : 'Zero-penalty Snapshots',
    k4Label: isEs ? 'Estándar Archivo' : 'Archival Standard',
    k4Val: isEs ? 'LTO-8 / LTO-9 Tape Integration' : 'LTO-8 / LTO-9 Tape Integration',
    ctaTitle: isEs ? '¿Tu almacenamiento se satura al leer texturas o escribir renders?' : 'Does your storage bottleneck when loading textures or writing renders?',
    ctaSubtitle: isEs ? 'Diseñamos e implantamos soluciones de almacenamiento ZFS/NVMe a medida para tu pipeline.' : 'We design and deploy custom ZFS/NVMe storage architectures for your pipeline.',
    ctaBtn: isEs ? 'SOLICITAR CONSULTORÍA DE ALMACENAMIENTO' : 'REQUEST A STORAGE ASSESSMENT',
  };

  const breadcrumbs = {
    home: isEs ? 'Inicio' : 'Home',
    services: isEs ? 'Servicios' : 'Services',
    storageData: isEs ? 'Almacenamiento y Datos' : 'Storage & Data Systems',
  };

  const handleCtaClick = () => {
    const contactPath = isEs ? '/es/contacto/?service=almacenamiento' : '/en/contact/?service=storage';
    navigatePath(contactPath);
  };

  const pillars = [
    { icon: HardDrive, title: st.p1Title, desc: st.p1Desc },
    { icon: Database, title: st.p2Title, desc: st.p2Desc },
    { icon: Layers, title: st.p3Title, desc: st.p3Desc },
    { icon: ShieldCheck, title: st.p4Title, desc: st.p4Desc },
  ];

  return (
    <div className="storage-data-page page-with-top-padding">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav className="page-breadcrumbs" aria-label="Breadcrumb">
          <a href={isEs ? '/es/' : '/en/'} onClick={(e) => { e.preventDefault(); navigatePath(isEs ? '/es/' : '/en/'); }}>{breadcrumbs.home}</a>
          <span className="crumb-sep">/</span>
          <a href={isEs ? '/es/servicios/' : '/en/services/'} onClick={(e) => { e.preventDefault(); navigatePath(isEs ? '/es/servicios/' : '/en/services/'); }}>{breadcrumbs.services}</a>
          <span className="crumb-sep">/</span>
          <span className="crumb-active">{breadcrumbs.storageData}</span>
        </nav>

        {/* Header Hero */}
        <header className="page-header text-center">
          <span className="section-kicker">{st.kicker}</span>
          <h1 className="page-title">{st.title}</h1>
          <p className="page-subtitle">{st.subtitle}</p>
        </header>

        {/* Core Pillars Grid */}
        <section className="st-section corp-panel">
          <h2 className="st-section-title">{st.scopeTitle}</h2>
          <div className="st-grid">
            {pillars.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="st-card">
                  <div className="st-icon-wrap">
                    <IconComp size={22} />
                  </div>
                  <h3 className="st-card-title">{item.title}</h3>
                  <p className="st-card-desc">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Storage Metrics */}
        <section className="st-section corp-panel">
          <h2 className="st-section-title">{st.metricsTitle}</h2>
          <div className="st-metrics-grid">
            <div className="st-metric-card">
              <span className="metric-label">{st.k1Label}</span>
              <span className="metric-val">{st.k1Val}</span>
            </div>
            <div className="st-metric-card">
              <span className="metric-label">{st.k2Label}</span>
              <span className="metric-val">{st.k2Val}</span>
            </div>
            <div className="st-metric-card">
              <span className="metric-label">{st.k3Label}</span>
              <span className="metric-val">{st.k3Val}</span>
            </div>
            <div className="st-metric-card">
              <span className="metric-label">{st.k4Label}</span>
              <span className="metric-val">{st.k4Val}</span>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="st-cta-banner text-center">
          <h3>{st.ctaTitle}</h3>
          <p>{st.ctaSubtitle}</p>
          <button type="button" className="btn-corporate-primary" onClick={handleCtaClick}>
            <span>{st.ctaBtn}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
