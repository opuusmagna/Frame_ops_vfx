import React, { useState } from 'react';
import { 
  Monitor, 
  Network, 
  HardDrive, 
  Cpu, 
  Database, 
  ShieldCheck, 
  ChevronRight, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { servicesData } from '../config/services';
import type { ServiceItem } from '../config/services';
import './ServicesSection.css';

const iconMap: Record<string, React.ReactNode> = {
  'vfx-infrastructure': <Monitor size={22} />,
  'high-performance-networks': <Network size={22} />,
  'storage-data': <HardDrive size={22} />,
  'render-pipeline': <Cpu size={22} />,
  'backup-disaster-recovery': <Database size={22} />,
  'cybersecurity-compliance': <ShieldCheck size={22} />,
};

export const ServicesSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(servicesData[0].id);

  const activeService = servicesData.find((s) => s.id === activeId) || servicesData[0];
  const capabilitiesList = activeService?.capabilities || [];

  return (
    <section id="services" className="art-services-section section-with-bg">
      <div className="container">
        {/* Section Header */}
        <div className="art-section-header text-center">
          <span className="section-kicker">SPECIALIZED INFRASTRUCTURE</span>
          <h2 className="section-title">CORE SERVICES PILLARS</h2>
          <p className="section-description">
            High-availability engineering built specifically to handle network bandwidth, ZFS IOPS, render burst capacities, and security demands of VFX facilities.
          </p>
        </div>

        {/* Master Interactive 2-Column Split Showcase */}
        <div className="services-showcase-layout">
          {/* Left Column: Tab Selectors */}
          <div className="services-tabs-column">
            {servicesData.map((service: ServiceItem) => {
              const isActive = service.id === activeId;
              return (
                <button
                  key={service.id}
                  className={`service-tab-button ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveId(service.id)}
                >
                  <div className="tab-icon-box">
                    {iconMap[service.id] || <Monitor size={22} />}
                  </div>
                  <div className="tab-text-box">
                    <span className="tab-title">{service.title}</span>
                    <span className="tab-subtitle">{service.subtitle}</span>
                  </div>
                  <ChevronRight size={20} className="tab-arrow" />
                </button>
              );
            })}
          </div>

          {/* Right Column: Spacious Feature Detail Panel */}
          <div className="corp-panel service-detail-box">
            <div>
              <span className="detail-badge">ENGINEERING SPECIFICATION</span>
              <h3 className="detail-title">{activeService.title}</h3>
              <span className="detail-subtitle">{activeService.subtitle}</span>

              <p className="detail-description">{activeService.description}</p>

              <div className="detail-capabilities-section">
                <span className="detail-capabilities-title">CAPABILITY SPECIFICATIONS</span>
                <div className="detail-capabilities-grid">
                  {capabilitiesList.map((cap, idx) => (
                    <div key={idx} className="detail-cap-item">
                      <CheckCircle2 size={18} className="detail-cap-icon" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="detail-action-footer">
              <a href="#contact" className="btn-cyber-primary">
                <span>DISCUSS {activeService.title.toUpperCase()}</span>
                <ArrowRight size={18} className="btn-icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
