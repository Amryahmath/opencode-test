export interface Profile extends User {
  certificates: Certificate[];
  settings: UserSettings;
}

export interface Certificate {
  id: string;
  title: string;
  grade: GradeLevel;
  issuedAt: string;
  certificateUrl: string;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  emailNotifications: boolean;
  pushNotifications: boolean;
  language: string;
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  bio: string;
  avatar: string;
  experience: number;
  rating: number;
  studentsCount: number;
}