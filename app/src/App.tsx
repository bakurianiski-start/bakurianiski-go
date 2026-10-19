import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';
import { Navigation } from './sections/Navigation';
import { Hero } from './sections/Hero';
import { Instructors } from './sections/Instructors';
import { WhyUs } from './sections/WhyUs';
import { Testimonials } from './sections/Testimonials';
import { FAQ } from './sections/FAQ';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Hero />
        <Instructors />
        <WhyUs />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
