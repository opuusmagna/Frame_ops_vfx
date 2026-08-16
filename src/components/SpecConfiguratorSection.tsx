import React, { useState } from 'react';
import { Calculator, ArrowRight, ShieldCheck, Info, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import './SpecConfiguratorSection.css';

/**
 * MATHEMATICAL FORMULA DOCUMENTATION & REASONING (CHECKPOINT C.3)
 * -----------------------------------------------------------------------------
 * Previous Formula:
 * - Simple 2-variable matrix lookup: workstations (1-10, 10-25, 25-50, 50+) and resolution (2k, 4k, 8k).
 * - Output fixed single-line strings (e.g., "10GbE Network", "50TB Storage").
 *
 * New Formula (Range-Based Sizing Model):
 * 1. Base Active Storage Range:
 *    - Min Storage (TB) = BaseVolume * (1 + AnnualGrowthFactor)
 *    - Max Storage (TB) = BaseVolume * (1 + AnnualGrowthFactor) * 1.4 + (Seats * 2.5)
 * 2. Throughput & Scratch Estimation:
 *    - Estimated Read Throughput = (NukeSeats * 180MB/s) + (MayaSeats * 120MB/s) + (UnrealSeats * 450MB/s) + (HoudiniSeats * 150MB/s)
 *    - Estimated Scratch Cache Tier = (HoudiniSeats * 2TB NVMe) + (NukeSeats * 1TB NVMe) + BaseCache (2TB - 8TB range)
 * 3. Network Sizing Rule:
 *    - If Total Throughput > 2500 MB/s or Total Seats > 30 or Resolution == '8k-exr' or UnrealSeats > 5 => '100GbE Spine-Leaf Core Backbone'
 *    - If Total Throughput > 800 MB/s or Total Seats > 10 => '25GbE / 40GbE High-Throughput Switching'
 *    - Else => '10GbE / 25GbE Low-Latency Switching'
 * 4. Protection Level Rule:
 *    - Base Protection: '3-2-1-1 Immutable Strategy'
 *    - If Retention == 'lto-custody' => Adds 'Off-Site LTO Tape Archival Custody'
 *    - If Security == 'tpn-aligned' => Adds 'TPN / MPA Security Microsegmentation & ZTNA'
 *
 * Technical Rationale:
 * - Eliminates rigid purchasing recommendations and single-vendor SKU locks.
 * - Displays realistic capacity and bandwidth ranges tailored to multi-application pipelines.
 *
 * Test Cases:
 * - Case A (Small 2D/3D Studio): 8 seats (Nuke: 4, Maya: 4), 20TB, 4K EXR -> Range: 25TB - 45TB ZFS, 25GbE Network Class.
 * - Case B (Mid FX Studio): 20 seats (Houdini: 8, Nuke: 8, Maya: 4), 50TB, 4K EXR -> Range: 70TB - 120TB ZFS, 25/100GbE Core, 16TB - 32TB NVMe Scratch.
 * - Case C (Enterprise VP Studio): 60 seats (Unreal: 15, Houdini: 20, Nuke: 25), 150TB, 8K EXR -> Range: 220TB - 380TB ZFS, 100GbE Spine-Leaf, TPN Aligned ZTNA.
 */

export const SpecConfiguratorSection: React.FC = () => {
  const { t, navigatePath, lang } = useLanguage();
  const c = t.calculator;
  const isEs = lang === 'es';

  // Calculator inputs
  const [totalSeats, setTotalSeats] = useState<number>(15);
  const [nukeSeats, setNukeSeats] = useState<number>(5);
  const [houdiniSeats, setHoudiniSeats] = useState<number>(4);
  const [mayaSeats, setMayaSeats] = useState<number>(4);
  const [unrealSeats, setUnrealSeats] = useState<number>(2);

  const [resolution, setResolution] = useState<string>('4k-exr');
  const [baseVolumeTB, setBaseVolumeTB] = useState<number>(50);
  const [annualGrowth, setAnnualGrowth] = useState<number>(0.3); // 30%
  const [retention, setRetention] = useState<string>('90-days');
  const [securityLevel, setSecurityLevel] = useState<string>('tpn-aligned');

  // Perform Range Sizing Math
  const growthMultiplier = 1 + annualGrowth;
  const minStorageTB = Math.round(baseVolumeTB * growthMultiplier);
  const maxStorageTB = Math.round(baseVolumeTB * growthMultiplier * 1.4 + totalSeats * 2);

  const totalEstThroughputMBs =
    nukeSeats * 180 + houdiniSeats * 150 + mayaSeats * 120 + unrealSeats * 450;

  const minScratchNVMeTB = Math.max(2, Math.round(houdiniSeats * 1.5 + nukeSeats * 0.5));
  const maxScratchNVMeTB = Math.max(4, Math.round(houdiniSeats * 3.0 + nukeSeats * 1.0 + 4));

  // Determine Network Range Class
  let networkRangeClass = isEs
    ? 'Clase 10GbE / 25GbE con switching de baja latencia'
    : '10GbE / 25GbE Low-Latency Switching Class';
  if (totalEstThroughputMBs > 2200 || totalSeats >= 30 || resolution === '8k-exr' || unrealSeats >= 5) {
    networkRangeClass = isEs
      ? 'Red troncal 100GbE Spine-Leaf de alta velocidad'
      : '100GbE Spine-Leaf High-Throughput Core Backbone';
  } else if (totalEstThroughputMBs > 800 || totalSeats >= 12) {
    networkRangeClass = isEs
      ? 'Conmutación 25GbE a puestos / Backbone 100GbE'
      : '25GbE Workstation Access / 100GbE Core Array';
  }

  // Determine Protection Range Class
  let protectionRangeClass = isEs
    ? 'Estrategia 3-2-1-1 (Copia local inmutable + Réplica externa)'
    : '3-2-1-1 Strategy (Immutable Local + Off-site Replication)';
  if (retention === 'lto-custody') {
    protectionRangeClass += isEs ? ' + Custodia en Cinta LTO' : ' + LTO Tape Custody';
  }

  if (securityLevel === 'tpn-aligned') {
    protectionRangeClass += isEs ? ' (Alineado con TPN/MPA)' : ' (TPN/MPA Aligned)';
  }

  // Render Capacity Range Class
  let renderClass = isEs
    ? 'Granja de renderizado híbrida CPU/GPU gestionada por Deadline'
    : 'Deadline Managed CPU/GPU Hybrid Render Pool';
  if (totalSeats > 25 || houdiniSeats >= 8) {
    renderClass = isEs
      ? 'Granja de alta densidad con colas de simulación priorizadas en Deadline'
      : 'High-Density Render Cluster with Prioritized Deadline Sim Queues';
  }

  const handleAuditRequest = () => {
    const contactPath = lang === 'en'
      ? `/en/contact/?service=vfx-infrastructure&workstations=${totalSeats}`
      : `/es/contacto/?service=vfx-infrastructure&workstations=${totalSeats}`;
    navigatePath(contactPath);
  };

  return (
    <section id="calculator" className="spec-calculator-section section-with-bg">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-kicker">{c.kicker}</span>
          <h2 className="section-title">
            {isEs ? 'Estimador Inicial de Infraestructura VFX' : 'VFX Infrastructure Initial Estimator'}
          </h2>
          <p className="section-subtitle">
            {isEs
              ? 'Introduce los parámetros orientativos de tu estudio para calcular rangos estimativos de almacenamiento, red, caché NVMe y estrategia de resiliencia.'
              : 'Enter your studio baseline parameters to calculate estimated ranges for storage, network backbone, NVMe scratch, and resilience tiers.'}
          </p>
        </div>

        <div className="calculator-container corp-panel">
          <div className="calculator-grid">
            {/* Input Controls Column */}
            <div className="calc-inputs-col">
              <h3 className="calc-col-title">
                <Calculator size={20} className="calc-icon" />
                <span>{isEs ? 'Parámetros del Estudio' : 'Studio Parameters'}</span>
              </h3>

              {/* Total Seats Slider */}
              <div className="calc-form-group">
                <div className="label-val-row">
                  <label htmlFor="totalSeatsRange">{isEs ? 'Puestos concurrentes totales:' : 'Total concurrent seats:'}</label>
                  <span className="range-val-badge">{totalSeats} {isEs ? 'puestos' : 'seats'}</span>
                </div>
                <input
                  type="range"
                  id="totalSeatsRange"
                  min={3}
                  max={100}
                  value={totalSeats}
                  onChange={(e) => setTotalSeats(Number(e.target.value))}
                  className="calc-range-slider"
                />
              </div>

              {/* Software Distribution Breakdown */}
              <div className="software-breakdown-box">
                <span className="breakdown-label">{isEs ? 'Distribución estimada por software (puestos):' : 'Estimated seat breakdown by software:'}</span>
                <div className="breakdown-inputs-grid">
                  <div>
                    <span className="mini-lbl">Nuke:</span>
                    <input
                      type="number"
                      min={0}
                      max={totalSeats}
                      value={nukeSeats}
                      onChange={(e) => setNukeSeats(Number(e.target.value))}
                      className="calc-num-input"
                    />
                  </div>
                  <div>
                    <span className="mini-lbl">Houdini:</span>
                    <input
                      type="number"
                      min={0}
                      max={totalSeats}
                      value={houdiniSeats}
                      onChange={(e) => setHoudiniSeats(Number(e.target.value))}
                      className="calc-num-input"
                    />
                  </div>
                  <div>
                    <span className="mini-lbl">Maya/Arnold:</span>
                    <input
                      type="number"
                      min={0}
                      max={totalSeats}
                      value={mayaSeats}
                      onChange={(e) => setMayaSeats(Number(e.target.value))}
                      className="calc-num-input"
                    />
                  </div>
                  <div>
                    <span className="mini-lbl">Unreal VP:</span>
                    <input
                      type="number"
                      min={0}
                      max={totalSeats}
                      value={unrealSeats}
                      onChange={(e) => setUnrealSeats(Number(e.target.value))}
                      className="calc-num-input"
                    />
                  </div>
                </div>
              </div>

              {/* Resolution Select */}
              <div className="calc-form-group">
                <label htmlFor="resSelect">{isEs ? 'Formato y carga dominante:' : 'Dominant resolution & load:'}</label>
                <select
                  id="resSelect"
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                  className="calc-select-input"
                >
                  <option value="2k-exr">2K / HD OpenEXR Sequence Playout</option>
                  <option value="4k-exr">4K OpenEXR Uncompressed Playout</option>
                  <option value="8k-exr">8K EXR / Heavy ICVFX LED Volume</option>
                </select>
              </div>

              {/* Base Active Volume & Growth */}
              <div className="calc-form-row-2">
                <div className="calc-form-group">
                  <label htmlFor="volumeInput">{isEs ? 'Volumen activo (TB):' : 'Active Volume (TB):'}</label>
                  <input
                    type="number"
                    id="volumeInput"
                    min={5}
                    max={1000}
                    value={baseVolumeTB}
                    onChange={(e) => setBaseVolumeTB(Number(e.target.value))}
                    className="calc-num-input full-w"
                  />
                </div>
                <div className="calc-form-group">
                  <label htmlFor="growthSelect">{isEs ? 'Crecimiento anual:' : 'Annual Growth:'}</label>
                  <select
                    id="growthSelect"
                    value={annualGrowth}
                    onChange={(e) => setAnnualGrowth(Number(e.target.value))}
                    className="calc-select-input"
                  >
                    <option value={0.15}>15% / año</option>
                    <option value={0.3}>30% / año</option>
                    <option value={0.5}>50%+ / año</option>
                  </select>
                </div>
              </div>

              {/* Security & Retention */}
              <div className="calc-form-row-2">
                <div className="calc-form-group">
                  <label htmlFor="retentionSelect">{isEs ? 'Retención y copia:' : 'Retention & Backup:'}</label>
                  <select
                    id="retentionSelect"
                    value={retention}
                    onChange={(e) => setRetention(e.target.value)}
                    className="calc-select-input"
                  >
                    <option value="30-days">30 {isEs ? 'días' : 'days'} (Local Immutable)</option>
                    <option value="90-days">90 {isEs ? 'días' : 'days'} (Cloud Replication)</option>
                    <option value="lto-custody">{isEs ? 'Custodia LTO / Proyecto' : 'LTO Tape Custody'}</option>
                  </select>
                </div>
                <div className="calc-form-group">
                  <label htmlFor="secSelect">{isEs ? 'Seguridad:' : 'Security Standard:'}</label>
                  <select
                    id="secSelect"
                    value={securityLevel}
                    onChange={(e) => setSecurityLevel(e.target.value)}
                    className="calc-select-input"
                  >
                    <option value="standard">{isEs ? 'Estándar B2B' : 'Standard B2B'}</option>
                    <option value="tpn-aligned">{isEs ? 'Alineado TPN / MPA' : 'TPN / MPA Aligned'}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Estimated Ranges Output Column */}
            <div className="calc-outputs-col">
              <h3 className="calc-col-title">
                <ShieldCheck size={20} className="calc-icon" />
                <span>{isEs ? 'Rangos Orientativos Estimados' : 'Estimated Infrastructure Ranges'}</span>
              </h3>

              <div className="results-cards-list">
                {/* Active Storage Range */}
                <div className="result-card">
                  <span className="result-card-label">{isEs ? 'Almacenamiento Activo Orientativo (Pool ZFS):' : 'Estimated Active Storage Range (ZFS Pool):'}</span>
                  <div className="result-card-value text-cyan">
                    {minStorageTB} TB — {maxStorageTB} TB ZFS
                  </div>
                  <span className="result-card-sub">
                    {isEs
                      ? `Contempla crecimiento del ${Math.round(annualGrowth * 100)}% y margen para ${totalSeats} puestos.`
                      : `Includes ${Math.round(annualGrowth * 100)}% annual growth headroom for ${totalSeats} seats.`}
                  </span>
                </div>

                {/* Scratch / Cache Range */}
                <div className="result-card">
                  <span className="result-card-label">{isEs ? 'Capa Scratch / Caché NVMe Requerida:' : 'Recommended NVMe Scratch & Cache Tier:'}</span>
                  <div className="result-card-value">
                    {minScratchNVMeTB} TB — {maxScratchNVMeTB} TB NVMe Tier-0
                  </div>
                  <span className="result-card-sub">
                    {isEs
                      ? 'Espacio de alta resistencia para cachés temporales de simulación e imágenes.'
                      : 'High-endurance scratch volume for simulation solves & EXR caching.'}
                  </span>
                </div>

                {/* Network Class */}
                <div className="result-card">
                  <span className="result-card-label">{c.estNetwork}</span>
                  <div className="result-card-value highlight-val">{networkRangeClass}</div>
                  <span className="result-card-sub">
                    {isEs
                      ? `Ancho de banda estimado: ~${totalEstThroughputMBs} MB/s sostenidos.`
                      : `Estimated peak bandwidth: ~${totalEstThroughputMBs} MB/s sustained.`}
                  </span>
                </div>

                {/* Data Protection Tier */}
                <div className="result-card">
                  <span className="result-card-label">{isEs ? 'Estrategia de Protección de Datos:' : 'Data Protection Level:'}</span>
                  <div className="result-card-value">{protectionRangeClass}</div>
                </div>

                {/* Render Class */}
                <div className="result-card">
                  <span className="result-card-label">{c.estRender}</span>
                  <div className="result-card-value">{renderClass}</div>
                </div>

                {/* Pending Diagnostic Questions */}
                <div className="pending-questions-box">
                  <span className="pending-title">{isEs ? 'Preguntas pendientes para el diagnóstico definitivo:' : 'Key technical questions for formal audit:'}</span>
                  <div className="pending-list">
                    <div className="pending-item">
                      <CheckCircle2 size={15} className="pending-icon" />
                      <span>{isEs ? 'Medición de IOPS reales de lectura/escritura en pico' : 'Real-world peak read/write IOPS measurement'}</span>
                    </div>
                    <div className="pending-item">
                      <CheckCircle2 size={15} className="pending-icon" />
                      <span>{isEs ? 'Verificación de cableado de red y latencias de conmutador' : 'Network cabling audit & switch port latency checks'}</span>
                    </div>
                    <div className="pending-item">
                      <CheckCircle2 size={15} className="pending-icon" />
                      <span>{isEs ? 'Validación del plan de restauración (RPO/RTO en pruebas)' : 'Restoration testing validation (RPO/RTO live drills)'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mandatory Disclaimer Note */}
              <div className="calculator-disclaimer-box">
                <Info size={18} className="disclaimer-icon" />
                <p className="disclaimer-text">{c.disclaimer}</p>
              </div>

              <button type="button" className="btn-corporate-primary full-w margin-top" onClick={handleAuditRequest}>
                <span>{c.cta}</span>
                <ArrowRight size={18} className="btn-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
