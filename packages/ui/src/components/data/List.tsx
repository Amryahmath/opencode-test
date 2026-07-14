import * as React from 'react';
import { cn } from '../../utils/classnames';

const List = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn('space-y-2', className)} {...props} />
  )
);
List.displayName = 'List';

const ListItem = React.forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => (
    <li
      ref={ref}
      className={cn('flex items-center gap-3 rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-gray-800/50', className)}
      {...props}
    />
  )
);
ListItem.displayName = 'ListItem';

export { List, ListItem };