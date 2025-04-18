import { PlayerInfo } from "./components/PlayerInfo";
import logo from './images/logo.png';

function App() {
  return (

    <div className="flex flex-col flex-1 h-screen">
        {/* head bar */}
        
      <header className="bg-slate-500 h-[6%] text-left flex">
        <img src={logo} alt="Minha Imagem" className="w-8 h-8 ml-6 mt-2" />
        <h1 className="font-goblin text-4xl text-white">furia fan chat</h1>
      </header>

      <div className="flex flex-1 h-full bg-red-500">
        {/* Left container */}
        <div className="bg-violet-500 flex-col w-3/5">
          <div className="flex flex-1 w-[80%] h-[50%] mt-4 bg-red-700 justify-self-center"></div>
          <div className="flex flex-1 h-2/6 bg-red-40"></div>
        </div>

        {/* Right container */}
        <div className="bg-green-500 flex flex-1">

        </div>
      </div>
    </div>
  );
}

export default App;
