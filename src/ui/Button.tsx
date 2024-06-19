import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ForwardedRef,
  type ReactNode,
} from 'react';
import { twMerge } from 'tailwind-merge';

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'prefix'
> & { children?: ReactNode; category?: 'primary' | 'secondary' };

export const Button = forwardRef(function Button(
  { children, className, category = 'primary', ...rest }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <button
      {...rest}
      className={twMerge(
        'justify-center rounded-md p-2 leading-3 text-white outline-none',
        category === 'primary' &&
          'bg-primary-600 hover:bg-primary-400 disabled:bg-primary-200 disabled:text-primary-400',
        category === 'secondary' &&
          'bg-secondary-600 hover:bg-secondary-400 disabled:bg-secondary-200 disabled:text-secondary-400',
        className
      )}
      ref={ref}
    >
      {children}
    </button>
  );
});
