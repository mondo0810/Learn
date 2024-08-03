"use client";
import Link from "next/link"
import { usePathname } from "next/navigation"


interface IProps {
    icon: React.ReactElement;
    title: string;
    links: {
        title: string;
        href: string;
    }[]
}

export default function GroupLink({ icon, title, links }: IProps) {
    const path = usePathname();
    const hasElActive = links.map(link => link.href).some(link => link.length > 1 && path.includes(link));

    return (
        <div className="mb-3">
            <div className="relative font-semibold text-gray-800">
                <span
                    className={`h-7 w-7 rounded-full inline-flex justify-center items-center absolute -top-[2px] text-white dark:text-zinc-800 ${hasElActive ? "bg-red-500" : "bg-zinc-800 dark:bg-zinc-200"}`}>
                    {icon}
                </span>
                <span className={`ml-10 block ${hasElActive ? "text-red-600 dark:text-red-500" : "text-black dark:text-zinc-200"}`}>
                    {title}
                </span>
            </div>
            <div className="ml-11 mt-1 text-sm font-semibold">
                <ul>
                    {links.map((link, index) => (
                        <li key={index}>
                            <Link
                                prefetch
                                href={link.href}
                                className={`block py-1 ${link.href.length > 1 && path.includes(link.href) ? "text-red-600 dark:text-red-500" : "text-zinc-600 dark:text-zinc-400"}`}>
                                {link.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}