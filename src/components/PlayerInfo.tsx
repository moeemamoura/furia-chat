interface Props {
    name: string;
    life: number;
    inverted?: boolean;
}

export function PlayerInfo({ name, life, inverted }: Props) {
    return (
        <div className="flex flex-col"
            style={inverted ? { textAlign: 'right' } : {}}>
            <p className="font-russo bg-gradient-radial from-[#ffffff] via-[#b4b4b4] to-[#ffffff] text-transparent bg-clip-text  -mb-1 mt-2"
                style={inverted ? { textAlign: 'right', marginRight: 40 } : { marginLeft: 40 }}>
                {name}
            </p>

            <div className="flex gap-2 items-center"
                style={inverted ? { flexDirection: 'row-reverse' } : {}} >
                {/* Valor da vida do lado de fora */}
                <p
                    className="font-russo bg-gradient-radial from-[#e9e7e7] to-[#b4b3b3] text-transparent bg-clip-text w-8"
                    style={inverted ? { textAlign: 'left' } : { textAlign: 'right' }}
                >
                    {life}
                </p>

                {/* Barra de vida */}
                <div className="h-4 bg-purble w-28 overflow-hidden -skew-x-12 flex bg-[#D9D9D9]/10 rounded-xs border-2 border-black/20"
                    style={inverted ? { flexDirection: 'row-reverse' } : {}}
                >
                    <div className="-skew-x-12 bg-[#2950c7]/70" style={{ width: `${life}%` }}></div>
                </div>
            </div>
        </div>
    );
}