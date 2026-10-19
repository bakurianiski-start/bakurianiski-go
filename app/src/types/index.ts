export interface Instructor {
  id: string;
  name: string;
  photo: string;
  experience: number;
  languages: string[];
  lessonTypes: LessonType[];
  pricePerHour: number;
  pricePerSession: number;
  rating: number;
  reviewCount: number;
  bio: string;
  certifications: string[];
  availability: AvailabilitySlot[];
}

export type LessonType = 
  | 'beginner' 
  | 'intermediate' 
  | 'advanced' 
  | 'kids' 
  | 'group' 
  | 'private';

export interface AvailabilitySlot {
  date: string;
  timeSlots: string[];
}

export interface Booking {
  id?: string;
  instructorId: string;
  instructorName: string;
  lessonType: LessonType;
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export type FilterOption = {
  lessonType: LessonType | 'all';
  priceRange: [number, number];
  skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'all';
  language: string;
};

export type SortOption = 'price-low' | 'price-high' | 'rating' | 'experience';
