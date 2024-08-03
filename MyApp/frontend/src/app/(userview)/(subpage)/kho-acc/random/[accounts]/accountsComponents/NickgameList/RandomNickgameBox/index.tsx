"use client";
import BuyModal from "@/components/Modals/BuyModal";
import { formatCurrency } from "@/services/format";
import Image from "next/image";
import { useState } from "react";
import { HiGift, HiMegaphone, HiMiniShoppingCart } from "react-icons/hi2";

interface IProps {
  thumb_img: string;
  data: INickgameRandomView;
}

export default function RandomNickgameBox({ thumb_img, data }: IProps) {
  const [openBuyModal, setOpenBuyModal] = useState(false);

  return (
    <>
      {openBuyModal && <BuyModal nrid={data?.nrid} setOpenState={setOpenBuyModal} price={data?.price || 0} />}
      <div className="col-span-6 md:col-span-3 h-fit bg-white dark:bg-zinc-800 relative border border-transparent hover:border-red-500 rounded-lg shadow-red-500/50 dark:shadow-red-600/50 shadow-lg transition duration-200">
        <div className="h-32 md:h-40">
          {thumb_img && (
            <Image
              src={thumb_img}
              width={273}
              height={160}
              loading="lazy"
              className="h-full w-full  object-cover object-center rounded-t-md"
              alt="Ảnh minh họa nickgame random"
            />
          )}
          <span className="new-id absolute top-2 left-2 inline-flex items-center px-2 h-6 bg-red-600 text-white font-semibold rounded text-sm">
            MS {data.nrid}
          </span>
        </div>
        <div className="flex justify-center border-b border-zinc-400 py-2 text-center text-sm text-red-600 dark:text-red-500 px-2">
          <HiGift className="my-auto text-base" />
          <p className="ml-1 uppercase font-semibold">Thử vận may ngay nào!</p>
        </div>
        <div className="border-t rounded-b-sm border-zinc-400 px-2 py-1">
          <ul className="rounded-sm w-full font-medium">
            <div className="border-t rounded-b-sm border-gray-100 px-2 py-1">
              <ul className="rounded-sm w-full font-medium">
                <span className="w-full text-center inline-block px-2">
                  <span className="text-gray-600 inline-block text-xs line-through ">
                    {" "}
                    {formatCurrency(data.price * 3)}
                  </span>
                  <span className="text-red-500 text-lg font-extrabold whitespace-nowrap">
                    {" "}
                    {formatCurrency(data.price)}
                  </span>
                </span>
              </ul>
            </div>

            {/* <span className="w-full text-center text-red-600 dark:text-red-500 inline-block font-extrabold px-2">
            {formatCurrency(data.price)}
          </span> */}
          </ul>
        </div>
        <div
          className="w-full flex justify-center cursor-pointer rounded-b-md bg-red-600 dark:bg-red-500 hover:bg-red-500 dark:hover:bg-red-600 text-white dark:text-zinc-200 py-1 px-3"
          onClick={() => setOpenBuyModal(true)}
        >
          <HiMiniShoppingCart className="my-auto text-xl" />
          <p className="ml-1 uppercase font-semibold">Mua ngay</p>
        </div>
      </div>
    </>
  );
}
