import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle, XCircle, ChevronLeft, ChevronRight, Trophy, Star, AlertCircle, Loader2, ArrowRight, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, ProgressBar, Card, Badge } from '@it-master-ai/ui';

const mockQuizzes = [
  { id: 'js-basics', title: 'JavaScript Fundamentals', grade: 9, topic: 'Web Development', questions: 15, duration: 20, passingScore: 70, difficulty: 'Intermediate' },
  { id: 'python-basics', title: 'Python Basics', grade: 7, topic: 'Programming', questions: 10, duration: 15, passingScore: 60, difficulty: 'Beginner' },
  { id: 'html-css', title: 'HTML & CSS Fundamentals', grade: 9, topic: 'Web Development', questions: 12, duration: 15, passingScore: 70, difficulty: 'Beginner' },
  { id: 'databases', title: 'SQL & Databases', grade: 10, topic: 'Data Management', questions: 20, duration: 25, passingScore: 75, difficulty: 'Advanced' },
  { id: 'algorithms', title: 'Algorithms & Data Structures', grade: 8, topic: 'Computer Science', questions: 15, duration: 20, passingScore: 65, difficulty: 'Intermediate' },
  { id: 'security', title: 'Cybersecurity Basics', grade: 11, topic: 'Security', questions: 18, duration: 25, passingScore: 80, difficulty: 'Advanced' },
];

const mockQuestions = {
  'js-basics': [
    { id: 1, text: 'What is the correct way to declare a variable in JavaScript?', type: 'mcq', options: ['var x = 5;', 'variable x = 5;', 'x := 5;', 'declare x = 5;'], correct: [0], explanation: 'JavaScript uses var, let, or const to declare variables.' },
    { id: 2, text: 'Which method adds an element to the end of an array?', type: 'mcq', options: ['push()', 'pop()', 'shift()', 'unshift()'], correct: [0], explanation: 'push() adds elements to the end of an array.' },
    { id: 3, text: 'What does "===" mean in JavaScript?', type: 'mcq', options: ['Assignment', 'Loose equality', 'Strict equality', 'Not equal'], correct: [2], explanation: '=== checks both value and type equality.' },
    { id: 4, text: 'How do you write a comment in JavaScript?', type: 'mcq', options: ['<!-- comment -->', '// comment', '# comment', '/* comment */'], correct: [1, 3], explanation: 'Both // for single-line and /* */ for multi-line comments are valid.' },
    { id: 5, text: 'What is the result of 2 + "2" in JavaScript?', type: 'mcq', options: ['4', '"22"', 'NaN', 'Error'], correct: [1], explanation: 'JavaScript coerces the number to string, resulting in string concatenation.' },
  ]
};

export function QuizPage() {
  const [view, setView] = useState<'list' | 'quiz' | 'results'>('list');
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number[]>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState<any>(null);

  const questions = selectedQuiz ? mockQuestions[selectedQuiz as keyof typeof mockQuestions] || [] : [];
  const quiz = selectedQuiz ? mockQuizzes.find(q => q.id === selectedQuiz) : null;

  useEffect(() => {
    if (view === 'quiz' && quiz) {
      setTimeLeft(quiz.duration * 60);
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [view, quiz]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (questionId: number, optionIndex: number) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;
    
    setAnswers(prev => {
      const current = prev[questionId] || [];
      if (question.type === 'mcq' && question.correct.length === 1) {
        return { ...prev, [questionId]: [optionIndex] };
      }
      const newAnswers = current.includes(optionIndex) 
        ? current.filter(i => i !== optionIndex)
        : [...current, optionIndex];
      return { ...prev, [questionId]: newAnswers };
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    
    const quizQuestions = questions;
    let correct = 0;
    const questionResults = quizQuestions.map(q => {
      const userAnswers = answers[q.id] || [];
      const isCorrect = JSON.stringify(userAnswers.sort()) === JSON.stringify(q.correct.sort());
      if (isCorrect) correct++;
      return { questionId: q.id, isCorrect, userAnswers, correctAnswers: q.correct, explanation: q.explanation };
    });
    
    const percentage = Math.round((correct / quizQuestions.length) * 100);
    const passed = percentage >= (quiz?.passingScore || 70);
    
    setResults({
      score: correct,
      total: quizQuestions.length,
      percentage,
      passed,
      timeTaken: (quiz?.duration || 0) * 60 - timeLeft,
      questionResults
    });
    setView('results');
    setIsSubmitting(false);
  };

  const handleRetry = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setResults(null);
    setView('quiz');
  };

  if (view === 'list') {
    return (
      <div className="min-h-screen py-12 lg:py-20">
        <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-secondary-50 dark:from-dark-bg dark:via-dark-bg dark:to-dark-card py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Test Your Knowledge
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose a quiz to test your understanding. Timed quizzes with instant feedback and detailed explanations.
            </motion.p>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-white dark:bg-dark-bg">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockQuizzes.map((quiz, index) => (
                <motion.div key={quiz.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="group">
                  <Card className="h-full hover:shadow-xl hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300 cursor-pointer" onClick={() => { setSelectedQuiz(quiz.id); setView('quiz'); }}>
                    <Card.Header>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{quiz.difficulty}</Badge>
                        <Badge variant="secondary">Grade {quiz.grade}</Badge>
                      </div>
                      <Card.Title className="mt-2 text-lg">{quiz.title}</Card.Title>
                      <Card.Description>{quiz.topic} • {quiz.questions} questions • {quiz.duration} min</Card.Description>
                    </Card.Header>
                    <Card.Content className="space-y-2 pt-4">
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {quiz.duration} min</span>
                        <span className="flex items-center gap-1"><Trophy className="h-4 w-4" /> {quiz.passingScore}% to pass</span>
                      </div>
                    </Card.Content>
                    <Card.Footer className="pt-0">
                      <Button variant="gradient" className="w-full" onClick={(e) => { e.stopPropagation(); setSelectedQuiz(quiz.id); setView('quiz'); }}>
                        Start Quiz <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Card.Footer>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (view === 'quiz' && quiz && questions.length > 0) {
    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    const userAnswer = answers[question.id];

    return (
      <div className="min-h-screen fixed inset-0 z-50 bg-white dark:bg-dark-bg">
        <div className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
          <div className="mx-auto max-w-3xl px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Link to="/quiz" onClick={() => setView('list')} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                  <ChevronLeft className="h-5 w-5" />
                </Link>
                <span className="font-semibold text-gray-900 dark:text-white">{quiz.title}</span>
                <Badge variant="outline" className="ml-2">{currentQuestion + 1}/{questions.length}</Badge>
              </div>
              <motion.div
                key={timeLeft}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className={`flex items-center gap-2 px-3 py-1 rounded-lg font-mono font-semibold ${timeLeft < 60 ? 'text-red-600 bg-red-50 dark:bg-red-900/30 animate-pulse' : 'text-primary-600 bg-primary-50 dark:bg-primary-900/30'}`}
              >
                <Clock className="h-5 w-5" />
                {formatTime(timeLeft)}
              </motion.div>
            </div>
            <ProgressBar value={progress} className="h-2" />
          </div>
        </div>

        <main className="pt-20 pb-16 px-4">
          <div className="mx-auto max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={question.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Question {currentQuestion + 1} of {questions.length} • {question.points} points
                </div>
                
                <Card>
                  <Card.Content className="pt-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{question.text}</h3>
                    
                    <div className="space-y-3">
                      {question.options.map((option, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => handleAnswer(question.id, index)}
                          className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                            userAnswer?.includes(index)
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                              : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                              userAnswer?.includes(index)
                                ? 'border-primary-500 bg-primary-500 text-white'
                                : 'border-gray-300 dark:border-gray-600'
                            }`}>
                              {userAnswer?.includes(index) && <CheckCircle className="h-4 w-4" />}
                            </div>
                            <span className="text-gray-900 dark:text-white">{option}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </Card.Content>
                </Card>

                <div className="flex items-center justify-between">
                  <Button 
                    variant="outline" 
                    size="lg"
                    disabled={currentQuestion === 0}
                    onClick={() => setCurrentQuestion(prev => prev - 1)}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    {questions.map((_, i) => (
                      <motion.button
                        key={i}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                          i === currentQuestion
                            ? 'bg-primary-600 text-white'
                            : answers[questions[i].id]
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                        }`}
                        onClick={() => setCurrentQuestion(i)}
                      >
                        {i + 1}
                      </motion.button>
                    ))}
                  </div>

                  {currentQuestion === questions.length - 1 ? (
                    <Button 
                      variant="gradient" 
                      size="lg"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Quiz
                          <CheckCircle className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button 
                      variant="primary" 
                      size="lg"
                      onClick={() => setCurrentQuestion(prev => prev + 1)}
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    );
  }

  if (view === 'results' && results) {
    return (
      <div className="min-h-screen py-12 lg:py-20">
        <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-secondary-50 dark:from-dark-bg dark:via-dark-bg dark:to-dark-card py-12 lg:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`rounded-3xl p-8 lg:p-12 ${results.passed ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'}`}
            >
              <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${results.passed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                {results.passed ? <Trophy className="h-10 w-10 text-green-600 dark:text-green-400" /> : <AlertCircle className="h-10 w-10 text-red-600 dark:text-red-400" />}
              </div>
              <h2 className={`text-3xl font-bold mb-2 ${results.passed ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                {results.passed ? 'Congratulations!' : 'Keep Practicing!'}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                You scored <span className="font-bold text-2xl">{results.percentage}%</span> ({results.score}/{results.total} correct)
              </p>
              <div className="flex justify-center gap-8 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{results.score}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Correct</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{results.total - results.score}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Incorrect</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{formatTime(results.timeTaken)}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Time</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="gradient" size="lg" onClick={handleRetry}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
                <Button variant="outline" size="lg" onClick={() => { setView('list'); setSelectedQuiz(null); }}>
                  Back to Quizzes
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-white dark:bg-dark-bg">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Question Review</h3>
            <div className="space-y-4">
              {results.questionResults.map((qr: any, index: number) => {
                const question = questions[index];
                return (
                  <Card key={qr.questionId} className={`${qr.isCorrect ? 'border-green-200 dark:border-green-800' : 'border-red-200 dark:border-red-800'}`}>
                    <Card.Content className="pt-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Question {index + 1}</span>
                        <Badge variant={qr.isCorrect ? 'success' : 'danger'}>
                          {qr.isCorrect ? <CheckCircle className="h-3 w-3 mr-1" /> Correct : <XCircle className="h-3 w-3 mr-1" /> Incorrect}
                        </Badge>
                      </div>
                      <p className="text-gray-900 dark:text-white mb-4">{question.text}</p>
                      <div className="space-y-2">
                        {question.options.map((opt, i) => (
                          <div key={i} className={`p-3 rounded-lg text-sm ${
                            qr.correctAnswers.includes(i) ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800' :
                            qr.userAnswers.includes(i) ? 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800' :
                            'bg-gray-50 dark:bg-gray-800'
                          } flex items-center gap-3`}>
                            {qr.correctAnswers.includes(i) && <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />}
                            {qr.userAnswers.includes(i) && !qr.correctAnswers.includes(i) && <XCircle className="h-4 w-4 text-red-600 dark:text-red-400 flex-shrink-0" />}
                            <span className="flex-1">{opt}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 p-3 bg-primary-50 dark:bg-primary-900/30 rounded-lg border border-primary-200 dark:border-primary-800">
                        <p className="text-sm text-primary-700 dark:text-primary-300"><strong>Explanation:</strong> {question.explanation}</p>
                      </div>
                    </Card.Content>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return null;
}