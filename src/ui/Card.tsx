import { ReactNode } from 'react';

import { twMerge } from 'tailwind-merge';

export const Card = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => (
  <div
    className={twMerge(
      'rounded-lg border-[1px] border-gray-900 border-opacity-10 bg-white p-6',
      className
    )}
  >
    {children}
  </div>
);
