import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Bot, CheckCircle, Sparkles, BookOpen as BookOpenIcon, Settings, LogOut, User, ChevronRight, ChevronDown, HelpCircle, GraduationCap } from 'lucide-react';
import { cn } from '../../utils/classnames';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Courses', href: '/courses', icon: BookOpen },
  { name: 'AI Tutor', href: '/ai-tutor', icon: Bot },
  { name: 'Practice', href: '/practice', icon: CheckCircle },
  { name: 'Quiz', href: '/quiz', icon: Sparkles },
  { name: 'Resources', href: '/resources', icon: BookOpenIcon },
];

const bottomNavigation = [
  { name: 'Settings', href: '/profile', icon: Settings },
  { name: 'Help', href: '/help', icon: HelpCircle },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  const sidebarWidth = isCollapsed ? 'w-16' : 'w-64';
  const textDisplay = isCollapsed ? 'hidden' : 'block';

  return (
    <AnimatePresence mode="wait">
      <motion.aside
        initial={{ width: 0 }}
        animate={{ width: isCollapsed ? 64 : 256 }}
        exit={{ width: 0 }}
        transition={{ duration: 0.3 }}
        className={`${sidebarWidth} h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 overflow-hidden`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          <Link to="/dashboard" className="flex items-center gap-2" aria-label="IT Master AI Dashboard">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            {textDisplay && (
              <span className="font-bold text-lg text-gray-900 dark:text-white">
                IT Master AI
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <ChevronRight className={cn('h-5 w-5 transition-transform', isCollapsed && 'rotate-180')} />
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex-1 overflow-y-auto px-3 py-4 space-y-1"
          >
            <nav className="space-y-1" aria-label="Main navigation">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href || (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800'
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                    <span className={cn('flex-1 truncate', !isCollapsed && textDisplay)}>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-1">
              {bottomNavigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800'
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                    <span className={cn('truncate', !isCollapsed && textDisplay)}>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="p-3 border-t border-gray-100 dark:border-gray-800">
          <div className={cn('flex items-center gap-3 px-3 py-2.5 rounded-xl', isCollapsed ? 'justify-center' : 'justify-start')}>
            <Avatar
              src={user?.avatar}
              fallback={user?.name?.charAt(0).toUpperCase() || 'U'}
              size="sm"
            />
            <div className={cn('flex-1 min-w-0 overflow-hidden', isCollapsed && 'hidden')}>
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                Grade {user?.grade} • {user?.school}
              </p>
            </div>
          </div>
          <div className="mt-3 space-y-1">
            <Link
              to="/profile"
              className={cn('flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors', isCollapsed ? 'justify-center' : 'justify-start')}
            >
              <User className="h-4 w-4 flex-shrink-0" />
              <span className={cn('truncate', isCollapsed && 'hidden')}>Profile</span>
            </Link>
            <button
              onClick={logout}
              className={cn('flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors', isCollapsed ? 'justify-center' : 'justify-start')}
            >
              <LogOut className="h-4 w-4 flex-shrink-0" />
              <span className={cn('truncate', isCollapsed && 'hidden')}>Sign Out</span>
            </button>
          </div>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}