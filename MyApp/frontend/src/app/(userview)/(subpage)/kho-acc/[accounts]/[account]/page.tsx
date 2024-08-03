"use client";
import Image from "next/image";
import axios from "@/services/axios";
import BuyModal from "@/components/Modals/BuyModal";
import ImageModal from "@/components/Modals/ImageModal";
import NickgameList from "../accountsComponents/NickgameList";
import UIButton from "@/components/CustomUIs/UIButton";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { HiMiniCheckCircle, HiMiniShoppingCart } from "react-icons/hi2";
import { Carousel } from "flowbite-react";
import { formatCurrency } from "@/services/format";

export default function AccountDetailPage({ params }: { params: { account: string } }) {
  const [openImageModal, setOpenImageModal] = useState(false);
  const [openBuyModal, setOpenBuyModal] = useState(false);
  const [nickgameDetail, setNickgameDetail] = useState<any>(null);
  const [nickgamesSamePrice, setNickgamesSamePrice] = useState([]);
  const [nickgamesRandom, setNickgamesRandom] = useState([]);
  const [slide, setSlide] = useState(0);
  const pathname = usePathname();
  const totalImgs = nickgameDetail?.detail_imgs.length || 0;
  const nickgameCId = pathname.slice(pathname.lastIndexOf("-") + 1, pathname.lastIndexOf("/"));
  const nid = params.account;
  const price = formatCurrency(nickgameDetail?.price || 0);
  const lineData: ILineData[] = [
    // {
    //   title: "Skin súng:",
    //   data: nickgameDetail?.champs_count || "250",
    // },
    // {
    //   title: "Trang phục:",
    //   data: nickgameDetail?.skins_count || "50",
    // },
    // {
    //   title: "Xếp hạng:",
    //   data: nickgameDetail?.rank || "Chưa rank",
    // },
    {
      title: "Trạng thái:",
      data: nickgameDetail?.status || "Acc trắng thông tin",
    },
  ];

  useEffect(() => {
    (async () => {
      const getNickgameDetail = await axios.get(`/nickgame/public/${nid}`);
      const getNickgamesSamePrice = await axios.get(`/nickgame/public/${nid}/price?nickgameCId=${nickgameCId}`);
      const getNickgamesRandom = await axios.get(`/nickgame/public/${nid}/random?nickgameCId=${nickgameCId}`);

      Promise.all([getNickgameDetail, getNickgamesSamePrice, getNickgamesRandom]).then((res) => {
        setNickgameDetail(res[0].data.data);
        setNickgamesSamePrice(res[1].data.data);
        setNickgamesRandom(res[2].data.data);
      });
    })();
  }, []);

  return (
    <>
      {openImageModal && (
        <ImageModal
          nid={nid}
          nickgameCategory={nickgameDetail?.title || ""}
          setOpenState={setOpenImageModal}
          images={nickgameDetail?.detail_imgs || []}
        />
      )}
      {openBuyModal && (
        <BuyModal nid={nid} nickgameData={lineData} setOpenState={setOpenBuyModal} price={nickgameDetail?.price || 0} />
      )}
      <div className="bg-white dark:bg-zinc-800 grid grid-cols-12 gap-4 md:p-3 rounded-lg px-2">
        <div className="col-span-12 md:col-span-6">
          <div className="h-64 md:h-full relative">
            <Carousel slideInterval={5000} indicators={true} onSlideChange={(slide: number) => setSlide(slide + 1)}>
              {totalImgs > 0 ? (
                nickgameDetail.detail_imgs.map((imgUrl: string, index: number) => (
                  <Image
                    key={index}
                    src={imgUrl}
                    width={1000}
                    height={1000}
                    loading="eager"
                    className="object-cover object-center rounded-lg"
                    onClick={() => setOpenImageModal(true)}
                    alt={`Ảnh mô tả sản phẩm ${index}`}
                  />
                ))
              ) : (
                <Image
                  loading="eager"
                  width={1000}
                  height={1000}
                  alt="Ảnh mô tả sản phẩm"
                  src="https://placehold.co/600x400"
                />
              )}
            </Carousel>
            <span className="absolute left-1 bottom-1 inline-block px-2 py-1 rounded text-sm cursor-default font-semibold text-white bg-zinc-800">
              Click để phóng to
            </span>
            <span className="absolute right-1 bottom-1 inline-block px-2 py-1 rounded text-sm cursor-default font-semibold text-white bg-zinc-800">
              {totalImgs === 0 ? 0 : slide} / {totalImgs}
            </span>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6">
          <div
            className="my-3 md:mb-3 md:mt-0 bg-red-700 text-white dark:text-zinc-200 py-1 px-2 rounded-lg"
            style={{ backgroundImage: "url(https://tngshop.vn/bg-1.jpeg)" }}
          >
            <div className="uppercase font-bold text-xl">Mã Số: #{nid}</div>
            <div className="text-xs relative font-semibold uppercase">
              DANH MỤC:
              <span>
                <span>
                  <span> {nickgameDetail?.title || ""}</span>
                </span>
              </span>
            </div>
          </div>

          <div className="rounded-t py-2 px-2 flex justify-between items-center relative bg-red-100">
            <div className="text-red-600 dark:text-red-500">
              <div className="relative text-sm font-semibold" style={{ top: 2 }}>
                <small>
                  <b className="font-bold">THẺ CÀO</b>
                </small>
              </div>
              <div className="text-2xl font-bold">{price}</div>
            </div>

            <div className="text-xs font-bold text-red-400">
              <small>hoặc</small>
            </div>

            <div className="text-red-600 dark:text-red-500">
              <div className="relative text-sm font-semibold" style={{ top: 2 }}>
                <small>
                  <b className="font-bold">ATM/MOMO</b> chỉ cần
                </small>
              </div>
              <div className="text-2xl text-right font-bold">{formatCurrency(nickgameDetail?.price / 1.1 || 0)}</div>
            </div>
          </div>

          <div>
            <div className="mb-3 border rounded-b">
              <div className="grid grid-cols-12 gap-2 border-b p-2">
                <div className="col-span-12">
                  {lineData.map((line: ILineData, index: number) => (
                    <div key={index}>
                      <span className="inline-flex items-center gap-1">
                        <HiMiniCheckCircle />
                        {line.title}
                      </span>
                      <b className="ml-2 text-gray-800">{line.data}</b>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mb-5 md:mb-2">
            <UIButton onClick={() => setOpenBuyModal(true)} fullSized>
              <HiMiniShoppingCart className="mr-2 text-xl" />
              MUA NGAY
            </UIButton>
          </div>
        </div>
      </div>

      {nickgamesSamePrice.length > 0 && (
        <div className="mt-10 text-xl font-bold dark:text-zinc-200">
          TÀI KHOẢN ĐỒNG GIÁ
          <NickgameList data={nickgamesSamePrice} />
        </div>
      )}

      {nickgamesRandom.length > 0 && (
        <div className="mt-10 text-xl font-bold dark:text-zinc-200">
          TÀI KHOẢN ĐỀ XUẤT
          <NickgameList data={nickgamesRandom} />
        </div>
      )}
    </>
  );
}
