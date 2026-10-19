import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Snowflake, Calendar, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const snowflakes = Array.from({ length: 20 }, (_, index) => ({
  x: (index * 67) % 1000,
  drift: (index % 5 - 2) * 20,
  duration: 10 + (index % 6),
  delay: index % 10,
  size: 8 + (index % 5) * 2,
}));

export function Hero() {
  const { t } = useTranslation();

  const scrollToInstructors = () => {
    const element = document.querySelector('#instructors');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats = [
    { icon: Users, value: '', label: t('hero.stats.instructors') },
    { icon: Calendar, value: '10K+', label: t('hero.stats.lessons') },
    { icon: Award, value: '98%', label: t('hero.stats.clients') },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1551524559-8af4e6624178?w=1920&q=80"
          alt="Bakuriani Ski Resort"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-sky-900/30 to-transparent" />
      </div>

      {/* Animated Snowflakes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {snowflakes.map((snowflake, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: snowflake.x,
              y: -20,
            }}
            animate={{
              y: typeof window !== 'undefined' ? window.innerHeight + 20 : 1000,
              x: `+=${snowflake.drift}`,
            }}
            transition={{
              duration: snowflake.duration,
              repeat: Infinity,
              ease: 'linear',
              delay: snowflake.delay,
            }}
          >
            <Snowflake
              className="text-white/30"
              style={{
                width: snowflake.size,
                height: snowflake.size,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
          >
            <Snowflake className="w-4 h-4 text-sky-300" />
            <span className="text-sm font-medium text-white/90">
              {t('hero.badge')}
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
          >
            {t('hero.title')}
            <span className="text-gradient bg-gradient-to-r from-sky-300 to-blue-400 bg-clip-text text-transparent">
              {t('hero.titleHighlight')}
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="max-w-2xl mx-auto text-lg sm:text-xl text-white/80 leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              onClick={scrollToInstructors}
              className="w-full sm:w-auto px-8 py-6 text-lg font-semibold bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-xl shadow-sky-500/30 hover:shadow-sky-500/50 transition-all duration-300 rounded-xl"
            >
              {t('hero.ctaPrimary')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                const element = document.querySelector('#why-us');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-6 text-lg font-semibold border-2 border-white/60 !bg-slate-900/40 !text-white hover:!bg-white/15 hover:!text-white backdrop-blur-sm transition-all duration-300 rounded-xl"
            >
              {t('hero.ctaSecondary')}
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto mt-16 pt-8 border-t border-white/20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="flex justify-center mb-2">
                  <stat.icon className="w-5 h-5 text-sky-300" />
                </div>
                {stat.value && (
                  <div className="text-2xl sm:text-3xl font-bold text-white">
                    {stat.value}
                  </div>
                )}
                <div className="text-xs sm:text-sm text-white/60">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={scrollToInstructors}
        >
          <span className="text-sm text-white/60">{t('hero.scrollText')}</span>
          <ChevronDown className="w-5 h-5 text-white/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
