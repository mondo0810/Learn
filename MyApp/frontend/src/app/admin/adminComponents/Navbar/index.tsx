"use client";
import { useEffect, useState } from "react";
import { HiBell, HiLightBulb, HiMiniBars3, HiMoon } from "react-icons/hi2";
import Link from "next/link";
import Image from "next/image";
import { useAdmin } from "@/contexts/admin.context";
import { useAuth } from "@/contexts/auth.context";
import axios from "@/services/axios";
import Button from "../../adminComponents/Button";
import NotificationModal from "../Modal";

export default function AdminNavbar() {
  const { user } = useAuth();
  const { themeMode, toggleThemeMode, wider, setWider, menu, setMenu, isMobile } = useAdmin();
  const [webName, setWebName] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    axios.get("/setting/public/config").then((res) => {
      setWebName(res.data.data.name);
    });
  }, [webName]);

  return (
    <>
      {/* {openModal && <NotificationModal setState={() => setOpenModal(false)} />} */}
      <nav className={`shadow-lg bg-slate-800 h-14 w-full flex fixed z-10 ${menu && "touch-none"}`}>
        <div className={`${wider ? "w-16 md:w-64" : "w-16"} bg-slate-800 flex`}>
          <div className={`${wider ? "w-full md:w-1/5" : "w-full"} flex`}>
            <Button
              className="text-gray-200 text-xl"
              onClickFunc={isMobile ? () => setMenu(!menu) : () => setWider(!wider)}
            >
              <HiMiniBars3 />
            </Button>
          </div>
          <div className={`${wider ? "w-4/5 hidden md:flex" : "hidden"}`}>
            <Link className="my-auto text-gray-200 text-xl uppercase font-bold" href="/">
              {webName}
            </Link>
          </div>
        </div>

        <div className="ml-auto flex">
          <div className="flex mr-4">
            <Button className="text-xl text-gray-200" onClickFunc={() => toggleThemeMode()}>
              {themeMode === "dark" ? <HiLightBulb /> : <HiMoon />}
            </Button>
            <Button
              className="ml-4 text-xl text-gray-200"
              // onClickFunc={() => setOpenModal(true)}
            >
              <Link href={"/tai-khoan/thong-bao"}>
                <HiBell />
              </Link>
            </Button>
          </div>

          <div className="before:content-[''] before:w-[1px] before:h-full before:absolute before:left-0 before:bg-gray-200/50 w-16 md:w-36 relative flex justify-center bg-slate-800">
            {user?.avatar && (
              <Image
                src={user.avatar}
                height={40}
                width={40}
                className="m-2 md:bg-sky-100 rounded-full"
                alt="admin avatar"
              />
            )}
            <div className="m-2 ml-0 hidden md:block font-bold text-center text-sm text-gray-200 leading-4">
              {user?.username && (user.username.length > 7 ? user.username.slice(0, 7) + ".." : user.username)}
              <br />
              <span className="text-yellow-300">ADMIN</span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
