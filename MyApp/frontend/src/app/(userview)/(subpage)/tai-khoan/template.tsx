"use client";

import React from "react";
import { useAuth } from "@/contexts/auth.context";
import Sidebar from "../tai-khoan/myaccountComponents/Sidebar";

export default function MyAccountTemplate({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return !!user ? (
    <div className="max-w-6xl mx-auto my-8 grid grid-cols-10 gap-2 px-2 relative">
      <div className="col-span-2 hidden md:block">
        <Sidebar />
      </div>
      <div className="col-span-12 md:col-span-8">{children}</div>
    </div>
  ) : (
    <div className="max-w-6xl h-full mx-auto flex justify-center items-center dark:text-zinc-200">
      <div className="flex flex-col items-center px-2">
        <h1 className="text-xl font-medium">Đăng nhập để hiển thị</h1>
        <p>Vui lòng đăng ký tài khoản để sử dụng tính năng này nha bạn &lt;3</p>
        <img src="/images/napthe.svg" alt="" />
      </div>
    </div>
  );
}
