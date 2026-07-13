import { Link } from 'react-router-dom';
import { Sparkles, Home, ArrowLeft, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button, Input } from '@it-master-ai/ui';

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="mb-8">
          <span className="text-9xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
            404
          </span>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Page Not Found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 dark:text-gray-400 mb-8"
        >
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/">
            <Button variant="gradient" className="w-full sm:w-auto gap-2">
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          </Link>
          <Link to="/courses">
            <Button variant="outline" className="w-full sm:w-auto gap-2">
              <Search className="h-4 w-4" />
              Browse Courses
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <div className="relative max-w-md mx-auto">
            <Input
              placeholder="Search for courses, topics..."
              leftIcon={<Search className="h-4 w-4" />}
              className="pr-12"
            />
            <Button variant="ghost" size="sm" className="absolute right-2 top-1/2 -translate-y-1/2">
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}