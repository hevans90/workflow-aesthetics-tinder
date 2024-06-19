import { Button } from '@/ui/Button';
import { FormEventHandler, useState } from 'react';
import { serpApiKeyStore } from '../_state/serp-token';

export const Login = () => {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    serpApiKeyStore.set(apiKey);
  };

  return (
    <form
      className="flex w-fit flex-col gap-4 rounded-md shadow-sm"
      onSubmit={handleSubmit}
    >
      <label htmlFor="apiKey">
        Please enter your Serp API Key to get started
      </label>
      <div className="flex h-12 items-center gap-4">
        <input
          id="apiKey"
          type="password"
          className="block h-full w-full min-w-64 rounded-md border-0 px-2 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-400 sm:text-sm sm:leading-6"
          placeholder="Serp API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />

        <Button className="h-full min-w-16" type="submit" disabled={!apiKey}>
          GO
        </Button>
      </div>
    </form>
  );
};
