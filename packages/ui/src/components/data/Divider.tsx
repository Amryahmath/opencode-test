import * as React from 'react';
import { cn } from '../../utils/classnames';

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'shrink-0 bg-gray-200 dark:bg-gray-700',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        className
      )}
    >
      {orientation === 'horizontal' ? (
        <hr className="h-full w-full border-none" />
      ) : (
        <hr className="h-full w-full border-none" />
      )}
    </div>
  )
);
Divider.displayName = 'Divider';

export { Divider };