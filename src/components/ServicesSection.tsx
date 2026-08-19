import React from 'react';
import { Server, Network, HardDrive, Cpu, Database, ShieldCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import './ServicesSection.css';

export const ServicesSection: React.FC = () => {
  const { t, navigatePath, lang } = useLanguage();
  const s = t.services;

  const pillars = [
    {
      id: 'vfx-infrastructure',
      icon: Server,
      title: s.vfxInfra.title,
      subtitle: s.vfxInfra.subtitle,
      description: s.vfxInfra.description,
      capabilities: s.vfxInfra.capabilities,
      link: lang === 'en' ? '/en/managed-services/' : '/es/servicios-gestionados/',
      btnLabel: lang === 'en' ? 'B2B MANAGED SERVICES' : 'SERVICIOS GESTIONADOS B2B',
    },
    {
      id: 'high-performance-networks',
      icon: Network,
      title: s.highNetworks.title,
      subtitle: s.highNetworks.subtitle,
      description: s.highNetworks.description,
      capabilities: s.highNetworks.capabilities,
      link: lang === 'en' ? '/en/contact/?service=networks' : '/es/contacto/?service=redes',
      btnLabel: t.hero.ctaSecondary,
    },
    {
      id: 'storage-data',
      icon: HardDrive,
      title: s.storageData.title,
      subtitle: s.storageData.subtitle,
      description: s.storageData.description,
      capabilities: s.storageData.capabilities,
      link: lang === 'en' ? '/en/contact/?service=storage' : '/es/contacto/?service=almacenamiento',
      btnLabel: t.hero.ctaSecondary,
    },
    {
      id: 'render-pipeline',
      icon: Cpu,
      title: s.renderPipeline.title,
      subtitle: s.renderPipeline.subtitle,
      description: s.renderPipeline.description,
      capabilities: s.renderPipeline.capabilities,
      link: lang === 'en' ? '/en/contact/?service=render' : '/es/contacto/?service=render',
      btnLabel: t.hero.ctaSecondary,
    },
    {
      id: 'backup-disaster-recovery',
      icon: Database,
      title: s.backupDr.title,
      subtitle: s.backupDr.subtitle,
      description: s.backupDr.description,
      capabilities: s.backupDr.capabilities,
      link: lang === 'en' ? '/en/backup-disaster-recovery/' : '/es/backup-disaster-recovery/',
      btnLabel: lang === 'en' ? '3-2-1-1 DR STRATEGY' : 'ESTRATEGIA 3-2-1-1 COMPLETA',
    },
    {
      id: 'cybersecurity-compliance',
      icon: ShieldCheck,
      title: s.cybersecurity.title,
      subtitle: s.cybersecurity.subtitle,
      description: s.cybersecurity.description,
      capabilities: s.cybersecurity.capabilities,
      link: lang === 'en' ? '/en/contact/?service=security' : '/es/contacto/?service=seguridad',
      btnLabel: t.hero.ctaSecondary,
    },
  ];

  return (
    <section id="services" className="services-section section-with-bg">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-kicker">{s.kicker}</span>
          <h2 className="section-title">{s.title}</h2>
          <p className="section-subtitle">{s.subtitle}</p>
        </div>

        {/* Dedicated B2B Specialties Hero Banner */}
        <div className="services-specialties-banner">
          <div 
            className="specialty-banner-card" 
            onClick={() => navigatePath(lang === 'en' ? '/en/managed-services/' : '/es/servicios-gestionados/')}
          >
            <div className="specialty-icon-wrap">
              <Cpu size={24} />
            </div>
            <div className="specialty-text-content">
              <span className="specialty-kicker">ESPECIALIDAD OPERATIVA DEDICADA</span>
              <h4 className="specialty-title">{lang === 'en' ? 'B2B Managed Services' : 'Servicios Gestionados B2B'}</h4>
              <p className="specialty-desc">{lang === 'en' ? '24/7 dedicated operations, proactive infrastructure monitoring & SLA-backed support.' : 'Operación 24/7 dedicada, monitorización proactiva de infraestructura y soporte con SLA.'}</p>
            </div>
            <button type="button" className="specialty-cta-btn">
              <span>{lang === 'en' ? 'EXPLORE MANAGED SERVICES' : 'VER SERVICIOS GESTIONADOS'}</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div 
            className="specialty-banner-card" 
            onClick={() => navigatePath(lang === 'en' ? '/en/backup-disaster-recovery/' : '/es/backup-disaster-recovery/')}
          >
            <div className="specialty-icon-wrap">
              <ShieldCheck size={24} />
            </div>
            <div className="specialty-text-content">
              <span className="specialty-kicker">RESILIENCIA & CONTINUIDAD DE NEGOCIO</span>
              <h4 className="specialty-title">{lang === 'en' ? 'Backup & Disaster Recovery' : 'Backup & Recuperación DR'}</h4>
              <p className="specialty-desc">{lang === 'en' ? '3-2-1-1 backup strategy, immutable storage, LTO tape isolation & recovery drills.' : 'Estrategia de copia 3-2-1-1, almacenamiento inmutable, cinta LTO y simulacros de DR.'}</p>
            </div>
            <button type="button" className="specialty-cta-btn">
              <span>{lang === 'en' ? 'EXPLORE BACKUP & DR' : 'VER ESTRATEGIA BACKUP & DR'}</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* 6 Engineering Core Cards */}
        <div className="services-grid">
          {pillars.map((pillar) => {
            const IconComp = pillar.icon;
            return (
              <div key={pillar.id} className="service-card corp-panel">
                <div className="service-icon-box">
                  <IconComp size={24} />
                </div>
                <h3 className="service-title">{pillar.title}</h3>
                <span className="service-subtitle">{pillar.subtitle}</span>
                <p className="service-description">{pillar.description}</p>

                <ul className="service-capabilities-list">
                  {pillar.capabilities.map((cap: string, idx: number) => (
                    <li key={idx}>
                      <span className="cap-bullet" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className="btn-service-detail"
                  onClick={() => navigatePath(pillar.link)}
                >
                  <span>{pillar.btnLabel}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
