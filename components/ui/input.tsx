import * as React from 'react';
import { cn } from '@/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'flex h-11 w-full rounded-xl border border-sand-200 bg-white/80 px-3 py-2 text-base text-bark-800 placeholder:text-sand-300 shadow-soft/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bark-700',
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';
