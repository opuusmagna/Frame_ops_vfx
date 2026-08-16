import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, TrendingUp, Clock, ShieldCheck } from 'lucide-react';
import { company } from '../config/company';
import './ContactSection.css';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    requirementType: 'New Studio Setup',
    workstations: '10-25',
    message: '',
    privacyAccepted: false,
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacyAccepted) {
      setErrorMessage('Por favor, acepta la cláusula de privacidad antes de enviar.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    // Hotfix A.1: Notificación profesional sin jerga interna cuando el backend no está disponible
    if (!company.contactEndpoint || company.contactEndpoint === '/api/assessment') {
      setTimeout(() => {
        setErrorMessage('Formulario temporalmente no disponible para envíos automáticos. Por favor, realiza tu consulta directamente enviando un correo a info@frameopsvfx.com');
        setStatus('error');
      }, 300);
      return;
    }

    try {
      const response = await fetch(company.contactEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setErrorMessage(`Error en la recepción (${response.status}). Por favor, escríbenos directamente a info@frameopsvfx.com`);
        setStatus('error');
      }
    } catch {
      setErrorMessage('Servidor no disponible. Por favor, escríbenos directamente a info@frameopsvfx.com');
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="art-contact-section section-with-bg">
      <div className="container">
        <div className="contact-layout">
          {/* Left Column: Strategic Value Pillars */}
          <div className="contact-info-col">
            <span className="section-kicker">INITIATE DISCUSSIONS</span>
            <h2 className="section-title">REQUEST AN INFRASTRUCTURE ASSESSMENT</h2>
            <p className="contact-lead">
              Our process is consultative. We start by auditing your current pipeline bottlenecks, storage IOPS, and render burst goals before proposing architecture blueprints.
            </p>

            <div className="contact-cards-list">
              <div className="info-item strategic-pillar-item">
                <div className="info-icon-box">
                  <TrendingUp size={22} />
                </div>
                <div className="pillar-text-box">
                  <span className="info-label">FINANCIAL EFFICIENCY</span>
                  <div className="info-value">CAPEX &amp; OPEX Optimization</div>
                  <p className="pillar-description">
                    Eliminating hardware over-provisioning and license waste. We optimize server rack density, energy consumption, and storage lifecycle to maximize studio profitability.
                  </p>
                </div>
              </div>

              <div className="info-item strategic-pillar-item">
                <div className="info-icon-box">
                  <Clock size={22} />
                </div>
                <div className="pillar-text-box">
                  <span className="info-label">DEADLINE ASSURANCE</span>
                  <div className="info-value">Zero Pipeline Stalls</div>
                  <p className="pillar-description">
                    Release dates are non-negotiable. We engineer high-availability, fault-tolerant infrastructure ensuring continuous 24/7 pipeline throughput under peak delivery loads.
                  </p>
                </div>
              </div>

              <div className="info-item strategic-pillar-item">
                <div className="info-icon-box">
                  <ShieldCheck size={22} />
                </div>
                <div className="pillar-text-box">
                  <span className="info-label">SECURITY &amp; AUDIT READINESS</span>
                  <div className="info-value">Global Industry Standards</div>
                  <p className="pillar-description">
                    Qualify your facility for major international film projects. Network isolation, asset encryption, and access controls aligned with global security standards.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Assessment Form */}
          <div className="contact-form-col">
            <form onSubmit={handleSubmit} className="corp-panel assessment-form">
              <h3 className="form-heading">Assessment Request</h3>

              {status === 'success' ? (
                <div className="form-success-box">
                  <CheckCircle size={40} className="success-icon" />
                  <h4>Assessment Request Submitted</h4>
                  <p>Thank you, {formData.name}. Our senior infrastructure engineers will review your specs and contact you at {formData.email} within 24 hours.</p>
                  <button
                    type="button"
                    className="btn-corporate-primary margin-top"
                    onClick={() => {
                      setStatus('idle');
                      setFormData({
                        name: '',
                        company: '',
                        email: '',
                        phone: '',
                        requirementType: 'New Studio Setup',
                        workstations: '10-25',
                        message: '',
                        privacyAccepted: false,
                      });
                    }}
                  >
                    <span>Submit Another Request</span>
                  </button>
                </div>
              ) : (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="company">Company / Studio *</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        required
                        placeholder="VFX Studio LLC"
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Business Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="john@vfxstudio.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone (Optional)</label>
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
                      <label htmlFor="requirementType">Requirement Type</label>
                      <select
                        id="requirementType"
                        name="requirementType"
                        value={formData.requirementType}
                        onChange={handleChange}
                      >
                        <option value="New Studio Setup">New Studio Setup</option>
                        <option value="Network Infrastructure">10/25/100GbE Network Upgrade</option>
                        <option value="Storage Expansion">NVMe / ZFS Storage Modernization</option>
                        <option value="Render Farm">Render Farm &amp; Deadline Integration</option>
                        <option value="Backup DR">Backup &amp; Disaster Recovery</option>
                        <option value="Cybersecurity">TPN / MPA Security Audit</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="workstations">Approx. Workstations / Users</label>
                      <select
                        id="workstations"
                        name="workstations"
                        value={formData.workstations}
                        onChange={handleChange}
                      >
                        <option value="1-10">1 - 10 Workstations</option>
                        <option value="10-25">10 - 25 Workstations</option>
                        <option value="25-50">25 - 50 Workstations</option>
                        <option value="50-100">50 - 100 Workstations</option>
                        <option value="100+">100+ Workstations</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Project Details &amp; Bottlenecks *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      placeholder="Describe your current setup, storage pain points, or upcoming production timeline..."
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
                    <label htmlFor="privacyAccepted">
                      I consent to Frame Ops VFX storing my contact info to perform this infrastructure assessment.
                    </label>
                  </div>

                  {status === 'error' && (
                    <div className="form-error-msg" role="alert" aria-live="polite">
                      <AlertCircle size={18} />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn-corporate-primary form-submit-btn"
                    disabled={status === 'submitting'}
                  >
                    <span>{status === 'submitting' ? 'SUBMITTING...' : 'REQUEST ASSESSMENT'}</span>
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
