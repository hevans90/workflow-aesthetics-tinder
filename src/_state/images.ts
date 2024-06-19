import { ImageResult } from '@/_models/serp';
import { persistentAtom } from '@nanostores/persistent';

export const currentImageMetadata = persistentAtom<ImageResult[]>(
  'currentImageMetadata',
  [],
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);
