"use client";
import { useHome } from "@/contexts/home.context";
import Image from "next/image";

export default function Background() {
    const { theme, themeMode } = useHome();

    return (
        <div className="fixed w-full h-full pointer-events-none">
            {theme?.background_image && <Image
                fill
                src={theme.background_image}
                className={`blur-sm scale-[1.01] object-cover object-center ${themeMode === "dark" && "brightness-75"}`}
                alt="web background"
            />}
        </div>
    )
}