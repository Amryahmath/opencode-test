import * as React from 'react';
import { cn } from '../../utils/classnames';

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'accent' | 'white';
}

const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(
  ({ className, size = 'md', color = 'primary', ...props }, ref) => {
    const sizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-8 w-8',
      lg: 'h-12 w-12',
      xl: 'h-16 w-16',
    };
    const colorClasses = {
      primary: 'text-primary-600 dark:text-primary-400',
      secondary: 'text-secondary-600 dark:text-secondary-400',
      accent: 'text-accent-600 dark:text-accent-400',
      white: 'text-white',
    };

    return (
      <div
        ref={ref}
        className={cn('inline-flex items-center justify-center', sizeClasses[size], colorClasses[color], className)}
        role="status"
        aria-label="Loading"
        {...props}
      >
        <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
);
Loader.displayName = 'Loader';

const Spinner = React.forwardRef<HTMLDivElement, LoaderProps>(
  ({ className, size = 'md', color = 'primary', ...props }, ref) => (
    <Loader ref={ref} size={size} color={color} className={className} {...props} />
  )
);
Spinner.displayName = 'Spinner';

const LoadingDots = React.forwardRef<HTMLDivElement, LoaderProps>(
  ({ className, size = 'md', color = 'primary', ...props }, ref) => {
    const sizeClasses = {
      sm: 'h-1.5 w-1.5',
      md: 'h-2.5 w-2.5',
      lg: 'h-3.5 w-3.5',
      xl: 'h-5 w-5',
    };
    const colorClasses = {
      primary: 'bg-primary-600 dark:bg-primary-400',
      secondary: 'bg-secondary-600 dark:bg-secondary-400',
      accent: 'bg-accent-600 dark:bg-accent-400',
      white: 'bg-white',
    };

    return (
      <div
        ref={ref}
        className={cn('inline-flex items-center gap-1', className)}
        role="status"
        aria-label="Loading"
        {...props}
      >
        <span className={cn(sizeClasses[size], colorClasses[color], 'rounded-full animate-bounce') } style={{ animationDelay: '0ms' }} />
        <span className={cn(sizeClasses[size], colorClasses[color], 'rounded-full animate-bounce') } style={{ animationDelay: '150ms' }} />
        <span className={cn(sizeClasses[size], colorClasses[color], 'rounded-full animate-bounce') } style={{ animationDelay: '300ms' }} />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
);
LoadingDots.displayName = 'LoadingDots';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string | number;
  height?: string | number;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'text', width, height, ...props }, ref) => {
    const baseStyles = 'animate-pulse bg-gray-200 rounded dark:bg-gray-700';
    const variantStyles = {
      text: 'h-4 rounded',
      circular: 'rounded-full',
      rectangular: 'rounded-lg',
      card: 'rounded-xl',
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], className)}
        style={{ width, height }}
        aria-hidden="true"
        {...props}
      />
    );
  }
);
Skeleton.displayName = 'Skeleton';

export { Loader, Spinner, LoadingDots, Skeleton };