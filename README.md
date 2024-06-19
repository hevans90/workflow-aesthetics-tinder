# Workflow Aesthetics Tinder

Prod URL: https://workflow-aesthetics-tinder.vercel.app/

Local dev:

- get yourself a SerpApi token here: https://serpapi.com/dashboard
- `pnpm install`
- Delete or rename `vercel.json`
- `vercel dev` (just accept all the CLI options the first time it asks you - this is intended to link to a vercel cloud project but you won't be able to access mine unless I invite you)
- enter your token and get tindering! (warning, the free tokens only allow 100 searches/month)

I couldn't work out how to make a `vercel.json` that works both locally and while deployed, and I am not sure it's even possible. If I was using a regular Vite/React app in future with some serverless functions I'd use netlify instead of Vercel because it's a pain in the ass.

## Future work (I spent 4 hours just making this pretty)

### Reccomendation engine

#### Super simple version

Serp returns a `suggested_searches` array whenever you make a query, you could simply take the first query from this list and fetch it, and do something with the first few images to make a simple UX here.

---

#### Actual reccomendation engine

Realistically this requires persisted data and a real backend (not crappy Vercel serverless functions) and I just didn't have enough time to do this. Here's how I would do it:

1. Spin up a postgres database and identify users based on a `hash` of their API key (could write some simple backend function to verify hashes, rather than exposing sensitive api keys all over the place)
2. Store every search query a user makes in a `queries` table
3. Store full image metadata for likes & dislikes and relate them to their parent search query via a foreign key
4. Implement some kind of ORM to access all this nice data (Drizzle/Prism/Hasura if using TypeScript)
5. Write an implementation of a simple comparison algorithm like [Jaccard Similarity](https://en.wikipedia.org/wiki/Jaccard_index) to return lists of image metadata based on a users existing likes & dislikes.

Some pseudocode to do this in javascript might look something like:

```typescript
const jaccardSimilarity = (userALikes, userBLikes) => {
  const intersection = new Set(
    [...userALikes].filter((x) => userBLikes.has(x))
  );
  const union = new Set([...userALikes, ...userBLikes]);
  return intersection.size / union.size;
};
```

6. Run this algorithm using a CRON job, to periodically populate a new database table keyed per user to create a list of reccomended image metadata.
