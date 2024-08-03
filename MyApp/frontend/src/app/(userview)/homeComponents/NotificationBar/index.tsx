"use client";
import { useHome } from "@/contexts/home.context";
import { HiMegaphone } from "react-icons/hi2";
import parse from 'html-react-parser';

export default function NotificationBar() {
    const { config } = useHome();
    const content = parse(config?.notification || '');

    return (
        <section className="relative my-4 w-full flex text-red-600 dark:text-red-500 font-bold bg-white dark:bg-zinc-800 rounded-lg overflow-x-hidden">
            <div className="flex justify-center items-center text-xl h-10 w-10 rounded-lg">
                <HiMegaphone />
            </div>

            <div className="flex items-center px-2 py-1 w-full">
                {/* @ts-ignore */}
                <marquee>
                    {content}
                {/* @ts-ignore */}
                </marquee>
            </div>
        </section>
    )
}