import { Link } from 'react-router-dom';
import { BookOpen, Play, Clock, TrendingUp, CheckCircle, ArrowRight, Filter, X, ChevronDown, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button, Badge, Select, Input, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@it-master-ai/ui';

const grades = [
  { level: 6, title: 'Foundations', modules: 8, lessons: 45, hours: 30, difficulty: 'Beginner', color: 'from-green-500 to-green-600', icon: BookOpen, topics: ['Basic Computing', 'Digital Citizenship', 'Intro to Coding (Scratch)', 'Internet Safety', 'Computer Parts', 'File Management', 'Typing Skills', 'Creative Projects'] },
  { level: 7, title: 'Programming Basics', modules: 10, lessons: 55, hours: 40, difficulty: 'Beginner', color: 'from-blue-500 to-blue-600', icon: Play, topics: ['Variables & Data Types', 'Control Flow (If/Else)', 'Loops (For/While)', 'Functions', 'Lists & Dictionaries', 'Basic Algorithms', 'Debugging', 'Project: Calculator', 'Project: Guessing Game', 'Project: Quiz App'] },
  { level: 8, title: 'Data & Logic', modules: 10, lessons: 60, hours: 45, difficulty: 'Intermediate', color: 'from-purple-500 to-purple-600', icon: Zap, topics: ['Data Structures', 'Search & Sort Algorithms', 'Binary & Hexadecimal', 'Logic Gates', 'Boolean Algebra', 'Introduction to Python', 'File I/O', 'Error Handling', 'Project: Text Analyzer', 'Project: Data Visualizer'] },
  { level: 9, title: 'Web Development', modules: 12, lessons: 70, hours: 55, difficulty: 'Intermediate', color: 'from-pink-500 to-pink-600', icon: Play, topics: ['HTML5 Semantic Elements', 'CSS3 & Flexbox/Grid', 'Responsive Design', 'JavaScript Basics', 'DOM Manipulation', 'Events & Forms', 'ES6+ Features', 'Fetch API', 'Project: Portfolio Site', 'Project: Weather App', 'Project: Todo App', 'Deploying to Netlify'] },
  { level: 10, title: 'Advanced Programming', modules: 12, lessons: 75, hours: 60, difficulty: 'Advanced', color: 'from-orange-500 to-orange-600', icon: TrendingUp, topics: ['Object-Oriented Programming', 'Databases & SQL', 'REST APIs', 'Authentication', 'Git & GitHub', 'Testing (Unit/E2E)', 'CI/CD Basics', 'Docker Intro', 'Project: Blog API', 'Project: E-commerce Backend', 'Project: Real-time Chat', 'Project: Full Stack App'] },
  { level: 11, title: 'Specialization Tracks', modules: 14, lessons: 85, hours: 70, difficulty: 'Advanced', color: 'from-red-500 to-red-600', icon: Award, topics: ['Cybersecurity Fundamentals', 'Network Security', 'Ethical Hacking Basics', 'AI/ML Introduction', 'Neural Networks', 'Cloud Computing (AWS/Azure)', 'DevOps Basics', 'Capstone Project', 'Portfolio Building', 'Industry Certifications Prep'] },
];

const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

export function CoursesPage() {
  const [selectedGrade, setSelectedGrade] = React.useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<string>('all');
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredGrades = grades.filter(grade => {
    const matchesGrade = !selectedGrade || selectedGrade === String(grade.level);
    const matchesDifficulty = selectedDifficulty === 'all' || grade.difficulty === selectedDifficulty;
    const matchesSearch = grade.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          grade.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesGrade && matchesDifficulty && matchesSearch;
  });

  return (
    <div className="min-h-screen py-12 lg:py-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-secondary-50 dark:from-dark-bg dark:via-dark-bg dark:to-dark-card py-16 lg:py-24">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Courses for every{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                grade level
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose your grade to explore the complete curriculum with modules, lessons, and hands-on projects.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white dark:bg-dark-bg border-y border-gray-200 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <Input
                placeholder="Search courses, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64"
                leftIcon={<Filter className="h-4 w-4" />}
              />
              <Select
                value={selectedDifficulty}
                onValueChange={setSelectedDifficulty}
                className="w-full md:w-40"
                placeholder="All Levels"
              >
                <Select.Trigger>
                  <Select.Value placeholder="All Levels" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="all">All Levels</Select.Item>
                  {difficulties.map(d => <Select.Item key={d} value={d.toLowerCase()}>{d}</Select.Item>)}
                </Select.Content>
              </Select>
            </div>
            {(selectedGrade || selectedDifficulty !== 'all') && (
              <Button variant="ghost" size="sm" onClick={() => { setSelectedGrade(null); setSelectedDifficulty('all'); setSearchQuery(''); }}>
                <X className="h-4 w-4 mr-1" />
                Clear filters
              </Button>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {grades.map(grade => (
              <button
                key={grade.level}
                onClick={() => setSelectedGrade(selectedGrade === String(grade.level) ? null : String(grade.level))}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedGrade === String(grade.level)
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                Grade {grade.level}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grade Cards */}
      <section className="py-12 lg:py-16 bg-gray-50 dark:bg-dark-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGrades.map((grade, index) => (
              <motion.div
                key={grade.level}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Card className="h-full hover:shadow-xl hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300">
                  <Card.Content className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center`} style={{ background: grade.color.replace('-500', '-500/10').replace('-600', '-600/10') }}>
                        <grade.icon className="h-7 w-7" style={{ color: grade.color.split(' ')[0].replace('from-', '') }} />
                      </div>
                      <Badge variant="outline" className="text-xs self-center">{grade.difficulty}</Badge>
                    </div>
                    <Card.Title className="text-xl font-bold text-gray-900 dark:text-white mb-1">Grade {grade.level}</Card.Title>
                    <Card.Description className="text-sm mb-4">{grade.title}</Card.Description>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{grade.topics.slice(0, 4).join(', ')}...</p>

                    <div className="grid grid-cols-3 gap-4 mb-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{grade.modules}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Modules</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{grade.lessons}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Lessons</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{grade.hours}h</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Est. Hours</div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Progress</span>
                        <span className="font-medium text-gray-900 dark:text-white">0%</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-500" style={{ width: '0%' }} />
                      </div>
                    </div>

                    <Link to={`/courses/${grade.level}`} className="block w-full text-center">
                      <Button variant="gradient" className="w-full">
                        Start Learning
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </Link>
                  </Card.Content>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredGrades.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <Filter className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No courses found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters or search terms.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 p-8 lg:p-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Not sure where to start?
            </h2>
            <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
              Take our quick assessment to find the perfect starting point for your IT learning journey.
            </p>
            <Link to="/register">
              <Button size="lg" variant="secondary" className="gap-2 text-lg px-8">
                Take Assessment
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}