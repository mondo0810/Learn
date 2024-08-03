interface IProps {
    children: React.ReactElement | React.ReactElement[];
}

export default function UITableHead({ children }: IProps) {
    return (
        <thead>
            <tr className="text-md font-semibold tracking-wide capitalize text-center text-zinc-600 dark:text-zinc-200 bg-zinc-200 dark:bg-zinc-600">
                {children}
            </tr>
        </thead>
    );
}