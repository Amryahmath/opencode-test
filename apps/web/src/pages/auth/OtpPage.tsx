import { Link, useSearchParams } from 'react-router-dom';
import { Mail, Lock, Sparkles, ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input, Card } from '@it-master-ai/ui';

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits').regex(/^\d+$/, 'OTP must be numbers only'),
});

type OtpForm = z.infer<typeof otpSchema>;

export function OtpPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || 'user@example.com';
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const { register, handleSubmit, formState: { errors } } = useForm<OtpForm>({
    resolver: zodResolver(otpSchema),
  });

  const onSubmit = async (data: OtpForm) => {
    setIsLoading(true);
    setError('');
    try {
      // Mock API call - accept 123456 as valid OTP
      await new Promise(r => setTimeout(r, 1500));
      if (data.otp === '123456') {
        setSuccess(true);
      } else {
        setError('Invalid OTP. Use 123456 for demo.');
      }
    } catch {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    setResendTimer(60);
    const timer = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    // Mock resend API call
    await new Promise(r => setTimeout(r, 500));
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
              Email verified!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your email has been verified. You can now set a new password.
            </p>
            <Link to="/login">
              <Button variant="gradient" className="w-full">
                Go to Login
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
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                <Mail className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <Card.Title className="text-2xl">Verify Your Email</Card.Title>
              <Card.Description>We've sent a 6-digit code to <strong>{email}</strong></Card.Description>
            </Card.Header>

            <Card.Content className="space-y-5">
              <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                Didn't receive the code? Check your spam folder or wait
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <Input
                  {...register('otp')}
                  type="text"
                  label="Verification Code"
                  placeholder="000000"
                  maxLength={6}
                  autoComplete="one-time-code"
                  inputMode="numeric"
                  className="text-center text-2xl tracking-widest"
                  error={errors.otp?.message}
                />

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm flex items-center justify-center gap-2"
                  >
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    {error}
                  </motion.div>
                )}

                <Button type="submit" className="w-full" variant="gradient" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify Code
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>

              <div className="text-center">
                <button
                  onClick={handleResend}
                  disabled={resendTimer > 0 || isLoading}
                  className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {resendTimer > 0 ? `Resend code in ${resendTimer}s` : 'Resend code'}
                </button>
              </div>

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
            By verifying your email, you agree to our{' '}
            <Link to="#" className="underline hover:text-primary-600 dark:hover:text-primary-400">Terms of Service</Link>{' '}
            and{' '}
            <Link to="#" className="underline hover:text-primary-600 dark:hover:text-primary-400">Privacy Policy</Link>.
          </p>
        </div>
      </motion.div>
    </div>
  );
}