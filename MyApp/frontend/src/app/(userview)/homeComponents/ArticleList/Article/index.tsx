import FireworkImg from "@assets/images/decor/phaohoa.png";
import Image from "next/image";

type Props = {
  title?: string;
  children: React.ReactNode;
};

export default function ArticleBox({ title, children }: Props) {
  return (
    <article className="bg-zinc-200 dark:bg-zinc-600 mb-3 rounded-lg overflow-hidden relative">
      <div className="bg-white dark:bg-zinc-800 p-2 md:p-3 md:text-xl w-full relative">
        {/* <Image
          loading="lazy"
          src={FireworkImg}
          alt="firework"
          className="absolute top-0 right-0 w-20 h-20 object-scale-down z-10"
        /> */}

        {title ? (
          <h3 className="uppercase font-bold text-emerald-600 dark:text-emerald-500">{title}</h3>
        ) : (
          <h3 className="bg-zinc-200 w-1/3 rounded-md h-7 animate-pulse"></h3>
        )}
      </div>
      <div className="p-1 md:p-4 grid grid-cols-12 gap-2 md:gap-4">{children}</div>
    </article>
  );
}
