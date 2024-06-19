import { ReactNode } from 'react';

import { twMerge } from 'tailwind-merge';

export const Card = ({
  children,
  className,
  bgImageUrl,
}: {
  children?: ReactNode;
  className?: string;
  bgImageUrl?: string;
}) => (
  <div
    style={{ backgroundImage: bgImageUrl ? `url(${bgImageUrl})` : 'unset' }}
    className={twMerge(
      'flex flex-col rounded-lg bg-white bg-cover bg-center',
      className
    )}
  >
    {children}
  </div>
);
