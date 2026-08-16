import React from 'react';
import { Cpu, ShieldCheck, Activity, Database, Wrench, FileCheck, Users, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import './ManagedServicesPage.css';

export const ManagedServicesPage: React.FC = () => {
  const { t, navigatePath, lang } = useLanguage();
  const m = t.managedServicesPage;

  const handleCtaClick = () => {
    const contactPath = lang === 'en' ? '/en/contact/?service=managed-services' : '/es/contacto/?service=managed-services';
    navigatePath(contactPath);
  };

  const servicesList = [
    { icon: Activity, text: m.s1 },
    { icon: Database, text: m.s2 },
    { icon: ShieldCheck, text: m.s3 },
    { icon: Wrench, text: m.s4 },
    { icon: Cpu, text: m.s5 },
    { icon: FileCheck, text: m.s6 },
    { icon: Users, text: m.s7 },
  ];

  return (
    <div className="managed-services-page page-with-top-padding">
      <div className="container">
        {/* Header Hero */}
        <header className="page-header text-center">
          <span className="section-kicker">{m.kicker}</span>
          <h1 className="page-title">{m.title}</h1>
          <p className="page-subtitle">{m.subtitle}</p>
        </header>

        {/* Scope Section */}
        <section className="ms-section corp-panel">
          <h2 className="ms-section-title">{m.servicesTitle}</h2>
          <div className="ms-services-grid">
            {servicesList.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="ms-service-card">
                  <div className="ms-icon-wrap">
                    <IconComp size={22} />
                  </div>
                  <p className="ms-service-text">{item.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Support Scope Box */}
        <section className="ms-section corp-panel highlight-box">
          <h2 className="ms-section-title">{m.opsTitle}</h2>
          <p className="ms-ops-desc">{m.opsDesc}</p>
        </section>

        {/* Contextual CTA */}
        <div className="text-center margin-top-xl">
          <button type="button" className="btn-corporate-primary btn-hero-lg" onClick={handleCtaClick}>
            <span>{t.hero.ctaPrimary}</span>
            <ArrowRight size={18} className="btn-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};
