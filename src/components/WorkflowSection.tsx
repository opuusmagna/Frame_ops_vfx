import React from 'react';
import { useLanguage } from '../context/useLanguage';
import './WorkflowSection.css';

export const WorkflowSection: React.FC = () => {
  const { t } = useLanguage();
  const w = t.workflow;

  const steps = [
    { num: w.step1.num, title: w.step1.title, desc: w.step1.desc },
    { num: w.step2.num, title: w.step2.title, desc: w.step2.desc },
    { num: w.step3.num, title: w.step3.title, desc: w.step3.desc },
    { num: w.step4.num, title: w.step4.title, desc: w.step4.desc },
  ];

  return (
    <section id="workflow" className="workflow-section section-with-bg">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-kicker">{w.kicker}</span>
          <h2 className="section-title">{w.title}</h2>
          <p className="section-subtitle">{w.subtitle}</p>
        </div>

        <div className="workflow-steps-grid">
          {steps.map((step, idx) => (
            <div key={idx} className="workflow-step-card corp-panel">
              <span className="workflow-num">{step.num}</span>
              <h3 className="workflow-step-title">{step.title}</h3>
              <p className="workflow-step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
