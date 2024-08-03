import Link from "next/link";
import { FaCaretRight } from "react-icons/fa";

interface IProps {
    title: string;
    links: {
        title: string;
        href: string;
        role?: string;
        new?: boolean;
    }[];
    role: string;
}

export default function GroupLink(props: IProps) {
    return (
        <>
            <span className="mt-2 text-red-500 font-bold text-sm block px-3 uppercase ">
                {props.title}
            </span>
            <div className="px-2">
                {props.links.map((link, index) => (
                    link.role && link.role > props.role ? null : <Link
                        href={link.href}
                        key={index}
                        className="flex items-center font-semibold dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-600 rounded-lg py-1 px-3 text-sm"
                    >
                        <span className="text-zinc-600 dark:text-zinc-400 text-[9px] font-semibold">
                            <FaCaretRight className="top-[1px] mr-3 text-base" />
                        </span>
                        {link.title}
                        {link.new
                            ? <span
                                className="text-xs px-2 inline-block rounded bg-red-600 text-white font-medium top-[1px] ml-2">
                                Mới
                            </span>
                            : undefined}
                    </Link>
                ))}
            </div>
        </>
    )
}