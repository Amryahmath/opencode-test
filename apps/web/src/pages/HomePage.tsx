import { Link } from 'react-router-dom';
import { Bot, BookOpen, Zap, Users, Award, TrendingUp, ArrowRight, CheckCircle, Play, Sparkles, Shield, Shield as ShieldIcon, Zap as ZapIcon, Layers, Lock, Brain, Code, Database, Globe, Lock as LockIcon } from 'lucide-react';
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
  { grade: 6, title: 'Foundations', topics: 'Basic Computing, Digital Citizenship, Intro to Coding', color: 'from-green-500 to-emerald-500', icon: GraduationCap },
  { grade: 7, title: 'Programming Basics', topics: 'Variables, Loops, Conditionals, Scratch/Python', color: 'from-blue-500 to-cyan-500', icon: Code },
  { grade: 8, title: 'Data & Logic', topics: 'Data Structures, Algorithms, Binary, Logic Gates', color: 'from-purple-500 to-violet-500', icon: Database },
  { grade: 9, title: 'Web Development', topics: 'HTML/CSS/JS, Responsive Design, Intro to Frameworks', color: 'from-pink-500 to-rose-500', icon: Globe },
  { grade: 10, title: 'Advanced Programming', topics: 'OOP, Databases, APIs, Version Control, Testing', color: 'from-orange-500 to-amber-500', icon: Layers },
  { grade: 11, title: 'Specialization Tracks', topics: 'Cybersecurity, AI/ML, Cloud Basics, Capstone Project', color: 'from-red-500 to-pink-500', icon: Lock },
];

const testimonials = [
  { name: 'Alex Chen', grade: 'Grade 9', school: 'Lincoln High', quote: 'The AI tutor explains concepts in a way that actually makes sense. I went from struggling with loops to building my first web app in just two months!', avatar: 'AC' },
  { name: 'Maya Patel', grade: 'Grade 10', school: 'Riverside Academy', quote: 'The practice problems are perfectly calibrated - challenging but not frustrating. The instant feedback helps me learn from my mistakes immediately.', avatar: 'MP' },
  { name: 'Jordan Kim', grade: 'Grade 11', school: 'Tech Magnet School', quote: 'The cybersecurity module blew my mind. Now I\'m considering it as a career path. The capstone project was the highlight of my year.', avatar: 'JK' },
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
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" />
                <span>New: AI Tutor with Voice & File Support (Beta)</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                Learn Information Technology{' '}
                <span className="gradient-text">with AI</span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
                Grade 6–11 AI Learning Platform. Master programming, databases, networks, cybersecurity, and more with personalized AI guidance.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-semibold text-lg hover:from-primary-700 hover:to-secondary-700 transition-all shadow-lg shadow-primary-500/25"
                  >
                    <Play className="h-5 w-5" />
                    Start Learning Free
                  </motion.button>
                </Link>
                <Link to="/ai-tutor">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-semibold text-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Bot className="h-5 w-5" />
                    Try AI Tutor
                  </motion.button>
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1.5">
                  <Shield className="h-5 w-5" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="h-5 w-5" />
                  <span>Cancel anytime</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="h-5 w-5" />
                  <span>Certificates on completion</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-2xl p-4">
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 min-h-[400px]">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="flex-1 text-center text-sm text-gray-500 dark:text-gray-400 font-mono">
                      ai-tutor.itmasterai.com
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-primary-50 dark:bg-primary-900/30 rounded-xl">
                      <Bot className="h-6 w-6 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">AI Tutor</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">How do I create a loop in Python?</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-secondary-50 dark:bg-secondary-900/30 rounded-xl">
                      <Code className="h-6 w-6 text-secondary-600 dark:text-secondary-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Code Assistant</p>
                        <pre className="text-sm text-gray-600 dark:text-gray-400 mt-1 font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded"><code>for i in range(5):\n  print(f"Hello {i}")</code></pre>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-accent-50 dark:bg-accent-900/30 rounded-xl">
                      <CheckCircle className="h-6 w-6 text-accent-600 dark:text-accent-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Practice Complete</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Loops & Iteration - 95% score! 🎉</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl opacity-20 blur-xl" />
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-2xl opacity-20 blur-xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white dark:bg-dark-bg border-y border-gray-200 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="h-10 w-10 mx-auto mb-3" style={{ color: stat.color }} />
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 lg:py-32 bg-gray-50 dark:bg-dark-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything you need to master IT
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Our platform combines cutting-edge AI with comprehensive curriculum to give you the best learning experience.
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
                className="group p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-xl transition-all duration-300"
                style={{ background: feature.bgColor }}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 group-hover:scale-110 transition-transform`} style={{ background: feature.color }}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Grades */}
      <section className="py-20 lg:py-32 bg-white dark:bg-dark-bg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Curriculum for every grade level
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              From basic computing to advanced specialization - our curriculum grows with you.
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
                className="group p-6 rounded-2xl bg-gradient-to-br border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-xl transition-all duration-300"
                style={{ background: grade.color.replace('from-', 'from-').replace('to-', 'to-').replace('-500', '-500/10').replace('-600', '-600/10') }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center`} style={{ background: grade.color.replace('-500', '-500/10').replace('-600', '-600/10') }}>
                    <grade.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Grade {grade.grade}</h3>
                    <p className="text-white/80 text-sm">{grade.title}</p>
                  </div>
                </div>
                <p className="text-white/90 text-sm mb-4">{grade.topics}</p>
                <Link
                  to={`/courses?grade=${grade.grade}`}
                  className="inline-flex items-center gap-2 text-white/90 hover:text-white font-medium text-sm group-hover:gap-3 transition-all"
                >
                  View Curriculum
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-32 bg-gray-50 dark:bg-dark-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by students worldwide
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              See what our learners have to say about their experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-white dark:bg-dark-bg border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-medium">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.grade} • {testimonial.school}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">"{testimonial.quote}"</p>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Award key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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
              Join thousands of students mastering Information Technology with AI-powered personalized learning. Free to begin, no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
                >
                  Get Started Free
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </Link>
              <Link to="/courses">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-semibold text-lg hover:bg-white/20 transition-colors"
                >
                  Explore Courses
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}