import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mountain, Mail, Phone, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();

  const footerLinks = {
    company: [
      { label: t('nav.instructors'), href: '#instructors' },
      { label: t('nav.whyUs'), href: '#why-us' },
    ],
    support: [
      { label: t('nav.contact'), href: '#contact' },
    ],
    legal: [
      { label: 'Terms of Service', href: '#' },
      { label: 'Privacy Policy', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-sky-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <a href="#" className="flex items-center gap-2 mb-6">
              <Mountain className="w-8 h-8 text-sky-400" />
              <span className="font-bold text-xl">
                Bakuriani<span className="text-sky-400">Ski</span>
              </span>
            </a>
            <p className="text-slate-400 mb-6 max-w-sm">
              {t('footer.description')}
            </p>

            <div className="space-y-3">
              <a href="mailto:bakurianiski@gmail.com" className="flex items-center gap-3 text-slate-400 hover:text-sky-400 transition-colors">
                <Mail className="w-5 h-5" />
                <span>bakurianiski@gmail.com</span>
              </a>
              <a href="tel:+995555123456" className="flex items-center gap-3 text-slate-400 hover:text-sky-400 transition-colors">
                <Phone className="w-5 h-5" />
                <span>+995 555 123 456</span>
              </a>
              <div className="flex items-center gap-3 text-slate-400">
                <MapPin className="w-5 h-5" />
                <span>Bakuriani, Georgia</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-semibold text-lg mb-4">{t('footer.company')}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }} className="text-slate-400 hover:text-sky-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-semibold text-lg mb-4">{t('footer.support')}</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a href={link.href} onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }} className="text-slate-400 hover:text-sky-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-semibold text-lg mb-4">{t('footer.legal')}</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-slate-400 hover:text-sky-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="py-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} BakurianiSki. {t('footer.copyright')}
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a key={social.label} href={social.href} aria-label={social.label} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-sky-500 hover:text-white transition-all duration-300">
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
