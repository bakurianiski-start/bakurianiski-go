import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { testimonials } from '@/data/instructors';

export function Testimonials() {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-100/30 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 bg-sky-100 text-sky-700 hover:bg-sky-100">
            {t('testimonials.badge')}
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            {t('testimonials.title')}<span className="text-gradient">{t('testimonials.titleHighlight')}</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-600">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-sky-500/30 z-10">
            <Quote className="w-8 h-8 text-white" />
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 sm:p-12 pt-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="mb-6">
                  <img
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].name}
                    className="w-20 h-20 rounded-full object-cover mx-auto ring-4 ring-sky-100"
                  />
                </div>

                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonials[currentIndex].rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>

                <blockquote className="text-lg sm:text-xl text-slate-700 leading-relaxed mb-8 max-w-2xl mx-auto">
                  "{testimonials[currentIndex].text}"
                </blockquote>

                <div>
                  <div className="font-bold text-slate-900 text-lg">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-sm text-slate-500">
                    {testimonials[currentIndex].date}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full hover:bg-sky-50 hover:border-sky-200 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-sky-500 w-8'
                        : 'bg-slate-200 hover:bg-slate-300'
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full hover:bg-sky-50 hover:border-sky-200 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 flex flex-wrap justify-center gap-8 items-center"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-sky-600">4.9</div>
            <div className="text-sm text-slate-500">{t('testimonials.stats.rating')}</div>
          </div>
          <div className="w-px h-12 bg-slate-200 hidden sm:block" />
          <div className="text-center">
            <div className="text-3xl font-bold text-sky-600">500+</div>
            <div className="text-sm text-slate-500">{t('testimonials.stats.reviews')}</div>
          </div>
          <div className="w-px h-12 bg-slate-200 hidden sm:block" />
          <div className="text-center">
            <div className="text-3xl font-bold text-sky-600">98%</div>
            <div className="text-sm text-slate-500">{t('testimonials.stats.recommend')}</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
