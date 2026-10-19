import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { validateEmail } from '@/lib/utils';

export function Contact() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = t('booking.errors.firstName');
    }
    if (!formData.email.trim()) {
      newErrors.email = t('booking.errors.email');
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t('booking.errors.email');
    }
    if (!formData.subject.trim()) {
      newErrors.subject = t('booking.errors.lessonType');
    }
    if (!formData.message.trim()) {
      newErrors.message = t('booking.errors.firstName');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const contactInfo = [
    { icon: Mail, label: t('contact.info.email'), value: 'info@bakurianiski.com', href: 'mailto:info@bakurianiski.com' },
    { icon: Phone, label: t('contact.info.phone'), value: '+995 555 123 456', href: 'tel:+995555123456' },
    { icon: MapPin, label: t('contact.info.location'), value: 'Bakuriani, Georgia', href: '#' },
  ];

  return (
    <section id="contact" className="py-20 lg:py-32 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-sky-100/30 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 bg-sky-100 text-sky-700 hover:bg-sky-100">
            {t('contact.badge')}
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            {t('contact.title')}<span className="text-gradient">{t('contact.titleHighlight')}</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-600">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {contactInfo.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-4 p-5 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-sky-200 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-sky-50 flex items-center justify-center group-hover:bg-sky-100 transition-colors">
                  <item.icon className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <div className="text-sm text-slate-500">{item.label}</div>
                  <div className="font-medium text-slate-900 group-hover:text-sky-600 transition-colors">
                    {item.value}
                  </div>
                </div>
              </motion.a>
            ))}

            <div className="mt-6 rounded-xl overflow-hidden border border-slate-200 h-48 bg-slate-100 relative">
              <img
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80"
                alt="Bakuriani Mountains"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
                <div className="text-center text-white">
                  <MapPin className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-semibold">Bakuriani Ski Resort</p>
                  <p className="text-sm text-white/80">Georgia</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {t('contact.form.success.title')}
                  </h3>
                  <p className="text-slate-600">
                    {t('contact.form.success.text')}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="mb-2 block">
                        {t('contact.form.name')} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          setErrors({ ...errors, name: '' });
                        }}
                        placeholder={t('contact.form.namePlaceholder')}
                        className={errors.name ? 'border-red-500' : ''}
                      />
                      {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email" className="mb-2 block">
                        {t('contact.form.email')} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          setErrors({ ...errors, email: '' });
                        }}
                        placeholder={t('contact.form.emailPlaceholder')}
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject" className="mb-2 block">
                      {t('contact.form.subject')} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => {
                        setFormData({ ...formData, subject: e.target.value });
                        setErrors({ ...errors, subject: '' });
                      }}
                      placeholder={t('contact.form.subjectPlaceholder')}
                      className={errors.subject ? 'border-red-500' : ''}
                    />
                    {errors.subject && <p className="text-sm text-red-500 mt-1">{errors.subject}</p>}
                  </div>

                  <div>
                    <Label htmlFor="message" className="mb-2 block">
                      {t('contact.form.message')} <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        setErrors({ ...errors, message: '' });
                      }}
                      placeholder={t('contact.form.messagePlaceholder')}
                      rows={5}
                      className={errors.message ? 'border-red-500' : ''}
                    />
                    {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white py-6"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        {t('contact.form.sending')}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        {t('contact.form.send')}
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
