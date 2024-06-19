import workFlowSvg from './assets/workflow.svg';
import Swiper from './swiper/Swiper';

function App() {
  return (
    <>
      <div
        className="bg-primary-50 h-screen w-screen px-4 pt-24"
        style={{
          backgroundImage: 'url(/noise.svg),url(/dotgrid.svg)',
          backgroundPositionX: '50%, 50%',
          backgroundPositionY: '0px, 0px',
          backgroundSize: 'auto, auto',
        }}
      >
        <img className="absolute left-10 top-10 w-36" src={workFlowSvg} />
        <section className="flex flex-col items-center gap-8">
          <h1 className="font-crimson text-5xl">Aesthetics Tinder</h1>
          <h2 className="text-secondary-950 text-xl font-light text-opacity-80 opacity-80">
            The one-stop shop for finding a match to your design needs!
          </h2>

          <Swiper />
        </section>
      </div>
    </>
  );
}

export default App;
