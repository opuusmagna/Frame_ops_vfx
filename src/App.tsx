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
import { SolutionsSection } from './components/SolutionsSection';
import { ArchitectureFlowSection } from './components/ArchitectureFlowSection';
import { SecurityMatrixSection } from './components/SecurityMatrixSection';
import { WhyFrameOpsSection } from './components/WhyFrameOpsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AboutPage } from './pages/AboutPage';
import { BackupDisasterRecoveryPage } from './pages/BackupDisasterRecoveryPage';
import { ManagedServicesPage } from './pages/ManagedServicesPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { SecurityZeroTrustPage } from './pages/SecurityZeroTrustPage';
import { VfxOrchestrationPage } from './pages/VfxOrchestrationPage';
import { HighPerformanceNetworkingPage } from './pages/HighPerformanceNetworkingPage';
import { StorageDataSystemsPage } from './pages/StorageDataSystemsPage';
import { SolutionsOverviewPage } from './pages/SolutionsOverviewPage';
import { MidTierSolutionsPage } from './pages/MidTierSolutionsPage';
import { EnterpriseSolutionsPage } from './pages/EnterpriseSolutionsPage';
import { VisualCustomizer } from './components/VisualCustomizer';

import './styles/global.css';
import './styles/effects.css';
import './styles/responsive.css';

const MainContent: React.FC = () => {
  const { currentPath, t, navigatePath, lang } = useLanguage();

  // Strip query params and hash for route matching
  const routePath = currentPath.split('?')[0].split('#')[0];
  const cleanPath = routePath.endsWith('/') ? routePath : `${routePath}/`;

  const isHome = cleanPath === '/es/' || cleanPath === '/en/' || cleanPath === '/';
  const isAbout = cleanPath === '/es/nosotros/' || cleanPath === '/en/about/';
  const isServices = cleanPath === '/es/servicios/' || cleanPath === '/en/services/';
  const isBackupDR = 
    cleanPath === '/es/backup-disaster-recovery/' || 
    cleanPath === '/en/backup-disaster-recovery/' ||
    cleanPath === '/es/servicios/backup-disaster-recovery/' || 
    cleanPath === '/en/services/backup-disaster-recovery/';
  const isManagedServices = cleanPath === '/es/servicios-gestionados/' || cleanPath === '/en/managed-services/';
  const isSecurity = cleanPath === '/es/ciberseguridad-zero-trust/' || cleanPath === '/en/zero-trust-security/' || cleanPath === '/es/seguridad-zero-trust/';
  const isOrchestration = cleanPath === '/es/orquestacion-vfx/' || cleanPath === '/en/vfx-orchestration/';
  const isNetworking = 
    cleanPath === '/es/redes-alto-rendimiento/' || 
    cleanPath === '/en/high-performance-networking/' ||
    cleanPath === '/es/servicios/redes-alto-rendimiento/' || 
    cleanPath === '/en/services/high-performance-networking/';
  const isStorage = 
    cleanPath === '/es/almacenamiento-datos/' || 
    cleanPath === '/en/storage-data-systems/' ||
    cleanPath === '/es/servicios/almacenamiento-datos/' || 
    cleanPath === '/en/services/storage-data-systems/';
  const isSolutions = cleanPath === '/es/soluciones/' || cleanPath === '/en/solutions/';
  const isSolutionsMidTier = cleanPath === '/es/soluciones-mid-tier/' || cleanPath === '/en/solutions-mid-tier/';
  const isSolutionsEnterprise = cleanPath === '/es/soluciones-enterprise/' || cleanPath === '/en/solutions-enterprise/';
  const isContact = cleanPath === '/es/contacto/' || cleanPath === '/en/contact/';
  const isPrivacy = cleanPath === '/es/privacidad/' || cleanPath === '/en/privacy/';
  const isTerms = cleanPath === '/es/terminos/' || cleanPath === '/en/terms/';

  const isKnownRoute = isHome || isAbout || isServices || isBackupDR || isManagedServices || isSecurity || isOrchestration || isNetworking || isStorage || isSolutions || isSolutionsMidTier || isSolutionsEnterprise || isContact || isPrivacy || isTerms;

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
            <ServicesSection />
            <CommercialModelsSection />
            <SolutionsSection />
          </div>
        ) : isBackupDR ? (
          <BackupDisasterRecoveryPage />
        ) : isManagedServices ? (
          <ManagedServicesPage />
        ) : isSecurity ? (
          <SecurityZeroTrustPage />
        ) : isOrchestration ? (
          <VfxOrchestrationPage />
        ) : isNetworking ? (
          <HighPerformanceNetworkingPage />
        ) : isStorage ? (
          <StorageDataSystemsPage />
        ) : isSolutions ? (
          <SolutionsOverviewPage />
        ) : isSolutionsMidTier ? (
          <MidTierSolutionsPage />
        ) : isSolutionsEnterprise ? (
          <EnterpriseSolutionsPage />
        ) : isContact ? (
          <div style={{ paddingTop: '5rem' }}>
            <ContactSection />
          </div>
        ) : isPrivacy ? (
          <PrivacyPolicyPage />
        ) : isTerms ? (
          <TermsPage />
        ) : (
          /* Home Landing - Streamlined 6 Narrative Phases */
          <>
            <Hero />
            <ServicesSection />
            <BottleneckAnalyzerSection />
            <SpecConfiguratorSection />
            <SolutionsSection />
            <ArchitectureFlowSection />
            <SecurityMatrixSection />
            <WorkflowSection />
            <WhyFrameOpsSection />
            <ContactSection />
          </>
        )}
      </main>

      <Footer />
      {import.meta.env.DEV && <VisualCustomizer />}
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
