import React, { useState } from 'react';
import { Layers, Network, HardDrive, Cpu, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import './WorkloadIntelligenceSection.css';

export const WorkloadIntelligenceSection: React.FC = () => {
  const { t } = useLanguage();
  const w = t.workload;

  const [activeTab, setActiveTab] = useState<string>('nuke');

  const intelligenceData = [
    {
      id: 'nuke',
      name: w.tabs.nuke,
      vendor: 'Foundry Nuke Playout Sizing',
      subtitle: 'High-Concurrency 4K/8K OpenEXR Sequence Playout',
      overview: 'Compositing workflows require sustained sequential read throughput for multi-layer OpenEXR files. Standard NAS arrays experience I/O stalls during concurrent artist review. Dedicated ZFS recordsize tuning + NVMe Tier-0 caching ensures smooth playout.',
      networkSpec: '25GbE Workstation Access / 100GbE Core Switching',
      storageSpec: 'Tier-0 NVMe SLOG/L2ARC + ZFS Scale-Out (1M recordsize for EXRs)',
      computeSpec: 'High-Clock CPUs + High RAM Density (128GB+ per Nuke seat)',
      securitySpec: 'Encrypted Asset Cache & ZTNA Remote Artist Access',
      benchmarks: [
        'High sustained read bandwidth per 4K playout node',
        'ZFS 1MB recordsize tuning optimizing sequential OpenEXR read IOPS',
        'NVMe Tier-0 cache offloading random read I/O from spinning disks',
        'Smooth playout during concurrent multi-artist Nuke playback',
      ],
    },
    {
      id: 'houdini',
      name: w.tabs.houdini,
      vendor: 'SideFX Houdini Compute & Cache Sizing',
      subtitle: 'FLIP Fluid, Pyro Volume & Vellum Particle Simulation Infrastructure',
      overview: 'FX simulation caching generates multi-terabyte scratch files during fluid, pyro, and particle solve steps. Writing uncompressed sim caches directly to shared NAS storage chokes network IOPS for the entire studio. Local NVMe scratch volumes offload sim writes before staging to ZFS.',
      networkSpec: '100GbE Core Backbone with Dedicated Sim Cache Subnet',
      storageSpec: 'High-Endurance Local NVMe Scratch per FX seat + ZFS Sim Storage',
      computeSpec: 'Deadline CPU Cores per FX seat + High RAM Density (256GB+)',
      securitySpec: 'Isolated FX Sim Subnets & Immutable Backup Repositories',
      benchmarks: [
        'Dedicated NVMe scratch space allocated per FX workstation',
        'Deadline automated queue bursting prioritizing heavy Houdini simulation solves',
        'ZFS write acceleration preventing multi-user I/O stalls',
        'Automated background sim cache sync from local NVMe to project storage',
      ],
    },
    {
      id: 'maya',
      name: w.tabs.maya,
      vendor: 'Autodesk & Chaos Group Render Sizing',
      subtitle: 'Complex Geometry, Multi-Pass Lighting & Render Pool Saturation',
      overview: 'High-density 3D animation pipelines rely on high-volume asset loading and massive GPU/CPU render farm saturation. Scene assembly requires rapid loading of Alembic, USD, and heavy texture maps, while render nodes demand high compute queue utilization.',
      networkSpec: '10/25/100GbE Mixed Switching Array',
      storageSpec: 'High-IOPS Texture NVMe Cache + Scale-Out ZFS Pool',
      computeSpec: 'High-Density GPU Clusters + Deadline Management',
      securitySpec: 'Microsegmentation separating Render Farm from WAN',
      benchmarks: [
        'USD & Alembic asset load times accelerated via NVMe texture caching',
        'Deadline dynamic licensing maximizing CPU/GPU render node utilization',
        'Multi-pass AOV render output streaming without queue bottlenecks',
        'Automated scene file dependency staging to local render farm nodes',
      ],
    },
    {
      id: 'unreal',
      name: w.tabs.unreal,
      vendor: 'Epic Games Unreal Engine ICVFX Sizing',
      subtitle: 'In-Camera VFX, LED Volume nDisplay & PTP Synchronization',
      overview: 'Virtual production LED volumes require multi-node GPU rendering synced via Epic nDisplay. Network latency must remain ultra-low to prevent frame tearing on the LED wall. Precision Time Protocol (PTP IEEE 1588) syncs camera shutters with render node GPUs.',
      networkSpec: '100GbE Spine-Leaf with PTP IEEE 1588 Hardware Clock Sync',
      storageSpec: 'Tier-0 NVMe Fast Live Asset Streaming Pool',
      computeSpec: 'Multi-GPU nDisplay Clusters per Render Node',
      securitySpec: 'Zero-Trust Closed Production Volume Network',
      benchmarks: [
        'Low glass-to-glass latency across nDisplay LED render nodes',
        'PTP IEEE 1588 hardware clock synchronization locking camera to LED wall',
        'Real-time texture streaming into Unreal Engine memory',
        'Reliable playout during live camera movement inside the LED volume',
      ],
    },
  ];

  const profile = intelligenceData.find((p) => p.id === activeTab) || intelligenceData[0];

  return (
    <section id="workload" className="workload-section section-with-bg">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-kicker">{w.kicker}</span>
          <h2 className="section-title">{w.title}</h2>
          <p className="section-subtitle">{w.subtitle}</p>
        </div>

        <div className="intelligence-container corp-panel">
          <div className="tab-header-bar grid-4-cols">
            {intelligenceData.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`tab-header-btn ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <Layers size={18} className="tab-header-icon" />
                <span>{item.name}</span>
              </button>
            ))}
          </div>

          <div className="intelligence-profile-body">
            <div className="profile-top-bar">
              <div>
                <span className="profile-vendor-tag">{profile.vendor}</span>
                <h3 className="profile-name">{profile.name}</h3>
                <p className="profile-subtitle">{profile.subtitle}</p>
              </div>
            </div>

            <p className="profile-overview-text">{profile.overview}</p>

            <div className="profile-specs-grid">
              <div className="profile-spec-card">
                <Network size={20} className="spec-card-icon" />
                <div>
                  <span className="spec-card-label">{w.netLabel}</span>
                  <span className="spec-card-val">{profile.networkSpec}</span>
                </div>
              </div>

              <div className="profile-spec-card">
                <HardDrive size={20} className="spec-card-icon" />
                <div>
                  <span className="spec-card-label">{w.storageLabel}</span>
                  <span className="spec-card-val">{profile.storageSpec}</span>
                </div>
              </div>

              <div className="profile-spec-card">
                <Cpu size={20} className="spec-card-icon" />
                <div>
                  <span className="spec-card-label">{w.computeLabel}</span>
                  <span className="spec-card-val">{profile.computeSpec}</span>
                </div>
              </div>

              <div className="profile-spec-card">
                <ShieldCheck size={20} className="spec-card-icon" />
                <div>
                  <span className="spec-card-label">{w.secLabel}</span>
                  <span className="spec-card-val">{profile.securitySpec}</span>
                </div>
              </div>
            </div>

            <div className="profile-benchmarks-box">
              <span className="benchmarks-title">{w.benchTitle}</span>
              <div className="benchmarks-grid">
                {profile.benchmarks.map((item, idx) => (
                  <div key={idx} className="benchmark-bullet">
                    <CheckCircle2 size={18} className="benchmark-icon" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
