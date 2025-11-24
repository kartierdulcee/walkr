import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'outline';
  asChild?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', asChild, ...props }, ref) => {
    const styles = {
      primary:
        'bg-bark-700 text-white hover:bg-bark-800 shadow-soft button-glow transition',
      ghost: 'bg-white/80 text-bark-800 hover:bg-white border border-sand-200 transition',
      outline:
        'border border-bark-700 text-bark-800 bg-transparent hover:bg-sand-100 transition',
    } as const;

    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-full px-5 py-3 text-base font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bark-700 disabled:opacity-50',
          styles[variant],
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';
