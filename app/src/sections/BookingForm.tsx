import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  Check,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Instructor, Booking } from '@/types';
import { formatPrice, validateEmail, validatePhone, formatDate } from '@/lib/utils';
import { getFutureDates } from '@/lib/utils';

interface BookingFormProps {
  instructor: Instructor;
  onClose: () => void;
}

type Step = 'lesson' | 'datetime' | 'details' | 'confirmation';

export function BookingForm({ instructor, onClose }: BookingFormProps) {
  const { t, i18n } = useTranslation();
  const [step, setStep] = useState<Step>('lesson');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [booking, setBooking] = useState<Partial<Booking>>({
    instructorId: instructor.id,
    instructorName: instructor.name,
    lessonType: undefined,
    date: undefined,
    time: undefined,
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const availableDates = getFutureDates(14);
  const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

  const lessonTypeLabels: Record<string, string> = {
    beginner: t('instructors.lessonTypes.beginner'),
    intermediate: t('instructors.lessonTypes.intermediate'),
    advanced: t('instructors.lessonTypes.advanced'),
  };

  const validateStep = (currentStep: Step): boolean => {
    const newErrors: Record<string, string> = {};

    switch (currentStep) {
      case 'lesson':
        if (!booking.lessonType) {
          newErrors.lessonType = t('booking.errors.lessonType');
        }
        break;
      case 'datetime':
        if (!booking.date) {
          newErrors.date = t('booking.errors.date');
        }
        if (!booking.time) {
          newErrors.time = t('booking.errors.time');
        }
        break;
      case 'details':
        if (!booking.firstName?.trim()) {
          newErrors.firstName = t('booking.errors.firstName');
        }
        if (!booking.lastName?.trim()) {
          newErrors.lastName = t('booking.errors.lastName');
        }
        if (!booking.phone?.trim()) {
          newErrors.phone = t('booking.errors.phone');
        } else if (!validatePhone(booking.phone)) {
          newErrors.phone = t('booking.errors.phone');
        }
        if (!booking.email?.trim()) {
          newErrors.email = t('booking.errors.email');
        } else if (!validateEmail(booking.email)) {
          newErrors.email = t('booking.errors.email');
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(step)) return;

    const stepOrder: Step[] = ['lesson', 'datetime', 'details', 'confirmation'];
    const currentIndex = stepOrder.indexOf(step);
    if (currentIndex < stepOrder.length - 1) {
      setStep(stepOrder[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const stepOrder: Step[] = ['lesson', 'datetime', 'details', 'confirmation'];
    const currentIndex = stepOrder.indexOf(step);
    if (currentIndex > 0) {
      setStep(stepOrder[currentIndex - 1]);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep('details')) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          firstName: booking.firstName?.trim(),
          lastName: booking.lastName?.trim(),
          email: booking.email,
          phone: booking.phone,
          instructorName: instructor.name,
          lessonType: booking.lessonType,
          date: booking.date,
          time: booking.time,
          total: getLessonPrice(),
          notes: booking.notes?.trim() || '',
        }),
      });

      const result: { ok?: boolean; error?: string } = await response.json();
      if (!response.ok || result.ok !== true) {
        throw new Error(result.error || `Booking request failed (${response.status})`);
      }

      setStep('confirmation');
    } catch (error) {
      console.error('Booking submission failed:', error);
      setSubmitError(t('booking.errors.submit'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const getLessonPrice = () => {
    return instructor.pricePerSession;
  };

  const renderStepIndicator = () => {
    const steps = [
      { key: 'lesson', label: t('booking.steps.lesson') },
      { key: 'datetime', label: t('booking.steps.datetime') },
      { key: 'details', label: t('booking.steps.details') },
    ];

    return (
      <div className="flex items-center justify-center gap-2 mb-8">
        {steps.map((s, index) => {
          const isActive = step === s.key;
          const isCompleted = 
            steps.findIndex((st) => st.key === step) > index;

          return (
            <div key={s.key} className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-sky-500 text-white'
                    : isCompleted
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
              </div>
              <span
                className={`ml-2 text-sm hidden sm:block ${
                  isActive ? 'text-sky-600 font-medium' : 'text-slate-500'
                }`}
              >
                {s.label}
              </span>
              {index < steps.length - 1 && (
                <div className="w-8 h-px bg-slate-200 mx-2" />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderLessonStep = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-medium mb-3 block">
          {t('booking.selectLessonType')}
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {instructor.lessonTypes.map((type) => (
            <button
              key={type}
              onClick={() => {
                setBooking({ ...booking, lessonType: type });
                setErrors({ ...errors, lessonType: '' });
              }}
              className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                booking.lessonType === type
                  ? 'border-sky-500 bg-sky-50'
                  : 'border-slate-200 hover:border-sky-200 hover:bg-slate-50'
              }`}
            >
              <div className="font-medium text-slate-900">
                {lessonTypeLabels[type]}
              </div>
              <div className="text-sm text-slate-500 mt-1">
                {formatPrice(instructor.pricePerSession)}
              </div>
            </button>
          ))}
        </div>
        {errors.lessonType && (
          <p className="text-sm text-red-500 mt-2">{errors.lessonType}</p>
        )}
      </div>
    </div>
  );

  const renderDateTimeStep = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-medium mb-3 block">
          {t('booking.selectDate')}
        </Label>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
          {availableDates.slice(0, 14).map((date) => (
            <button
              key={date}
              onClick={() => {
                setBooking({ ...booking, date });
                setErrors({ ...errors, date: '' });
              }}
              className={`p-2 rounded-lg border text-center transition-all duration-200 ${
                booking.date === date
                  ? 'border-sky-500 bg-sky-50 text-sky-700'
                  : 'border-slate-200 hover:border-sky-200 hover:bg-slate-50'
              }`}
            >
              <div className="text-xs text-slate-500 uppercase">
                {new Date(date).toLocaleDateString(i18n.language, { weekday: 'short' })}
              </div>
              <div className="font-semibold">{new Date(date).getDate()}</div>
            </button>
          ))}
        </div>
        {errors.date && <p className="text-sm text-red-500 mt-2">{errors.date}</p>}
      </div>

      {booking.date && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Label className="text-base font-medium mb-3 block">
            {t('booking.selectTime')}
          </Label>
          <div className="grid grid-cols-4 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => {
                  setBooking({ ...booking, time });
                  setErrors({ ...errors, time: '' });
                }}
                className={`p-3 rounded-lg border text-center transition-all duration-200 ${
                  booking.time === time
                    ? 'border-sky-500 bg-sky-50 text-sky-700'
                    : 'border-slate-200 hover:border-sky-200 hover:bg-slate-50'
                }`}
              >
                <Clock className="w-4 h-4 mx-auto mb-1" />
                <span className="text-sm font-medium">{time}</span>
              </button>
            ))}
          </div>
          {errors.time && <p className="text-sm text-red-500 mt-2">{errors.time}</p>}
        </motion.div>
      )}
    </div>
  );

  const renderDetailsStep = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName" className="mb-2 block">
            {t('booking.firstName')} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="firstName"
            value={booking.firstName}
            onChange={(e) => {
              setBooking({ ...booking, firstName: e.target.value });
              setErrors({ ...errors, firstName: '' });
            }}
            placeholder="John"
            className={errors.firstName ? 'border-red-500' : ''}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>
          )}
        </div>
        <div>
          <Label htmlFor="lastName" className="mb-2 block">
            {t('booking.lastName')} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="lastName"
            value={booking.lastName}
            onChange={(e) => {
              setBooking({ ...booking, lastName: e.target.value });
              setErrors({ ...errors, lastName: '' });
            }}
            placeholder="Doe"
            className={errors.lastName ? 'border-red-500' : ''}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="phone" className="mb-2 block">
          {t('booking.phone')} <span className="text-red-500">*</span>
        </Label>
        <Input
          id="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={booking.phone}
          onChange={(e) => {
            setBooking({ ...booking, phone: e.target.value });
            setErrors({ ...errors, phone: '' });
          }}
          placeholder="+995 555 123 456"
          className={errors.phone ? 'border-red-500' : ''}
        />
        {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
      </div>

      <div>
        <Label htmlFor="email" className="mb-2 block">
          {t('booking.email')} <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          value={booking.email}
          onChange={(e) => {
            setBooking({ ...booking, email: e.target.value });
            setErrors({ ...errors, email: '' });
          }}
          placeholder="john@example.com"
          className={errors.email ? 'border-red-500' : ''}
        />
        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
      </div>

      <div>
        <Label htmlFor="notes" className="mb-2 block">
          {t('booking.notes')}
        </Label>
        <Textarea
          id="notes"
          value={booking.notes}
          onChange={(e) => setBooking({ ...booking, notes: e.target.value })}
          placeholder={t('booking.notesPlaceholder')}
          rows={3}
        />
      </div>

      <div className="bg-slate-50 rounded-lg p-4 mt-4">
        <h4 className="font-medium text-slate-900 mb-3">{t('booking.bookingSummary')}</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">{t('booking.instructor')}:</span>
            <span className="font-medium">{instructor.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">{t('booking.lessonType')}:</span>
            <span className="font-medium">
              {booking.lessonType && lessonTypeLabels[booking.lessonType]}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">{t('booking.date')}:</span>
            <span className="font-medium">{booking.date && formatDate(booking.date)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">{t('booking.time')}:</span>
            <span className="font-medium">{booking.time}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-slate-200">
            <span className="text-slate-900 font-medium">{t('booking.total')}:</span>
            <span className="text-sky-600 font-bold">{formatPrice(getLessonPrice())}</span>
          </div>
        </div>
      </div>
      {submitError && (
        <p role="alert" className="mt-4 text-sm text-red-600">
          {submitError}
        </p>
      )}
    </div>
  );

  const renderConfirmation = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8"
    >
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check className="w-10 h-10 text-green-600" />
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-2">
        {t('booking.success.title')}
      </h3>
      <p className="text-slate-600 mb-6">
        {t('booking.success.message')}
      </p>
      <div className="bg-slate-50 rounded-lg p-4 mb-6 text-left">
        <h4 className="font-medium text-slate-900 mb-3">{t('booking.success.detailsTitle')}</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">{t('booking.instructor')}:</span>
            <span className="font-medium">{instructor.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">{t('booking.lessonType')}:</span>
            <span className="font-medium">
              {booking.lessonType && lessonTypeLabels[booking.lessonType]}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">{t('booking.date')} & {t('booking.time')}:</span>
            <span className="font-medium">
              {booking.date && formatDate(booking.date)} {t('booking.time').toLowerCase()} {booking.time}
            </span>
          </div>
        </div>
      </div>
      <p className="text-sm text-slate-500 mb-6">
        {t('booking.success.contactText')}
      </p>
      <Button onClick={onClose} className="bg-sky-500 hover:bg-sky-600 text-white">
        {t('booking.success.close')}
      </Button>
    </motion.div>
  );

  return (
    <div className="py-4">
      {step !== 'confirmation' && renderStepIndicator()}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {step === 'lesson' && renderLessonStep()}
          {step === 'datetime' && renderDateTimeStep()}
          {step === 'details' && renderDetailsStep()}
          {step === 'confirmation' && renderConfirmation()}
        </motion.div>
      </AnimatePresence>

      {step !== 'confirmation' && (
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={step === 'lesson' ? onClose : handleBack}
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            {step === 'lesson' ? t('booking.cancel') : t('booking.back')}
          </Button>

          {step === 'details' ? (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t('booking.processing')}
                </>
              ) : (
                <>
                  {t('booking.confirmBooking')}
                  <Check className="w-4 h-4" />
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="bg-sky-500 hover:bg-sky-600 text-white flex items-center gap-2"
            >
              {t('booking.next')}
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
