import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Target, Filter, X, ChevronDown, Clock, Star, Trophy, Brain, Code, Database, Globe, Lock, Shield, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button, Badge, Select, Input, Card } from '@it-master-ai/ui';

const practiceTopics = [
  { id: 'variables', title: 'Variables & Data Types', grade: 7, difficulty: 'Beginner', questions: 25, icon: Brain, color: 'from-blue-500 to-blue-600', completed: 18 },
  { id: 'loops', title: 'Loops & Iteration', grade: 7, difficulty: 'Beginner', questions: 30, icon: Code, color: 'from-green-500 to-green-600', completed: 25 },
  { id: 'functions', title: 'Functions & Scope', grade: 8, difficulty: 'Beginner', questions: 20, icon: Code, color: 'from-purple-500 to-purple-600', completed: 12 },
  { id: 'arrays', title: 'Arrays & Lists', grade: 8, difficulty: 'Intermediate', questions: 25, icon: Database, color: 'from-pink-500 to-pink-600', completed: 8 },
  { id: 'objects', title: 'Objects & Dictionaries', grade: 8, difficulty: 'Intermediate', questions: 20, icon: Layers, color: 'from-orange-500 to-orange-600', completed: 5 },
  { id: 'html', title: 'HTML Fundamentals', grade: 9, difficulty: 'Beginner', questions: 30, icon: Globe, color: 'from-blue-500 to-cyan-500', completed: 30 },
  { id: 'css', title: 'CSS Layout & Styling', grade: 9, difficulty: 'Intermediate', questions: 25, icon: Globe, color: 'from-cyan-500 to-teal-500', completed: 15 },
  { id: 'js', title: 'JavaScript Basics', grade: 9, difficulty: 'Intermediate', questions: 35, icon: Code, color: 'from-yellow-500 to-orange-500', completed: 10 },
  { id: 'sql', title: 'SQL & Databases', grade: 10, difficulty: 'Advanced', questions: 20, icon: Database, color: 'from-blue-500 to-indigo-500', completed: 3 },
  { id: 'api', title: 'REST APIs', grade: 10, difficulty: 'Advanced', questions: 25, icon: Globe, color: 'from-purple-500 to-violet-500', completed: 0 },
  { id: 'security', title: 'Cybersecurity Basics', grade: 11, difficulty: 'Advanced', questions: 30, icon: Shield, color: 'from-red-500 to-rose-500', completed: 0 },
  { id: 'ai', title: 'AI/ML Fundamentals', grade: 11, difficulty: 'Advanced', questions: 20, icon: Brain, color: 'from-pink-500 to-purple-500', completed: 0 },
];

const grades = [6, 7, 8, 9, 10, 11];
const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

export function PracticePage() {
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTopics = practiceTopics.filter(topic => {
    const matchesGrade = selectedGrade === 'all' || topic.grade === parseInt(selectedGrade);
    const matchesDifficulty = selectedDifficulty === 'all' || topic.difficulty === selectedDifficulty;
    const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGrade && matchesDifficulty && matchesSearch;
  });

  return (
    <div className="min-h-screen py-12 lg:py-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-secondary-50 dark:from-dark-bg dark:via-dark-bg dark:to-dark-card py-12 lg:py-16">
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
              Practice{' '}
              <span className="gradient-text">IT Skills</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Master concepts with adaptive practice questions. Get instant feedback and track your progress.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white dark:bg-dark-bg border-y border-gray-200 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <Input
                placeholder="Search topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 min-w-[200px]"
                leftIcon={<Filter className="h-4 w-4" />}
              />
              <Select value={selectedGrade} onValueChange={setSelectedGrade} className="w-full md:w-36">
                <Select.Trigger><Select.Value placeholder="All Grades" /></Select.Trigger>
                <Select.Content>
                  <Select.Item value="all">All Grades</Select.Item>
                  {grades.map(g => <Select.Item key={g} value={String(g)}>Grade {g}</Select.Item>)}
                </Select.Content>
              </Select>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty} className="w-full md:w-40">
                <Select.Trigger><Select.Value placeholder="All Levels" /></Select.Trigger>
                <Select.Content>
                  <Select.Item value="all">All Levels</Select.Item>
                  {difficulties.map(d => <Select.Item key={d} value={d}>{d}</Select.Item>)}
                </Select.Content>
              </Select>
            </div>
            {(selectedGrade !== 'all' || selectedDifficulty !== 'all' || searchQuery) && (
              <Button variant="ghost" size="sm" onClick={() => { setSelectedGrade('all'); setSelectedDifficulty('all'); setSearchQuery(''); }}>
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Topic Cards */}
      <section className="py-12 lg:py-16 bg-gray-50 dark:bg-dark-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTopics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group"
              >
                <Card className="h-full hover:shadow-xl hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300">
                  <Card.Header className="pb-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center`} style={{ background: topic.color.replace('-500', '-500/10').replace('-600', '-600/10') }}>
                        <topic.icon className="h-6 w-6" style={{ color: topic.color.split(' ')[0].replace('from-', '') }} />
                      </div>
                      <Badge variant="outline" className="text-xs self-center">{topic.difficulty}</Badge>
                    </div>
                    <Card.Title className="text-lg font-bold text-gray-900 dark:text-white mt-2">{topic.title}</Card.Title>
                    <Card.Description className="text-sm">Grade {topic.grade} • {topic.questions} questions</Card.Description>
                  </Card.Header>
                  <Card.Content className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Progress</span>
                        <span className="font-medium text-gray-900 dark:text-white">{topic.completed}/{topic.questions}</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-500" style={{ width: `${Math.round((topic.completed / topic.questions) * 100)}%` }} />
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-700">
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> ~{Math.ceil(topic.questions * 1.5)} min</span>
                      <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" /> {Math.round((topic.completed / topic.questions) * 100)}% accuracy</span>
                    </div>
                  </Card.Content>
                  <Card.Footer className="pt-0">
                    <Link to={`/practice/${topic.id}`} className="w-full">
                      <Button variant={topic.completed > 0 ? 'gradient' : 'outline'} className="w-full">
                        {topic.completed > 0 ? 'Continue Practicing' : 'Start Practice'}
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </Link>
                  </Card.Footer>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredTopics.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 col-span-full">
              <Filter className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No topics found</h3>
              <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters or search terms.</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}