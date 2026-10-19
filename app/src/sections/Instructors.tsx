import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  Clock,
  Globe,
  Filter,
  ChevronDown,
  Check,
  User,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Slider } from '@/components/ui/slider';
import { instructors, languageOptions } from '@/data/instructors';
import type { Instructor, LessonType, FilterOption, SortOption } from '@/types';
import { formatPrice } from '@/lib/utils';
import { BookingForm } from './BookingForm';

export function Instructors() {
  const { t } = useTranslation();
  
  const lessonTypes: { value: LessonType | 'all'; label: string }[] = [
    { value: 'all', label: t('instructors.allTypes') },
    { value: 'beginner', label: t('instructors.lessonTypes.beginner') },
    { value: 'intermediate', label: t('instructors.lessonTypes.intermediate') },
    { value: 'advanced', label: t('instructors.lessonTypes.advanced') },
    { value: 'kids', label: t('instructors.lessonTypes.kids') },
    { value: 'group', label: t('instructors.lessonTypes.group') },
    { value: 'private', label: t('instructors.lessonTypes.private') },
  ];

  const skillLevels = [
    { value: 'all', label: t('instructors.allLevels') },
    { value: 'beginner', label: t('instructors.levels.beginner') },
    { value: 'intermediate', label: t('instructors.levels.intermediate') },
    { value: 'advanced', label: t('instructors.levels.advanced') },
  ];

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'price-low', label: t('instructors.sortOptions.priceLow') },
    { value: 'price-high', label: t('instructors.sortOptions.priceHigh') },
    { value: 'rating', label: t('instructors.sortOptions.rating') },
    { value: 'experience', label: t('instructors.sortOptions.experience') },
  ];

  const [filters, setFilters] = useState<FilterOption>({
    lessonType: 'all',
    priceRange: [0, 200],
    skillLevel: 'all',
    language: 'All Languages',
  });
  const [sortBy, setSortBy] = useState<SortOption>('rating');
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filteredInstructors = useMemo(() => {
    let result = instructors.filter((instructor) => {
      if (filters.lessonType !== 'all' && !instructor.lessonTypes.includes(filters.lessonType)) {
        return false;
      }
      if (
        instructor.pricePerHour < filters.priceRange[0] ||
        instructor.pricePerHour > filters.priceRange[1]
      ) {
        return false;
      }
      if (filters.skillLevel !== 'all') {
        if (filters.skillLevel === 'beginner' && !instructor.lessonTypes.includes('beginner')) {
          return false;
        }
        if (filters.skillLevel === 'intermediate' && !instructor.lessonTypes.includes('intermediate')) {
          return false;
        }
        if (filters.skillLevel === 'advanced' && !instructor.lessonTypes.includes('advanced')) {
          return false;
        }
      }
      if (filters.language !== 'All Languages' && !instructor.languages.includes(filters.language)) {
        return false;
      }
      return true;
    });

    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.pricePerHour - b.pricePerHour;
        case 'price-high':
          return b.pricePerHour - a.pricePerHour;
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return b.experience - a.experience;
        default:
          return 0;
      }
    });

    return result;
  }, [filters, sortBy]);

  const handleBookNow = (instructor: Instructor) => {
    setSelectedInstructor(instructor);
    setIsBookingOpen(true);
  };

  const lessonTypeLabels: Record<string, string> = {
    beginner: t('instructors.lessonTypes.beginner'),
    intermediate: t('instructors.lessonTypes.intermediate'),
    advanced: t('instructors.lessonTypes.advanced'),
    kids: t('instructors.lessonTypes.kids'),
    group: t('instructors.lessonTypes.group'),
    private: t('instructors.lessonTypes.private'),
  };

  return (
    <section id="instructors" className="py-20 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4 bg-sky-100 text-sky-700 hover:bg-sky-100">
            {t('instructors.badge')}
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            {t('instructors.title')}<span className="text-gradient">{t('instructors.titleHighlight')}</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-600">
            {t('instructors.subtitle')}
          </p>
        </motion.div>

        {/* Filters & Sort */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              {t('instructors.filters')}
              {(filters.lessonType !== 'all' ||
                filters.skillLevel !== 'all' ||
                filters.language !== 'All Languages' ||
                filters.priceRange[1] !== 200) && (
                <Badge variant="secondary" className="ml-2 bg-sky-500 text-white">
                  {t('instructors.filtersActive')}
                </Badge>
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  {t('instructors.sortBy')}: {sortOptions.find((o) => o.value === sortBy)?.label}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {sortOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className="flex items-center justify-between"
                  >
                    {option.label}
                    {sortBy === option.value && <Check className="w-4 h-4" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <Card className="mt-4 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">
                        {t('instructors.lessonType')}
                      </label>
                      <select
                        value={filters.lessonType}
                        onChange={(e) =>
                          setFilters({ ...filters, lessonType: e.target.value as LessonType | 'all' })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      >
                        {lessonTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">
                        {t('instructors.skillLevel')}
                      </label>
                      <select
                        value={filters.skillLevel}
                        onChange={(e) =>
                          setFilters({
                            ...filters,
                            skillLevel: e.target.value as FilterOption['skillLevel'],
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      >
                        {skillLevels.map((level) => (
                          <option key={level.value} value={level.value}>
                            {level.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">
                        {t('instructors.language')}
                      </label>
                      <select
                        value={filters.language}
                        onChange={(e) =>
                          setFilters({ ...filters, language: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      >
                        {languageOptions.map((lang) => (
                          <option key={lang} value={lang}>
                            {lang}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">
                        {t('instructors.maxPrice')}: {formatPrice(filters.priceRange[1])}{t('instructors.perHour')}
                      </label>
                      <Slider
                        value={[filters.priceRange[1]]}
                        onValueChange={(value) =>
                          setFilters({ ...filters, priceRange: [0, value[0]] })
                        }
                        max={200}
                        step={10}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="ghost"
                      onClick={() =>
                        setFilters({
                          lessonType: 'all',
                          priceRange: [0, 200],
                          skillLevel: 'all',
                          language: 'All Languages',
                        })
                      }
                      className="text-slate-500"
                    >
                      {t('instructors.resetFilters')}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Count */}
        <div className="mb-6 text-sm text-slate-500">
          {t('instructors.showing')} {filteredInstructors.length} {filteredInstructors.length === 1 ? t('instructors.instructor') : t('instructors.instructors')}
        </div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredInstructors.map((instructor, index) => (
              <motion.div
                key={instructor.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                layout
              >
                <Card className="group h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-slate-200">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={instructor.photo}
                      alt={instructor.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                    
                    <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-semibold text-slate-900">
                        {instructor.rating}
                      </span>
                      <span className="text-xs text-slate-500">
                        ({instructor.reviewCount})
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white">{instructor.name}</h3>
                      <div className="flex items-center gap-2 text-white/80 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{instructor.experience} {t('instructors.yearsExperience')}</span>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-3 text-sm text-slate-600">
                      <Globe className="w-4 h-4 text-sky-500" />
                      <span>{instructor.languages.join(', ')}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {instructor.lessonTypes.slice(0, 4).map((type) => (
                        <Badge
                          key={type}
                          variant="secondary"
                          className="text-xs bg-sky-50 text-sky-700 hover:bg-sky-100"
                        >
                          {lessonTypeLabels[type]}
                        </Badge>
                      ))}
                      {instructor.lessonTypes.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{instructor.lessonTypes.length - 4}
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-slate-600 line-clamp-2 mb-4">
                      {instructor.bio}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div>
                        <div className="text-lg font-bold text-slate-900">
                          {formatPrice(instructor.pricePerHour)}
                          <span className="text-sm font-normal text-slate-500">{t('instructors.perHour')}</span>
                        </div>
                        <div className="text-xs text-slate-500">
                          {t('booking.duration')}
                        </div>
                      </div>
                      <Button
                        onClick={() => handleBookNow(instructor)}
                        className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white"
                      >
                        {t('instructors.bookNow')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredInstructors.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <User className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-700 mb-2">
              {t('instructors.noResults')}
            </h3>
            <p className="text-slate-500">
              {t('instructors.noResultsText')}
            </p>
          </motion.div>
        )}
      </div>

      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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
