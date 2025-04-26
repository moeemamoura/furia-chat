import { PlayerInfo } from "./components/PlayerInfo";
import logo from './images/logo.png';
import furia from './images/furia.png';
import game from './images/game.jpg';
import { ChatMessage } from "./components/ChatMessage";
import { useState } from "react";
import { HandsClapping, PaperPlaneRight } from "@phosphor-icons/react/dist/ssr";
import { Heart } from "@phosphor-icons/react";
import { ChatBot } from "./components/ChatBot";
import { useRef, useEffect } from "react";
import { db } from "./services/firebase";
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from "firebase/firestore";


type Message = {
  text: string;
  isUser?: boolean;
};

function App() {

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [inputValue, setInputValue] = useState('');

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendMessage(message: string) {
    console.log(message)
    if (message === '') {
      return;
    }

    setInputValue('');

    await addDoc(collection(db, "messages"), {
      text: message,
      createdAt: serverTimestamp(),
    });
  }

  useEffect(() => {
    console.log('entrou')
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let msgs: any[] = [];
      querySnapshot.forEach((doc) => {
        msgs.push({ ...doc.data(), id: doc.id });
      });
      console.log('msgs', msgs)
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-[#141416] via-[#161a47] to-[#18181d] gap-4 max-h-screen overflow-hidden">
      {/* header */}

      <header className=" bg-[#302b63]/30 max-h-screen text-left flex items-center">
        <img src={furia} alt="Minha Imagem" className="w-8 h-8 ml-6 my-2" />
        <h1 className="font-russo uppercase bg-gradient-to-r from-[#757575] via-[#ffffff] to-[#b4b1b1] inline-block text-transparent bg-clip-text ml-4 ">furia fan chat</h1>
      </header>

      <div className="flex h-[90%] h-max-screen pl-28 mr-5">
        {/* Left container */}
        <div className="flex flex-col h-full aspect[16/9] h-max-screen">
          <div className="rounded-md border-4 border-[#d9d9d956]/10 w-full h-full bg-cover">
            {/* video container */}
            <div
              className=" w-full h-full bg-cover"
              style={{ backgroundImage: `url(${game})` }}
            >
            </div>
          </div>

          {/* score container */}
          <div className="grid grid-cols-3 h-full w-full bg-blue mb-6">
            {/* left side */}
            <div className="flex min-w-52 flex-col bg-red">
              <p
                className="flex uppercase font-wallpoet bg-gradient-to-r from-[#757575] via-[#ffffff] to-[#b4b1b1] text-transparent bg-clip-text text-5xl pt-8 pb-6 text-right"
              >
                furia
              </p>
              <PlayerInfo name="FalleN" life={60} />
              <PlayerInfo name="KSCERATO" life={5} />
              <PlayerInfo name="yuurih" life={57} />
              <PlayerInfo name="skullz" life={77} />
              <PlayerInfo name="molodoy" life={100} />
            </div>
            {/* middle side */}
            <div className="flex flex-col items-center w-60 relative">
              <div className="font-wallpoet uppercase p-5 bg-gradient-to-r from-[#6b6b6b] via-[#FAF9F9] to-[#615f5f]  inline-block text-transparent bg-clip-text text-5xl text-shadow-lg/30">vs</div>
              <div className="font-wallpoet uppercase bg-gradient-to-r from-[#c6c3c3] via-[#ffffff] to-[#dbd4d4] inline-block text-transparent bg-clip-text text-2xl pb-2 -mb-1">round 7</div>
              <div className="font-wallpoet uppercase bg-gradient-to-r from-[#ffffff] via-[#b9b4b4] to-[#f5f3f3] inline-block text-transparent bg-clip-text text-4xl">score</div>
              <div className="font-squada  uppercase bg-gradient-to-r from-[#dfdfdf] via-[#e4e2e2] to-[#ffffff] inline-block text-transparent bg-clip-text text-6xl mt-[10%]">5 - 4</div>
              <div className="font-wallpoet uppercase bg-gradient-to-r from-[#ffffff] via-[#b9b4b4] to-[#f5f3f3] inline-block text-transparent bg-clip-text text-[42px]">mapa</div>
              <div className="flex justify-center bg-[#D9D9D9]/10 rounded-md border-2 border-[#2f5eecd8]/50 w-32 mb-auto">
                <p className="font-wallpoet uppercase bg-white inline-block text-transparent bg-clip-text text-xl">mirage</p>
              </div>

              <div className="h-60 w-[1px] bg-white/50 absolute left-0 mt-28" />
              <div className="h-60 w-[1px] bg-white/50 absolute right-0 mt-28" />
            </div>
            {/* right side */}
            <div className="flex items-end min-w-52 flex-col">
              <p className="uppercase font-wallpoet bg-gradient-to-r from-[#757575] via-[#ffffffdd] to-[#b4b1b1]  inline-block text-transparent bg-clip-text text-5xl pt-8 pb-6">teste</p>
              <PlayerInfo name="ZeDaManga" life={84} inverted />
              <PlayerInfo name="grugru" life={71} inverted />
              <PlayerInfo name="bobstripador" life={25} inverted />
              <PlayerInfo name="TheThor" life={6} inverted />
              <PlayerInfo name="xiribinha" life={44} inverted />
            </div>
          </div>
        </div>

        <div className="w-1/12" />
        {/* Right container */}

        <div className=" flex flex-col w-2/5 mt-5 h-max-ful items-end gap">

          {/* Top container */}
          <div className="flex w-full flex-row">
            <div className="flex flex-col w-[25%] h-[25%] mt-2 items-start">
              <img src={furia} alt="Minha Imagem" className="size-40" />
            </div>

            {/*Time*/}
            <div className="flex flex-1 flex-col items-end pb-12">
              <div className="flex font-russo uppercase bg-gradient-to-r from-[#ffffff] via-[#a2a0a0] to-[#ffffff] text-transparent bg-clip-text text-[60px] text-end">team furia</div>
              <div className="flex items-center justify-center bg-[#D9D9D9]/10 rounded-md w-32 h-16">
                <h1 className="font-wallpoet uppercase bg-gradient-to-r from-[#ffffff] via-[#b9b4b4] to-[hsl(0,9%,96%)] text-transparent bg-clip-text text-[42px]">1:58</h1>
              </div>
            </div>
          </div>

          {/*Chat*/}
          <div className="flex flex-col border-0 border-[#656464]/30 w-full max-h-[70%] h-[70%] rounded-[15px] justify-center items-center bg-gradient-radial from-[#010117] via-[#1908376c] to-[#110220]"
          >
            <div className="max-h-[70%] h-[70%] flex mt-6 flex-col w-11/12 border-2 rounded-[15px] border-[#4f4778]/20 bg-[#262239] p-3 overflow-auto">

              <ChatMessage message={'Furia vai arrebentar nessa!!!'} name="AnaLaurixxx" />

              <ChatBot bot={"Proximo jogo FURIA x [Adversario] 27/04"} />

              <ChatMessage message={'gogogo'} name="leooReis_09" />

              {messages.map(({ text, isUser }) => (
                <ChatMessage message={text} isUser={isUser} name="Moema" />
              ))}
              <div ref={messagesEndRef} />
            </div >

            <div className="flex w-11/12 items-center justify-start mb-2">
              <div className="flex flex-row">
                <button className="flex h-20 items-center mr-3" onClick={() => sendMessage(':coracao:')}>
                  <Heart color="#e3dfdf" size={28}
                  />
                </button>
                <button className="flex h-20 items-center mr-6" onClick={() => sendMessage(':palmas:')}>
                  <HandsClapping color="#e3dfdf" size={28}
                  />
                </button>
              </div>

              <div className="flex flex-1 h-[44px] items-center border-2 rounded-[10px] border-[#4f4778]">
                <input
                  className="flex flex-1 w-full font-squada text-xl text-[#e6e3e3] bg-transparent p-4 focus:outline-none"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      sendMessage(inputValue);
                    }
                  }}
                  placeholder="Digite sua mensagem..."
                />
                <button className="flex p-6 items-center "

                  onClick={() => sendMessage(inputValue)} >
                  <PaperPlaneRight color="#e3dfdf" size={28}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
