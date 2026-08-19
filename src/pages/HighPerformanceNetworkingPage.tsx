import React from 'react';
import { Network, Zap, Shield, Cpu, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import './HighPerformanceNetworkingPage.css';

export const HighPerformanceNetworkingPage: React.FC = () => {
  const { t, navigatePath, lang } = useLanguage();

  const isEs = lang === 'es';

  const net = (t as any).networkingPage || {
    kicker: isEs ? 'INGENIERÍA DE REDES VFX & POST' : 'VFX & POST NETWORK ENGINEERING',
    title: isEs ? 'Redes de Alto Rendimiento para Producción VFX y Acabado' : 'High-Performance Networking for VFX & Post-Production',
    subtitle: isEs
      ? 'Backbones de conmutación 25/100GbE de ultra baja latencia diseñados para eliminar la caída de fotogramas durante la reproducción concurrente de secuencias 4K/8K EXR y DPX.'
      : 'Ultra-low latency 25/100GbE switching backbones engineered to eliminate frame drops during concurrent 4K/8K EXR and DPX playback.',
    scopeTitle: isEs ? 'Arquitectura de Red para Pipelines Exigentes' : 'Network Architecture for High-Concurrency Pipelines',
    p1Title: isEs ? 'Conmutación Spine-Leaf 25/100GbE' : '25/100GbE Spine-Leaf Switching',
    p1Desc: isEs ? 'Topologías de alta densidad con latencia de puerto a puerto inferior a 300ns (Arista/Mellanox) para transferencia sin cuellos de botella.' : 'High-density topologies with sub-300ns port-to-port latency (Arista/Mellanox) for bottleneck-free throughput.',
    p2Title: isEs ? 'Optimización Jumbo Frames (9000 MTU) & RoCE v2' : 'Jumbo Frames (9000 MTU) & RoCE v2 Optimization',
    p2Desc: isEs ? 'Transferencia RDMA zero-copy directamente a memoria GPU para reproducción fluida en Nuke, Flame y DaVinci Resolve.' : 'Zero-copy RDMA transfers directly into GPU memory for smooth playback in Nuke, Flame, and DaVinci Resolve.',
    p3Title: isEs ? 'Trunking MLAG & Agregación LACP Redundante' : 'MLAG Trunking & Redundant LACP Aggregation',
    p3Desc: isEs ? 'Enlaces activos-activos sin punto único de fallo entre servidores de almacenamiento, render pools y estaciones de trabajo.' : 'Active-active links with no single point of failure between storage servers, render pools, and artist workstations.',
    p4Title: isEs ? 'Microsegmentación VLAN & Aislamiento TPN/MPA' : 'VLAN Micro-segmentation & TPN/MPA Isolation',
    p4Desc: isEs ? 'Perímetros de red aislados para la red de artistas, render farm y datos sensibles alineados con TPN Content Security.' : 'Isolated network perimeters for artists, render farms, and client media aligned with TPN Content Security.',
    metricsTitle: isEs ? 'Métricas Clave de Rendimiento de Red' : 'Key Network Performance Metrics',
    k1Label: isEs ? 'Latencia Switch' : 'Switch Latency',
    k1Val: isEs ? '< 300 ns Sostenido' : '< 300 ns Sustained',
    k2Label: isEs ? 'Ancho de Banda Troncal' : 'Backbone Throughput',
    k2Val: isEs ? '25GbE a Puestos / 100GbE Core' : '25GbE Workstations / 100GbE Core',
    k3Label: isEs ? 'Reproducción Concurrente' : 'Concurrent Playback',
    k3Val: isEs ? '4K/8K EXR 16-bit Uncompressed' : '4K/8K EXR 16-bit Uncompressed',
    k4Label: isEs ? 'Cumplimiento Seguridad' : 'Security Compliance',
    k4Val: isEs ? 'Microsegmentación TPN / MPA' : 'TPN / MPA Micro-segmentation',
    ctaTitle: isEs ? '¿Tu red sufre parones durante la reproducción de secuencias 4K/8K?' : 'Does your network suffer frame drops during 4K/8K playback?',
    ctaSubtitle: isEs ? 'Diseñamos e implantamos backbones de red de alta velocidad optimizados para estudios VFX.' : 'We design and deploy high-speed network backbones tailored for VFX studios.',
    ctaBtn: isEs ? 'SOLICITAR CONSULTORÍA DE RED' : 'REQUEST A NETWORK ASSESSMENT',
  };

  const breadcrumbs = {
    home: isEs ? 'Inicio' : 'Home',
    services: isEs ? 'Servicios' : 'Services',
    highNetworks: isEs ? 'Redes de Alto Rendimiento' : 'High-Performance Networking',
  };

  const handleCtaClick = () => {
    const contactPath = isEs ? '/es/contacto/?service=redes' : '/en/contact/?service=networks';
    navigatePath(contactPath);
  };

  const pillars = [
    { icon: Network, title: net.p1Title, desc: net.p1Desc },
    { icon: Zap, title: net.p2Title, desc: net.p2Desc },
    { icon: Cpu, title: net.p3Title, desc: net.p3Desc },
    { icon: Shield, title: net.p4Title, desc: net.p4Desc },
  ];

  return (
    <div className="high-networking-page page-with-top-padding">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav className="page-breadcrumbs" aria-label="Breadcrumb">
          <a href={isEs ? '/es/' : '/en/'} onClick={(e) => { e.preventDefault(); navigatePath(isEs ? '/es/' : '/en/'); }}>{breadcrumbs.home}</a>
          <span className="crumb-sep">/</span>
          <a href={isEs ? '/es/servicios/' : '/en/services/'} onClick={(e) => { e.preventDefault(); navigatePath(isEs ? '/es/servicios/' : '/en/services/'); }}>{breadcrumbs.services}</a>
          <span className="crumb-sep">/</span>
          <span className="crumb-active">{breadcrumbs.highNetworks}</span>
        </nav>

        {/* Header Hero */}
        <header className="page-header text-center">
          <span className="section-kicker">{net.kicker}</span>
          <h1 className="page-title">{net.title}</h1>
          <p className="page-subtitle">{net.subtitle}</p>
        </header>

        {/* Core Pillars Grid */}
        <section className="net-section corp-panel">
          <h2 className="net-section-title">{net.scopeTitle}</h2>
          <div className="net-grid">
            {pillars.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="net-card">
                  <div className="net-icon-wrap">
                    <IconComp size={22} />
                  </div>
                  <h3 className="net-card-title">{item.title}</h3>
                  <p className="net-card-desc">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Network Performance Metrics */}
        <section className="net-section corp-panel">
          <h2 className="net-section-title">{net.metricsTitle}</h2>
          <div className="net-metrics-grid">
            <div className="net-metric-card">
              <span className="metric-label">{net.k1Label}</span>
              <span className="metric-val">{net.k1Val}</span>
            </div>
            <div className="net-metric-card">
              <span className="metric-label">{net.k2Label}</span>
              <span className="metric-val">{net.k2Val}</span>
            </div>
            <div className="net-metric-card">
              <span className="metric-label">{net.k3Label}</span>
              <span className="metric-val">{net.k3Val}</span>
            </div>
            <div className="net-metric-card">
              <span className="metric-label">{net.k4Label}</span>
              <span className="metric-val">{net.k4Val}</span>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="net-cta-banner text-center">
          <h3>{net.ctaTitle}</h3>
          <p>{net.ctaSubtitle}</p>
          <button type="button" className="btn-corporate-primary" onClick={handleCtaClick}>
            <span>{net.ctaBtn}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
