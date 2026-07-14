import * as React from 'react';
import { cn } from '../../utils/classnames';

const Checkbox = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      type="checkbox"
      className={cn(
        'h-4 w-4 rounded border-gray-300 text-primary-600',
        'focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        'dark:border-gray-600 dark:bg-gray-800 dark:focus:ring-primary-500',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      {...props}
    />
  )
);
Checkbox.displayName = 'Checkbox';

export { Checkbox };