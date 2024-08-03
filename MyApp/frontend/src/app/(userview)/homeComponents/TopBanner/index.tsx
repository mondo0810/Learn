"use client";
import { HiGift } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { Carousel, Tabs } from "flowbite-react";
import parse from "html-react-parser";
import Item from "./Item";
import "animate.css";
import { UIButton, UITabs } from "@/components/CustomUIs";
import { useHome } from "@/contexts/home.context";
import Image from "next/image";
import FormRecharge from "../../(subpage)/tai-khoan/myaccountComponents/Form/FormRecharge";
import { useState, useRef, useEffect } from "react";
import Modal from "@/components/Modals/Modal";

export default function TopBanner() {
  const { config, top5 } = useHome();
  const router = useRouter();

  const [isModalOpen, setModalOpen] = useState(true);

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {config?.event && <Modal content={config?.event} isModalOpen={isModalOpen} closeModal={closeModal} />}
      <div className="flex flex-col md:flex-row gap-2 lg:h-[365px]">
        <div className="md:w-8/12 h-full">
          {/* <div className="relative">
            <iframe
              className="w-full h-80"
              src="https://www.youtube.com/embed/I8wDHUZSWWg?si=46G2Wx9DiVJcOpUj"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div> */}
          <Carousel slideInterval={3000}>
            {config?.banner?.map((src, index) => (
              <div key={index} className="relative w-full  pb-[56.25%] ">
                <Image
                  src={src}
                  fill
                  quality={80}
                  loading="eager"
                  priority={true}
                  alt="top banner"
                  className="block md:object-scale-down"
                />
              </div>
            )) || <div className=" bg-zinc-200 animate-pulse"></div>}
          </Carousel>
        </div>
        <div className="md:w-4/12 bg-white dark:bg-zinc-800 rounded-lg z-10 h-full">
          <UITabs style="underline">
            <Tabs.Item active title="NẠP THẺ" icon={HiGift}>
              <div className="px-2 mx-auto ">
                <FormRecharge />
              </div>
            </Tabs.Item>
            <Tabs.Item
              title={
                <p className="relative">
                  TOP NẠP T. {new Date().getMonth() + 1}
                  <span className="text-xs flex justify-center font-bold px-2 h-4 bg-amber-500 rounded text-white dark:text-zinc-200">
                    <small>THẺ CÀO, MOMO, BANK</small>
                  </span>
                </p>
              }
            >
              <div className="px-3 flex flex-col overflow-y-auto">
                {(top5.length > 0 && top5.map((data, index) => <Item data={data} key={index} />)) || (
                  <div>
                    <h1 className="text-center text-zinc-500">Hãy là người nạp thẻ đầu tiên nhé</h1>
                  </div>
                )}
                <div className="mt-auto">
                  <div className="mx-auto w-2/3 border-t border-l-none border-r-none border-b-none border-zinc-500 my-2" />
                  <UIButton onClick={() => router.push("/tai-khoan/giao-dich/nap-the")} fullSized>
                    NẠP THẺ NGAY
                  </UIButton>
                </div>
              </div>
            </Tabs.Item>
          </UITabs>
        </div>
      </div>
    </>
  );
}
