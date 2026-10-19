import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

export function FAQ() {
  const { t } = useTranslation();

  const faqItems = [
    { id: 'bring', key: 'bring' },
    { id: 'duration', key: 'duration' },
    { id: 'kids', key: 'kids' },
    { id: 'cancel', key: 'cancel' },
    { id: 'group', key: 'group' },
    { id: 'languages', key: 'languages' },
  ];

  return (
    <section id="faq" className="py-20 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-sky-50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 bg-sky-100 text-sky-700 hover:bg-sky-100">
            {t('faq.badge')}
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            {t('faq.title')}<span className="text-gradient">{t('faq.titleHighlight')}</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-600">
            {t('faq.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <AccordionItem
                  value={item.id}
                  className="border border-slate-200 rounded-xl px-6 data-[state=open]:border-sky-200 data-[state=open]:bg-sky-50/30 transition-colors"
                >
                  <AccordionTrigger className="text-left text-slate-900 font-semibold hover:no-underline py-5">
                    {t(`faq.items.${item.key}.question`)}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed pb-5">
                    {t(`faq.items.${item.key}.answer`)}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center p-8 bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl border border-sky-100"
        >
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            {t('faq.stillHaveQuestions')}
          </h3>
          <p className="text-slate-600 mb-6">
            {t('faq.contactText')}
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-105 transition-all duration-300"
          >
            {t('faq.contactUs')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
