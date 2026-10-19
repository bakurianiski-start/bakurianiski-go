import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Globe, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { instructors } from '@/data/instructors';
import type { Instructor } from '@/types';
import { formatPrice } from '@/lib/utils';
import { BookingForm } from './BookingForm';

export function Instructors() {
  const { t } = useTranslation();
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const lessonTypeLabels: Record<string, string> = {
    beginner: t('instructors.lessonTypes.beginner'),
    intermediate: t('instructors.lessonTypes.intermediate'),
    advanced: t('instructors.lessonTypes.advanced'),
  };

  const handleBookNow = (instructor: Instructor) => {
    setSelectedInstructor(instructor);
    setIsBookingOpen(true);
  };

  return (
    <section id="instructors" className="py-20 bg-slate-50 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <Badge variant="secondary" className="mb-4 bg-sky-100 text-sky-700 hover:bg-sky-100">
            {t('instructors.badge')}
          </Badge>
          <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
            {t('instructors.title')}<span className="text-gradient">{t('instructors.titleHighlight')}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            {t('instructors.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 place-items-center">
          {instructors.map((instructor) => (
            <motion.div
              key={instructor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-xl"
            >
              <Card className="group h-full overflow-hidden border-slate-200 transition-all duration-300 hover:shadow-xl">
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={instructor.photo}
                    alt={instructor.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                  <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 backdrop-blur-sm">
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    <span className="text-sm font-semibold text-slate-900">{instructor.rating}</span>
                    <span className="text-xs text-slate-500">({instructor.reviewCount})</span>
                  </div>
                  <h3 className="absolute bottom-4 left-4 right-4 text-2xl font-bold text-white">
                    {instructor.name}
                  </h3>
                </div>

                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-2 text-sm text-slate-600">
                    <Globe className="h-4 w-4 text-sky-500" />
                    <span>{instructor.languages.join(', ')}</span>
                  </div>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {instructor.lessonTypes.map((type) => (
                      <Badge
                        key={type}
                        variant="secondary"
                        className="bg-sky-50 text-sky-700 hover:bg-sky-100"
                      >
                        {lessonTypeLabels[type]}
                      </Badge>
                    ))}
                  </div>

                  <p className="mb-6 text-sm leading-relaxed text-slate-600">
                    {instructor.bio}
                  </p>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-5">
                    <div>
                      <div className="text-xl font-bold text-slate-900">
                        {formatPrice(instructor.pricePerSession)}
                        <span className="text-sm font-normal text-slate-500">
                          {t('instructors.perSession')}
                        </span>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleBookNow(instructor)}
                      className="bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:from-sky-600 hover:to-blue-700"
                    >
                      {t('instructors.bookNow')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{t('booking.title')}</DialogTitle>
          </DialogHeader>
          {selectedInstructor && (
            <BookingForm
              instructor={selectedInstructor}
              onClose={() => setIsBookingOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
