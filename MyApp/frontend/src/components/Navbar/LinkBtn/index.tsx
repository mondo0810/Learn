import Link from "next/link";

interface IProps {
    title: string;
    icon: React.ReactElement;
    href: string;
}

export default function LinkBtn({ title, icon, href }: IProps) {
    return (
        <Link
            href={href}
            className="flex ml-2 font-bold text-red-600 dark:text-red-500 hover:text-red-500 dark:hover:text-red-600 px-3 text-sm items-center cursor-pointer"
        >
            <span className="inline-flex items-center justify-center h-6 w-7 rounded bg-zinc-200 dark:bg-zinc-600 mr-2">
                {icon}
            </span>
            {title}
        </Link>
    )
}