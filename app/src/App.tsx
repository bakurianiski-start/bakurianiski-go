import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';
import { Navigation } from './sections/Navigation';
import { Hero } from './sections/Hero';
import { Instructors } from './sections/Instructors';
import { WhyUs } from './sections/WhyUs';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { LegalPage } from './sections/LegalPage';

function App() {
  const { i18n } = useTranslation();
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const legalPage = path === '/terms-of-service'
    ? 'terms'
    : path === '/privacy-policy'
      ? 'privacy'
      : null;

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  if (legalPage) {
    return <LegalPage page={legalPage} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Hero />
        <Instructors />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
