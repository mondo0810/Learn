import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";

export default function ImageModal({
  nid,
  nickgameCategory,
  setOpenState,
  images,
}: {
  nid: string;
  nickgameCategory: string;
  setOpenState: Dispatch<SetStateAction<boolean>>;
  images: string[];
}) {
  const [currentImg, setCurrentImg] = useState<number>(0);

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center p-2 z-30 bg-zinc-800/75">
      <div className="relative max-w-7xl mx-auto grid grid-cols-12 gap-2 bg-white dark:bg-zinc-800 p-2 rounded-lg">
        <div
          className="absolute px-3 h-8 w-8 top-[-15px] -right-3 z-10 flex items-center justify-center border-4 border-white dark:border-zinc-800 rounded-full text-sm font-bold cursor-pointer py-1 text-white bg-zinc-800 dark:bg-zinc-200"
          onClick={() => setOpenState(false)}
        >
          <div className="text-xl dark:text-zinc-800">
            <HiMiniXMark />
          </div>
        </div>
        <div className="relative col-span-12 md:col-span-8 max-h-96 md:max-h-[40rem]">
          <Image
            src={images[currentImg]}
            width={1000}
            height={1000}
            loading="eager"
            className="h-full w-full object-cover object-center rounded-lg"
            alt="Ảnh phóng to"
          />
          <span className="absolute bottom-1 right-1 inline-block px-1 rounded text-sm font-semibold text-white bg-zinc-800">
            {currentImg + 1} / {images.length}
          </span>
        </div>
        <div className="relative col-span-12 md:col-span-4">
          <div className="mb-2 bg-red-700 text-white dark:text-zinc-200 py-1 px-2 rounded-lg">
            <div className="uppercase font-bold text-xl">Mã Số: {nid}</div>
            <div className="text-xs text-white dark:text-zinc-200 relative font-medium uppercase">
              Mục: {nickgameCategory}
            </div>
          </div>
          <div className="max-h-[46vh] overflow-y-scroll">
            <div className="grid grid-cols-12 gap-2">
              {images.map((image: string, index: number) => (
                <div className="col-span-3 cursor-pointer" onClick={() => setCurrentImg(index)} key={index}>
                  <div className="relative">
                    <Image
                      src={image}
                      width={64}
                      height={64}
                      className={`w-full h-16 border object-fill object-center rounded-lg hover:border-red-300 ${
                        currentImg === index ? "border-red-600" : ""
                      }`}
                      alt={`Ảnh mô tả thứ ${index + 1}`}
                    />
                    <span className="absolute top-1 right-1 inline-block px-1 rounded-sm text-xs font-semibold text-white bg-red-700">
                      {index + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
