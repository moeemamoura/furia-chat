import { HandsClapping, Heart } from "@phosphor-icons/react";
import { UserCircle } from "@phosphor-icons/react/dist/ssr";

interface Props {
    name: string;
    message: string;
    isUser?: boolean
}

export function ChatMessage({ message, isUser, name }: Props) {
    function handleEmoji() {
        if (message === ':coracao:') {
            return <Heart />
        }

        if (message === ':palmas:') {
            return <HandsClapping />
        }

        return message;
    }

    return (
        <div className="flex w-full mb-2">
            <div className="p-2 flex flex-col rounded-2xl max-w-[70%] bg-[#4815ccd8]/50 font-squada text-[16px] text-[#ffffff]"
                style={isUser ? { backgroundColor: '#ffffff', marginLeft: 'auto', borderBottomRightRadius: '0px', alignItems: 'end', color: 'black' } : { borderBottomLeftRadius: '0px' }}
            >
                <div className="flex items-center ml-1 mr-1">
                    {!isUser && (
                        <UserCircle className=" mr-2" size={24}
                            color="white" />
                    )}
                    <span className={isUser ? "text-[#2950c7]" : "text-[#eee9fb]"}>
                        {name}
                    </span>
                </div>

                {handleEmoji()}
            </div>
        </div >
    )
}