"use client";
import Link from "next/link";
import { formatCurrency, formatLink } from "@/services/format";
import { generateRandomNumber } from "@/services/generate";
import DefaultGif from "@assets/images/default/default-gif.gif";
import Image from "next/image";
import { useState } from "react";

interface IProps {
  nickgameC?: INickgameCategory;
  game?: ILuckyWheelGame;
  buyItem?: any;
}

export default function ArchiveBox({ nickgameC, buyItem, game }: IProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return nickgameC || game || buyItem ? (
    <Link
      className="col-span-6 sm:col-span-6 md:col-span-3 bg-white shadow-sm rounded-b-sm border md:border-0 md:rounded-b relative"
      href={
        (nickgameC &&
          `/kho-acc/${nickgameC.random ? "random/" + formatLink(nickgameC?.title) : formatLink(nickgameC?.title)}-${
            nickgameC?.id
          }`) ||
        (game && `/tro-choi/${formatLink(game.name)}-${game.id}`) ||
        (buyItem && `/buy-item/${buyItem.id}`) ||
        ""
      }
    >
      <div className="col-span-5 overflow-hidden">
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          {!isLoaded && (
            <div>
              {" "}
              <Image
                src="/loading.gif"
                className="absolute top-0 left-0 w-full h-full object-cover object-center rounded-t-sm md:rounded-t "
                width={261}
                height={100}
                alt={`Ảnh minh họa`}
              />
            </div>
          )}
          <Image
            src={nickgameC?.thumb_img || game?.thumb_img || buyItem?.thumb_img || DefaultGif}
            width={261}
            height={100}
            className="absolute top-0 left-0 w-full h-full object-cover object-center rounded-t-sm md:rounded-t "
            alt={`Ảnh minh họa ${nickgameC?.title || game?.name || buyItem?.name}`}
            onLoad={() => setIsLoaded(true)}
          />
        </div>
      </div>

      <div className="col-span-12 px-2 py-3 h-28 relative">
        <h4 className="uppercase text-xs font-semibold mb-0">{nickgameC?.title || game?.name || buyItem?.name}</h4>
        <div className="my-1 text-xs">
          {nickgameC && (
            <div>
              <span>
                Chưa bán:<b className="text-red-500"> {nickgameC?.total_available}</b>
              </span>
            </div>
          )}

          <span>
            {nickgameC || buyItem ? "Đã bán:" : "Đã chơi:"}{" "}
            <b className="text-red-500">
              {nickgameC?.sold_out || buyItem?.sold_out + 1050 || (game?.sold_out ?? 0) + 1280} lượt
            </b>
          </span>
        </div>
        <div className="absolute bottom-2 right-2 left-2 mt-2 capitalize">
          <div className="bg-[url('/voucher3.png')] bg-[length:105%_80%] bg-center bg-repeat text-[white] font-semibold text-xs leading-4 text-center border cursor-default inline-block px-1.5 rounded-sm border-[#ff414100]">
            {nickgameC?.notice || game?.description || buyItem?.name}
          </div>
        </div>
      </div>
    </Link>
  ) : (
    <div className="col-span-6 md:col-span-3 bg-white border rounded-lg overflow-hidden animate-pulse">
      <div className="h-36 bg-gray-200"></div>
      <div className="px-2 py-3 h-28">
        <h4 className="bg-gray-200 mb-0 h-5 w-1/2 rounded"></h4>
        <h5 className="bg-gray-200 my-1 h-4 w-1/3 rounded"></h5>
      </div>
    </div>
  );
}
