import React, { useState } from 'react';
import { Calculator, ArrowRight, ShieldCheck, Info, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import './SpecConfiguratorSection.css';

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

  // Determine Network Range Class (Defensible & Conditioned formulation)
  const networkRangeClass = isEs
    ? 'Clase de red orientativa: 25–100GbE, sujeta a concurrencia, códecs, patrón de E/S, crecimiento y tolerancia a fallos.'
    : 'Orientative network class: 25–100GbE, subject to concurrency, codecs, I/O patterns, growth, and fault tolerance.';

  // Determine Protection Range Class (Defensible & Conditioned formulation)
  let protectionRangeClass = isEs
    ? 'Estrategia de respaldo 3-2-1-1 con controles orientados a la preparación técnica para evaluaciones TPN y alineación con MPA Content Security Best Practices.'
    : '3-2-1-1 Data protection strategy with controls oriented toward technical TPN evaluation readiness and alignment with MPA Content Security Best Practices.';

  if (retention === 'lto-custody') {
    protectionRangeClass += isEs ? ' Incluye custodia en cinta LTO.' : ' Includes LTO tape archive custody.';
  }

  // Render Capacity Range Class
  const renderClass = isEs
    ? 'Gestión de renderizado orientativa mediante AWS Thinkbox Deadline en granja CPU/GPU híbrida.'
    : 'Orientative CPU/GPU hybrid render farm orchestration via AWS Thinkbox Deadline.';

  const handleAuditRequest = () => {
    const contactPath = lang === 'en'
      ? `/en/contact/?service=vfx-infrastructure&workstations=${totalSeats}`
      : `/es/contacto/?service=vfx-infrastructure&workstations=${totalSeats}`;
    navigatePath(contactPath);
  };

  return (
    <section id="calculator" data-testid="infrastructure-estimator" className="spec-calculator-section section-with-bg">
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
                <div className="breakdown-inputs-grid" translate="no">
                  <div>
                    <span className="mini-lbl notranslate">Nuke:</span>
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
                    <span className="mini-lbl notranslate">Houdini:</span>
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
                    <span className="mini-lbl notranslate">Maya/Arnold:</span>
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
                    <span className="mini-lbl notranslate">Unreal VP:</span>
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
                    <option value="30-days">30 {isEs ? 'días' : 'days'} ({isEs ? 'Inmutable local' : 'Local Immutable'})</option>
                    <option value="90-days">90 {isEs ? 'días' : 'days'} ({isEs ? 'Replicación en la nube' : 'Cloud Replication'})</option>
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
                    <option value="tpn-aligned">{isEs ? 'Preparación TPN / MPA' : 'TPN / MPA Readiness'}</option>
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
                      ? `Supuestos: Crecimiento anual del ${Math.round(annualGrowth * 100)}% y margen operativo para ${totalSeats} puestos.`
                      : `Assumptions: ${Math.round(annualGrowth * 100)}% annual growth headroom for ${totalSeats} seats.`}
                  </span>
                </div>

                {/* Scratch / Cache Range */}
                <div className="result-card">
                  <span className="result-card-label">{isEs ? 'Capa Scratch / Caché NVMe Estimada:' : 'Estimated NVMe Scratch & Cache Tier:'}</span>
                  <div className="result-card-value">
                    {minScratchNVMeTB} TB — {maxScratchNVMeTB} TB NVMe Tier-0
                  </div>
                  <span className="result-card-sub">
                    {isEs
                      ? 'Supuestos: Cachés temporales de simulación (Houdini) y secuencias EXR (Nuke).'
                      : 'Assumptions: Scratch caching for Houdini simulations and Nuke EXR playout.'}
                  </span>
                </div>

                {/* Network Class */}
                <div className="result-card">
                  <span className="result-card-label">{c.estNetwork}</span>
                  <div className="result-card-value highlight-val">{networkRangeClass}</div>
                  <span className="result-card-sub">
                    {isEs
                      ? `Factores determinantes: Rendimiento de pico estimado ~${totalEstThroughputMBs} MB/s sostenidos.`
                      : `Key factors: Estimated peak throughput ~${totalEstThroughputMBs} MB/s sustained.`}
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
