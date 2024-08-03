"use client";
import { useAdmin } from "@/contexts/admin.context";

export default function ItemGroup({ label, children }: { label?: string; children: React.ReactNode }) {
  const { wider, menu } = useAdmin();

  return (
    <div>
      {label && (
        <div className="pl-5 pt-3 pb-1 h-10 text-sm text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-gray-800 shadow uppercase font-bold">
          <div className={`${menu ? "block" : wider ? "hidden md:block" : "hidden"}`}>{label}</div>
        </div>
      )}
      {children}
    </div>
  );
}
