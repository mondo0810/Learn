"use client";
import Link from "next/link";
import MesImage from "@assets/images/funcIcon/message.png";
import { useHome } from "@/contexts/home.context";
import Image from "next/image";

export default function PageAction() {
  const { contact } = useHome();

  return (
    <div className="fixed bottom-2 right-2 md:bottom-6 md:right-6 flex flex-col gap-3 items-center z-20">
      <Link
        href={contact?.fanpage_link || "/"}
        target="_blank"
        className="h-10 md:h-12 w-10 md:w-12 flex items-center justify-center hover:scale-90 duration-200"
      >
        <Image alt="messenger contact" src={MesImage} />
      </Link>
    </div>
  );
}
