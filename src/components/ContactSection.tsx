import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, AlertCircle, TrendingUp, Clock, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import './ContactSection.css';

interface FormDataState {
  name: string;
  company: string;
  email: string;
  phone: string;
  requirementType: string;
  workstations: string;
  message: string;
  privacyAccepted: boolean;
}

export const ContactSection: React.FC = () => {
  const { t, lang } = useLanguage();
  const c = t.contact;

  const [formData, setFormData] = useState<FormDataState>({
    name: '',
    company: '',
    email: '',
    phone: '',
    requirementType: 'vfx-infrastructure',
    workstations: '10-25',
    message: '',
    privacyAccepted: false,
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get('service');
    if (serviceParam) {
      setFormData((prev) => ({
        ...prev,
        requirementType: serviceParam,
      }));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.privacyAccepted) {
      setStatus('error');
      setErrorMessage(c.privacyError);
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    setTimeout(() => {
      setStatus('error');
      setErrorMessage(c.unavailMsg);
    }, 400);
  };

  const isEs = lang === 'es';

  return (
    <section id="contact" className="art-contact-section section-with-bg">
      <div className="container">
        <div className="contact-layout">
          {/* Left Column Header & Cards */}
          <div className="contact-info-col">
            <div className="contact-info-header">
              <span className="section-kicker">{c.kicker}</span>
              <h2 className="section-title">{c.title}</h2>
              <p className="contact-lead">{c.lead}</p>
            </div>

            <div className="contact-cards-list">
              <div className="info-item strategic-pillar-item">
                <div className="info-icon-box">
                  <TrendingUp size={22} />
                </div>
                <div className="pillar-text-box">
                  <span className="info-label">{isEs ? 'EFICIENCIA FINANCIERA' : 'FINANCIAL EFFICIENCY'}</span>
                  <div className="info-value">{isEs ? 'Optimización de CAPEX y OPEX' : 'CAPEX & OPEX Optimization'}</div>
                  <p className="pillar-description">
                    {isEs
                      ? 'Revisamos dimensionamiento, densidad de servidores, consumo energético, licencias y ciclo de vida del almacenamiento para identificar oportunidades de eficiencia.'
                      : 'We review sizing, server density, energy consumption, software licensing, and storage lifecycles to identify operational efficiency opportunities.'}
                  </p>
                </div>
              </div>

              <div className="info-item strategic-pillar-item">
                <div className="info-icon-box">
                  <Clock size={22} />
                </div>
                <div className="pillar-text-box">
                  <span className="info-label">{isEs ? 'CONTINUIDAD OPERATIVA' : 'OPERATIONAL CONTINUITY'}</span>
                  <div className="info-value">{isEs ? 'Continuidad operativa del pipeline' : 'Pipeline Operational Continuity'}</div>
                  <p className="pillar-description">
                    {isEs
                      ? 'Las fechas de entrega condicionan la producción. Diseñamos arquitecturas de alta disponibilidad y tolerancia a fallos orientadas a reducir interrupciones y sostener las cargas punta contempladas en el dimensionamiento.'
                      : 'Delivery deadlines drive production. We design high-availability and fault-tolerant architectures aimed at reducing disruptions and sustaining peak workloads included in sizing.'}
                  </p>
                </div>
              </div>

              <div className="info-item strategic-pillar-item">
                <div className="info-icon-box">
                  <ShieldCheck size={22} />
                </div>
                <div className="pillar-text-box">
                  <span className="info-label">{isEs ? 'SEGURIDAD Y CUMPLIMIENTO' : 'SECURITY & COMPLIANCE'}</span>
                  <div className="info-value">{isEs ? 'Estándares de seguridad del sector' : 'Industry Security Standards'}</div>
                  <p className="pillar-description">
                    {isEs
                      ? 'Aplicamos segmentación, cifrado y controles de acceso alineados con MPA Content Security Best Practices y apoyamos la preparación técnica para evaluaciones TPN.'
                      : 'We implement microsegmentation, encryption, and access controls aligned with MPA Content Security Best Practices and support technical readiness for TPN evaluations.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Assessment Form */}
          <div className="contact-form-col">
            <form onSubmit={handleSubmit} className="corp-panel assessment-form">
              <h3 className="form-heading">{c.formTitle}</h3>

              {status === 'success' ? (
                <div className="form-success-box">
                  <CheckCircle size={40} className="success-icon" />
                  <h4>{c.successTitle}</h4>
                  <p>{c.successMsg}</p>
                </div>
              ) : (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">{c.name}</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder={isEs ? 'Juan Pérez' : 'John Doe'}
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="company">{c.company}</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        required
                        placeholder={isEs ? 'Estudio VFX S.L.' : 'VFX Studio LLC'}
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">{c.email}</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder={isEs ? 'contacto@estudiovfx.com' : 'contact@vfxstudio.com'}
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">{c.phone}</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="+34 600 000 000"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="requirementType">{c.requirementType}</label>
                      <select
                        id="requirementType"
                        name="requirementType"
                        value={formData.requirementType}
                        onChange={handleChange}
                      >
                        <option value="vfx-infrastructure">{isEs ? 'Infraestructura VFX' : 'VFX Infrastructure'}</option>
                        <option value="high-performance-networks">{isEs ? 'Redes de Alto Rendimiento (10/25/100GbE)' : 'High-Performance Networks (10/25/100GbE)'}</option>
                        <option value="storage-data">{isEs ? 'Sistemas de Almacenamiento (NVMe/ZFS)' : 'Storage & Data Systems (NVMe/ZFS)'}</option>
                        <option value="render-pipeline">{isEs ? 'Render y Pipeline (Deadline)' : 'Render & Pipeline (Deadline)'}</option>
                        <option value="backup-disaster-recovery">{isEs ? 'Backup y Recuperación de Desastres (3-2-1-1)' : 'Backup & Disaster Recovery (3-2-1-1)'}</option>
                        <option value="managed-services">{isEs ? 'Servicios Gestionados' : 'Managed Services'}</option>
                        <option value="cybersecurity-compliance">{isEs ? 'Ciberseguridad y Cumplimiento (TPN/MPA)' : 'Cybersecurity & Compliance (TPN/MPA)'}</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="workstations">{c.workstations}</label>
                      <select
                        id="workstations"
                        name="workstations"
                        value={formData.workstations}
                        onChange={handleChange}
                      >
                        <option value="1-10">1 - 10</option>
                        <option value="10-25">10 - 25</option>
                        <option value="25-50">25 - 50</option>
                        <option value="50-100">50 - 100</option>
                        <option value="100+">100+</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">{c.message}</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      placeholder={isEs ? 'Describe tu infraestructura actual, cuellos de botella de almacenamiento o plazo del proyecto...' : 'Describe your current setup, storage bottlenecks, or upcoming project timeline...'}
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-checkbox-group">
                    <input
                      type="checkbox"
                      id="privacyAccepted"
                      name="privacyAccepted"
                      checked={formData.privacyAccepted}
                      onChange={handleChange}
                    />
                    <label htmlFor="privacyAccepted">{c.privacy}</label>
                  </div>

                  {status === 'error' && (
                    <div className="form-error-banner" role="alert" aria-live="polite">
                      <AlertCircle size={18} />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn-corporate-primary form-submit-btn"
                    disabled={status === 'submitting'}
                  >
                    <span>{status === 'submitting' ? c.submitting : c.submit}</span>
                    <Send size={18} className="btn-icon" />
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
