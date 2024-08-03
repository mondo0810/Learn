"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAdmin } from "@/contexts/admin.context";
import Button from "../../../../adminComponents/Button";

export default function NestedItem({
  href,
  icon,
  label,
  children,
}: {
  href: string;
  icon?: React.ReactElement;
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const { wider, menu } = useAdmin();
  const current = pathname.startsWith(href) && !pathname.startsWith(href + "-");

  useEffect(() => {
    if (!current) setOpen(false);
  }, [pathname]);

  return (
    <>
      <div
        className={`h-10 flex relative font-medium  hover:bg-gray-400  rounded-lg cursor-pointer ${
          current &&
          "text-gray-300 dark:text-gray-700 bg-black/50 dark:bg-white/50 hover:bg-black/50 dark:hover:dark:bg-white/50"
        }`}
        onClick={() => setOpen(!open)}
      >
        {icon ? (
          <>
            <div
              className={`${
                menu ? "w-1/5" : wider ? "w-0 md:w-1/5" : "w-full"
              } flex text-lg justify-center items-center`}
            >
              {icon}
            </div>
            <div
              className={`${menu ? "flex" : wider ? "w-4/5 hidden md:flex" : "hidden"} pr-10 items-center capitalize`}
            >
              {label}
            </div>
          </>
        ) : (
          <div className="pr-10 flex items-center capitalize">{label}</div>
        )}
        <Button
          className={`${menu ? "block" : wider ? "hidden md:block" : "hidden"} absolute top-1 right-1 fill-slate-600`}
        >
          {open ? (
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
              <path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
              <path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
            </svg>
          )}
        </Button>
      </div>
      {open && <div>{children}</div>}
    </>
  );
}
