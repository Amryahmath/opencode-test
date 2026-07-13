import { Link } from 'react-router-dom';
import { Bot, BookOpen, Zap, Users, Award, TrendingUp, ArrowRight, CheckCircle, Play, Sparkles } from 'lucide-react';
import { Button } from '@it-master-ai/ui';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Students Learning', value: '50,000+', icon: Users, color: 'text-primary-600' },
  { label: 'Lessons Completed', value: '500,000+', icon: BookOpen, color: 'text-secondary-600' },
  { label: 'Quizzes Taken', value: '1,000,000+', icon: Award, color: 'text-accent-600' },
  { label: 'AI Questions Answered', value: '10,000,000+', icon: Bot, color: 'text-green-600' },
];

const features = [
  {
    title: 'AI-Powered Tutor',
    description: 'Get instant help with any IT concept. Our AI tutor explains topics in simple terms, provides examples, and guides you through problems step by step.',
    icon: Bot,
    color: 'from-primary-500 to-primary-600',
    bgColor: 'bg-primary-50 dark:bg-primary-900/20',
  },
  {
    title: 'Interactive Lessons',
    description: 'Learn through engaging multimedia content including videos, interactive coding exercises, diagrams, and real-world projects.',
    icon: Play,
    color: 'from-secondary-500 to-secondary-600',
    bgColor: 'bg-secondary-50 dark:bg-secondary-900/20',
  },
  {
    title: 'Smart Practice',
    description: 'Adaptive practice questions that adjust to your skill level. Get immediate feedback and detailed explanations for every answer.',
    icon: Zap,
    color: 'from-accent-500 to-accent-600',
    bgColor: 'bg-accent-50 dark:bg-accent-900/20',
  },
  {
    title: 'Gamified Quizzes',
    description: 'Test your knowledge with timed quizzes, earn badges, climb leaderboards, and track your progress across all grades.',
    icon: Award,
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
  },
  {
    title: 'Progress Tracking',
    description: 'Visual dashboards show your learning journey. Track completed lessons, quiz scores, study streaks, and AI usage.',
    icon: TrendingUp,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
  },
  {
    title: 'Curriculum Aligned',
    description: 'All content follows Grade 6-11 IT curriculum standards. Modules cover programming, databases, networks, cybersecurity, and more.',
    icon: BookOpen,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
  },
];

const grades = [
  { grade: 6, title: 'Foundations', topics: 'Basic Computing, Digital Citizenship, Intro to Coding', color: 'from-green-500 to-emerald-500' },
  { grade: 7, title: 'Building Blocks', topics: 'Algorithms, Scratch Programming, Data Representation', color: 'from-blue-500 to-cyan-500' },
  { grade: 8, title: 'Core Concepts', topics: 'Python Basics, Web Fundamentals, Digital Logic', color: 'from-purple-500 to-violet-500' },
  { grade: 9, title: 'Intermediate', topics: 'JavaScript, Databases, Computer Networks', color: 'from-pink-500 to-rose-500' },
  { grade: 10, title: 'Advanced', topics: 'Data Structures, Cybersecurity, Cloud Basics', color: 'from-orange-500 to-amber-500' },
  { grade: 11, title: 'Specialization', topics: 'AI/ML Intro, Full Stack Dev, Capstone Project', color: 'from-red-500 to-pink-500' },
];

export function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-secondary-50 dark:from-dark-bg dark:via-dark-bg dark:to-dark-card py-20 lg:py-32">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary-500/5 to-secondary-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              <span>New: AI Tutor with Voice & File Support (Beta)</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
              Learn Information Technology{' '}
              <span className="gradient-text">with AI</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Grade 6–11 AI Learning Platform. Master programming, databases, networks, cybersecurity, and more with personalized AI guidance.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto gap-2" variant="gradient">
                  <Play className="h-5 w-5" />
                  Start Learning Free
                </Button>
              </Link>
              <Link to="/ai-tutor">
                <Button size="lg" variant="glass" className="w-full sm:w-auto gap-2">
                  <Bot className="h-5 w-5" />
                  Try AI Tutor
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Curriculum aligned</span>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-white/50 dark:bg-dark-card/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 ${stat.color} bg-opacity-10`}>
                  <stat.icon className="h-7 w-7" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-white dark:bg-dark-bg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything you need to master IT
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Our platform combines cutting-edge AI with proven educational methods to deliver the best learning experience for young IT enthusiasts.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group p-6 rounded-2xl border border-gray-200 dark:border-gray-700 ${feature.bgColor} hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300 hover:shadow-xl`}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Grades Section */}
      <section className="py-20 lg:py-32 bg-gray-50 dark:bg-dark-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Curriculum for every grade level
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              From basic computing to advanced AI concepts, our curriculum grows with you from Grade 6 through Grade 11.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {grades.map((grade, index) => (
              <motion.div
                key={grade.grade}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 rounded-2xl bg-white dark:bg-dark-bg border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-xl transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${grade.color} mb-4`}>
                  <span className="text-white font-bold text-xl">Grade {grade.grade}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{grade.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{grade.topics}</p>
                <Link
                  to={`/courses?grade=${grade.grade}`}
                  className="inline-flex items-center gap-1 text-primary-600 dark:text-primary-400 font-medium text-sm hover:text-primary-700 dark:hover:text-primary-300 group-hover:underline"
                >
                  View courses <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 p-8 lg:p-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to start your IT journey?
            </h2>
            <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students learning Information Technology with AI-powered guidance. Free to start, no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto gap-2 text-lg px-8">
                  <ArrowRight className="h-5 w-5" />
                  Get Started Free
                </Button>
              </Link>
              <Link to="/courses">
                <Button size="lg" variant="ghost" className="w-full sm:w-auto gap-2 text-lg px-8 text-white hover:bg-white/10">
                  Explore Courses
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}