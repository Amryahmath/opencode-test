// apps/api/src/mock-data/users.ts
import type { User, Teacher, Certificate, UserSettings } from '@it-master-ai/types';

export const mockUsers: User[] = [
  {
    id: 'u1',
    email: 'alex@student.edu',
    name: 'Alex Chen',
    grade: 9,
    school: 'Lincoln High School',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    role: 'student',
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 'u2',
    email: 'maya@student.edu',
    name: 'Maya Patel',
    grade: 10,
    school: 'Riverside Academy',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maya',
    role: 'student',
    createdAt: '2024-01-10T14:20:00Z',
  },
  {
    id: 'u3',
    email: 'jordan@student.edu',
    name: 'Jordan Kim',
    grade: 8,
    school: 'Tech Magnet School',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jordan',
    role: 'student',
    createdAt: '2024-02-01T09:15:00Z',
  },
];

export const mockTeachers: Teacher[] = [
  {
    id: 't1',
    name: 'Dr. Sarah Chen',
    subject: 'Computer Science',
    bio: 'PhD in Computer Science from MIT. 15+ years teaching experience. Specializes in algorithms and data structures.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    experience: 15,
    rating: 4.9,
    studentsCount: 2500,
  },
  {
    id: 't2',
    name: 'Prof. Michael Torres',
    subject: 'Cybersecurity',
    bio: 'Former security engineer at Google. CISSP certified. Teaches network security and ethical hacking.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
    experience: 12,
    rating: 4.8,
    studentsCount: 1800,
  },
  {
    id: 't3',
    name: 'Dr. Emily Watson',
    subject: 'AI & Machine Learning',
    bio: 'AI researcher with publications in NeurIPS and ICML. Teaches neural networks and deep learning.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily',
    experience: 10,
    rating: 4.9,
    studentsCount: 1200,
  },
  {
    id: 't4',
    name: 'Prof. David Kim',
    subject: 'Full Stack Development',
    bio: '18 years industry experience at Amazon, Netflix. Teaches modern web development and cloud architecture.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
    experience: 18,
    rating: 4.7,
    studentsCount: 3000,
  },
];

export const mockCertificates: Certificate[] = [
  { id: 'c1', title: 'Grade 7 Programming Fundamentals', grade: 7, issuedAt: '2024-01-15T10:30:00Z', certificateUrl: '/certificates/grade7-fundamentals.pdf' },
  { id: 'c2', title: 'Grade 8 Web Development Basics', grade: 8, issuedAt: '2024-03-20T14:20:00Z', certificateUrl: '/certificates/grade8-webdev.pdf' },
  { id: 'c3', title: 'Grade 9 JavaScript Proficiency', grade: 9, issuedAt: '2024-06-10T14:20:00Z', certificateUrl: '/certificates/grade9-js.pdf' },
];

export const defaultSettings: UserSettings = {
  theme: 'system',
  emailNotifications: true,
  pushNotifications: false,
  language: 'en',
};

export function getUserById(id: string): typeof mockUsers[0] | undefined {
  return mockUsers.find(u => u.id === id);
}

export function getUserByEmail(email: string): typeof mockUsers[0] | undefined {
  return mockUsers.find(u => u.email === email);
}

export function getAllTeachers(): Teacher[] {
  return mockTeachers;
}

export function getTeacherById(id: string): Teacher | undefined {
  return mockTeachers.find(t => t.id === id);
}