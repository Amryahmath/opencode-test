import * as React from 'react';
import { cn } from '../../utils/classnames';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  fallback?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  shape?: 'circle' | 'square';
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, size = 'md', shape = 'circle', ...props }, ref) => {
    const sizeStyles = {
      xs: 'w-6 h-6 text-xs',
      sm: 'w-8 h-8 text-sm',
      md: 'w-10 h-10 text-base',
      lg: 'w-12 h-12 text-lg',
      xl: 'w-16 h-16 text-xl',
      '2xl': 'w-24 h-24 text-2xl',
    };
    const shapeStyles = {
      circle: 'rounded-full',
      square: 'rounded-lg',
    };

    const [imageError, setImageError] = React.useState(false);

    if (!src || imageError) {
      return (
        <div
          ref={ref}
          className={cn(
            'inline-flex items-center justify-center font-medium bg-gray-100 dark:bg-gray-700',
            sizeStyles[size],
            shapeStyles[shape],
            className
          )}
          {...props}
        >
          {fallback || '?'}
        </div>
      );
    }

    return (
      <div className={cn('relative inline-block', className)} {...props}>
        <img
          ref={ref}
          src={src}
          alt={alt || fallback || 'Avatar'}
          className={cn(sizeStyles[size], shapeStyles[shape], 'object-cover')}
          onError={() => setImageError(true)}
        />
      </div>
    );
  }
);
Avatar.displayName = 'Avatar';

const AvatarImage = React.forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>(
  ({ className, ...props }, ref) => (
    <img ref={ref} className={cn('w-full h-full object-cover', className)} {...props} />
  )
);
AvatarImage.displayName = 'AvatarImage';

const AvatarFallback = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex h-full w-full items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700', className)}
      {...props}
    >
      {children}
    </div>
  )
);
AvatarFallback.displayName = 'AvatarFallback';

export { Avatar, AvatarImage, AvatarFallback };