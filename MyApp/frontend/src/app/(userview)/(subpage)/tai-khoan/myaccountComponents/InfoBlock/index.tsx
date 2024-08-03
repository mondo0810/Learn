
interface IProps {
    title: string,
    value?: string,
    children?: React.ReactNode
}

export default function InfoBloc(props: IProps) {
    return (
        <div className="grid grid-cols-12 gap-2 bg-white dark:bg-zinc-800 rounded p-2 px-3 mb-1 dark:text-zinc-200 font-semibold">
            <div className="col-span-5">{props.title}</div>
            <div className="col-span-7"> {
                props.value
                    ? props.value
                    : props.children}
            </div>
        </div>
    )
}