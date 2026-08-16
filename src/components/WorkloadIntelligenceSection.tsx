import React, { useState } from 'react';
import { Layers, Network, HardDrive, Cpu, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import './WorkloadIntelligenceSection.css';

export const WorkloadIntelligenceSection: React.FC = () => {
  const { t, lang } = useLanguage();
  const w = t.workload;
  const isEs = lang === 'es';

  const [activeTab, setActiveTab] = useState<string>('nuke');

  const intelligenceData = [
    {
      id: 'nuke',
      name: w.tabs.nuke,
      vendor: isEs ? 'Dimensionamiento para Foundry Nuke' : 'Foundry Nuke Playout Sizing',
      subtitle: isEs ? 'Reproducción concurrente de secuencias OpenEXR 4K/8K' : 'High-Concurrency 4K/8K OpenEXR Sequence Playout',
      overview: isEs
        ? 'Los flujos de composición requieren un rendimiento de lectura secuencial sostenido para archivos OpenEXR multicapa. Las matrices NAS estándar sufren contención durante la revisión concurrente. El ajuste de recordsize en ZFS y la caché NVMe reducen los parones en reproducción.'
        : 'Compositing workflows require sustained sequential read throughput for multi-layer OpenEXR files. Standard NAS arrays experience I/O stalls during concurrent artist review. Dedicated ZFS recordsize tuning + NVMe Tier-0 caching ensures smooth playout.',
      networkSpec: isEs ? 'Acceso 25GbE a estaciones / Conmutación 100GbE en Core' : '25GbE Workstation Access / 100GbE Core Switching',
      storageSpec: isEs ? 'Caché NVMe Tier-0 + Almacenamiento ZFS (recordsize 1MB para EXRs)' : 'Tier-0 NVMe SLOG/L2ARC + ZFS Scale-Out (1M recordsize for EXRs)',
      computeSpec: isEs ? 'Procesadores de alta frecuencia + Alta densidad de RAM (128GB+ por puesto)' : 'High-Clock CPUs + High RAM Density (128GB+ per Nuke seat)',
      securitySpec: isEs ? 'Caché de assets cifrada y acceso remoto ZTNA' : 'Encrypted Asset Cache & ZTNA Remote Artist Access',
      benchmarks: isEs
        ? [
            'Rendimiento de lectura sostenido para nodos de reproducción 4K',
            'Ajuste de recordsize a 1MB en ZFS optimizando la E/S secuencial OpenEXR',
            'Caché NVMe reduciendo lecturas aleatorias sobre almacenamiento masivo',
            'Reproducción fluida durante la revisión concurrente de secuencias',
          ]
        : [
            'High sustained read bandwidth per 4K playout node',
            'ZFS 1MB recordsize tuning optimizing sequential OpenEXR read IOPS',
            'NVMe Tier-0 cache offloading random read I/O from spinning disks',
            'Smooth playout during concurrent multi-artist Nuke playback',
          ],
    },
    {
      id: 'houdini',
      name: w.tabs.houdini,
      vendor: isEs ? 'Dimensionamiento para SideFX Houdini' : 'SideFX Houdini Compute & Cache Sizing',
      subtitle: isEs ? 'Infraestructura orientada a simulaciones FLIP, Pyro, Vellum y partículas' : 'FLIP Fluid, Pyro Volume & Vellum Particle Simulation Infrastructure',
      overview: isEs
        ? 'Las simulaciones FX pueden generar grandes volúmenes de caché temporal. Una arquitectura que combine scratch NVMe, red dimensionada y almacenamiento compartido puede reducir la contención durante las escrituras y la posterior consolidación de datos.'
        : 'FX simulation caching generates multi-terabyte scratch files during fluid, pyro, and particle solve steps. Writing uncompressed sim caches directly to shared NAS storage chokes network IOPS for the entire studio. Local NVMe scratch volumes offload sim writes before staging to ZFS.',
      networkSpec: isEs ? 'Backbone de 25/40/100GbE dimensionado según la concurrencia, con una red dedicada para cachés de simulación cuando resulte necesario.' : '100GbE Core Backbone with Dedicated Sim Cache Subnet',
      storageSpec: isEs ? 'Scratch NVMe local de alta resistencia y almacenamiento ZFS para cachés, sujetos al dimensionamiento de capacidad, rendimiento y retención.' : 'High-Endurance Local NVMe Scratch per FX seat + ZFS Sim Storage',
      computeSpec: isEs ? 'Asignación de núcleos de render y alta densidad de memoria RAM (256GB+)' : 'Deadline CPU Cores per FX seat + High RAM Density (256GB+)',
      securitySpec: isEs ? 'Subredes aisladas para simulación y copias de seguridad de repositorios' : 'Isolated FX Sim Subnets & Immutable Backup Repositories',
      benchmarks: isEs
        ? [
            'Espacio scratch NVMe dedicado por estación de trabajo FX',
            'Priorización de colas de render en Deadline para procesos de simulación',
            'Optimización de escrituras ZFS evitando bloqueos de E/S en proyectos compartidos',
            'Sincronización planificada de cachés temporales al almacenamiento principal',
          ]
        : [
            'Dedicated NVMe scratch space allocated per FX workstation',
            'Deadline automated queue bursting prioritizing heavy Houdini simulation solves',
            'ZFS write acceleration preventing multi-user I/O stalls',
            'Automated background sim cache sync from local NVMe to project storage',
          ],
    },
    {
      id: 'maya',
      name: w.tabs.maya,
      vendor: isEs ? 'Dimensionamiento para Autodesk Maya y Render' : 'Autodesk & Chaos Group Render Sizing',
      subtitle: isEs ? 'Ensamblado de geometría, iluminación multipase y saturación de render farm' : 'Complex Geometry, Multi-Pass Lighting & Render Pool Saturation',
      overview: isEs
        ? 'Los pipelines 3D dependen de la carga rápida de assets (Alembic, USD, texturas pesadas) y del uso eficiente de la granja de renderizado CPU/GPU.'
        : 'High-density 3D animation pipelines rely on high-volume asset loading and massive GPU/CPU render farm saturation. Scene assembly requires rapid loading of Alembic, USD, and heavy texture maps, while render nodes demand high compute queue utilization.',
      networkSpec: isEs ? 'Conmutación mixta 10/25/100GbE adaptada a la estructura del estudio' : '10/25/100GbE Mixed Switching Array',
      storageSpec: isEs ? 'Caché NVMe para texturas de alto IOPS + Pool ZFS escalable' : 'High-IOPS Texture NVMe Cache + Scale-Out ZFS Pool',
      computeSpec: isEs ? 'Clusters GPU/CPU de alta densidad gestionados por Deadline' : 'High-Density GPU Clusters + Deadline Management',
      securitySpec: isEs ? 'Microsegmentación de red aislando la granja de renderizado' : 'Microsegmentation separating Render Farm from WAN',
      benchmarks: isEs
        ? [
            'Tiempos de carga de assets USD y Alembic optimizados mediante caché NVMe',
            'Gestión dinámica de licencias en Deadline aprovechando la granja',
            'Salida de render multipase AOV sin cuellos de botella en cola',
            'Distribución planificada de escenas hacia los nodos de render',
          ]
        : [
            'USD & Alembic asset load times accelerated via NVMe texture caching',
            'Deadline dynamic licensing maximizing CPU/GPU render node utilization',
            'Multi-pass AOV render output streaming without queue bottlenecks',
            'Automated scene file dependency staging to local render farm nodes',
          ],
    },
    {
      id: 'unreal',
      name: w.tabs.unreal,
      vendor: isEs ? 'Dimensionamiento para Unreal Engine (ICVFX)' : 'Epic Games Unreal Engine ICVFX Sizing',
      subtitle: isEs ? 'Producción virtual In-Camera VFX, nDisplay y sincronización PTP' : 'In-Camera VFX, LED Volume nDisplay & PTP Synchronization',
      overview: isEs
        ? 'Los volúmenes LED de producción virtual requieren renderizado GPU multinodo sincronizado mediante nDisplay. La latencia de red debe controlarse para evitar parpadeos o desincronizaciones en la pared LED.'
        : 'Virtual production LED volumes require multi-node GPU rendering synced via Epic nDisplay. Network latency must remain ultra-low to prevent frame tearing on the LED wall. Precision Time Protocol (PTP IEEE 1588) syncs camera shutters with render node GPUs.',
      networkSpec: isEs ? 'Conmutación Spine-Leaf con sincronización de reloj por hardware PTP IEEE 1588' : '100GbE Spine-Leaf with PTP IEEE 1588 Hardware Clock Sync',
      storageSpec: isEs ? 'Pool NVMe Tier-0 para transmisión rápida de assets en directo' : 'Tier-0 NVMe Fast Live Asset Streaming Pool',
      computeSpec: isEs ? 'Clusters nDisplay multi-GPU por nodo de renderizado' : 'Multi-GPU nDisplay Clusters per Render Node',
      securitySpec: isEs ? 'Red de volumen de producción cerrada bajo arquitectura Zero-Trust' : 'Zero-Trust Closed Production Volume Network',
      benchmarks: isEs
        ? [
            'Baja latencia entre nodos de renderizado nDisplay para volúmenes LED',
            'Sincronización PTP IEEE 1588 alineando cámara y pared LED',
            'Transmisión de texturas en tiempo real hacia la memoria GPU',
            'Reproducción estable durante movimientos de cámara en plató',
          ]
        : [
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
