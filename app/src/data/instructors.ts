import type { Instructor } from '@/types';

export const instructors: Instructor[] = [
  {
    id: 'giorgi-diakonashvili',
    name: 'Giorgi Diakonashvili',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop&crop=face',
    languages: ['Georgian', 'English', 'Russian'],
    lessonTypes: ['beginner', 'intermediate', 'advanced'],
    pricePerSession: 150,
    rating: 4.9,
    reviewCount: 127,
    bio: 'Professional ski instructor in Bakuriani, helping skiers of all levels build skills and confidence on the slopes.',
    certifications: ['ISIA Level 3', 'Avalanche Safety', 'First Aid Certified'],
    availability: [],
  },
];

export const lessonTypeLabels: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};
