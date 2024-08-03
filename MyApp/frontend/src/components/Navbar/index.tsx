"use client";
import LogoBgImg from "@assets/images/decor/logo_bg.png";
import Link from "next/link";
import LoginButton from "./LoginButton";
import LinkBtn from "./LinkBtn";
import { useAuth } from "@/contexts/auth.context";
import { HiBell, HiCreditCard, HiCurrencyDollar, HiLightBulb, HiMagnifyingGlassCircle, HiMoon } from "react-icons/hi2";
import { useHome } from "@/contexts/home.context";
import Image from "next/image";

export default function Navbar() {
  const { user } = useAuth();
  const { theme, themeMode, toggleThemeMode } = useHome();

  return (
    <div className="sticky top-0 bg-white dark:bg-zinc-800 border-b border-zinc-600 dark:border-zinc-200 shadow-xl z-20">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-2">
        <div className="flex">
          <Link className="min-w-[6rem] max-w-[8rem] h-11 flex justify-center relative" href="/">
            {themeMode === "light"
              ? theme?.logo_light && (
                  <Image
                    src={theme.logo_light}
                    width={70}
                    height={44}
                    className="h-full w-auto relative z-10"
                    alt="logo light"
                    loading="eager"
                    priority={true}
                  />
                )
              : theme?.logo_dark && (
                  <Image
                    src={theme.logo_dark}
                    width={70}
                    height={44}
                    className="h-full w-auto relative z-10"
                    alt="logo dark"
                    loading="eager"
                    priority={true}
                  />
                )}
          </Link>

          <div className="ml-8 hidden md:flex">
            <LinkBtn
              title="NẠP THẺ"
              icon={<HiCurrencyDollar className="text-xl" />}
              href="/tai-khoan/giao-dich/nap-the"
            />
            <LinkBtn title="NẠP ATM/MOMO NÈ Ba" icon={<HiCreditCard className="text-xl" />} href="/" />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-right text-red-600 dark:text-red-500">
          {user && (
            <Link
              href="/tai-khoan/thong-bao"
              className="mr-3 md:mr-4 inline-flex items-center justify-center text-2xl hover:cursor-pointer"
            >
              <HiBell />
            </Link>
          )}

          <button
            className="mr-3 md:mr-4 inline-flex items-center justify-center text-2xl hover:cursor-pointer"
            onClick={() => toggleThemeMode()}
          >
            {themeMode === "dark" ? <HiLightBulb /> : <HiMoon />}
          </button>

          <LoginButton />
        </div>
      </div>
    </div>
  );
}
