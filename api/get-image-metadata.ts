import { VercelRequest, VercelResponse } from '@vercel/node';
import { getJson } from 'serpapi';

export default async (req: VercelRequest, res: VercelResponse) => {
  const { query, apiKey } = req.query;

  console.log('query', req.query);
  try {
    const response = await getJson({
      engine: 'google_images',
      api_key: apiKey,
      q: query,
    });
    return res.json(response);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
