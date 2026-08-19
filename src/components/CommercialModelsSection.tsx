import React from 'react';
import { Search, Hammer, ShieldAlert, Cpu } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import './CommercialModelsSection.css';

export const CommercialModelsSection: React.FC = () => {
  const { t, navigatePath, lang } = useLanguage();
  const m = t.commercialModels;

  const models = [
    {
      id: 'assess',
      icon: Search,
      tag: m.assess.tag,
      title: m.assess.title,
      description: m.assess.description,
      features: m.assess.features,
    },
    {
      id: 'build',
      icon: Hammer,
      tag: m.build.tag,
      title: m.build.title,
      description: m.build.description,
      features: m.build.features,
    },
    {
      id: 'protect',
      icon: ShieldAlert,
      tag: m.protect.tag,
      title: m.protect.title,
      description: m.protect.description,
      features: m.protect.features,
    },
    {
      id: 'operate',
      icon: Cpu,
      tag: m.operate.tag,
      title: m.operate.title,
      description: m.operate.description,
      features: m.operate.features,
    },
  ];

  const handleSelectModel = (id: string) => {
    const contactPath = lang === 'en' ? '/en/contact/' : '/es/contacto/';
    navigatePath(`${contactPath}?service=${id}`);
  };

  return (
    <section id="commercial-models" className="commercial-models-section section-with-bg">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-kicker">{m.kicker}</span>
          <h2 className="section-title">{m.title}</h2>
          <p className="section-subtitle">{m.subtitle}</p>
        </div>

        <div className="models-grid">
          {models.map((model) => {
            const IconComp = model.icon;
            return (
              <div key={model.id} className="model-card corp-panel">
                <div className="model-header">
                  <div className="model-icon-wrap">
                    <IconComp size={24} />
                  </div>
                  <span className="model-tag">{model.tag}</span>
                </div>

                <h3 className="model-title">{model.title}</h3>
                <p className="model-description">{model.description}</p>

                <ul className="model-features-list">
                  {model.features.map((feat: string, idx: number) => (
                    <li key={idx} className="model-feature-item">
                      <span className="feature-bullet" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className="btn-model-action"
                  onClick={() => handleSelectModel(model.id)}
                >
                  <span>{t.hero.ctaPrimary}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
