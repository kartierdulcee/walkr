import * as React from 'react';
import { cn } from '@/lib/utils';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'w-full rounded-xl border border-sand-200 bg-white/80 px-3 py-3 text-base text-bark-800 placeholder:text-sand-300 shadow-soft/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bark-700',
          className,
        )}
        {...props}
      />
    );
  },
);
Textarea.displayName = 'Textarea';
