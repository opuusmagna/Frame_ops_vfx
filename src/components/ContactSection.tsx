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
  const { t } = useLanguage();
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

  return (
    <section id="contact" className="art-contact-section section-with-bg">
      <div className="container">
        <div className="contact-layout">
          {/* Left Column: Strategic Value Pillars */}
          <div className="contact-info-col">
            <span className="section-kicker">{c.kicker}</span>
            <h2 className="section-title">{c.title}</h2>
            <p className="contact-lead">{c.lead}</p>

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
                  <div className="info-value">Continuidad Operativa de Pipeline</div>
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
                        placeholder="John Doe"
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
                        placeholder="Studio LLC"
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
                        placeholder="info@studio.com"
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
                        <option value="vfx-infrastructure">VFX Infrastructure</option>
                        <option value="high-performance-networks">High-Performance Networks (10/25/100GbE)</option>
                        <option value="storage-data">Storage &amp; Data Systems (NVMe/ZFS)</option>
                        <option value="render-pipeline">Render &amp; Pipeline (Deadline)</option>
                        <option value="backup-disaster-recovery">Backup &amp; Disaster Recovery (3-2-1-1)</option>
                        <option value="managed-services">Managed Services</option>
                        <option value="cybersecurity-compliance">Cybersecurity &amp; Compliance (TPN/MPA)</option>
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
                      placeholder=""
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
