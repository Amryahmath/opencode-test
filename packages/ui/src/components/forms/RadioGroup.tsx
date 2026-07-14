import * as React from 'react';
import { cn } from '../../utils/classnames';

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (value: string) => void;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, value, onValueChange, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('grid gap-2', className)}
      role="radiogroup"
      aria-required="true"
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return null;
        return React.cloneElement(child, {
          value: child.props.value,
          checked: value === child.props.value,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.checked) onValueChange?.(e.target.value);
          },
        });
      })}
    </div>
  )
);
RadioGroup.displayName = 'RadioGroup';

interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
}

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, value, checked, ...props }, ref) => (
    <div className="relative flex items-center gap-2">
      <input
        ref={ref}
        type="radio"
        value={value}
        checked={checked}
        onChange={(e) => {
          if (e.target.checked) {
            // The onChange will be handled by the parent RadioGroup
          }
        }}
        className={cn(
          'h-4 w-4 rounded-full border-gray-300 text-primary-600',
          'focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
          'dark:border-gray-600 dark:bg-gray-800 dark:focus:ring-primary-500',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
        {...props}
      />
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
        {props.children}
      </label>
    </div>
  )
);
RadioGroupItem.displayName = 'RadioGroupItem';

export { RadioGroup, RadioGroupItem };