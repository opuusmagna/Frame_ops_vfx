import React, { useState } from 'react';
import { AlertCircle, Activity, Wrench, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import './BottleneckAnalyzerSection.css';

export const BottleneckAnalyzerSection: React.FC = () => {
  const { t, navigatePath, lang } = useLanguage();
  const b = t.bottleneck;

  const [selectedSymptom, setSelectedSymptom] = useState<'playback' | 'render' | 'storage' | 'backup' | 'security'>('playback');

  const symptomsData = {
    playback: {
      label: b.symptoms.playback,
      diagnosis: 'Insuficiencia de ancho de banda o contención de IOPS en el bus de almacenamiento central.',
      causes: ['Switching 1GbE/10GbE saturado', 'Falta de caché NVMe Tier-0', 'Fragmentación de pools ZFS/SAN'],
      tests: ['Medición FIO en cliente concurrente', 'Captura de marcas de tiempo I/O con iostat', 'Verificación LACP'],
      serviceKey: 'high-performance-networks',
    },
    render: {
      label: b.symptoms.render,
      diagnosis: 'Gestión ineficiente de colas de renderizado o cuellos de botella de red durante el dispatch de frames.',
      causes: ['Límites de licencias mal configurados en Deadline', 'Saturación del servidor de assets', 'Nodos CPU/GPU descompensados'],
      tests: ['Auditoría de logs de repositorio Deadline', 'Análisis de concurrencia de lectura de assets', 'Test de stress I/O'],
      serviceKey: 'render-pipeline',
    },
    storage: {
      label: b.symptoms.storage,
      diagnosis: 'Deficit de capacidad utilizable y falta de políticas de jerarquización de datos.',
      causes: ['Falta de volumen para snapshots', 'Ausencia de purga automatizada', 'Pools sin discos de repuesto in-situ'],
      tests: ['Auditoría de espacio por proyecto', 'Verificación de salud de discos ZFS/RAID', 'Medición de throughput'],
      serviceKey: 'storage-data',
    },
    backup: {
      label: b.symptoms.backup,
      diagnosis: 'Ausencia de runbooks validados de Disaster Recovery y falta de copias inmutables.',
      causes: ['Dependencia de sincronizaciones simples', 'Snapshots locales sin réplica off-site', 'Ausencia de simulacros'],
      tests: ['Prueba de restauración de proyecto aleatorio', 'Verificación de inmutabilidad', 'Medición de RTO real'],
      serviceKey: 'backup-disaster-recovery',
    },
    security: {
      label: b.symptoms.security,
      diagnosis: 'Falta de alineación con MPA Content Security Best Practices y controles TPN.',
      causes: ['Ausencia de microsegmentación de red', 'Acceso remoto sin ZTNA', 'Gestión manual de permisos'],
      tests: ['Escaneo de puertos e interfaces expuestas', 'Revisión de políticas IAM y MFA', 'Auditoría de logs de acceso'],
      serviceKey: 'cybersecurity-compliance',
    },
  };

  const currentData = symptomsData[selectedSymptom];

  const handleCtaClick = () => {
    const contactPath = lang === 'en'
      ? `/en/contact/?service=${currentData.serviceKey}`
      : `/es/contacto/?service=${currentData.serviceKey}`;
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

        <div className="analyzer-layout corp-panel">
          <div className="symptoms-selector-col">
            <span className="selector-label">{b.symptomLabel}</span>
            <div className="symptoms-buttons-list">
              {(Object.keys(symptomsData) as Array<keyof typeof symptomsData>).map((key) => (
                <button
                  key={key}
                  type="button"
                  className={`symptom-btn ${selectedSymptom === key ? 'active' : ''}`}
                  onClick={() => setSelectedSymptom(key)}
                >
                  <AlertCircle size={18} />
                  <span>{symptomsData[key].label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="diagnosis-result-col">
            <div className="diagnosis-block">
              <span className="block-label">
                <Activity size={16} /> {b.diagnosisTitle}
              </span>
              <p className="diagnosis-text">{currentData.diagnosis}</p>
            </div>

            <div className="diagnosis-details-grid">
              <div className="details-box">
                <span className="box-label">{b.causesTitle}</span>
                <ul>
                  {currentData.causes.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>

              <div className="details-box">
                <span className="box-label"><Wrench size={14} /> {b.testsTitle}</span>
                <ul>
                  {currentData.tests.map((tItem, i) => (
                    <li key={i}>{tItem}</li>
                  ))}
                </ul>
              </div>
            </div>

            <button type="button" className="btn-corporate-primary margin-top" onClick={handleCtaClick}>
              <span>{b.cta}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
