import { Robot } from "@phosphor-icons/react/dist/ssr";

interface Props {
    bot: string;
}

export function ChatBot({ bot }: Props) {
    return (
        <div className="flex font-russo uppercase text-white bg-transparent text-[12px] p-3 text justify-start items-center">
            <div className="-ml-3 mr-2 ">
                <Robot size={26} />
            </div>
            {bot}
        </div>
    );
}