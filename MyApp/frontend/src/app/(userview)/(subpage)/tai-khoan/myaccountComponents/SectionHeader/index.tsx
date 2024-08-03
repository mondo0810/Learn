interface IProps {
    title: string;
    description: string;
    children?: React.ReactNode;
}

export default function SectionHeader(props: IProps) {
    return (
        <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 md:py-4 md:px-5 w-full mb-4">
            <div className="border-b border-zinc-400 pb-2 mb-4 text-zinc-800 dark:text-zinc-200">
                <h2 className="text-lg font-semibold">{props.title}</h2>
                <p className="text-xs">
                    {props.description}
                </p>
            </div>

            {props.children}
        </div>
    )
}