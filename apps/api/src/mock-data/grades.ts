// apps/api/src/mock-data/grades.ts
import type { Grade, Module, Lesson, Resource } from '@it-master-ai/types';

const resources: Resource[] = [
  { id: 'r1', title: 'Python Basics PDF', description: 'Complete guide to Python syntax', type: 'pdf', grade: 7, topic: 'Programming', thumbnail: '📄', url: '#', pages: 45, downloads: 1200, tags: ['Python', 'Beginner'] },
  { id: 'r2', title: 'Variables Video', description: 'Understanding variables in Python', type: 'video', grade: 7, topic: 'Programming', thumbnail: '🎬', url: '#', duration: 15, downloads: 800, tags: ['Python', 'Video'] },
  { id: 'r3', title: 'Loops Cheatsheet', description: 'Quick reference for for/while loops', type: 'notes', grade: 7, topic: 'Programming', thumbnail: '📝', url: '#', downloads: 500, tags: ['Reference'] },
];

const lessons: Lesson[] = [
  { id: 'l1', moduleId: 'm1', title: 'Introduction to Programming', description: 'What is programming and why learn it?', content: '<p>Programming is...</p>', videoUrl: '#', duration: 20, order: 1, resources: [resources[0], resources[1]], quizId: 'q1' },
  { id: 'l2', moduleId: 'm1', title: 'Variables and Data Types', description: 'Learn about variables, integers, strings, and booleans', content: '<p>Variables store data...</p>', videoUrl: '#', duration: 25, order: 2, resources: [resources[2]], quizId: 'q1' },
  { id: 'l3', moduleId: 'm1', title: 'Control Flow: If/Else', description: 'Making decisions in code', content: '<p>Conditional statements...</p>', duration: 30, order: 3, resources: [], quizId: 'q1' },
  { id: 'l4', moduleId: 'm1', title: 'Loops: For and While', description: 'Repeating code efficiently', content: '<p>Loops allow...</p>', videoUrl: '#', duration: 35, order: 4, resources: [], quizId: 'q1' },
  { id: 'l5', moduleId: 'm1', title: 'Functions', description: 'Creating reusable code blocks', content: '<p>Functions help...</p>', duration: 30, order: 5, resources: [], quizId: 'q1' },
];

const modules: Module[] = [
  { id: 'm1', gradeId: 'g7', title: 'Programming Fundamentals', description: 'Core concepts every programmer needs', order: 1, lessons, estimatedHours: 5 },
  { id: 'm2', gradeId: 'g7', title: 'Data Structures', description: 'Lists, dictionaries, and more', order: 2, lessons: [], estimatedHours: 4 },
  { id: 'm3', gradeId: 'g7', title: 'Project: Calculator App', description: 'Build your first real application', order: 3, lessons: [], estimatedHours: 3 },
];

export const grades: Grade[] = [
  {
    id: 'g6', level: 6, name: 'Grade 6: Digital Foundations', description: 'Basic computing, digital citizenship, and intro to coding with Scratch',
    modules: [
      { id: 'm6-1', gradeId: 'g6', title: 'Computer Basics', description: 'Hardware, software, and how computers work', order: 1, lessons: [], estimatedHours: 4 },
      { id: 'm6-2', gradeId: 'g6', title: 'Digital Citizenship', description: 'Online safety, ethics, and responsible use', order: 2, lessons: [], estimatedHours: 3 },
      { id: 'm6-3', gradeId: 'g6', title: 'Scratch Programming', description: 'Visual coding with blocks', order: 3, lessons: [], estimatedHours: 5 },
    ],
    estimatedHours: 12,
    thumbnail: '💻',
  },
  {
    id: 'g7', level: 7, name: 'Grade 7: Programming Basics', description: 'Python fundamentals, variables, loops, and functions',
    modules,
    estimatedHours: 20,
    thumbnail: '🐍',
  },
  {
    id: 'g8', level: 8, name: 'Grade 8: Data & Logic', description: 'Data structures, algorithms, binary, and logic gates',
    modules: [
      { id: 'm8-1', gradeId: 'g8', title: 'Data Structures', description: 'Arrays, lists, stacks, queues', order: 1, lessons: [], estimatedHours: 6 },
      { id: 'm8-2', gradeId: 'g8', title: 'Algorithms', description: 'Search, sort, and algorithmic thinking', order: 2, lessons: [], estimatedHours: 6 },
      { id: 'm8-3', gradeId: 'g8', title: 'Binary & Logic', description: 'How computers think', order: 3, lessons: [], estimatedHours: 4 },
    ],
    estimatedHours: 20,
    thumbnail: '🧠',
  },
  {
    id: 'g9', level: 9, name: 'Grade 9: Web Development', description: 'HTML, CSS, JavaScript, and building websites',
    modules: [
      { id: 'm9-1', gradeId: 'g9', title: 'HTML Fundamentals', description: 'Structure and semantic markup', order: 1, lessons: [], estimatedHours: 5 },
      { id: 'm9-2', gradeId: 'g9', title: 'CSS Styling', description: 'Layouts, flexbox, grid, animations', order: 2, lessons: [], estimatedHours: 6 },
      { id: 'm9-3', gradeId: 'g9', title: 'JavaScript Basics', description: 'DOM manipulation and interactivity', order: 3, lessons: [], estimatedHours: 8 },
    ],
    estimatedHours: 25,
    thumbnail: '🌐',
  },
  {
    id: 'g10', level: 10, name: 'Grade 10: Advanced Programming', description: 'OOP, databases, APIs, and full-stack development',
    modules: [
      { id: 'm10-1', gradeId: 'g10', title: 'Object-Oriented Programming', description: 'Classes, inheritance, polymorphism', order: 1, lessons: [], estimatedHours: 8 },
      { id: 'm10-2', gradeId: 'g10', title: 'Databases & SQL', description: 'Relational databases and queries', order: 2, lessons: [], estimatedHours: 7 },
      { id: 'm10-3', gradeId: 'g10', title: 'REST APIs', description: 'Building and consuming APIs', order: 3, lessons: [], estimatedHours: 6 },
    ],
    estimatedHours: 30,
    thumbnail: '⚙️',
  },
  {
    id: 'g11', level: 11, name: 'Grade 11: Specialization Tracks', description: 'Cybersecurity, AI/ML, Cloud, or Full-Stack',
    modules: [
      { id: 'm11-1', gradeId: 'g11', title: 'Cybersecurity Fundamentals', description: 'Network security, encryption, ethics', order: 1, lessons: [], estimatedHours: 10 },
      { id: 'm11-2', gradeId: 'g11', title: 'AI & Machine Learning', description: 'Neural networks, training models', order: 2, lessons: [], estimatedHours: 12 },
      { id: 'm11-3', gradeId: 'g11', title: 'Capstone Project', description: 'End-to-end portfolio project', order: 3, lessons: [], estimatedHours: 15 },
    ],
    estimatedHours: 40,
    thumbnail: '🚀',
  },
];

export function getGradeById(id: string): Grade | undefined {
  return grades.find(g => g.id === id);
}

export function getGradeByLevel(level: number): Grade | undefined {
  return grades.find(g => g.level === level);
}

export function getAllGrades(): Grade[] {
  return grades;
}