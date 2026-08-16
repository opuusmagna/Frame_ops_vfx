import React, { useState } from 'react';
import { 
  Layers, 
  Cpu, 
  HardDrive, 
  Network, 
  ShieldCheck, 
  CheckCircle2
} from 'lucide-react';
import './WorkloadIntelligenceSection.css';

interface IntelligenceProfile {
  id: string;
  name: string;
  vendor: string;
  subtitle: string;
  overview: string;
  networkSpec: string;
  storageSpec: string;
  computeSpec: string;
  securitySpec: string;
  benchmarks: string[];
}

const intelligenceData: IntelligenceProfile[] = [
  {
    id: 'nuke',
    name: 'Foundry Nuke 4K Playout',
    vendor: 'Foundry Official Technical Guidelines',
    subtitle: 'Uncompressed EXR Sequence Streaming & Real-Time Artist Playback',
    overview: 'Uncompressed 4K 16-bit float OpenEXR image sequences demand immense sustained read throughput. A single 4K 60fps playout stream can consume up to 2.4 GB/s. Without specialized Tier-0 NVMe caching, multi-artist playback leads to frame dropping and ZFS I/O lockup.',
    networkSpec: '25GbE Workstation Access / 100GbE Core Trunking',
    storageSpec: 'Tier-0 NVMe SLOG/L2ARC + ZFS Scale-Out (1M recordsize for EXRs)',
    computeSpec: 'High-Clock Dual-Socket CPUs + RAM Caching (128GB+ per Nuke seat)',
    securitySpec: 'Encrypted Asset Cache & ZTNA Remote Artist Tunnels',
    benchmarks: [
      '1.2 – 2.4 GB/s sustained read bandwidth per 4K playout node',
      'ZFS 1MB recordsize tuning optimizing sequential OpenEXR read IOPS',
      'NVMe Tier-0 cache offloading 95% of random read I/O from spinning disks',
      'Zero frame-dropping during simultaneous 10-artist Nuke playback',
    ],
  },
  {
    id: 'houdini',
    name: 'SideFX Houdini Heavy FX & Sims',
    vendor: 'SideFX Houdini Compute & Cache Whitepaper',
    subtitle: 'FLIP Fluid, Pyro Volume & Vellum Particle Simulation Infrastructure',
    overview: 'FX simulation caching generates multi-terabyte scratch files during fluid, pyro, and particle solve steps. Writing uncompressed sim caches directly to shared NAS storage chokes network IOPS for the entire studio. Local NVMe scratch volumes offload sim writes before staging to ZFS.',
    networkSpec: '100GbE Core Backbone with Dedicated Sim Cache Subnet',
    storageSpec: '10 – 15 TB Local NVMe Scratch per FX seat + ZFS Sim Storage',
    computeSpec: '128 Deadline CPU Cores per FX seat + High RAM Density (256GB+)',
    securitySpec: 'Air-Gapped FX Sim Vaults & Immutable WORM Snapshots',
    benchmarks: [
      '10 – 15 TB high-endurance NVMe scratch space allocated per FX workstation',
      'Deadline automated queue bursting prioritizing heavy Houdini simulation solves',
      'ZFS async write zil acceleration preventing multi-user I/O stalls',
      'Automated background sim cache sync from local NVMe to master project storage',
    ],
  },
  {
    id: '3d',
    name: 'Autodesk Maya / Arnold / V-Ray 3D',
    vendor: 'Autodesk & Chaos Group Render Sizing Standards',
    subtitle: 'Complex Geometry, Multi-Pass Lighting & Render Pool Saturation',
    overview: 'High-density 3D animation pipelines rely on high-volume asset loading and massive GPU/CPU render farm saturation. Scene assembly requires rapid loading of Alembic, USD, and heavy texture maps, while render nodes demand 100% compute queue utilization.',
    networkSpec: '10/25/100GbE Mixed Switching Array',
    storageSpec: 'High-IOPS Texture NVMe Cache + Scale-Out ZFS Pool',
    computeSpec: 'High-Density RTX 6000 Ada GPU Clusters + Deadline Management',
    securitySpec: '802.1Q Microsegmentation separating Render Farm from WAN',
    benchmarks: [
      'USD & Alembic asset load times reduced by 75% via NVMe texture caching',
      'Deadline dynamic licensing maximizing 100% CPU/GPU render node saturation',
      'Multi-pass AOV render output streaming without queue bottlenecks',
      'Automated scene file dependency staging to local render farm nodes',
    ],
  },
  {
    id: 'vp',
    name: 'Unreal Engine Virtual Production (ICVFX)',
    vendor: 'Epic Games Unreal Engine ICVFX Whitepaper',
    subtitle: 'In-Camera VFX, LED Volume nDisplay & PTP Time-Code Synchronization',
    overview: 'Virtual production LED volumes require multi-node GPU rendering synced via Epic nDisplay. Network latency must remain under 0.4ms to prevent frame tearing on the LED wall. Precision Time Protocol (PTP IEEE 1588) syncs camera shutters with render node GPUs.',
    networkSpec: '100GbE Spine-Leaf with PTP IEEE 1588 Hardware Clock Sync',
    storageSpec: '16 TB Tier-0 NVMe Ultra-Fast Live Asset Streaming Pool',
    computeSpec: 'Multi-GPU nDisplay Clusters (Dual RTX 6000 Ada per Render Node)',
    securitySpec: 'Zero-Trust Closed Production Volume Network',
    benchmarks: [
      'Sub-0.4ms glass-to-glass latency across nDisplay LED render nodes',
      'PTP IEEE 1588 hardware clock synchronization locking camera to LED wall',
      'Real-time 8K uncompressed texture streaming into Unreal Engine memory',
      'Zero frame drop during live camera movement inside the LED volume',
    ],
  },
];

export const WorkloadIntelligenceSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('nuke');

  const profile = intelligenceData.find((p) => p.id === activeTab) || intelligenceData[0];

  return (
    <section className="art-intelligence-section section-with-bg">
      <div className="container">
        {/* Section Header */}
        <div className="art-section-header text-center">
          <span className="section-kicker">ENGINEERING INTELLIGENCE</span>
          <h2 className="section-title">WORKLOAD ARCHITECTURE BLUEPRINTS</h2>
          <p className="section-description">
            Deep technical specifications derived from official vendor whitepapers, storage IOPS benchmarks, and production-proven VFX pipeline sizing.
          </p>
        </div>

        {/* Dynamic Intelligence Container */}
        <div className="intelligence-container corp-panel">
          {/* Workload Selector Tabs (Unified Header Pattern) */}
          <div className="tab-header-bar grid-4-cols">
            {intelligenceData.map((item) => (
              <button
                key={item.id}
                className={`tab-header-btn ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <Layers size={18} className="tab-header-icon" />
                <span>{item.name}</span>
              </button>
            ))}
          </div>

          {/* Active Workload Profile Content */}
          <div className="intelligence-profile-body">
            <div className="profile-top-bar">
              <div>
                <span className="profile-vendor-tag">{profile.vendor}</span>
                <h3 className="profile-name">{profile.name}</h3>
                <p className="profile-subtitle">{profile.subtitle}</p>
              </div>
            </div>

            <p className="profile-overview-text">{profile.overview}</p>

            {/* Hardware Sizing Specifications Grid */}
            <div className="profile-specs-grid">
              <div className="profile-spec-card">
                <Network size={20} className="spec-card-icon" />
                <div>
                  <span className="spec-card-label">Network Architecture</span>
                  <span className="spec-card-val">{profile.networkSpec}</span>
                </div>
              </div>

              <div className="profile-spec-card">
                <HardDrive size={20} className="spec-card-icon" />
                <div>
                  <span className="spec-card-label">Storage & Cache Sizing</span>
                  <span className="spec-card-val">{profile.storageSpec}</span>
                </div>
              </div>

              <div className="profile-spec-card">
                <Cpu size={20} className="spec-card-icon" />
                <div>
                  <span className="spec-card-label">Compute & Farm Allocation</span>
                  <span className="spec-card-val">{profile.computeSpec}</span>
                </div>
              </div>

              <div className="profile-spec-card">
                <ShieldCheck size={20} className="spec-card-icon" />
                <div>
                  <span className="spec-card-label">Security & Compliance</span>
                  <span className="spec-card-val">{profile.securitySpec}</span>
                </div>
              </div>
            </div>

            {/* Benchmarks & Technical Validation Criteria */}
            <div className="profile-benchmarks-box">
              <span className="benchmarks-title">TECHNICAL BENCHMARKS & VALIDATION CRITERIA</span>
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
