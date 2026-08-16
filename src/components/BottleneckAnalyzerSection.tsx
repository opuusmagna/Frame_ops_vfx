import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  ShieldCheck 
} from 'lucide-react';
import './BottleneckAnalyzerSection.css';

interface BottleneckDiagnostic {
  id: string;
  software: string;
  category: string;
  bottleneckTitle: string;
  bottleneckSummary: string;
  genericItFailure: string;
  frameOpsFix: string;
  stressMeters: {
    readThroughput: number;
    writeLatency: number;
    networkLoad: number;
    computeSaturation: number;
  };
  keyTakeaways: string[];
}

const diagnosticsData: BottleneckDiagnostic[] = [
  {
    id: 'nuke',
    software: 'Foundry Nuke',
    category: 'READ I/O & NETWORK BOTTLENECK',
    bottleneckTitle: 'Uncompressed 4K EXR Read I/O & Network Saturation',
    bottleneckSummary: 'Simultaneous 4K/8K 16-bit float EXR sequence playback across 10+ workstations exhausts shared NAS storage read IOPS, causing video stuttering, dropped frames, and artist idle time.',
    genericItFailure: 'Generic IT installs standard 1GbE/10GbE NAS storage with spinning HDDs, where random read IOPS choke under multi-user sequential EXR playout.',
    frameOpsFix: 'Deploy Tier-0 NVMe SLOG/L2ARC caching arrays + 100GbE backbone with ZFS 1MB recordsize tuning, delivering guaranteed 2.4 GB/s per playout node with zero frame drops.',
    stressMeters: {
      readThroughput: 95,
      writeLatency: 30,
      networkLoad: 90,
      computeSaturation: 45,
    },
    keyTakeaways: [
      'Uncompressed 4K EXR streams consume 1.2 to 2.4 GB/s per playout channel',
      'NVMe Tier-0 cache offloads 95% of random read IOPS from primary pools',
      'Eliminates artist waiting time during multi-layer EXR comp playback',
    ],
  },
  {
    id: 'houdini',
    software: 'SideFX Houdini',
    category: 'SIM SCRATCH & RAM BOTTLENECK',
    bottleneckTitle: 'Simulation Cache Write Stalls & RAM Overflow',
    bottleneckSummary: 'FLIP fluid, Pyro volume, and Vellum particle solvers generate multi-terabyte sim caches. Writing uncompressed sim caches directly to shared storage causes network write stalls and freezes other artists.',
    genericItFailure: 'Configuring artists to write sim caches directly over 10GbE to shared ZFS/SAN storage without local high-endurance write scratch buffers.',
    frameOpsFix: 'Equip FX seats with 10 – 15 TB dedicated local PCIe 4.0/5.0 NVMe scratch drives, combined with background async sync to master ZFS project pools.',
    stressMeters: {
      readThroughput: 50,
      writeLatency: 95,
      networkLoad: 80,
      computeSaturation: 98,
    },
    keyTakeaways: [
      'Local NVMe scratch absorbs 15 TB of high-velocity sim write I/O',
      '128 Deadline CPU cores per FX seat for parallel particle & volume solving',
      'Background ZFS async sync prevents shared storage lockup during solves',
    ],
  },
  {
    id: 'maya',
    software: 'Autodesk Maya 3D',
    category: 'ASSET LOAD & TEXTURE BOTTLENECK',
    bottleneckTitle: 'Alembic/USD Scene Assembly & Texture Load Overhead',
    bottleneckSummary: 'Heavy 3D scene files containing thousands of Alembic/USD geometry references and 8K UDIM textures take 10+ minutes to open, stalling lighting and animation artists.',
    genericItFailure: 'Storing texture libraries and scene dependencies on high-latency NAS shares without dedicated metadata caching or local texture staging.',
    frameOpsFix: 'Implement ZFS high-IOPS metadata SSD vdevs + NVMe texture read caches, reducing scene file load times by over 75%.',
    stressMeters: {
      readThroughput: 75,
      writeLatency: 25,
      networkLoad: 65,
      computeSaturation: 70,
    },
    keyTakeaways: [
      'USD & Alembic scene load times reduced from 10 minutes to under 2 minutes',
      'ZFS metadata vdevs accelerate directory enumeration and asset tracking',
      'High-speed RAM/NVMe texture caching for Arnold & V-Ray renderers',
    ],
  },
  {
    id: 'deadline',
    software: 'Deadline Render Farm',
    category: 'COMPUTE & QUEUE BOTTLENECK',
    bottleneckTitle: 'Render Queue Scheduling Stalls & Farm Under-Utilization',
    bottleneckSummary: 'During render bursts, hundreds of CPU/GPU nodes request scene files simultaneously, causing database lockups on the render repository and leaving nodes idle.',
    genericItFailure: 'Running Deadline repository database on weak VMs without dedicated NVMe IOPS, creating queue dependency bottlenecks.',
    frameOpsFix: 'Engineer high-availability Deadline repository cluster on dedicated NVMe nodes + dynamic license automation, ensuring 100% farm node saturation.',
    stressMeters: {
      readThroughput: 80,
      writeLatency: 60,
      networkLoad: 85,
      computeSaturation: 100,
    },
    keyTakeaways: [
      '100% render node CPU/GPU saturation during peak production bursts',
      'Automated Deadline queue dependency resolution under 0.1s',
      'Multi-GPU render farm clusters running dual RTX 6000 Ada GPUs per node',
    ],
  },
  {
    id: 'unreal',
    software: 'Unreal Engine (ICVFX)',
    category: 'LATENCY & CLOCK SYNC BOTTLENECK',
    bottleneckTitle: 'nDisplay Clock Desync & LED Wall Frame Tearing',
    bottleneckSummary: 'In-Camera VFX (ICVFX) LED volumes require multi-node GPU rendering synced via nDisplay. Network latency over 0.5ms causes camera tracking desync and visible frame tearing on LED walls.',
    genericItFailure: 'Using standard ethernet switches without Precision Time Protocol (PTP IEEE 1588) hardware clock synchronization between cameras and render GPUs.',
    frameOpsFix: 'Deploy 100GbE Spine-Leaf network switches with PTP IEEE 1588 hardware clock sync, maintaining sub-0.4ms glass-to-glass latency across all nDisplay nodes.',
    stressMeters: {
      readThroughput: 90,
      writeLatency: 15,
      networkLoad: 95,
      computeSaturation: 90,
    },
    keyTakeaways: [
      'Sub-0.4ms glass-to-glass latency across nDisplay LED render nodes',
      'PTP IEEE 1588 hardware clock synchronization locking camera to LED wall',
      'Real-time 8K texture streaming into Unreal Engine GPU memory',
    ],
  },
];

export const BottleneckAnalyzerSection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('nuke');

  const diag = diagnosticsData.find((d) => d.id === selectedId) || diagnosticsData[0];

  return (
    <section className="art-bottleneck-section section-with-bg">
      <div className="container">
        {/* Section Header */}
        <div className="art-section-header text-center">
          <span className="section-kicker">TECHNICAL DIAGNOSTICS</span>
          <h2 className="section-title">VFX PIPELINE BOTTLENECK ANALYZER</h2>
          <p className="section-description">
            Select a core production application to diagnose where standard IT architectures fail and discover the exact engineering fix required to eliminate pipeline stalls.
          </p>
        </div>

        {/* Integrated Master Card Panel Container */}
        <div className="diagnostic-card corp-panel">
          {/* Integrated Top Tab Header */}
          <div className="tab-header-bar grid-5-cols">
            {diagnosticsData.map((item) => (
              <button
                key={item.id}
                className={`tab-header-btn ${selectedId === item.id ? 'active' : ''}`}
                onClick={() => setSelectedId(item.id)}
              >
                <Layers size={18} className="tab-header-icon" />
                <span>{item.software}</span>
              </button>
            ))}
          </div>

          {/* Integrated Card Content Body */}
          <div className="diagnostic-card-body">
            <div className="diagnostic-header-row">
              <div>
                <span className="diagnostic-badge">{diag.category}</span>
                <h3 className="diagnostic-title">{diag.software}: {diag.bottleneckTitle}</h3>
              </div>
            </div>

            <div className="diagnostic-body-grid">
              {/* Left Diagnostic Details */}
              <div className="diagnostic-details-col">
                {/* The Bottleneck Problem */}
                <div className="diag-box problem-box">
                  <div className="diag-box-header">
                    <AlertTriangle size={18} className="icon-warning" />
                    <h4>THE BOTTLENECK PROBLEM</h4>
                  </div>
                  <p>{diag.bottleneckSummary}</p>
                </div>

                {/* Why Generic IT Fails */}
                <div className="diag-box failure-box">
                  <div className="diag-box-header">
                    <Layers size={18} className="icon-failure" />
                    <h4>WHY GENERIC IT FAILS</h4>
                  </div>
                  <p>{diag.genericItFailure}</p>
                </div>

                {/* The Frame Ops VFX Solution */}
                <div className="diag-box solution-box">
                  <div className="diag-box-header">
                    <ShieldCheck size={18} className="icon-solution" />
                    <h4>THE FRAME OPS VFX ENGINEERING FIX</h4>
                  </div>
                  <p>{diag.frameOpsFix}</p>
                </div>
              </div>

              {/* Right Stress Meters & Takeaways */}
              <div className="diagnostic-metrics-col">
                <div className="metrics-meter-card">
                  <h4 className="meter-card-title">RESOURCE STRESS PROFILE</h4>

                  <div className="meter-group">
                    <div className="meter-label-row">
                      <span>Read Throughput Stress</span>
                      <span className="meter-val">{diag.stressMeters.readThroughput}%</span>
                    </div>
                    <div className="meter-track">
                      <div className="meter-fill read-fill" style={{ width: `${diag.stressMeters.readThroughput}%` }} />
                    </div>
                  </div>

                  <div className="meter-group">
                    <div className="meter-label-row">
                      <span>Write Latency Stress</span>
                      <span className="meter-val">{diag.stressMeters.writeLatency}%</span>
                    </div>
                    <div className="meter-track">
                      <div className="meter-fill write-fill" style={{ width: `${diag.stressMeters.writeLatency}%` }} />
                    </div>
                  </div>

                  <div className="meter-group">
                    <div className="meter-label-row">
                      <span>Network Bandwidth Load</span>
                      <span className="meter-val">{diag.stressMeters.networkLoad}%</span>
                    </div>
                    <div className="meter-track">
                      <div className="meter-fill net-fill" style={{ width: `${diag.stressMeters.networkLoad}%` }} />
                    </div>
                  </div>

                  <div className="meter-group">
                    <div className="meter-label-row">
                      <span>Compute Saturation</span>
                      <span className="meter-val">{diag.stressMeters.computeSaturation}%</span>
                    </div>
                    <div className="meter-track">
                      <div className="meter-fill compute-fill" style={{ width: `${diag.stressMeters.computeSaturation}%` }} />
                    </div>
                  </div>
                </div>

                {/* Key Takeaways */}
                <div className="takeaways-box">
                  <h4 className="takeaways-title">ARCHITECTURAL TAKEAWAYS</h4>
                  <div className="takeaways-list">
                    {diag.keyTakeaways.map((point, idx) => (
                      <div key={idx} className="takeaway-bullet">
                        <CheckCircle2 size={16} className="takeaway-icon" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
