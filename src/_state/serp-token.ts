import { persistentAtom } from '@nanostores/persistent';

export const serpApiKeyStore = persistentAtom<string | null>('serpApiKey', '', {
  encode: JSON.stringify,
  decode: JSON.parse,
});
