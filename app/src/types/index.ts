export interface Instructor {
  id: string;
  name: string;
  photo: string;
  languages: string[];
  lessonTypes: LessonType[];
  pricePerSession: number;
  rating: number;
  reviewCount: number;
  bio: string;
  availability: AvailabilitySlot[];
}

export type LessonType = 
  | 'beginner' 
  | 'intermediate' 
  | 'advanced';

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
