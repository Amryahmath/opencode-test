import { Link } from 'react-router-dom';
import { Home, Mail, Lock, Sparkles, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input, Card } from '@it-master-ai/ui';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    setIsLoading(true);
    setError('');
    try {
      // Mock API call
      await new Promise(r => setTimeout(r, 1500));
      setSuccess(true);
    } catch {
      setError('Failed to send reset link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <Card className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"
            >
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Check your email!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              If an account exists for that email, we've sent a password reset link.
            </p>
            <Link to="/login">
              <Button variant="gradient" className="w-full">
                Back to Login
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative flex flex-col items-center justify-center min-h-screen px-4 py-12">
          <Link to="/" className="mb-8 flex items-center gap-2" aria-label="IT Master AI Home">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              IT Master AI
            </span>
          </Link>

          <Card className="w-full max-w-md">
            <Card.Header className="text-center">
              <Card.Title className="text-2xl">Forgot Password</Card.Title>
              <Card.Description>Enter your email and we'll send you a reset link</Card.Description>
            </Card.Header>

            <Card.Content className="space-y-5">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm flex items-center gap-2"
                >
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <Input
                  {...register('email')}
                  type="email"
                  label="Email"
                  placeholder="you@example.com"
                  leftIcon={<Mail className="h-4 w-4" />}
                  error={errors.email?.message}
                />

                <Button type="submit" className="w-full" variant="gradient" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Reset Link
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200 dark:border-gray-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white dark:bg-gray-800 px-4 text-gray-500">Or</span>
                </div>
              </div>

              <Link to="/login">
                <Button variant="outline" className="w-full">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Back to Login
                </Button>
              </Link>
            </Card.Content>
          </Card>

          <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400 max-w-md">
            By requesting a reset link, you agree to our{' '}
            <Link to="#" className="underline hover:text-primary-600 dark:hover:text-primary-400">Terms of Service</Link>{' '}
            and{' '}
            <Link to="#" className="underline hover:text-primary-600 dark:hover:text-primary-400">Privacy Policy</Link>.
          </p>
        </div>
      </motion.div>
    </div>
  );
}