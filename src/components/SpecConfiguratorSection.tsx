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
  
  const [securityTier, setSecurityTier] = useState<'standard' | 'tpn'>('tpn');

  // Real-Time Consolidated Math Calculations
  const calculations = useMemo(() => {
    const totalSeats = editorialSeats + colorSeats + compSeats + fxSeats + vpSeats;

    // NVMe Scratch Per Seat (TB)
    const nvmeScratch = 
      (editorialSeats * 4) +
      (colorSeats * 8) +
      (compSeats * 8) +
      (fxSeats * 15) +
      (vpSeats * 12);

    // ZFS Central Storage Per Seat (TB)
    const zfsStorage = 
      (editorialSeats * 10) +
      (colorSeats * 15) +
      (compSeats * 12) +
      (fxSeats * 25) +
      (vpSeats * 18);

    // Deadline Render Cores
    const deadlineCores = 
      (editorialSeats * 16) +
      (colorSeats * 32) +
      (compSeats * 32) +
      (fxSeats * 128) +
      (vpSeats * 64);

    // GPU Acceleration Density
    const gpuCount = (
      (editorialSeats * 0.5) +
      (colorSeats * 1.5) +
      (compSeats * 1.2) +
      (fxSeats * 1.8) +
      (vpSeats * 3.2)
    ).toFixed(1);

    // Aggregate Network Bandwidth (Gbps)
    const totalGbps = Math.round(
      (editorialSeats * 2.0) +
      (colorSeats * 3.5) +
      (compSeats * 2.4) +
      (fxSeats * 3.8) +
      (vpSeats * 4.5)
    );

    const securityMultiplier = securityTier === 'tpn' ? 1.2 : 1.0;
    const finalNvme = Math.round(nvmeScratch * securityMultiplier);
    const finalZfs = Math.round(zfsStorage * securityMultiplier);

    // LTO-9 Tape Cartridges Needed (18 TB Native per Tape)
    const lto9TapesNeeded = Math.ceil(finalZfs / 18);

    // HA Virtualization & Core Server Recommendations
    let haVirtNodes = 3; // Proxmox / VMware 3-node HA quorum
    if (totalSeats > 30) haVirtNodes = 5;

    let networkBackboneRec = '25GbE Access / 100GbE Core Trunking';
    if (totalGbps > 120) {
      networkBackboneRec = 'Dual 100GbE Spine-Leaf Architecture (200Gbps Trunking)';
    } else if (totalGbps < 30) {
      networkBackboneRec = '10GbE / 25GbE Managed Switching Array';
    }

    // Department Percentages for Proportional Bar
    const safeTotal = totalSeats || 1;
    const pctEditorial = Math.round((editorialSeats / safeTotal) * 100);
    const pctColor = Math.round((colorSeats / safeTotal) * 100);
    const pctComp = Math.round((compSeats / safeTotal) * 100);
    const pctFx = Math.round((fxSeats / safeTotal) * 100);
    const pctVp = Math.round((vpSeats / safeTotal) * 100);

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
    <section id="solutions" className="art-configurator-section section-with-bg">
      <div className="container">
        {/* Section Header */}
        <div className="art-section-header text-center">
          <span className="section-kicker">MULTI-DEPARTMENT PLANNING</span>
          <h2 className="section-title">VFX & POST-PRODUCTION CALCULATOR</h2>
          <p className="section-description">
            Configure your exact studio headcount by department — Editorial, Color Grading, 2D Compositing, 3D FX, and Virtual Production — to generate a custom infrastructure blueprint with high availability and LTO-9 backup.
          </p>
        </div>

        {/* Master 2-Column Split Layout Panel */}
        <div className="corp-panel configurator-container">
          <div className="configurator-grid">
            
            {/* Left Column: Multi-Department Interactive Controls */}
            <div className="config-controls">
              <div className="config-header">
                <Sliders size={20} className="config-icon" />
                <h3>DEPARTMENT HEADCOUNT BREAKDOWN</h3>
              </div>

              {/* Department 1: Editorial & Conform */}
              <div className="dept-control-card">
                <div className="dept-header-row">
                  <div className="dept-title-box">
                    <Film size={18} className="dept-icon icon-editorial" />
                    <div>
                      <span className="dept-name">EDITORIAL & CONFORM</span>
                      <span className="dept-sub">DaVinci Resolve / Premiere • Mac Studio / Mac Pro / iMac • Thunderbolt 5 RAIDs</span>
                    </div>
                  </div>
                  <div className="counter-box">
                    <button 
                      type="button" 
                      className="counter-btn"
                      onClick={() => setEditorialSeats((prev) => Math.max(0, prev - 1))}
                    >
                      -
                    </button>
                    <span className="counter-val">{editorialSeats} Seats</span>
                    <button 
                      type="button" 
                      className="counter-btn"
                      onClick={() => setEditorialSeats((prev) => prev + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Department 2: Color Grading & DI */}
              <div className="dept-control-card">
                <div className="dept-header-row">
                  <div className="dept-title-box">
                    <Palette size={18} className="dept-icon icon-color" />
                    <div>
                      <span className="dept-name">COLOR GRADING & DI</span>
                      <span className="dept-sub">DaVinci Resolve Studio • Blackmagic Panels • EIZO ColorEdge & 12-bit RAW</span>
                    </div>
                  </div>
                  <div className="counter-box">
                    <button 
                      type="button" 
                      className="counter-btn"
                      onClick={() => setColorSeats((prev) => Math.max(0, prev - 1))}
                    >
                      -
                    </button>
                    <span className="counter-val">{colorSeats} Seats</span>
                    <button 
                      type="button" 
                      className="counter-btn"
                      onClick={() => setColorSeats((prev) => prev + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Department 3: 2D Compositing */}
              <div className="dept-control-card">
                <div className="dept-header-row">
                  <div className="dept-title-box">
                    <Layers size={18} className="dept-icon icon-comp" />
                    <div>
                      <span className="dept-name">2D COMPOSITING</span>
                      <span className="dept-sub">Foundry Nuke / Flame • 4K/8K OpenEXR Uncompressed Playout & RAM Caches</span>
                    </div>
                  </div>
                  <div className="counter-box">
                    <button 
                      type="button" 
                      className="counter-btn"
                      onClick={() => setCompSeats((prev) => Math.max(0, prev - 1))}
                    >
                      -
                    </button>
                    <span className="counter-val">{compSeats} Seats</span>
                    <button 
                      type="button" 
                      className="counter-btn"
                      onClick={() => setCompSeats((prev) => prev + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Department 4: 3D & FX Simulation */}
              <div className="dept-control-card">
                <div className="dept-header-row">
                  <div className="dept-title-box">
                    <Cpu size={18} className="dept-icon icon-fx" />
                    <div>
                      <span className="dept-name">3D & FX SIMULATION</span>
                      <span className="dept-sub">SideFX Houdini / Maya • 15 TB PCIe 4.0/5.0 NVMe Scratch & Deadline Burst</span>
                    </div>
                  </div>
                  <div className="counter-box">
                    <button 
                      type="button" 
                      className="counter-btn"
                      onClick={() => setFxSeats((prev) => Math.max(0, prev - 1))}
                    >
                      -
                    </button>
                    <span className="counter-val">{fxSeats} Seats</span>
                    <button 
                      type="button" 
                      className="counter-btn"
                      onClick={() => setFxSeats((prev) => prev + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Department 5: Virtual Production */}
              <div className="dept-control-card">
                <div className="dept-header-row">
                  <div className="dept-title-box">
                    <Laptop size={18} className="dept-icon icon-vp" />
                    <div>
                      <span className="dept-name">VIRTUAL PRODUCTION (ICVFX)</span>
                      <span className="dept-sub">Unreal Engine nDisplay • PTP IEEE 1588 Sync & 100GbE Sub-0.4ms Latency</span>
                    </div>
                  </div>
                  <div className="counter-box">
                    <button 
                      type="button" 
                      className="counter-btn"
                      onClick={() => setVpSeats((prev) => Math.max(0, prev - 1))}
                    >
                      -
                    </button>
                    <span className="counter-val">{vpSeats} Seats</span>
                    <button 
                      type="button" 
                      className="counter-btn"
                      onClick={() => setVpSeats((prev) => prev + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Security Tier Selection */}
              <div className="control-group margin-top-dept">
                <label>Security & Compliance Tier</label>
                <div className="tier-toggle-row">
                  <button
                    type="button"
                    className={`tier-btn ${securityTier === 'standard' ? 'active' : ''}`}
                    onClick={() => setSecurityTier('standard')}
                  >
                    Standard Studio Tier
                  </button>
                  <button
                    type="button"
                    className={`tier-btn ${securityTier === 'tpn' ? 'active' : ''}`}
                    onClick={() => setSecurityTier('tpn')}
                  >
                    TPN / MPA Shielded
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Calculated Architecture Specs & Proportional Distribution Bar */}
            <div className="config-output">
              <div className="output-header">
                <div className="headline-badge-row">
                  <span className="output-tag">RECOMMENDED BLUEPRINT</span>
                  <span className="total-seats-pill">{calculations.totalSeats} TOTAL ARTIST SEATS</span>
                </div>
                <h3>ENTERPRISE DATACENTER INFRASTRUCTURE</h3>
              </div>

              {/* Department Proportional Distribution Bar */}
              <div className="proportional-bar-box">
                <span className="prop-bar-label">DEPARTMENT PLANTILLA DISTRIBUTION</span>
                <div className="proportional-bar">
                  <div className="bar-seg seg-editorial" style={{ width: `${calculations.pctEditorial}%` }} title={`Editorial: ${calculations.pctEditorial}%`} />
                  <div className="bar-seg seg-color" style={{ width: `${calculations.pctColor}%` }} title={`Color: ${calculations.pctColor}%`} />
                  <div className="bar-seg seg-comp" style={{ width: `${calculations.pctComp}%` }} title={`Comp: ${calculations.pctComp}%`} />
                  <div className="bar-seg seg-fx" style={{ width: `${calculations.pctFx}%` }} title={`FX: ${calculations.pctFx}%`} />
                  <div className="bar-seg seg-vp" style={{ width: `${calculations.pctVp}%` }} title={`VP: ${calculations.pctVp}%`} />
                </div>
                <div className="bar-legend">
                  <span className="legend-item"><i className="dot dot-editorial" /> Editorial ({editorialSeats})</span>
                  <span className="legend-item"><i className="dot dot-color" /> Color ({colorSeats})</span>
                  <span className="legend-item"><i className="dot dot-comp" /> Comp ({compSeats})</span>
                  <span className="legend-item"><i className="dot dot-fx" /> FX ({fxSeats})</span>
                  <span className="legend-item"><i className="dot dot-vp" /> VP ({vpSeats})</span>
                </div>
              </div>

              {/* Output Specs Grid */}
              <div className="output-specs-grid">
                <div className="output-card">
                  <HardDrive size={22} className="output-card-icon" />
                  <div>
                    <span className="output-card-label">Tier-0 NVMe & TB5 Scratch</span>
                    <span className="output-card-val">{calculations.nvmeScratch}</span>
                  </div>
                </div>

                <div className="output-card">
                  <Database size={22} className="output-card-icon" />
                  <div>
                    <span className="output-card-label">High-Availability ZFS Storage</span>
                    <span className="output-card-val">{calculations.zfsStorage}</span>
                  </div>
                </div>

                <div className="output-card">
                  <Server size={22} className="output-card-icon" />
                  <div>
                    <span className="output-card-label">Virtualization & Core Services (HA)</span>
                    <span className="output-card-val">{calculations.virtServers}</span>
                  </div>
                </div>

                <div className="output-card">
                  <Cpu size={22} className="output-card-icon" />
                  <div>
                    <span className="output-card-label">Deadline Render & GPU Pool</span>
                    <span className="output-card-val">{calculations.deadlineCores}</span>
                  </div>
                </div>

                <div className="output-card">
                  <Network size={22} className="output-card-icon" />
                  <div>
                    <span className="output-card-label">Redundant Network Backbone</span>
                    <span className="output-card-val">{calculations.networkThroughput}</span>
                  </div>
                </div>

                <div className="output-card">
                  <Archive size={22} className="output-card-icon" />
                  <div>
                    <span className="output-card-label">Backup & LTO-9 Tape Archive</span>
                    <span className="output-card-val">{calculations.backupLto}</span>
                  </div>
                </div>
              </div>

              <a href="#contact" className="btn-cyber-primary width-full-btn">
                <span>APPLY BLUEPRINT TO ASSESSMENT</span>
                <ArrowRight size={18} className="btn-icon" />
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
