import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Shield, Award, Clock, Users, MapPin, HeartHandshake } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const features = [
  { icon: Award, key: 'lessons', bgColor: 'bg-amber-50' },
  { icon: Shield, key: 'safety', bgColor: 'bg-emerald-50' },
  { icon: Clock, key: 'flexible', bgColor: 'bg-sky-50' },
  { icon: Users, key: 'personalized', bgColor: 'bg-violet-50' },
  { icon: MapPin, key: 'local', bgColor: 'bg-rose-50' },
  { icon: HeartHandshake, key: 'guarantee', bgColor: 'bg-cyan-50' },
];

export function WhyUs() {
  const { t } = useTranslation();

  return (
    <section id="why-us" className="py-20 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 bg-sky-100 text-sky-700 hover:bg-sky-100">
            {t('whyUs.badge')}
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            {t('whyUs.title')}<span className="text-gradient">{t('whyUs.titleHighlight')}</span>{t('whyUs.titleEnd')}
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-600">
            {t('whyUs.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="group h-full p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className={`w-14 h-14 rounded-xl ${feature.bgColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-sky-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {t(`whyUs.features.${feature.key}.title`)}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {t(`whyUs.features.${feature.key}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <a
            href="#instructors"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#instructors')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-105 transition-all duration-300"
          >
            {t('whyUs.cta')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
