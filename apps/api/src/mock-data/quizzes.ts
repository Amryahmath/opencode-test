// apps/api/src/mock-data/quizzes.ts
import type { Quiz, Question, QuizSubmission, QuizResult, LeaderboardEntry } from '@it-master-ai/types';

export const mockQuizzes: Quiz[] = [
  {
    id: 'q1',
    title: 'JavaScript Fundamentals',
    description: 'Test your knowledge of JavaScript basics including variables, functions, and control flow',
    grade: 9,
    topic: 'Web Development',
    duration: 20,
    passingScore: 70,
    questions: [
      { id: 'q1-1', quizId: 'q1', text: 'What is the correct way to declare a variable in JavaScript?', type: 'mcq', options: [{ id: 'a', text: 'var x = 5;' }, { id: 'b', text: 'variable x = 5;' }, { id: 'c', text: 'x := 5;' }, { id: 'd', text: 'declare x = 5;' }], correctAnswers: ['a'], explanation: 'JavaScript uses var, let, or const to declare variables.', points: 10 },
      { id: 'q1-2', quizId: 'q1', text: 'Which method adds an element to the end of an array?', type: 'mcq', options: [{ id: 'a', text: 'push()' }, { id: 'b', text: 'pop()' }, { id: 'c', text: 'shift()' }, { id: 'd', text: 'unshift()' }], correctAnswers: ['a'], explanation: 'push() adds elements to the end of an array.', points: 10 },
      { id: 'q1-3', quizId: 'q1', text: 'What does "===" mean in JavaScript?', type: 'mcq', options: [{ id: 'a', text: 'Assignment' }, { id: 'b', text: 'Loose equality' }, { id: 'c', text: 'Strict equality' }, { id: 'd', text: 'Not equal' }], correctAnswers: ['c'], explanation: '=== checks both value and type equality.', points: 10 },
      { id: 'q1-4', quizId: 'q1', text: 'How do you write a comment in JavaScript?', type: 'mcq', options: [{ id: 'a', text: '<!-- comment -->' }, { id: 'b', text: '// comment' }, { id: 'c', text: '# comment' }, { id: 'd', text: '/* comment */' }], correctAnswers: ['b', 'd'], explanation: 'Both // for single-line and /* */ for multi-line comments are valid.', points: 10 },
      { id: 'q1-5', quizId: 'q1', text: 'What is the result of 2 + "2" in JavaScript?', type: 'mcq', options: [{ id: 'a', text: '4' }, { id: 'b', text: '"22"' }, { id: 'c', text: 'NaN' }, { id: 'd', text: 'Error' }], correctAnswers: ['b'], explanation: 'JavaScript coerces the number to string, resulting in string concatenation.', points: 10 },
      { id: 'q1-6', quizId: 'q1', text: 'Which keyword declares a constant?', type: 'mcq', options: [{ id: 'a', text: 'var' }, { id: 'b', text: 'let' }, { id: 'c', text: 'const' }, { id: 'd', text: 'constant' }], correctAnswers: ['c'], explanation: 'const declares a constant that cannot be reassigned.', points: 10 },
      { id: 'q1-7', quizId: 'q1', text: 'What does the "typeof" operator return for null?', type: 'mcq', options: [{ id: 'a', text: '"null"' }, { id: 'b', text: '"object"' }, { id: 'c', text: '"undefined"' }, { id: 'd', text: '"number"' }], correctAnswers: ['b'], explanation: 'typeof null returns "object" - this is a known JavaScript quirk.', points: 10 },
      { id: 'q1-8', quizId: 'q1', text: 'Which array method creates a new array with transformed elements?', type: 'mcq', options: [{ id: 'a', text: 'forEach()' }, { id: 'b', text: 'map()' }, { id: 'c', text: 'filter()' }, { id: 'd', text: 'reduce()' }], correctAnswers: ['b'], explanation: 'map() transforms each element and returns a new array.', points: 10 },
      { id: 'q1-9', quizId: 'q1', text: 'What is the purpose of "use strict"?', type: 'mcq', options: [{ id: 'a', text: 'Enables strict mode' }, { id: 'b', text: 'Makes code faster' }, { id: 'c', text: 'Enables ES6 features' }, { id: 'd', text: 'Disables error handling' }], correctAnswers: ['a'], explanation: '"use strict" enables strict mode which catches common coding mistakes.', points: 10 },
      { id: 'q1-10', quizId: 'q1', text: 'Which of these is NOT a JavaScript data type?', type: 'mcq', options: [{ id: 'a', text: 'string' }, { id: 'b', text: 'boolean' }, { id: 'c', text: 'float' }, { id: 'd', text: 'undefined' }], correctAnswers: ['c'], explanation: 'JavaScript has number type (not separate float/int).', points: 10 },
      { id: 'q1-11', quizId: 'q1', text: 'What does the "this" keyword refer to in a regular function?', type: 'mcq', options: [{ id: 'a', text: 'The function itself' }, { id: 'b', text: 'The global object' }, { id: 'c', text: 'The parent object' }, { id: 'd', text: 'undefined' }], correctAnswers: ['b'], explanation: 'In regular functions, "this" refers to the global object (window in browsers).', points: 10 },
      { id: 'q1-12', quizId: 'q1', text: 'Which method removes the last element from an array?', type: 'mcq', options: [{ id: 'a', text: 'pop()' }, { id: 'b', text: 'push()' }, { id: 'c', text: 'shift()' }, { id: 'd', text: 'slice()' }], correctAnswers: ['a'], explanation: 'pop() removes and returns the last element.', points: 10 },
      { id: 'q1-13', quizId: 'q1', text: 'What is a closure in JavaScript?', type: 'mcq', options: [{ id: 'a', text: 'A way to close the browser' }, { id: 'b', text: 'Function with access to outer scope' }, { id: 'c', text: 'Ending a loop early' }, { id: 'd', text: 'Closing a file' }], correctAnswers: ['b'], explanation: 'A closure gives access to an outer function\'s scope from an inner function.', points: 15 },
      { id: 'q1-14', quizId: 'q1', text: 'What does Promise.all() do?', type: 'mcq', options: [{ id: 'a', text: 'Runs promises sequentially' }, { id: 'b', text: 'Waits for all promises to resolve' }, { id: 'c', text: 'Cancels all promises' }, { id: 'd', text: 'Returns first resolved promise' }], correctAnswers: ['b'], explanation: 'Promise.all() waits for all promises to resolve or one to reject.', points: 15 },
      { id: 'q1-15', quizId: 'q1', text: 'What is the event loop?', type: 'mcq', options: [{ id: 'a', text: 'A loop for events' }, { id: 'b', text: 'Mechanism for async callbacks' }, { id: 'c', text: 'Infinite loop' }, { id: 'd', text: 'Timer function' }], correctAnswers: ['b'], explanation: 'The event loop handles async callbacks in JavaScript\'s single-threaded model.', points: 15 },
    ],
  },
  {
    id: 'q2',
    title: 'Python Basics',
    description: 'Fundamental Python concepts for beginners',
    grade: 7,
    topic: 'Programming',
    duration: 15,
    passingScore: 60,
    questions: [
      { id: 'q2-1', quizId: 'q2', text: 'How do you create a variable in Python?', type: 'mcq', options: [{ id: 'a', text: 'var x = 5' }, { id: 'b', text: 'x = 5' }, { id: 'c', text: 'int x = 5' }, { id: 'd', text: 'let x = 5' }], correctAnswers: ['b'], explanation: 'Python uses simple assignment without type declaration.', points: 10 },
      { id: 'q2-2', quizId: 'q2', text: 'Which symbol starts a comment in Python?', type: 'mcq', options: [{ id: 'a', text: '//' }, { id: 'b', text: '#' }, { id: 'c', text: '--' }, { id: 'd', text: '/*' }], correctAnswers: ['b'], explanation: 'Python uses # for single-line comments.', points: 10 },
      { id: 'q2-3', quizId: 'q2', text: 'What is the output of: print(2 ** 3)?', type: 'mcq', options: [{ id: 'a', text: '6' }, { id: 'b', text: '8' }, { id: 'c', text: '9' }, { id: 'd', text: '5' }], correctAnswers: ['b'], explanation: '** is the exponentiation operator. 2^3 = 8.', points: 10 },
      { id: 'q2-4', quizId: 'q2', text: 'Which data type is immutable in Python?', type: 'mcq', options: [{ id: 'a', text: 'list' }, { id: 'b', text: 'dict' }, { id: 'c', text: 'tuple' }, { id: 'c', text: 'set' }], correctAnswers: ['c'], explanation: 'Tuples are immutable; lists, dicts, and sets are mutable.', points: 10 },
      { id: 'q2-5', quizId: 'q2', text: 'How do you define a function in Python?', type: 'mcq', options: [{ id: 'a', text: 'function myFunc():' }, { id: 'b', text: 'def myFunc():' }, { id: 'c', text: 'func myFunc():' }, { id: 'd', text: 'create myFunc():' }], correctAnswers: ['b'], explanation: 'Python uses "def" keyword to define functions.', points: 10 },
    ],
  },
  {
    id: 'q3',
    title: 'HTML & CSS Fundamentals',
    description: 'Basic web development concepts',
    grade: 9,
    topic: 'Web Development',
    duration: 15,
    passingScore: 70,
    questions: [
      { id: 'q3-1', quizId: 'q3', text: 'What does HTML stand for?', type: 'mcq', options: [{ id: 'a', text: 'Hyper Text Markup Language' }, { id: 'b', text: 'High Tech Modern Language' }, { id: 'c', text: 'Hyper Transfer Markup Language' }, { id: 'd', text: 'Home Tool Markup Language' }], correctAnswers: ['a'], explanation: 'HTML = HyperText Markup Language.', points: 10 },
      { id: 'q3-2', quizId: 'q3', text: 'Which tag creates a hyperlink?', type: 'mcq', options: [{ id: 'a', text: '<link>' }, { id: 'b', text: '<a>' }, { id: 'c', text: '<href>' }, { id: 'd', text: '<url>' }], correctAnswers: ['b'], explanation: 'The <a> (anchor) tag creates hyperlinks.', points: 10 },
      { id: 'q3-3', quizId: 'q3', text: 'Which CSS property changes text color?', type: 'mcq', options: [{ id: 'a', text: 'text-color' }, { id: 'b', text: 'font-color' }, { id: 'c', text: 'color' }, { id: 'd', text: 'text-style' }], correctAnswers: ['c'], explanation: 'The "color" property sets text color.', points: 10 },
      { id: 'q3-4', quizId: 'q3', text: 'What is the correct CSS syntax for making all <p> elements bold?', type: 'mcq', options: [{ id: 'a', text: 'p {font-weight: bold;}' }, { id: 'b', text: '<p style="bold">' }, { id: 'c', text: 'p.all {font: bold}' }, { id: 'd', text: 'p.bold {weight: bold}' }], correctAnswers: ['a'], explanation: 'CSS selector with font-weight property.', points: 10 },
      { id: 'q3-5', quizId: 'q3', text: 'Which HTML attribute specifies an alternate text for an image?', type: 'mcq', options: [{ id: 'a', text: 'title' }, { id: 'b', text: 'src' }, { id: 'c', text: 'alt' }, { id: 'd', text: 'href' }], correctAnswers: ['c'], explanation: 'The alt attribute provides alternative text for accessibility.', points: 10 },
    ],
  },
];

export function getQuizById(id: string): Quiz | undefined {
  return mockQuizzes.find(q => q.id === id);
}

export function getAllQuizzes(): Quiz[] {
  return mockQuizzes;
}

export function getQuizzesByGrade(grade: number): Quiz[] {
  return mockQuizzes.filter(q => q.grade === grade);
}

export function submitQuiz(quizId: string, submission: QuizSubmission): QuizResult {
  const quiz = getQuizById(quizId);
  if (!quiz) throw new Error('Quiz not found');

  let correct = 0;
  const questionResults = quiz.questions.map(q => {
    const userAnswers = submission.answers[q.id] || [];
    const isCorrect = JSON.stringify(userAnswers.sort()) === JSON.stringify(q.correctAnswers.sort());
    if (isCorrect) correct++;
    return {
      questionId: q.id,
      isCorrect,
      selectedAnswers: userAnswers,
      correctAnswers: q.correctAnswers,
      explanation: q.explanation,
    };
  });

  const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);
  const earnedPoints = questionResults.filter(r => r.isCorrect).reduce((sum, r) => {
    const q = quiz.questions.find(qq => qq.id === r.questionId);
    return sum + (q?.points || 0);
  }, 0);
  const percentage = Math.round((earnedPoints / totalPoints) * 100);

  return {
    score: earnedPoints,
    totalPoints,
    percentage,
    passed: percentage >= quiz.passingScore,
    correctAnswers: correct,
    totalQuestions: quiz.questions.length,
    questionResults,
    timeTaken: submission.timeTaken,
  };
}

export function getLeaderboard(quizId: string): LeaderboardEntry[] {
  return [
    { userId: 'u1', userName: 'Alex Chen', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex', score: 150, percentage: 100, timeTaken: 420, completedAt: '2024-01-20T14:30:00Z', rank: 1 },
    { userId: 'u2', userName: 'Maya Patel', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maya', score: 145, percentage: 97, timeTaken: 580, completedAt: '2024-01-20T10:15:00Z', rank: 2 },
    { userId: 'u3', userName: 'Jordan Kim', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jordan', score: 140, percentage: 93, timeTaken: 720, completedAt: '2024-01-19T16:30:00Z', rank: 3 },
    { userId: 'u4', userName: 'Sam Wilson', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sam', score: 135, percentage: 90, timeTaken: 650, completedAt: '2024-01-19T14:20:00Z', rank: 4 },
    { userId: 'u5', userName: 'Taylor Swift', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=taylor', score: 130, percentage: 87, timeTaken: 800, completedAt: '2024-01-18T11:45:00Z', rank: 5 },
  ];
}