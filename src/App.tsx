import { useStore } from '@nanostores/react';
import { useState } from 'react';
import { SerpAPIImageResponse } from './_models/serp';
import { currentImageMetadata } from './_state/images';
import { serpApiKeyStore } from './_state/serp-token';
import workFlowSvg from './assets/workflow.svg';
import { Login } from './auth/Login';
import { Logout } from './auth/Logout';
import { DebouncedSearchInput } from './search/DebouncedSearchInput';
import { Swiper } from './swiper/Swiper';

function App() {
  const apiKey = useStore(serpApiKeyStore);

  const [searching, setSearching] = useState(false);

  const handleSearch = async (query: string) => {
    if (!apiKey) {
      throw new Error('NO API KEY');
    }

    setSearching(true);
    const params = new URLSearchParams({
      query,
      apiKey,
    });

    try {
      const response = await fetch(
        `/api/get-image-metadata?${params.toString()}`
      );
      const body = (await response.json()) as SerpAPIImageResponse;
      currentImageMetadata.set(body.images_results);
    } catch (e) {
      console.error(e);
    }
    setSearching(false);
  };

  return (
    <div
      className="flex h-full w-screen flex-col items-center gap-12 bg-primary-50 px-4 py-24"
      style={{
        backgroundImage: 'url(/noise.svg),url(/dotgrid.svg)',
        backgroundPositionX: '50%, 50%',
        backgroundPositionY: '0px, 0px',
        backgroundSize: 'auto, auto',
      }}
    >
      <>
        <img className="absolute left-6 top-6 w-36" src={workFlowSvg} />
        <section className="flex flex-col items-center gap-8">
          <h1 className="text-center font-crimson text-5xl">
            Aesthetics Tinder
          </h1>
          <h2 className="text-center text-xl font-light text-secondary-950 text-opacity-80 opacity-80">
            Find the perfect match to your pedantic design needs!
          </h2>
        </section>
        {apiKey ? (
          <>
            <section className="flex w-fit flex-col items-center gap-8">
              <DebouncedSearchInput
                searching={searching}
                onSearch={(q) => handleSearch(q)}
              />

              {searching ? 'Gathering new prospects...' : <Swiper />}
            </section>

            <Logout className="absolute right-6 top-4 px-12 font-crimson text-2xl" />
          </>
        ) : (
          <Login />
        )}
      </>
    </div>
  );
}

export default App;
