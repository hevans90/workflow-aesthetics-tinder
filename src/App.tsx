import workFlowSvg from './assets/workflow.svg';
import { Card } from './ui/Card';

function App() {
  return (
    <>
      <div
        className="h-screen w-screen bg-pampas-50 px-4 pt-24"
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
          <h2 className="text-xl font-light text-gray-950 text-opacity-80 opacity-80">
            The one-stop shop for finding a match to your design needs!
          </h2>

          <Card>
            <p>
              Succulents gorpcore venmo sriracha snackwave small batch salvia
              tumblr photo booth 3 wolf moon normcore typewriter mlkshk.
              Cold-pressed meh vinyl yr. Bushwick chartreuse venmo, 3 wolf moon
              edison bulb intelligentsia church-key. Vibecession forage
              letterpress distillery organic raw denim succulents semiotics
              taiyaki 8-bit Brooklyn. Jianbing slow-carb flannel prism,
              distillery forage selfies air plant paleo. Hella pork belly
              whatever lo-fi.
            </p>
          </Card>
        </section>
      </div>
    </>
  );
}

export default App;
