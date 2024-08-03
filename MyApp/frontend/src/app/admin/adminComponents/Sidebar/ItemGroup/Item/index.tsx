"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdmin } from "@/contexts/admin.context";

export default function Item({ href, icon, label }: { href: string; icon?: React.ReactElement; label: string }) {
  const pathname = usePathname();
  const { wider, menu, setMenu } = useAdmin();

  return (
    <Link
      onClick={() => setMenu(false)}
      className={`h-10 flex font-medium hover:bg-gray-400 dark:hover:bg-white/25 rounded-lg ${
        pathname === href &&
        "text-gray-300 dark:text-gray-700 bg-gray-500 dark:bg-white/50 hover:bg-black/50 dark:hover:dark:bg-white/50 cursor-default"
      }`}
      href={href}
    >
      {icon ? (
        <>
          <div
            className={`${menu ? "w-1/5" : wider ? "w-0 md:w-1/5" : "w-full"} flex text-lg justify-center items-center`}
          >
            {icon}
          </div>
          <div className={`${menu ? "flex" : wider ? "w-4/5 hidden md:flex" : "hidden"} items-center`}>{label}</div>
        </>
      ) : (
        <div className={`${menu ? "flex" : wider ? "hidden md:flex" : "hidden"} ml-[50px] items-center`}>{label}</div>
      )}
    </Link>
  );
}
