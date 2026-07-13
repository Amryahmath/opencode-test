import { Link } from 'react-router-dom';
import { Bot, Target, Users, Award, Clock, BookOpen, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const missionVision = [
  {
    title: 'Our Mission',
    description: 'To democratize high-quality Information Technology education for Grade 6-11 students worldwide through AI-powered personalized learning.',
    icon: Target,
    color: 'from-primary-500 to-primary-600',
  },
  {
    title: 'Our Vision',
    description: 'A world where every student has access to world-class IT education, regardless of their background, location, or resources.',
    icon: Award,
    color: 'from-secondary-500 to-secondary-600',
  },
];

const whyChooseUs = [
  {
    title: 'AI-Powered Personalization',
    description: 'Our AI tutor adapts to your learning style, pace, and knowledge gaps, providing customized explanations and practice problems.',
    icon: Bot,
  },
  {
    title: 'Curriculum Excellence',
    description: 'Content aligned with international IT education standards for Grades 6-11, covering programming, databases, networks, and cybersecurity.',
    icon: BookOpen,
  },
  {
    title: 'Real-Time Feedback',
    description: 'Instant feedback on code, quizzes, and practice problems with detailed explanations to reinforce learning.',
    icon: TrendingUp,
  },
  {
    title: 'Gamified Progress',
    description: 'Earn badges, maintain streaks, climb leaderboards, and unlock achievements as you master IT concepts.',
    icon: Award,
  },
  {
    title: 'Expert Educators',
    description: 'Content created and reviewed by experienced IT educators and industry professionals.',
    icon: Users,
  },
  {
    title: 'Flexible Learning',
    description: 'Learn at your own pace, anytime, anywhere. Track progress across devices with cloud synchronization.',
    icon: Clock,
  },
];

const timeline = [
  { year: '2020', title: 'Founded', description: 'IT Master AI was founded with a mission to transform IT education for young learners.' },
  { year: '2021', title: 'Platform Launch', description: 'Launched beta platform with Grade 6-8 curriculum and basic AI tutor.' },
  { year: '2022', title: 'AI Tutor 2.0', description: 'Released advanced AI tutor with natural language understanding and code execution.' },
  { year: '2023', title: 'Full Curriculum', description: 'Completed Grade 6-11 curriculum with 500+ lessons and 10,000+ practice questions.' },
  { year: '2024', title: 'Global Expansion', description: 'Expanded to 50+ countries, serving 50,000+ students worldwide.' },
  { year: '2025', title: 'Next Generation', description: 'Launching multimodal AI tutor with voice, vision, and advanced reasoning capabilities.' },
];

const teachers = [
  { name: 'Dr. Sarah Chen', role: 'Computer Science PhD', specialty: 'Algorithms & Data Structures', experience: '15+ years', avatar: 'SC' },
  { name: 'Prof. Michael Torres', role: 'Cybersecurity Expert', specialty: 'Network Security & Ethics', experience: '12+ years', avatar: 'MT' },
  { name: 'Dr. Emily Watson', role: 'AI/ML Researcher', specialty: 'Machine Learning & AI Ethics', experience: '10+ years', avatar: 'EW' },
  { name: 'Prof. David Kim', role: 'Full Stack Developer', specialty: 'Web Development & Cloud', experience: '18+ years', avatar: 'DK' },
];

export function AboutPage() {
  return (
    <div className="min-h-screen py-12 lg:py-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-secondary-50 dark:from-dark-bg dark:via-dark-bg dark:to-dark-card py-20 lg:py-32">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
              <Bot className="h-4 w-4" />
              <span>About IT Master AI</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
              Empowering the next generation of{' '}
              <span className="gradient-text">tech innovators</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              We believe every student deserves access to world-class IT education. Our AI-powered platform makes learning engaging, personalized, and effective for Grade 6-11 students worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-32 bg-white dark:bg-dark-bg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {missionVision.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="p-8 rounded-2xl bg-gradient-to-br"
                style={{ background: item.color }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-6">
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{item.title}</h2>
                <p className="text-white/90 text-lg leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
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
              Why choose IT Master AI?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              We combine cutting-edge AI technology with proven educational methodologies to create the best learning experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 rounded-2xl bg-white dark:bg-dark-bg border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
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
              Our journey so far
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              From a small idea to a global platform serving thousands of students.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-secondary-500" />
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-20"
                >
                  <div className="absolute left-4 top-2 w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 border-4 border-white dark:border-dark-bg flex items-center justify-center z-10">
                    <span className="text-white text-xs font-bold">{item.year}</span>
                  </div>
                  <div className="bg-white dark:bg-dark-card p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Teachers */}
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
              Learn from industry experts
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Our curriculum is designed and reviewed by experienced educators and industry professionals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teachers.map((teacher, index) => (
              <motion.div
                key={teacher.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 rounded-2xl bg-white dark:bg-dark-bg border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  {teacher.avatar}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{teacher.name}</h3>
                <p className="text-primary-600 dark:text-primary-400 text-sm font-medium mb-1">{teacher.role}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{teacher.specialty}</p>
                <p className="text-gray-500 dark:text-gray-500 text-xs">{teacher.experience} experience</p>
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
              Join our learning community today
            </h2>
            <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
              Start your IT journey with AI-powered personalized learning. Free to begin, no credit card required.
            </p>
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
          </motion.div>
        </div>
      </section>
    </div>
  );
}