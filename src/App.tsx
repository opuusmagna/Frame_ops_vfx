import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
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

export const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'home' | 'about'>('home');

  const handleNavigateHome = () => {
    setActiveView('home');
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const handleNavigateAbout = () => {
    setActiveView('about');
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const handleNavigateSection = (href: string) => {
    if (activeView !== 'home') {
      setActiveView('home');
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo(0, 0);
        }
      }, 80);
    } else {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleNavigateContact = () => {
    handleNavigateSection('#contact');
  };

  return (
    <div className="app-main">
      {/* Master Navbar - Permanently pinned at the top */}
      <Navbar 
        activeView={activeView}
        onNavigateAbout={handleNavigateAbout} 
        onNavigateHome={handleNavigateHome} 
        onNavigateSection={handleNavigateSection}
      />

      {/* Main Body - Dynamic Swapping between Landing View and About View */}
      <main>
        {activeView === 'about' ? (
          <AboutPage 
            onNavigateContact={handleNavigateContact} 
          />
        ) : (
          <>
            <Hero />
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

      {/* Footer - Permanently pinned at the bottom */}
      <Footer />
    </div>
  );
};

export default App;
