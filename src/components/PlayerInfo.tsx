interface Props {
    name: string;
    life: number;
    inverted?: boolean;
}

export function PlayerInfo({ name, life, inverted }: Props) {
    return (
        <div className="flex flex-col">
            <p className="font-bold" style={inverted ? { textAlign: 'right' } : {}}>
                {name}
            </p>

            <div className="h-4 bg-black w-28 rounded-md overflow-hidden flex">
                <div className={`bg-violet-500 h-full`} style={{ width: `${life}%` }} />
                <p className="flex absolute text-center">{life}</p>
            </div>
        </div>
    )
}