import { PlayerInfo } from "../components/PlayerInfo";
import furia from '../images/furia.png';
import game from '../images/game.jpg';
import { ChatMessage } from "../components/ChatMessage";
import { useState } from "react";
import { HandsClapping, PaperPlaneRight } from "@phosphor-icons/react/dist/ssr";
import { Heart, SignIn, SignOut } from "@phosphor-icons/react";
import { ChatBot } from "../components/ChatBot";
import { useRef, useEffect } from "react";
import { db } from "../services/firebase";
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";


type Message = {
    uid: string
    text: string
    displayName: string
    photoURL: string
    createdAt: any
    id: string
};

function Home() {
    const { user, signInWithGoogle, signOut } = useAuth();

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [inputValue, setInputValue] = useState('');

    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    async function sendMessage(message: string) {
        if (message === '') {
            return;
        }

        setInputValue('');

        if (!user) {
            return;
        }

        await addDoc(collection(db, "messages"), {
            uid: user.uid,
            text: message,
            displayName: user.displayName,
            photoURL: user.photoURL,
            createdAt: serverTimestamp(),
        });
    }

    useEffect(() => {
        const q = query(collection(db, "messages"), orderBy("createdAt"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let msgs: any[] = [];
            querySnapshot.forEach((doc) => {
                msgs.push({ ...doc.data(), id: doc.id });
            });
            setMessages(msgs);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="flex flex-col h-screen bg-gradient-to-b from-[#070d2c] to-[#03071d] gap-4 max-h-screen overflow-hidden">
            {/* header */}

            <header className=" bg-gradient-to-r border-b-2 border-bg border-[#010117]/10 from-[#010117] via-[#1908376c] to-[#110220] max-h-screen text-left flex items-center">
                <img src={furia} alt="Minha Imagem" className="w-8 h-8 ml-6 my-2" />
                <h1 className="font-russo uppercase bg-gradient-to-r from-[#757575] via-[#ffffff] to-[#b4b1b1] inline-block text-transparent bg-clip-text ml-4 ">furia fan chat</h1>
            </header>

            <div className="flex h-[90%] h-max-screen pl-16 pb-4">
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

                    <div className="flex flex-1 justify-between px-4">

                        <div className="font-wallpoet uppercase bg-gradient-to-r from-[#ebebeb] to-[#aaa8a8]  inline-block text-transparent bg-clip-text text-4xl">
                            furia
                        </div>
                        <div className="font-wallpoet uppercase bg-gradient-to-r from-[#e7e3e3] to-[#ebe6e6]  inline-block text-transparent bg-clip-text text-4xl text-shadow-lg/30">
                            vs
                        </div>
                        <div className="font-wallpoet uppercase bg-gradient-to-r from-[#a8a8a8] to-[#eceaea]  inline-block text-transparent bg-clip-text text-4xl text-shadow-lg/30">
                            teste
                        </div>
                    </div>

                    {/* score container */}
                    <div className="grid grid-cols-3 h-full w-full">
                        {/* left side */}
                        <div className="flex min-w-52 flex-col">
                            <PlayerInfo name="FalleN" life={60} />
                            <PlayerInfo name="KSCERATO" life={5} />
                            <PlayerInfo name="yuurih" life={57} />
                            <PlayerInfo name="skullz" life={77} />
                            <PlayerInfo name="molodoy" life={100} />
                        </div>
                        {/* middle side */}
                        <div className="flex flex-col items-center w-60 justify-end">
                            <div className="font-wallpoet uppercase bg-gradient-to-r from-[#ffffff] via-[#b9b4b4] to-[#f5f3f3] text-transparent bg-clip-text text-3xl">score</div>
                            <div className="font-squada  uppercase bg-gradient-to-r from-[#dfdfdf] via-[#e4e2e2] to-[#ffffff]  text-transparent bg-clip-text text-5xl mt-[10%]">5 - 4</div>
                            <div className="font-wallpoet uppercase bg-gradient-to-r from-[#ffffff] via-[#b9b4b4] to-[#f5f3f3] text-transparent bg-clip-text text-4xl mt-[10%]">mapa</div>
                            <div className="flex justify-center bg-[#D9D9D9]/10 rounded-md border-2 border-[#2f5eecd8]/50 w-32 mt-2">
                                <p className="font-wallpoet uppercase bg-white inline-block text-transparent bg-clip-text text-xl">dust</p>
                            </div>

                            <div className="flex justify-center font-wallpoet uppercase bg-[#f8f8f8] text-transparent bg-clip-text text-xl pt-2">
                                round 7
                            </div>

                        </div>
                        {/* right side */}
                        <div className="flex items-end min-w-52 flex-col">
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

                <div className=" flex flex-col flex-1 h-max-ful items-end pr-16 ">

                    {/*Chat*/}
                    <div className="flex flex-col flex-1 border-2 border-[#656464]/20 w-full h-full rounded-[15px] items-center bg-gradient-radial from-[#010117] via-[#1908376c] to-[#110220]"
                    >
                        <div className="flex w-full">
                            <div className="flex w-[25%] h-[25%] mt-2">
                                <img src={furia} alt="Minha Imagem" className="size-12 ml-4 my-2" />
                            </div>
                            {!user ? (
                                <button className="flex px-4 py-2 text-white font-squada border-2 rounded-lg my-4 gap-2 items-center hover:bg-white/10" onClick={signInWithGoogle}>
                                    <SignIn />

                                    Conecte-se para interagir
                                </button>
                            ) : (
                                <div className="flex px-4 py-2 justify-end text-white font-squada border-2 border-transparent rounded-lg my-4 gap-2 items-center">
                                    <p className="text-white">Olá, {user.displayName}</p>

                                    <button onClick={signOut}>
                                        <SignOut />
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="max-h-[70%] h-[70%] flex-col w-[96%]  border-2 rounded-[15px] border-[#4f4778]/20 justify-center bg-[#262239] p-3 overflow-auto">

                            <ChatMessage message={'Furia vai arrebentar nessa!!!'} name="AnaLaurixxx" />

                            <ChatBot bot={"Proximo jogo FURIA x [Adversario] 27/04"} />

                            <ChatMessage message={'gogogo'} name="leooReis_09" />

                            {messages.map((message) => (
                                <ChatMessage
                                    photoURL={message.photoURL}
                                    message={message.text}
                                    isLoggedUser={message.uid === user?.uid}
                                    name={message.displayName}
                                />
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
                                    className="flex flex-1 w-full font-squada text-lg text-[#e6e3e3] bg-transparent pl-4 focus:outline-none"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            sendMessage(inputValue);
                                        }
                                    }}
                                    placeholder="Digite sua mensagem..."
                                />
                                <button className="flex px-2 items-center "

                                    onClick={() => sendMessage(inputValue)} >
                                    <PaperPlaneRight color="#e3dfdf" size={20}
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

export default Home;
