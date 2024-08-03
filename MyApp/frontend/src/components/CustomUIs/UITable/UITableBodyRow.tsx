interface IProps {
    index?: number;
    children: React.ReactElement | React.ReactElement[];
}

export default function UITableBodyRow({ index, children }: IProps) {
    return (
        <tr className="text-md tracking-wide text-center dark:text-zinc-200 border dark:border-zinc-600" key={index}>
            {children}
        </tr>
    );
}