import React, { useState, useMemo } from 'react';
import { 
  Sliders, 
  Cpu, 
  HardDrive, 
  Network, 
  ArrowRight,
  Layers,
  Database,
  Film,
  Palette,
  Laptop,
  Server,
  Archive
} from 'lucide-react';
import './SpecConfiguratorSection.css';

export const SpecConfiguratorSection: React.FC = () => {
  // Department Seat Counts State
  const [editorialSeats, setEditorialSeats] = useState<number>(4);
  const [colorSeats, setColorSeats] = useState<number>(2);
  const [compSeats, setCompSeats] = useState<number>(12);
  const [fxSeats, setFxSeats] = useState<number>(6);
  const [vpSeats, setVpSeats] = useState<number>(3);

  // Compliance & Protection Tier State
  const [securityTier, setSecurityTier] = useState<'standard' | 'tpn-hardened'>('tpn-hardened');

  // Dynamic Blueprint & Hardware Math Engine
  const calcResults = useMemo(() => {
    const totalSeats = editorialSeats + colorSeats + compSeats + fxSeats + vpSeats;

    // NVMe Tier-0 High-IOPS Caching Math (TB)
    const baseNvme = (editorialSeats * 15) + (colorSeats * 40) + (compSeats * 12) + (fxSeats * 8) + (vpSeats * 25);
    const finalNvme = Math.max(50, Math.ceil(baseNvme * (securityTier === 'tpn-hardened' ? 1.25 : 1.0)));

    // ZFS Main Storage Pool Math (TB)
    const baseZfs = (editorialSeats * 30) + (colorSeats * 80) + (compSeats * 20) + (fxSeats * 15) + (vpSeats * 50);
    const finalZfs = Math.max(150, Math.ceil(baseZfs * (securityTier === 'tpn-hardened' ? 1.3 : 1.0)));

    // 100GbE Network Fabric Throughput Math (Gbps)
    const rawGbps = (editorialSeats * 25) + (colorSeats * 50) + (compSeats * 10) + (fxSeats * 10) + (vpSeats * 100);
    const totalGbps = Math.max(100, Math.ceil(rawGbps * 1.2));

    // Render Farm CPU/GPU Cores Allocation
    const deadlineCores = (compSeats * 16) + (fxSeats * 64) + (vpSeats * 32);
    const gpuCount = (fxSeats * 2) + (vpSeats * 4);

    // High Availability Server Nodes
    const haVirtNodes = totalSeats > 50 ? 5 : totalSeats > 20 ? 3 : 2;

    // LTO-9 Cartridge Count Math
    const lto9TapesNeeded = Math.ceil(finalZfs / 18);

    // Department Plantilla Distribution Percentage Math
    const safeTotal = totalSeats || 1;
    const pctEditorial = Math.round((editorialSeats / safeTotal) * 100);
    const pctColor = Math.round((colorSeats / safeTotal) * 100);
    const pctComp = Math.round((compSeats / safeTotal) * 100);
    const pctFx = Math.round((fxSeats / safeTotal) * 100);
    const pctVp = Math.round((vpSeats / safeTotal) * 100);

    // Network Switch Backbone Recommendation
    let networkBackboneRec = '10GbE / 25GbE Direct Access';
    if (totalGbps > 300) {
      networkBackboneRec = '100GbE Spine-Leaf Dual Array (Mellanox Quantum/Spectrum)';
    } else if (totalGbps > 150) {
      networkBackboneRec = '100GbE Core Backbone + 25GbE Access Switches';
    }

    return {
      totalSeats,
      nvmeScratch: `${finalNvme} TB Tier-0 NVMe & TB5 Scratch`,
      zfsStorage: `${finalZfs} TB High-Availability Scale-Out ZFS Pool`,
      virtServers: `${haVirtNodes}-Node VMware / Proxmox VE HA Cluster (Active Directory, RLM/FlexLM Licenses & DNS)`,
      deadlineCores: `${deadlineCores} Cores (Thinkbox Deadline Burst & ${gpuCount} GPUs)`,
      networkThroughput: `${totalGbps} Gbps Aggregate Bandwidth (${networkBackboneRec})`,
      backupLto: `Backup Server Cluster + LTO-9 Tape Library (${lto9TapesNeeded} Cartridges @ 18TB Native)`,
      pctEditorial,
      pctColor,
      pctComp,
      pctFx,
      pctVp,
    };
  }, [editorialSeats, colorSeats, compSeats, fxSeats, vpSeats, securityTier]);

  return (
    <section id="calculator" className="art-configurator-section section-with-bg">
      <div className="container">
        {/* Section Header */}
        <div className="art-section-header text-center">
          <span className="section-kicker">MULTI-DEPARTMENT PLANNING</span>
          <h2 className="section-title">VFX &amp; POST-PRODUCTION CALCULATOR</h2>
          <p className="section-description">
            Configure your exact studio headcount by department — Editorial, Color Grading, 2D Compositing, 3D FX, and Virtual Production — to generate a custom infrastructure blueprint with high availability and LTO-9 backup.
          </p>
        </div>

        {/* Configurator Card Container */}
        <div className="corp-panel configurator-container">
          <div className="configurator-grid">
            {/* Left Controls Column: Department Headcount Sliders */}
            <div className="config-controls">
              <div className="config-group-header">
                <Sliders size={20} className="header-icon" />
                <h3>DEPARTMENT HEADCOUNT BREAKDOWN</h3>
              </div>

              {/* 1. Editorial & Conform */}
              <div className="dept-input-card">
                <div className="dept-header-row">
                  <div className="dept-title-box">
                    <Film size={18} className="dept-icon" />
                    <div>
                      <span className="dept-title">EDITORIAL &amp; CONFORM</span>
                      <span className="dept-sub">DaVinci Resolve / Premiere • Mac Studio / Mac Pro / iMac • Thunderbolt 5 RAIDs</span>
                    </div>
                  </div>
                  <div className="counter-box">
                    <button 
                      onClick={() => setEditorialSeats(Math.max(0, editorialSeats - 1))}
                      className="btn-counter"
                    >
                      -
                    </button>
                    <span className="counter-val">{editorialSeats} Seats</span>
                    <button 
                      onClick={() => setEditorialSeats(editorialSeats + 1)}
                      className="btn-counter"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* 2. Color Grading & DI */}
              <div className="dept-input-card">
                <div className="dept-header-row">
                  <div className="dept-title-box">
                    <Palette size={18} className="dept-icon" />
                    <div>
                      <span className="dept-title">COLOR GRADING &amp; DI</span>
                      <span className="dept-sub">DaVinci Resolve Studio • Blackmagic Panels • EIZO ColorEdge &amp; 12-bit RAW</span>
                    </div>
                  </div>
                  <div className="counter-box">
                    <button 
                      onClick={() => setColorSeats(Math.max(0, colorSeats - 1))}
                      className="btn-counter"
                    >
                      -
                    </button>
                    <span className="counter-val">{colorSeats} Seats</span>
                    <button 
                      onClick={() => setColorSeats(colorSeats + 1)}
                      className="btn-counter"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* 3. 2D Compositing */}
              <div className="dept-input-card">
                <div className="dept-header-row">
                  <div className="dept-title-box">
                    <Layers size={18} className="dept-icon" />
                    <div>
                      <span className="dept-title">2D COMPOSITING</span>
                      <span className="dept-sub">Foundry Nuke / Flame • 4K/8K OpenEXR Uncompressed Playout &amp; RAM Caches</span>
                    </div>
                  </div>
                  <div className="counter-box">
                    <button 
                      onClick={() => setCompSeats(Math.max(0, compSeats - 1))}
                      className="btn-counter"
                    >
                      -
                    </button>
                    <span className="counter-val">{compSeats} Seats</span>
                    <button 
                      onClick={() => setCompSeats(compSeats + 1)}
                      className="btn-counter"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* 4. 3D & FX Simulation */}
              <div className="dept-input-card">
                <div className="dept-header-row">
                  <div className="dept-title-box">
                    <Cpu size={18} className="dept-icon" />
                    <div>
                      <span className="dept-title">3D &amp; FX SIMULATION</span>
                      <span className="dept-sub">Houdini / Maya / Unreal Engine • High-RAM Workstations &amp; Multi-GPU Simulations</span>
                    </div>
                  </div>
                  <div className="counter-box">
                    <button 
                      onClick={() => setFxSeats(Math.max(0, fxSeats - 1))}
                      className="btn-counter"
                    >
                      -
                    </button>
                    <span className="counter-val">{fxSeats} Seats</span>
                    <button 
                      onClick={() => setFxSeats(fxSeats + 1)}
                      className="btn-counter"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* 5. Virtual Production / Real-time */}
              <div className="dept-input-card">
                <div className="dept-header-row">
                  <div className="dept-title-box">
                    <Laptop size={18} className="dept-icon" />
                    <div>
                      <span className="dept-title">VIRTUAL PRODUCTION &amp; REALTIME</span>
                      <span className="dept-sub">Unreal Engine nDisplay • LED Wall Drivers &amp; Live Tracking Nodes</span>
                    </div>
                  </div>
                  <div className="counter-box">
                    <button 
                      onClick={() => setVpSeats(Math.max(0, vpSeats - 1))}
                      className="btn-counter"
                    >
                      -
                    </button>
                    <span className="counter-val">{vpSeats} Seats</span>
                    <button 
                      onClick={() => setVpSeats(vpSeats + 1)}
                      className="btn-counter"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Compliance Tier Toggle */}
              <div className="security-tier-selector">
                <span className="tier-label">COMPLIANCE &amp; HARDENING LEVEL:</span>
                <div className="tier-toggle-row">
                  <button
                    className={`tier-btn ${securityTier === 'standard' ? 'active' : ''}`}
                    onClick={() => setSecurityTier('standard')}
                  >
                    Standard Studio Pipeline
                  </button>
                  <button
                    className={`tier-btn ${securityTier === 'tpn-hardened' ? 'active' : ''}`}
                    onClick={() => setSecurityTier('tpn-hardened')}
                  >
                    TPN / MPA Studio Hardened
                  </button>
                </div>
              </div>
            </div>

            {/* Right Output Column: Generated Blueprint Hardware Specifications */}
            <div className="config-output">
              <div className="output-header-bar">
                <span className="output-kicker">RECOMMENDED BLUEPRINT</span>
                <span className="total-seats-pill">{calcResults.totalSeats} TOTAL ARTIST SEATS</span>
              </div>

              <h4 className="blueprint-title">ENTERPRISE DATACENTER INFRASTRUCTURE</h4>

              {/* Proportional Plantilla Distribution Bar */}
              <div className="proportional-bar-box">
                <span className="bar-title">DEPARTMENT PLANTILLA DISTRIBUTION</span>
                <div className="proportional-bar-track">
                  {calcResults.pctEditorial > 0 && (
                    <div 
                      className="bar-seg seg-editorial" 
                      style={{ width: `${calcResults.pctEditorial}%` }} 
                      title={`Editorial: ${calcResults.pctEditorial}%`}
                    />
                  )}
                  {calcResults.pctColor > 0 && (
                    <div 
                      className="bar-seg seg-color" 
                      style={{ width: `${calcResults.pctColor}%` }} 
                      title={`Color: ${calcResults.pctColor}%`}
                    />
                  )}
                  {calcResults.pctComp > 0 && (
                    <div 
                      className="bar-seg seg-comp" 
                      style={{ width: `${calcResults.pctComp}%` }} 
                      title={`Comp: ${calcResults.pctComp}%`}
                    />
                  )}
                  {calcResults.pctFx > 0 && (
                    <div 
                      className="bar-seg seg-fx" 
                      style={{ width: `${calcResults.pctFx}%` }} 
                      title={`FX: ${calcResults.pctFx}%`}
                    />
                  )}
                  {calcResults.pctVp > 0 && (
                    <div 
                      className="bar-seg seg-vp" 
                      style={{ width: `${calcResults.pctVp}%` }} 
                      title={`VP: ${calcResults.pctVp}%`}
                    />
                  )}
                </div>
                <div className="bar-legend">
                  <span className="legend-item leg-editorial">• Editorial ({calcResults.pctEditorial}%)</span>
                  <span className="legend-item leg-color">• Color ({calcResults.pctColor}%)</span>
                  <span className="legend-item leg-comp">• Comp ({calcResults.pctComp}%)</span>
                  <span className="legend-item leg-fx">• FX ({calcResults.pctFx}%)</span>
                  <span className="legend-item leg-vp">• VP ({calcResults.pctVp}%)</span>
                </div>
              </div>

              <div className="blueprint-specs-list">
                <div className="spec-card">
                  <HardDrive size={22} className="spec-icon" />
                  <div>
                    <span className="spec-cat">TIER-0 NVME &amp; TB5 SCRATCH</span>
                    <span className="spec-val">{calcResults.nvmeScratch}</span>
                  </div>
                </div>

                <div className="spec-card">
                  <Database size={22} className="spec-icon" />
                  <div>
                    <span className="spec-cat">HIGH-AVAILABILITY ZFS STORAGE</span>
                    <span className="spec-val">{calcResults.zfsStorage}</span>
                  </div>
                </div>

                <div className="spec-card">
                  <Server size={22} className="spec-icon" />
                  <div>
                    <span className="spec-cat">VIRTUALIZATION &amp; CORE SERVICES (HA)</span>
                    <span className="spec-val">{calcResults.virtServers}</span>
                  </div>
                </div>

                <div className="spec-card">
                  <Cpu size={22} className="spec-icon" />
                  <div>
                    <span className="spec-cat">DEADLINE RENDER &amp; GPU POOL</span>
                    <span className="spec-val">{calcResults.deadlineCores}</span>
                  </div>
                </div>

                <div className="spec-card">
                  <Network size={22} className="spec-icon" />
                  <div>
                    <span className="spec-cat">NETWORK FABRIC THROUGHPUT</span>
                    <span className="spec-val">{calcResults.networkThroughput}</span>
                  </div>
                </div>

                <div className="spec-card">
                  <Archive size={22} className="spec-icon" />
                  <div>
                    <span className="spec-cat">DISASTER RECOVERY &amp; TAPE ARCHIVE</span>
                    <span className="spec-val">{calcResults.backupLto}</span>
                  </div>
                </div>
              </div>

              <div className="blueprint-cta-box">
                <a href="#contact" className="btn-corporate-primary full-width">
                  <span>REQUEST THIS EXACT ARCHITECTURE BLUEPRINT</span>
                  <ArrowRight size={18} className="btn-icon" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
