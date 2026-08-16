import React from 'react';
import { LanguageProvider } from './context/LanguageProvider';
import { useLanguage } from './context/useLanguage';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CommercialModelsSection } from './components/CommercialModelsSection';
import { WorkflowSection } from './components/WorkflowSection';
import { ServicesSection } from './components/ServicesSection';
import { BottleneckAnalyzerSection } from './components/BottleneckAnalyzerSection';
import { SpecConfiguratorSection } from './components/SpecConfiguratorSection';
import { WorkloadIntelligenceSection } from './components/WorkloadIntelligenceSection';
import { SolutionsSection } from './components/SolutionsSection';
import { ArchitectureFlowSection } from './components/ArchitectureFlowSection';
import { SecurityMatrixSection } from './components/SecurityMatrixSection';
import { WhyFrameOpsSection } from './components/WhyFrameOpsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AboutPage } from './pages/AboutPage';

import './styles/global.css';
import './styles/effects.css';
import './styles/responsive.css';

const MainContent: React.FC = () => {
  const { currentPath, t, navigatePath, lang } = useLanguage();

  const cleanPath = currentPath.endsWith('/') ? currentPath : `${currentPath}/`;

  const isHome = cleanPath === '/es/' || cleanPath === '/en/' || cleanPath === '/';
  const isAbout = cleanPath === '/es/nosotros/' || cleanPath === '/en/about/';
  const isServices = cleanPath === '/es/servicios/' || cleanPath === '/en/services/';
  const isBackupDR = cleanPath === '/es/servicios/backup-disaster-recovery/' || cleanPath === '/en/services/backup-disaster-recovery/';
  const isManagedServices = cleanPath === '/es/servicios-gestionados/' || cleanPath === '/en/managed-services/';
  const isContact = cleanPath === '/es/contacto/' || cleanPath === '/en/contact/';

  const isKnownRoute = isHome || isAbout || isServices || isBackupDR || isManagedServices || isContact;

  return (
    <div className="app-main">
      <Navbar />

      <main style={{ minHeight: '80vh' }}>
        {!isKnownRoute ? (
          <div className="container text-center" style={{ padding: '10rem 1rem 6rem 1rem' }}>
            <h1 style={{ fontSize: '3rem', color: '#ffffff', marginBottom: '1rem' }}>{t.notFound.title}</h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem' }}>{t.notFound.message}</p>
            <button
              type="button"
              className="btn-corporate-primary"
              onClick={() => navigatePath(lang === 'en' ? '/en/' : '/es/')}
            >
              <span>{t.notFound.backHome}</span>
            </button>
          </div>
        ) : isAbout ? (
          <AboutPage onNavigateContact={() => navigatePath(lang === 'en' ? '/en/contact/' : '/es/contacto/')} />
        ) : isServices ? (
          <div style={{ paddingTop: '5rem' }}>
            <CommercialModelsSection />
            <ServicesSection />
            <SolutionsSection />
          </div>
        ) : isBackupDR ? (
          <div style={{ paddingTop: '8rem', paddingBottom: '6rem' }} className="container text-center">
            <span className="section-kicker">{t.backupDrPage.kicker}</span>
            <h1 style={{ color: '#ffffff', fontSize: '2.5rem', margin: '1rem 0' }}>{t.backupDrPage.title}</h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '750px', margin: '0 auto 2rem auto', lineHeight: 1.6 }}>
              {t.backupDrPage.subtitle}
            </p>
            <div className="corp-panel" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
              <p style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                [ESTRUCTURA DE RUTA ACTIVA — CONTENIDO COMPLETO EN CHECKPOINT B]
              </p>
            </div>
          </div>
        ) : isManagedServices ? (
          <div style={{ paddingTop: '8rem', paddingBottom: '6rem' }} className="container text-center">
            <span className="section-kicker">{t.commercialModels.operate.tag}</span>
            <h1 style={{ color: '#ffffff', fontSize: '2.5rem', margin: '1rem 0' }}>{t.commercialModels.operate.title}</h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '750px', margin: '0 auto 2rem auto', lineHeight: 1.6 }}>
              {t.commercialModels.operate.description}
            </p>
            <div className="corp-panel" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
              <p style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                [ESTRUCTURA DE RUTA ACTIVA — CONTENIDO COMPLETO EN CHECKPOINT B]
              </p>
            </div>
          </div>
        ) : isContact ? (
          <div style={{ paddingTop: '5rem' }}>
            <ContactSection />
          </div>
        ) : (
          /* Home Landing */
          <>
            <Hero />
            <CommercialModelsSection />
            <WorkflowSection />
            <ServicesSection />
            <BottleneckAnalyzerSection />
            <SpecConfiguratorSection />
            <WorkloadIntelligenceSection />
            <SolutionsSection />
            <ArchitectureFlowSection />
            <SecurityMatrixSection />
            <WhyFrameOpsSection />
            <ContactSection />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
};

export default App;
