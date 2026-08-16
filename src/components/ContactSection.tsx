import React, { useState, useEffect, useRef } from 'react';
import { Send, CheckCircle, AlertCircle, TrendingUp, Clock, ShieldCheck, Lock } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import './ContactSection.css';

interface FormDataState {
  name: string;
  company: string;
  email: string;
  phone: string;
  requirementType: string;
  issue: string;
  workstations: string;
  timeline: string;
  message: string;
  privacyAccepted: boolean;
}

export const ContactSection: React.FC = () => {
  const { t, lang, navigatePath } = useLanguage();
  const c = t.contact;
  const isEs = lang === 'es';

  const alertRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormDataState>({
    name: '',
    company: '',
    email: '',
    phone: '',
    requirementType: 'vfx-infrastructure',
    issue: 'general',
    workstations: '10-25',
    timeline: 'immediate',
    message: '',
    privacyAccepted: false,
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get('service');
    const issueParam = params.get('issue');
    const wsParam = params.get('workstations');

    setFormData((prev) => ({
      ...prev,
      ...(serviceParam ? { requirementType: serviceParam } : {}),
      ...(issueParam ? { issue: issueParam } : {}),
      ...(wsParam ? { workstations: wsParam } : {}),
    }));
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

  const validateEmail = (emailStr: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.privacyAccepted) {
      setStatus('error');
      setErrorMessage(
        isEs
          ? 'Por favor, acepte la política de privacidad para enviar su solicitud.'
          : 'Please accept the privacy consent to submit your request.'
      );
      if (alertRef.current) alertRef.current.focus();
      return;
    }

    if (!validateEmail(formData.email)) {
      setStatus('error');
      setErrorMessage(
        isEs
          ? 'Por favor, introduzca una dirección de correo profesional válida.'
          : 'Please enter a valid business email address.'
      );
      if (alertRef.current) alertRef.current.focus();
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;

    // Rule: If endpoint is missing/unconfigured, handle gracefully without setTimeout mock success!
    if (!endpoint || endpoint.trim() === '') {
      setStatus('error');
      setErrorMessage(
        isEs
          ? 'El envío automatizado no está configurado actualmente en este entorno. Por favor, envíe su solicitud directamente a info@frameopsvfx.com. Sus datos introducidos se han conservado en el formulario.'
          : 'Automated submission endpoint is unconfigured in this environment. Please send your request directly to info@frameopsvfx.com. Your entered data has been preserved.'
      );
      if (alertRef.current) alertRef.current.focus();
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
          language: lang,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Strict Rule: Show success ONLY when response.ok === true!
      if (response.ok) {
        setStatus('success');
      } else {
        const errorData = await response.json().catch(() => ({}));
        setStatus('error');
        setErrorMessage(
          errorData.message ||
            (isEs
              ? 'No se pudo procesar la solicitud en el servidor. Por favor, inténtelo de nuevo o contacte con info@frameopsvfx.com.'
              : 'Server could not process submission. Please try again or contact info@frameopsvfx.com.')
        );
        if (alertRef.current) alertRef.current.focus();
      }
    } catch (err: any) {
      clearTimeout(timeoutId);
      setStatus('error');
      if (err.name === 'AbortError') {
        setErrorMessage(
          isEs
            ? 'La petición ha superado el tiempo de espera. Por favor, reintente o contacte con info@frameopsvfx.com.'
            : 'Request timed out. Please try again or contact info@frameopsvfx.com.'
        );
      } else {
        setErrorMessage(
          isEs
            ? 'Error de red o conexión. Por favor, compruebe su conexión o escriba a info@frameopsvfx.com.'
            : 'Network connection error. Please check your connection or email info@frameopsvfx.com.'
        );
      }
      if (alertRef.current) alertRef.current.focus();
    }
  };

  const handleOpenPrivacy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigatePath(isEs ? '/es/privacidad/' : '/en/privacy/');
  };

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
            <form onSubmit={handleSubmit} className="corp-panel assessment-form" noValidate>
              <h3 className="form-heading">{c.formTitle}</h3>

              {status === 'success' ? (
                <div className="form-success-box" role="alert" aria-live="polite">
                  <CheckCircle size={44} className="success-icon" />
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
                        maxLength={100}
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
                        maxLength={100}
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
                        maxLength={120}
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
                        maxLength={30}
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
                      <label htmlFor="issue">{isEs ? 'Problemática o Software:' : 'Primary Issue / Software:'}</label>
                      <select
                        id="issue"
                        name="issue"
                        value={formData.issue}
                        onChange={handleChange}
                      >
                        <option value="general">{isEs ? 'Diagnóstico General' : 'General Diagnostic'}</option>
                        <option value="nuke-io">{isEs ? 'Reproducción Nuke 4K / Lectura EXR' : 'Nuke 4K EXR Read Playout'}</option>
                        <option value="houdini-cache">{isEs ? 'Caché de Simulación Houdini' : 'Houdini FX Sim Caching'}</option>
                        <option value="maya-3d">{isEs ? 'Carga 3D Maya & Texturas' : 'Maya 3D & Texture Assembly'}</option>
                        <option value="deadline-farm">{isEs ? 'Saturación en Granja Deadline' : 'Deadline Render Farm Lockups'}</option>
                        <option value="unreal-vp">{isEs ? 'Producción Virtual Unreal Engine (ICVFX)' : 'Unreal Engine Virtual Production (ICVFX)'}</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
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
                    <div className="form-group">
                      <label htmlFor="timeline">{isEs ? 'Plazo del proyecto:' : 'Project Timeline:'}</label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                      >
                        <option value="immediate">{isEs ? 'Inmediato (< 1 mes)' : 'Immediate (< 1 month)'}</option>
                        <option value="1-3-months">{isEs ? '1 - 3 meses' : '1 - 3 months'}</option>
                        <option value="planning">{isEs ? 'Fase de planificación' : 'Planning stage'}</option>
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
                      maxLength={600}
                      placeholder={isEs ? 'Describe tu infraestructura actual, cuellos de botella de almacenamiento o plazo del proyecto...' : 'Describe your current setup, storage bottlenecks, or upcoming project timeline...'}
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Mandatory Unchecked Privacy Checkbox */}
                  <div className="form-checkbox-group">
                    <input
                      type="checkbox"
                      id="privacyAccepted"
                      name="privacyAccepted"
                      checked={formData.privacyAccepted}
                      onChange={handleChange}
                    />
                    <label htmlFor="privacyAccepted">
                      {isEs ? (
                        <>
                          He leído la{' '}
                          <a href="/es/privacidad/" onClick={handleOpenPrivacy} className="privacy-link">
                            información sobre privacidad
                          </a>{' '}
                          y autorizo el tratamiento de mis datos para responder a esta solicitud.
                        </>
                      ) : (
                        <>
                          I have read the{' '}
                          <a href="/en/privacy/" onClick={handleOpenPrivacy} className="privacy-link">
                            privacy information
                          </a>{' '}
                          and authorize the processing of my data to respond to this request.
                        </>
                      )}
                    </label>
                  </div>

                  {status === 'error' && (
                    <div className="form-error-banner" role="alert" aria-live="polite" ref={alertRef} tabIndex={-1}>
                      <AlertCircle size={20} className="error-banner-icon" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn-corporate-primary form-submit-btn"
                    disabled={status === 'submitting'}
                  >
                    <Lock size={16} className="btn-lock-icon" />
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
