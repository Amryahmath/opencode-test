import { Link } from 'react-router-dom';
import { BookOpen, Award, Bot, TrendingUp, Calendar, Clock, CheckCircle, Star, ArrowRight, Target, Flame, Trophy, Medal, Zap, Brain, ChevronRight, ChevronLeft, LayoutDashboard, Flame as FlameIcon, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, ProgressCircle, Badge, ProgressBar, Avatar } from '@it-master-ai/ui';
import { useAuth } from '../../context/AuthContext';
import React, { useState } from 'react';

const mockStats = {
  completedLessons: 47,
  totalLessons: 120,
  currentGrade: 9,
  averageQuizScore: 87,
  aiQuestionsAsked: 234,
  studyStreak: 12,
};

const mockActivity = [
  { id: '1', type: 'lesson', title: 'Completed: JavaScript Functions', description: 'Grade 9 • Web Development', timestamp: '2 hours ago', icon: BookOpen, color: 'text-blue-500' },
  { id: '2', type: 'quiz', title: 'Quiz: HTML & CSS Basics', description: 'Score: 92% • 12/13 correct', timestamp: '5 hours ago', icon: Award, color: 'text-green-500' },
  { id: '3', type: 'chat', title: 'AI Chat: Python Loops', description: 'Asked 3 questions about for loops', timestamp: '1 day ago', icon: Bot, color: 'text-purple-500' },
  { id: '4', type: 'lesson', title: 'Completed: CSS Grid Layout', description: 'Grade 9 • Web Development', timestamp: '2 days ago', icon: BookOpen, color: 'text-blue-500' },
  { id: '5', type: 'quiz', title: 'Quiz: Variables & Data Types', description: 'Score: 85% • 17/20 correct', timestamp: '3 days ago', icon: Award, color: 'text-green-500' },
  { id: '6', type: 'chat', title: 'AI Chat: Database Normalization', description: 'Asked 2 questions about 3NF', timestamp: '4 days ago', icon: Bot, color: 'text-purple-500' },
];

const mockAchievements = [
  { id: '1', title: 'First Steps', description: 'Complete your first lesson', icon: Target, progress: 1, maxProgress: 1, unlockedAt: '2024-01-15', color: 'from-green-500 to-emerald-500' },
  { id: '2', title: 'Quiz Master', description: 'Score 90%+ on 5 quizzes', icon: Trophy, progress: 3, maxProgress: 5, color: 'from-yellow-500 to-orange-500' },
  { id: '3', title: 'Streak Keeper', description: 'Maintain a 7-day study streak', icon: Flame, unlockedAt: '2024-01-22', progress: 12, maxProgress: 7, color: 'from-orange-500 to-red-500' },
  { id: '4', title: 'AI Explorer', description: 'Ask 50 questions to AI Tutor', icon: Bot, unlockedAt: '2024-02-05', progress: 234, maxProgress: 50, color: 'from-purple-500 to-pink-500' },
  { id: '5', title: 'Grade 9 Graduate', description: 'Complete all Grade 9 modules', icon: Medal, progress: 47, maxProgress: 55, color: 'from-blue-500 to-cyan-500' },
  { id: '6', title: 'Perfect Score', description: 'Get 100% on any quiz', icon: Star, progress: 0, maxProgress: 1, color: 'from-yellow-500 to-amber-500' },
];

const mockCalendarEvents = [
  { id: '1', title: 'JavaScript Quiz', type: 'quiz', date: '2024-02-15', grade: 9 },
  { id: '2', title: 'CSS Grid Lesson', type: 'lesson', date: '2024-02-16', grade: 9 },
  { id: '3', title: 'Python Project Due', type: 'assignment', date: '2024-02-18', grade: 8 },
  { id: '4', title: 'HTML & CSS Quiz', type: 'quiz', date: '2024-02-20', grade: 9 },
  { id: '5', title: 'Database Design Lesson', type: 'lesson', date: '2024-02-22', grade: 10 },
];

const progressData = [
  { date: '2024-02-09', lessonsCompleted: 2, quizzesTaken: 1, aiQuestions: 5, studyTime: 45 },
  { date: '2024-02-10', lessonsCompleted: 3, quizzesTaken: 0, aiQuestions: 8, studyTime: 60 },
  { date: '2024-02-11', lessonsCompleted: 1, quizzesTaken: 2, aiQuestions: 3, studyTime: 40 },
  { date: '2024-02-12', lessonsCompleted: 4, quizzesTaken: 1, aiQuestions: 12, studyTime: 90 },
  { date: '2024-02-13', lessonsCompleted: 2, quizzesTaken: 0, aiQuestions: 6, studyTime: 50 },
  { date: '2024-02-14', lessonsCompleted: 3, quizzesTaken: 1, aiQuestions: 9, studyTime: 75 },
  { date: '2024-02-15', lessonsCompleted: 1, quizzesTaken: 0, aiQuestions: 4, studyTime: 35 },
];

export function DashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'calendar' | 'achievements'>('overview');

  const progressPercent = Math.round((mockStats.completedLessons / mockStats.totalLessons) * 100);

  return (
    <div className="min-h-screen py-8 lg:py-12">
      {/* Header */}
      <section className="mb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome back, {user?.name?.split(' ')[0] || 'Student'}! 👋
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-gray-600 dark:text-gray-400 mt-1">
                Here's your learning progress overview. Keep up the great work!
              </motion.p>
            </div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex flex-wrap gap-3">
              <Link to="/courses">
                <Button variant="outline" className="gap-2"><LayoutDashboard className="h-4 w-4" /> Browse Courses</Button>
              </Link>
              <Link to="/ai-tutor">
                <Button variant="gradient" className="gap-2"><Bot className="h-4 w-4" /> Ask AI Tutor</Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="mb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: 'Lessons Done', value: mockStats.completedLessons, total: mockStats.totalLessons, icon: BookOpen, color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
              { label: 'Current Grade', value: `Grade ${mockStats.currentGrade}`, icon: Award, color: 'from-purple-500 to-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
              { label: 'Avg Quiz Score', value: `${mockStats.averageQuizScore}%`, icon: TrendingUp, color: 'from-green-500 to-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
              { label: 'AI Questions', value: mockStats.aiQuestionsAsked.toLocaleString(), icon: Bot, color: 'from-pink-500 to-pink-600', bg: 'bg-pink-50 dark:bg-pink-900/20' },
              { label: 'Study Streak', value: `${mockStats.studyStreak} days`, icon: Flame, color: 'from-orange-500 to-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/20' },
              { label: 'Progress', value: `${progressPercent}%`, icon: Target, color: 'from-primary-500 to-secondary-500', bg: 'bg-primary-50 dark:bg-primary-900/20' },
            ].map((stat, index) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.05 }} className="group">
                <Card className="h-full hover:shadow-lg hover:border-primary-300 dark:hover:border-primary-700 transition-all">
                  <Card.Content className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                        <stat.icon className="h-6 w-6" style={{ color: stat.color.split(' ')[0].replace('from-', '') }} />
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                    </div>
                  </Card.Content>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
<div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
            {['overview', 'progress', 'calendar', 'achievements'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'overview' && (
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Progress Circle */}
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-1">
                    <Card>
                      <Card.Header>
                        <Card.Title>Overall Progress</Card.Title>
                        <Card.Description>Grade {mockStats.currentGrade} completion</Card.Description>
                      </Card.Header>
                      <Card.Content className="flex flex-col items-center py-8">
                        <ProgressCircle value={progressPercent} size={160} strokeWidth={12} showLabel label={`${progressPercent}%`} />
                        <div className="mt-6 w-full space-y-3">
                          {[
                            { label: 'Modules', done: 8, total: 12 },
                            { label: 'Quizzes', done: 15, total: 25 },
                            { label: 'Projects', done: 3, total: 8 },
                          ].map(item => (
                            <div key={item.label} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
                                <span className="font-medium text-gray-900 dark:text-white">{item.done}/{item.total}</span>
                              </div>
                              <ProgressBar value={Math.round((item.done / item.total) * 100)} className="h-1.5" />
                            </div>
                          ))}
                        </div>
                      </Card.Content>
                    </Card>
                  </motion.div>

                  {/* Recent Activity */}
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
                    <Card className="h-full">
                      <Card.Header>
                        <div className="flex items-center justify-between">
                          <div>
                            <Card.Title>Recent Activity</Card.Title>
                            <Card.Description>Your latest learning actions</Card.Description>
                          </div>
                          <Link to="/practice" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">View All</Link>
                        </div>
                      </Card.Header>
                      <Card.Content>
                        <div className="space-y-4">
                          {mockActivity.slice(0, 5).map((activity, index) => (
                            <motion.div key={activity.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activity.color} bg-opacity-10`}>
                                <activity.icon className="h-5 w-5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 dark:text-white">{activity.title}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{activity.description}</p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{activity.timestamp}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </Card.Content>
                    </Card>
                  </motion.div>
                )}
              </div>
            )}
            
            {activeTab === 'progress' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <Card>
                  <Card.Header><Card.Title>Learning Progress</Card.Title></Card.Header>
                  <Card.Content>
                    <div className="grid md:grid-cols-3 gap-6">
                      {progressData.slice(-7).reverse().map((day, index) => (
                        <motion.div key={day.date} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                          <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between"><span className="text-gray-500">Lessons</span><span className="font-medium">{day.lessonsCompleted}</span></div>
                            <div className="flex justify-between"><span className="text-gray-500">Quizzes</span><span className="font-medium">{day.quizzesTaken}</span></div>
                            <div className="flex justify-between"><span className="text-gray-500">AI Questions</span><span className="font-medium">{day.aiQuestions}</span></div>
                            <div className="flex justify-between"><span className="text-gray-500">Study Time</span><span className="font-medium">{day.studyTime} min</span></div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </Card.Content>
                </Card>
              </motion.div>
            )}
            
            {activeTab === 'calendar' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <Card>
                  <Card.Header><Card.Title>Upcoming Schedule</Card.Title></Card.Header>
                  <Card.Content>
                    <div className="space-y-3">
                      {mockCalendarEvents.map(event => (
                        <motion.div key={event.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${event.type === 'quiz' ? 'bg-red-100 text-red-600' : event.type === 'lesson' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'} dark:bg-opacity-20`}>
                            <Calendar className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 dark:text-white">{event.title}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{event.type} • Grade {event.grade} • {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                          </div>
                          <Badge variant="outline">{event.type}</Badge>
                        </motion.div>
                      ))}
                    </div>
                  </Card.Content>
                </Card>
              </motion.div>
            )}
            
            {activeTab === 'achievements' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockAchievements.map((achievement, index) => (
                    <motion.div key={achievement.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="group">
                      <Card className={`h-full ${achievement.unlockedAt ? 'border-green-200 dark:border-green-800' : 'opacity-70'}`}>
                        <Card.Content className="p-6">
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${achievement.unlockedAt ? '' : 'grayscale'} `} style={{ background: achievement.color }}>
                            <achievement.icon className="h-8 w-8 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold text-center text-gray-900 dark:text-white mb-1">{achievement.title}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">{achievement.description}</p>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Progress</span>
                              <span className="font-medium">{achievement.progress}/{achievement.maxProgress}</span>
                            </div>
                            <ProgressBar value={Math.min(100, Math.round((achievement.progress / achievement.maxProgress) * 100))} className="h-2" />
                          </div>
                          {achievement.unlockedAt && (
                            <p className="mt-3 text-xs text-green-600 dark:text-green-400 text-center">
                              Unlocked on {new Date(achievement.unlockedAt).toLocaleDateString()}
                            </p>
                          )}
                        </Card.Content>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}