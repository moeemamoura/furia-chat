import { HandsClapping, Heart, User } from "@phosphor-icons/react";
import { UserCircle } from "@phosphor-icons/react/dist/ssr";

interface Props {
    name: string;
    message: string;
    photoURL?: string;
    isLoggedUser?: boolean
}

export function ChatMessage({ message, isLoggedUser, name, photoURL }: Props) {
    function handleMessage() {
        if (message === ':coracao:') {
            return <Heart weight="bold" />
        }

        if (message === ':palmas:') {
            return <HandsClapping weight="bold" />
        }

        return message;
    }

    return (
        <div className="flex w-full mb-2">
            <div className="p-2 flex flex-col gap-1 rounded-2xl max-w-[70%] bg-[#4815ccd8]/50 font-squada text-[16px] text-[#ffffff]"
                style={isLoggedUser ? { backgroundColor: '#ffffff', marginLeft: 'auto', borderBottomRightRadius: '0px', alignItems: 'end', color: '#393d42' } : { borderBottomLeftRadius: '0px' }}
            >
                <div className="flex items-center mx-1">
                    {(!isLoggedUser && !photoURL) && (
                        <div className="flex w-6 h-6 rounded-full border-2 mr-2 items-center justify-center overflow-hidden">
                            <User size={24}
                                color="white" />
                        </div>
                    )}
                    {(!isLoggedUser && photoURL) && (
                        <img src={photoURL} className="w-6 h-6 rounded-full mr-2 border-2" />
                    )}
                    <span className={isLoggedUser ? "text-[#2950c7]" : "text-[#eee9fb]"}>
                        {name}
                    </span>
                </div>

                <p className="font-squada ml-1">{handleMessage()}</p>
            </div>
        </div >
    )
}