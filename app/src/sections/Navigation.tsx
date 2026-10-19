import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mountain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { LanguageSwitcherScrolled } from '@/components/LanguageSwitcherScrolled';

export function Navigation() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: '#instructors', label: t('nav.instructors') },
    { href: '#why-us', label: t('nav.whyUs') },
    { href: '#contact', label: t('nav.contact') },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-slate-200/50'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 group"
            >
              <div className="relative">
                <Mountain className="w-8 h-8 text-sky-500 transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-sky-400/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className={`font-bold text-xl transition-colors ${
                isScrolled ? 'text-slate-900' : 'text-white'
              }`}>
                Bakuriani<span className="text-sky-500">Ski</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-sky-500/10 ${
                    isScrolled
                      ? 'text-slate-700 hover:text-sky-600'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA & Language Switcher */}
            <div className="hidden lg:flex items-center gap-3">
              {isScrolled ? <LanguageSwitcherScrolled /> : <LanguageSwitcher />}
              <Button
                onClick={() => scrollToSection('#instructors')}
                className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all duration-300"
              >
                {t('nav.bookLesson')}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              {isScrolled ? <LanguageSwitcherScrolled /> : <LanguageSwitcher />}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-lg transition-colors ${
                  isScrolled
                    ? 'text-slate-700 hover:bg-slate-100'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-72 bg-white shadow-2xl"
            >
              <div className="p-6 pt-20">
                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => scrollToSection(link.href)}
                      className="px-4 py-3 text-left text-slate-700 font-medium rounded-lg hover:bg-sky-50 hover:text-sky-600 transition-colors"
                    >
                      {link.label}
                    </button>
                  ))}
                  <Button
                    onClick={() => scrollToSection('#instructors')}
                    className="mt-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white"
                  >
                    {t('nav.bookLesson')}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
