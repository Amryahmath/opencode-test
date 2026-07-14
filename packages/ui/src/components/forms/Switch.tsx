import * as React from 'react';
import { cn } from '../../utils/classnames';

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, ...props }, ref) => (
    <label className={cn('flex items-center gap-3 cursor-pointer', props.disabled && 'opacity-50 cursor-not-allowed')}>
      <input
        ref={ref}
        type="checkbox"
        role="switch"
        className={cn(
          'h-5 w-5 rounded border-gray-300 text-primary-600',
          'focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
          'dark:border-gray-600 dark:bg-gray-800',
          className
        )}
        {...props}
      />
      {label && <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>}
    </label>
  )
);
Switch.displayName = 'Switch';

export { Switch };