import React from 'react';
import { Monitor, Network, HardDrive, Cpu, ShieldCheck, ArrowRight, ArrowDown } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import './ArchitectureFlowSection.css';

export const ArchitectureFlowSection: React.FC = () => {
  const { t, lang } = useLanguage();
  const a = t.architecture;
  const isEs = lang === 'es';

  const flowSteps = [
    {
      id: 'workstations',
      icon: Monitor,
      title: isEs ? 'Puestos y Editorial' : 'Workstations & Editorial',
      desc: isEs ? 'Nuke, Houdini, Maya, Unreal Engine' : 'Nuke, Houdini, Maya, Unreal Engine',
      badge: '10/25GbE',
    },
    {
      id: 'network',
      icon: Network,
      title: isEs ? 'Red 10/25/40/100GbE' : '10/25/40/100GbE Network',
      desc: isEs ? 'Troncal de conmutación de baja latencia' : 'Low-latency core switching backbone',
      badge: isEs ? 'RED TRONCAL' : 'Spine-Leaf',
    },
    {
      id: 'storage',
      icon: HardDrive,
      title: isEs ? 'Almacenamiento ZFS / NVMe' : 'ZFS & NVMe Storage',
      desc: isEs ? 'Pools por capas Tier-0 / SAN / NAS' : 'Layered Tier-0 NVMe & ZFS Pools',
      badge: isEs ? 'ALTO RENDIMIENTO DE E/S' : 'High IOPS',
    },
    {
      id: 'render',
      icon: Cpu,
      title: isEs ? 'Granja Deadline' : 'Deadline Render Farm',
      desc: isEs ? 'Orquestación de nodos CPU / GPU' : 'AWS Thinkbox Deadline CPU/GPU Cluster',
      badge: isEs ? 'ORQUESTACIÓN' : 'Orchestration',
    },
    {
      id: 'protection',
      icon: ShieldCheck,
      title: isEs ? 'Protección 3-2-1-1' : '3-2-1-1 Protection',
      desc: isEs ? 'Copia inmutable, LTO y réplica nube' : 'Immutable Local, LTO Tape & Cloud DR',
      badge: isEs ? 'RESILIENCIA' : 'Resilience',
    },
  ];

  return (
    <section id="architecture" className="architecture-section section-with-bg">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-kicker">{a.kicker}</span>
          <h2 className="section-title">{a.title}</h2>
          <p className="section-subtitle">{a.desc}</p>
        </div>

        <div className="architecture-flow-wrapper corp-panel">
          <div className="flow-steps-container">
            {flowSteps.map((step, idx) => {
              const IconComp = step.icon;
              const isLast = idx === flowSteps.length - 1;
              return (
                <React.Fragment key={step.id}>
                  <div className="flow-step-card">
                    <span className="flow-badge">{step.badge}</span>
                    <div className="flow-icon-box">
                      <IconComp size={24} />
                    </div>
                    <h3 className="flow-step-title">{step.title}</h3>
                    <p className="flow-step-desc">{step.desc}</p>
                  </div>

                  {!isLast && (
                    <div className="flow-connector">
                      <ArrowRight size={20} className="arrow-horizontal" />
                      <ArrowDown size={20} className="arrow-vertical" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
