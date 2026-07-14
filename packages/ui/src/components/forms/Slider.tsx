import * as React from 'react';
import { cn } from '../../utils/classnames';

export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  showValue?: boolean;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, label, min = 0, max = 100, step = 1, showValue = false, ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          {label}
          {showValue && <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">({props.value})</span>}
        </label>
      )}
      <input
        ref={ref}
        type="range"
        min={min}
        max={max}
        step={step}
        className={cn(
          'w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
          'dark:bg-gray-700',
          className
        )}
        {...props}
      />
    </div>
  )
);
Slider.displayName = 'Slider';

export { Slider };