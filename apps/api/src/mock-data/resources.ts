// apps/api/src/mock-data/resources.ts
import type { Resource } from '@it-master-ai/types';

export const resources: Resource[] = [
  {
    id: 'r1',
    title: 'Introduction to Python Programming',
    description: 'Complete guide to Python basics for beginners including variables, loops, functions, and data structures.',
    type: 'pdf',
    grade: 7,
    topic: 'Programming Basics',
    thumbnail: '📄',
    url: '/resources/python-basics.pdf',
    pages: 45,
    downloads: 1250,
    tags: ['Beginner', 'Python', 'Grade 7'],
  },
  {
    id: 'r2',
    title: 'HTML & CSS Fundamentals - Video Course',
    description: 'Learn to build responsive websites from scratch with this comprehensive video tutorial series.',
    type: 'video',
    grade: 8,
    topic: 'Web Development',
    thumbnail: '🎬',
    url: '/resources/html-css-course.mp4',
    duration: 7200,
    downloads: 3400,
    tags: ['Beginner', 'Web Dev', 'Grade 8'],
  },
  {
    id: 'r3',
    title: 'Database Design Principles',
    description: 'Understanding relational databases, normalization, ER diagrams, and SQL best practices.',
    type: 'pdf',
    grade: 10,
    topic: 'Databases',
    thumbnail: '📄',
    url: '/resources/database-design.pdf',
    pages: 60,
    downloads: 890,
    tags: ['Intermediate', 'SQL', 'Grade 10'],
  },
  {
    id: 'r4',
    title: 'JavaScript ES6+ Features',
    description: 'Modern JavaScript syntax including arrow functions, destructuring, modules, and async/await.',
    type: 'video',
    grade: 9,
    topic: 'Web Development',
    thumbnail: '🎬',
    url: '/resources/js-es6.mp4',
    duration: 5400,
    downloads: 2100,
    tags: ['Intermediate', 'JavaScript', 'Grade 9'],
  },
  {
    id: 'r5',
    title: 'Cybersecurity Basics Study Notes',
    description: 'Introduction to network security, threat modeling, encryption, and ethical hacking principles.',
    type: 'notes',
    grade: 11,
    topic: 'Security',
    thumbnail: '📝',
    url: '/resources/cybersecurity-notes.md',
    downloads: 1800,
    tags: ['Advanced', 'Security', 'Grade 11'],
  },
  {
    id: 'r6',
    title: 'Data Structures & Algorithms Reference',
    description: 'Comprehensive guide to arrays, linked lists, trees, graphs, sorting, and searching algorithms.',
    type: 'pdf',
    grade: 10,
    topic: 'Algorithms',
    thumbnail: '📄',
    url: '/resources/dsa-reference.pdf',
    pages: 80,
    downloads: 2500,
    tags: ['Advanced', 'Algorithms', 'Grade 10'],
  },
  {
    id: 'r7',
    title: 'Python Practice Exercises with Solutions',
    description: '50+ hands-on coding challenges with detailed solutions and explanations.',
    type: 'download',
    grade: 7,
    topic: 'Programming Basics',
    thumbnail: '💾',
    url: '/resources/python-exercises.zip',
    downloads: 5600,
    tags: ['Beginner', 'Practice', 'Grade 7'],
  },
  {
    id: 'r8',
    title: 'Network Fundamentals Explained',
    description: 'How the internet works: IP addresses, DNS, HTTP/HTTPS, TCP/IP, and network layers.',
    type: 'video',
    grade: 9,
    topic: 'Networking',
    thumbnail: '🎬',
    url: '/resources/networking-basics.mp4',
    duration: 4500,
    downloads: 1500,
    tags: ['Intermediate', 'Networking', 'Grade 9'],
  },
  {
    id: 'r9',
    title: 'Machine Learning Introduction',
    description: 'Basic concepts of AI/ML, supervised vs unsupervised learning, and building your first model.',
    type: 'notes',
    grade: 11,
    topic: 'AI/ML',
    thumbnail: '📝',
    url: '/resources/ml-intro.md',
    downloads: 950,
    tags: ['Advanced', 'AI', 'Grade 11'],
  },
];

export function getAllResources(): Resource[] {
  return resources;
}

export function getResourcesByGrade(grade: number): Resource[] {
  return resources.filter(r => r.grade === grade);
}

export function getResourcesByType(type: Resource['type']): Resource[] {
  return resources.filter(r => r.type === type);
}

export function searchResources(query: string): Resource[] {
  const lower = query.toLowerCase();
  return resources.filter(r => 
    r.title.toLowerCase().includes(lower) ||
    r.description.toLowerCase().includes(lower) ||
    r.tags.some(t => t.toLowerCase().includes(lower))
  );
}

export function getResourceById(id: string): Resource | undefined {
  return resources.find(r => r.id === id);
}