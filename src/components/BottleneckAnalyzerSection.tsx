import React, { useState } from 'react';
import { Layers, AlertTriangle, ShieldCheck, CheckCircle2, ArrowRight, Info } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import './BottleneckAnalyzerSection.css';

export const BottleneckAnalyzerSection: React.FC = () => {
  const { t, navigatePath, lang } = useLanguage();
  const b = t.bottleneck;
  const isEs = lang === 'es';

  const [selectedId, setSelectedId] = useState<string>('nuke');

  const diagnosticsData = [
    {
      id: 'nuke',
      software: b.tabs.nuke,
      category: isEs ? 'COMPOSICIÓN 2D Y REPRODUCCIÓN' : '2D COMPOSITING & PLAYOUT',
      bottleneckTitle: isEs ? 'Caídas de Frames en Reproducción Concurrente 4K' : 'Frame Drops during Multi-Artist 4K Playback',
      bottleneckSummary: isEs
        ? 'Cuando varios artistas de Nuke revisan secuencias de imágenes 4K OpenEXR sin comprimir de forma simultánea, las matrices de almacenamiento compartido sufren contención de E/S, provocando parones en la reproducción.'
        : 'When multiple Nuke artists review uncompressed 4K OpenEXR image sequences concurrently, shared NAS storage chokes on read IOPS, resulting in stuttering playout and wasted artist time.',
      genericItFailure: isEs
        ? 'Despliegue de almacenamiento NAS en redes 1GbE/10GbE sin caché NVMe ni ajuste de recordsize en ZFS para lectura de secuencias de imágenes.'
        : 'Deploying standard 1GbE/10GbE NAS storage without NVMe caching or ZFS recordsize tuning for sequential image sequence streaming.',
      frameOpsFix: isEs
        ? 'Conmutación de alta velocidad en 25/100GbE + Caché NVMe Tier-0 ajustada a 1MB de recordsize en ZFS para alta concurrencia de lectura.'
        : 'Deploy 25/100GbE switching fabric + NVMe Tier-0 cache pool tuned with 1MB ZFS recordsize for high-concurrency 4K OpenEXR playback.',
      stressMeters: { readThroughput: 95, writeLatency: 35, networkLoad: 90, computeSaturation: 75 },
      keyTakeaways: isEs
        ? [
            'Ancho de banda optimizado para lectura secuencial de imágenes OpenEXR',
            'Ajuste de 1MB de recordsize en ZFS optimizando IOPS de lectura',
            'Caché NVMe Tier-0 absorbiendo lecturas aleatorias',
          ]
        : [
            'High-concurrency OpenEXR image sequence read bandwidth',
            'ZFS 1MB recordsize tuning optimizing sequential read IOPS',
            'NVMe Tier-0 cache offloading random read I/O',
          ],
      serviceKey: 'vfx-infrastructure',
      issueKey: 'nuke-io',
      ctaLabel: isEs ? 'Solicitar análisis de E/S para Nuke' : 'Request Nuke I/O Analysis',
    },
    {
      id: 'houdini',
      software: b.tabs.houdini,
      category: isEs ? 'SIMULACIÓN Y RESOLUCIÓN DE PARTÍCULAS' : 'SIMULATION & PARTICLE SOLVE',
      bottleneckTitle: isEs ? 'Saturación del Almacenamiento por Caché de Simulaciones Intensivas' : 'Heavy SIM Cache Storage Saturations',
      bottleneckSummary: isEs
        ? 'Las simulaciones FX pueden generar varios terabytes de caché temporal. Escribir cachés sin comprimir directamente sobre almacenamiento compartido puede saturar el ancho de banda y las colas de E/S si la red, la caché y el almacenamiento no se dimensionan conjuntamente.'
        : 'FX simulation caching generates multi-terabyte scratch files during fluid, pyro, and particle solve steps. Writing uncompressed sim caches directly to shared NAS storage chokes network IOPS for the entire studio. Local NVMe scratch volumes offload sim writes before staging to ZFS.',
      genericItFailure: isEs
        ? 'Escritura directa de cachés temporales de simulación sobre el almacenamiento principal compartido en lugar de contar con espacio scratch NVMe dedicado.'
        : 'Writing temporary simulation caches directly to shared main storage instead of dedicated high-speed NVMe scratch pools.',
      frameOpsFix: isEs
        ? 'Estaciones FX equipadas con volumen scratch NVMe dedicado + sincronización planificada al almacenamiento ZFS principal.'
        : 'Equip FX seats with dedicated local NVMe scratch pools + automated background sync to master ZFS project storage.',
      stressMeters: { readThroughput: 70, writeLatency: 95, networkLoad: 80, computeSaturation: 95 },
      keyTakeaways: isEs
        ? [
            'Espacio scratch NVMe de alta resistencia para puestos de simulación FX',
            'Gestión de colas en Deadline priorizando procesos de simulación intensivos',
            'Optimización de escritura en ZFS reduciendo bloqueos de E/S',
          ]
        : [
            'High-endurance NVMe scratch space allocated per FX workstation',
            'Deadline automated queue bursting prioritizing heavy Houdini simulation solves',
            'ZFS write acceleration preventing multi-user I/O stalls',
          ],
      serviceKey: 'storage-data',
      issueKey: 'houdini-cache',
      ctaLabel: isEs ? 'Evaluar caché y almacenamiento para Houdini' : 'Evaluate Houdini Cache & Storage',
    },
    {
      id: 'maya',
      software: b.tabs.maya,
      category: isEs ? 'ANIMACIÓN 3D E ILUMINACIÓN' : '3D ANIMATION & LIGHTING',
      bottleneckTitle: isEs ? 'Carga de Assets y Renderizado Multipase' : 'Asset Assembly & Multi-Pass Render Stalls',
      bottleneckSummary: isEs
        ? 'Los pipelines 3D dependen de la carga pesada de assets (Alembic, USD, texturas de alta resolución) y del renderizado CPU/GPU intensivo.'
        : '3D pipelines rely on high-volume asset loading (Alembic, USD, heavy textures) and massive GPU/CPU render farm saturation, causing startup delays.',
      genericItFailure: isEs
        ? 'Carga lenta de assets a través de recursos de red sin caché de texturas ni etapas de preparación previa.'
        : 'Slow asset loading over standard network shares without texture caching or scene dependency staging.',
      frameOpsFix: isEs
        ? 'Caché NVMe para texturas + gestión dinámica de licencias en Deadline optimizando los nodos de render GPU/CPU.'
        : 'NVMe texture caching + Deadline dynamic license control maximizing CPU/GPU render node compute saturation.',
      stressMeters: { readThroughput: 85, writeLatency: 40, networkLoad: 75, computeSaturation: 90 },
      keyTakeaways: isEs
        ? [
            'Carga de assets USD y Alembic acelerada mediante caché de texturas',
            'Aprovechamiento de la granja de renderizado mediante gestión de Deadline',
            'Transmisión de renders multipase AOV sin cuellos de botella en cola',
          ]
        : [
            'USD & Alembic asset load times accelerated via NVMe texture caching',
            'Deadline dynamic licensing maximizing CPU/GPU render node utilization',
            'Multi-pass AOV render output streaming without queue bottlenecks',
          ],
      serviceKey: 'render-pipeline',
      issueKey: 'maya-3d',
      ctaLabel: isEs ? 'Revisar infraestructura 3D y renderizado' : 'Review 3D & Rendering Setup',
    },
    {
      id: 'deadline',
      software: b.tabs.deadline,
      category: isEs ? 'GESTIÓN DE GRANJA DE RENDER' : 'RENDER FARM MANAGEMENT',
      bottleneckTitle: isEs ? 'Bloqueos en Repositorio e Infrautilización de Nodos' : 'Repository Lockups & Node Under-Utilization',
      bottleneckSummary: isEs
        ? 'Durante picos de renderizado, cientos de nodos CPU/GPU solicitan datos simultáneamente, pudiendo causar saturación en la base de datos del repositorio.'
        : 'During peak render bursts, hundreds of CPU/GPU nodes request scene files simultaneously, causing database lockups on the repository and leaving nodes idle.',
      genericItFailure: isEs
        ? 'Ejecución del repositorio Deadline en máquinas virtuales con baja E/S sin almacenamiento NVMe dedicado.'
        : 'Running Deadline repository database on unoptimized VMs without dedicated NVMe IOPS, creating queue dependency bottlenecks.',
      frameOpsFix: isEs
        ? 'Cluster de repositorio Deadline configurado sobre nodos NVMe dedicados con automatización de licencias.'
        : 'Engineer high-availability Deadline repository cluster on dedicated NVMe nodes + dynamic license automation.',
      stressMeters: { readThroughput: 80, writeLatency: 60, networkLoad: 85, computeSaturation: 100 },
      keyTakeaways: isEs
        ? [
            'Rendimiento supervisado de nodos GPU/CPU durante cargas punta',
            'Resolución eficiente de dependencias en colas de Deadline',
            'Control continuo de salud de nodos en clusters de render',
          ]
        : [
            'Optimized render node CPU/GPU saturation during peak production bursts',
            'Automated Deadline queue dependency resolution',
            'Multi-GPU render farm clusters with monitored node health',
          ],
      serviceKey: 'render-pipeline',
      issueKey: 'deadline-farm',
      ctaLabel: isEs ? 'Auditar granja de render y Deadline' : 'Audit Render Farm & Deadline',
    },
    {
      id: 'unreal',
      software: b.tabs.unreal,
      category: isEs ? 'PRODUCCIÓN VIRTUAL (ICVFX)' : 'VIRTUAL PRODUCTION (ICVFX)',
      bottleneckTitle: isEs ? 'Sincronización nDisplay y Latencia en Paredes LED' : 'nDisplay Clock Desync & LED Wall Frame Tearing',
      bottleneckSummary: isEs
        ? 'Los volúmenes LED de producción virtual requieren renderizado GPU multinodo sincronizado mediante nDisplay. La latencia de red debe controlarse para evitar parpadeos.'
        : 'In-Camera VFX (ICVFX) LED volumes require multi-node GPU rendering synced via nDisplay. Network latency causes tracking desync and visible frame tearing.',
      genericItFailure: isEs
        ? 'Uso de conmutadores estándar sin soporte para sincronización de reloj por hardware Precision Time Protocol (PTP IEEE 1588).'
        : 'Using standard ethernet switches without Precision Time Protocol (PTP IEEE 1588) hardware clock synchronization.',
      frameOpsFix: isEs
        ? 'Conmutadores Spine-Leaf en 100GbE con sincronización PTP IEEE 1588 reduciendo latencias en nodos nDisplay.'
        : 'Deploy 100GbE Spine-Leaf network switches with PTP IEEE 1588 hardware clock sync, maintaining low glass-to-glass latency across nDisplay nodes.',
      stressMeters: { readThroughput: 90, writeLatency: 15, networkLoad: 95, computeSaturation: 90 },
      keyTakeaways: isEs
        ? [
            'Baja latencia entre nodos de renderizado nDisplay',
            'Sincronización de reloj por hardware PTP IEEE 1588 entre cámara y pantalla LED',
            'Transmisión de texturas en tiempo real hacia la memoria GPU',
          ]
        : [
            'Low glass-to-glass latency across nDisplay LED render nodes',
            'PTP IEEE 1588 hardware clock synchronization locking camera to LED wall',
            'Real-time texture streaming into Unreal Engine memory',
          ],
      serviceKey: 'high-performance-networks',
      issueKey: 'unreal-vp',
      ctaLabel: isEs ? 'Evaluar infraestructura para producción virtual' : 'Evaluate Virtual Production Setup',
    },
  ];

  const diag = diagnosticsData.find((d) => d.id === selectedId) || diagnosticsData[0];

  const handleCtaClick = () => {
    const contactPath = lang === 'en'
      ? `/en/contact/?service=${diag.serviceKey}&issue=${diag.issueKey}`
      : `/es/contacto/?service=${diag.serviceKey}&issue=${diag.issueKey}`;
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
                      <span>{isEs ? 'Presión de lectura' : 'Read Throughput Stress'}</span>
                      <span className="meter-val">{diag.stressMeters.readThroughput}%</span>
                    </div>
                    <div className="meter-track">
                      <div className="meter-fill read-fill" style={{ width: `${diag.stressMeters.readThroughput}%` }} />
                    </div>
                  </div>

                  <div className="meter-group">
                    <div className="meter-label-row">
                      <span>{isEs ? 'Latencia de escritura' : 'Write Latency Stress'}</span>
                      <span className="meter-val">{diag.stressMeters.writeLatency}%</span>
                    </div>
                    <div className="meter-track">
                      <div className="meter-fill write-fill" style={{ width: `${diag.stressMeters.writeLatency}%` }} />
                    </div>
                  </div>

                  <div className="meter-group">
                    <div className="meter-label-row">
                      <span>{isEs ? 'Carga de red' : 'Network Bandwidth Load'}</span>
                      <span className="meter-val">{diag.stressMeters.networkLoad}%</span>
                    </div>
                    <div className="meter-track">
                      <div className="meter-fill net-fill" style={{ width: `${diag.stressMeters.networkLoad}%` }} />
                    </div>
                  </div>

                  <div className="meter-group">
                    <div className="meter-label-row">
                      <span>{isEs ? 'Saturación de cómputo' : 'Compute Saturation'}</span>
                      <span className="meter-val">{diag.stressMeters.computeSaturation}%</span>
                    </div>
                    <div className="meter-track">
                      <div className="meter-fill compute-fill" style={{ width: `${diag.stressMeters.computeSaturation}%` }} />
                    </div>
                  </div>

                  {/* Mandatory Stress Meter Disclaimer Note */}
                  <div className="meter-disclaimer-note">
                    <Info size={14} className="disclaimer-icon" />
                    <span>
                      {isEs
                        ? 'Perfil orientativo de presión de recursos. No representa una medición del entorno del visitante.'
                        : 'Indicative resource stress profile. Does not represent a measurement of visitor environment.'}
                    </span>
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
                <span>{diag.ctaLabel}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
