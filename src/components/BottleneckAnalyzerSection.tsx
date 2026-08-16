import React, { useState } from 'react';
import { Layers, AlertTriangle, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import './BottleneckAnalyzerSection.css';

export const BottleneckAnalyzerSection: React.FC = () => {
  const { t, navigatePath, lang } = useLanguage();
  const b = t.bottleneck;

  const [selectedId, setSelectedId] = useState<string>('nuke');

  const diagnosticsData = [
    {
      id: 'nuke',
      software: b.tabs.nuke,
      category: '2D COMPOSITING & PLAYOUT',
      bottleneckTitle: 'Frame Drops during Multi-Artist 4K Playback',
      bottleneckSummary: 'When multiple Nuke artists review uncompressed 4K OpenEXR image sequences concurrently, shared NAS storage chokes on read IOPS, resulting in stuttering playout and wasted artist time.',
      genericItFailure: 'Deploying standard 1GbE/10GbE NAS storage without NVMe caching or ZFS recordsize tuning for sequential image sequence streaming.',
      frameOpsFix: 'Deploy 25/100GbE switching fabric + NVMe Tier-0 cache pool tuned with 1MB ZFS recordsize for high-concurrency 4K OpenEXR playback.',
      stressMeters: { readThroughput: 95, writeLatency: 35, networkLoad: 90, computeSaturation: 75 },
      keyTakeaways: [
        'High-concurrency OpenEXR image sequence read bandwidth',
        'ZFS 1MB recordsize tuning optimizing sequential read IOPS',
        'NVMe Tier-0 cache offloading random read I/O',
      ],
      serviceKey: 'vfx-infrastructure',
    },
    {
      id: 'houdini',
      software: b.tabs.houdini,
      category: 'SIMULATION & PARTICLE SOLVE',
      bottleneckTitle: 'Heavy SIM Cache Storage Saturations',
      bottleneckSummary: 'FX simulation caching generates multi-terabyte scratch files during fluid, pyro, and particle solves. Writing uncompressed sim caches directly to shared storage chokes network IOPS.',
      genericItFailure: 'Writing temporary simulation caches directly to shared main storage instead of dedicated high-speed NVMe scratch pools.',
      frameOpsFix: 'Equip FX seats with dedicated local NVMe scratch pools + automated background sync to master ZFS project storage.',
      stressMeters: { readThroughput: 70, writeLatency: 95, networkLoad: 80, computeSaturation: 95 },
      keyTakeaways: [
        'High-endurance NVMe scratch space allocated for FX workstations',
        'Deadline automated queue bursting prioritizing heavy simulation solves',
        'ZFS write acceleration preventing multi-user I/O stalls',
      ],
      serviceKey: 'storage-data',
    },
    {
      id: 'maya',
      software: b.tabs.maya,
      category: '3D ANIMATION & LIGHTING',
      bottleneckTitle: 'Asset Assembly & Multi-Pass Render Stalls',
      bottleneckSummary: '3D pipelines rely on high-volume asset loading (Alembic, USD, heavy textures) and massive GPU/CPU render farm saturation, causing startup delays.',
      genericItFailure: 'Slow asset loading over standard network shares without texture caching or scene dependency staging.',
      frameOpsFix: 'NVMe texture caching + Deadline dynamic license control maximizing CPU/GPU render node compute saturation.',
      stressMeters: { readThroughput: 85, writeLatency: 40, networkLoad: 75, computeSaturation: 90 },
      keyTakeaways: [
        'USD & Alembic asset load times accelerated via NVMe texture caching',
        'Deadline dynamic licensing maximizing CPU/GPU render node utilization',
        'Multi-pass AOV render output streaming without queue bottlenecks',
      ],
      serviceKey: 'render-pipeline',
    },
    {
      id: 'deadline',
      software: b.tabs.deadline,
      category: 'RENDER FARM MANAGEMENT',
      bottleneckTitle: 'Repository Lockups & Node Under-Utilization',
      bottleneckSummary: 'During peak render bursts, hundreds of CPU/GPU nodes request scene files simultaneously, causing database lockups on the repository and leaving nodes idle.',
      genericItFailure: 'Running Deadline repository database on unoptimized VMs without dedicated NVMe IOPS, creating queue dependency bottlenecks.',
      frameOpsFix: 'Engineer high-availability Deadline repository cluster on dedicated NVMe nodes + dynamic license automation.',
      stressMeters: { readThroughput: 80, writeLatency: 60, networkLoad: 85, computeSaturation: 100 },
      keyTakeaways: [
        'Optimized render node CPU/GPU saturation during peak production bursts',
        'Automated Deadline queue dependency resolution',
        'Multi-GPU render farm clusters with monitored node health',
      ],
      serviceKey: 'render-pipeline',
    },
    {
      id: 'unreal',
      software: b.tabs.unreal,
      category: 'VIRTUAL PRODUCTION (ICVFX)',
      bottleneckTitle: 'nDisplay Clock Desync & LED Wall Frame Tearing',
      bottleneckSummary: 'In-Camera VFX (ICVFX) LED volumes require multi-node GPU rendering synced via nDisplay. Network latency causes tracking desync and visible frame tearing.',
      genericItFailure: 'Using standard ethernet switches without Precision Time Protocol (PTP IEEE 1588) hardware clock synchronization.',
      frameOpsFix: 'Deploy 100GbE Spine-Leaf network switches with PTP IEEE 1588 hardware clock sync, maintaining low glass-to-glass latency across nDisplay nodes.',
      stressMeters: { readThroughput: 90, writeLatency: 15, networkLoad: 95, computeSaturation: 90 },
      keyTakeaways: [
        'Low glass-to-glass latency across nDisplay LED render nodes',
        'PTP IEEE 1588 hardware clock synchronization locking camera to LED wall',
        'Real-time texture streaming into Unreal Engine GPU memory',
      ],
      serviceKey: 'high-performance-networks',
    },
  ];

  const diag = diagnosticsData.find((d) => d.id === selectedId) || diagnosticsData[0];

  const handleCtaClick = () => {
    const contactPath = lang === 'en'
      ? `/en/contact/?service=${diag.serviceKey}`
      : `/es/contacto/?service=${diag.serviceKey}`;
    navigatePath(contactPath);
  };

  return (
    <section id="analyzer" className="bottleneck-section section-with-bg">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-kicker">{b.kicker}</span>
          <h2 className="section-title">{b.title}</h2>
          <p className="section-subtitle">{b.subtitle}</p>
        </div>

        <div className="diagnostic-card corp-panel">
          {/* Software Tabs Header */}
          <div className="tab-header-bar grid-5-cols">
            {diagnosticsData.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`tab-header-btn ${selectedId === item.id ? 'active' : ''}`}
                onClick={() => setSelectedId(item.id)}
              >
                <Layers size={18} className="tab-header-icon" />
                <span>{item.software}</span>
              </button>
            ))}
          </div>

          {/* Active Diagnostic Content */}
          <div className="diagnostic-card-body">
            <div className="diagnostic-header-row">
              <div>
                <span className="diagnostic-badge">{diag.category}</span>
                <h3 className="diagnostic-title">{diag.bottleneckTitle}</h3>
              </div>
            </div>

            <div className="diagnostic-body-grid">
              {/* Left Details */}
              <div className="diagnostic-details-col">
                <div className="diag-box problem-box">
                  <div className="diag-box-header">
                    <AlertTriangle size={18} className="icon-warning" />
                    <h4>{b.problemTitle}</h4>
                  </div>
                  <p>{diag.bottleneckSummary}</p>
                </div>

                <div className="diag-box failure-box">
                  <div className="diag-box-header">
                    <Layers size={18} className="icon-failure" />
                    <h4>{b.failureTitle}</h4>
                  </div>
                  <p>{diag.genericItFailure}</p>
                </div>

                <div className="diag-box solution-box">
                  <div className="diag-box-header">
                    <ShieldCheck size={18} className="icon-solution" />
                    <h4>{b.solutionTitle}</h4>
                  </div>
                  <p>{diag.frameOpsFix}</p>
                </div>
              </div>

              {/* Right Stress Meters */}
              <div className="diagnostic-metrics-col">
                <div className="metrics-meter-card">
                  <h4 className="meter-card-title">{b.stressTitle}</h4>

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

                <div className="takeaways-box">
                  <h4 className="takeaways-title">{b.takeawaysTitle}</h4>
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

            <div className="text-center margin-top">
              <button type="button" className="btn-corporate-primary" onClick={handleCtaClick}>
                <span>{b.cta}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
