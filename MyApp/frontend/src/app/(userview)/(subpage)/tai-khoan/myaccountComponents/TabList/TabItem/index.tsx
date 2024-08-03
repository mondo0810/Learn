"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IProps {
  icon_src: any;
  fulltext: string;
  shorttext: string;
  game_name: string;
  href: string;
}

export default function TabItem(props: IProps) {
  const path = usePathname();
  const is_active = props.href.endsWith(path);

  return (
    <Link
      prefetch
      href={props.href}
      className={`flex col-span-4 p-2 font-semibold border-b focus:outline-none cursor-pointer relative hover:border-red-500
                ${
                  is_active
                    ? "bg-red-500 border-red-500 after:contents-[''] after:absolute after:top-[102%] after:left-[50%] after:-ml-[8px] after:border-[8px] after:border-transparent after:border-t-red-500"
                    : "dark:text-zinc-200 dark:border-zinc-800 dark:hover:border-red-500 bg-transparent"
                }`}
    >
      <Image src={props.icon_src} width={48} height={48} className="hidden md:block rounded-lg" alt={props.game_name} />

      <div className="flex-grow">
        <h1 className="text-center">
          Rút <span className="hidden md:inline-block">{props.fulltext}</span>
          <span className="inline-block md:hidden">{props.shorttext}</span>
        </h1>

        <h3 className="text-xs md:text-sm font-semibold text-center">({props.game_name})</h3>
      </div>
    </Link>
  );
}
