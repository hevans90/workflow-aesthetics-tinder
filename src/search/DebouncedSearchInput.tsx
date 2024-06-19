/// <reference types="vite-plugin-svgr/client" />

import { debounce } from 'lodash';
import { twMerge } from 'tailwind-merge';
import SearchSvg from '../assets/search.svg?react';
import SpinnerSvg from '../assets/spinner.svg?react';

import { ChangeEvent, useCallback, useState } from 'react';

export const DebouncedSearchInput = ({
  onSearch,
  searching = false,
  debounceDuration = 300,
  className,
}: {
  onSearch: (query: string) => void;
  searching?: boolean;
  debounceDuration?: number;
  className?: string;
}) => {
  const [query, setQuery] = useState('');

  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      onSearch(searchTerm);
    }, debounceDuration),
    [debounceDuration]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <div
      className={twMerge(
        className,
        'relative mt-2 w-full rounded-md shadow-sm'
      )}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 flex w-8 items-center pl-2 text-gray-500">
        {searching ? <SpinnerSvg /> : <SearchSvg />}
      </div>
      <input
        type="text"
        className="block w-full rounded-md border-0 py-1.5 pl-10 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-400 sm:text-sm sm:leading-6"
        placeholder="Search for images"
        value={query}
        onChange={handleChange}
      />
    </div>
  );
};
