"use client";
import { useEffect, useState } from "react";
import { Pagination } from "flowbite-react";
import axios from "@/services/axios";
import NickgameList from "./accountsComponents/NickgameList";
import parse from "html-react-parser";
import { HiMegaphone } from "react-icons/hi2";
import MarqueeComponent from "@/components/MarqueeComponent";

export default function RandomNickgameListPage({ params }: { params: { accounts: string } }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [nickgameC, setNickgameC] = useState<INickgameCategory | undefined>();
  const [nickgameRandoms, setNickgameRandoms] = useState<INickgameRandomView[] | undefined>();
  const [nickgameRandomTotal, setNickgameRandomTotal] = useState<number>(0);
  const nickgameCId = params.accounts.slice(params.accounts.lastIndexOf("-") + 1);
  const description = nickgameC?.description ? parse(nickgameC?.description) : <></>;

  useEffect(() => {
    (async () => {
      Promise.all([
        await axios.get(`/nickgame-category/public/${nickgameCId}`),
        await axios.get(`/nickgame-category/public/${nickgameCId}/nickgame-random/total`),
      ]).then((res) => {
        res[0].status === 200 && setNickgameC(res[0].data.data);
        res[1].status === 200 && setNickgameRandomTotal(res[1].data.data.count);
      });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const nickgameRandomData = await axios.get(
        `/nickgame-category/public/${nickgameCId}/nickgame-random?page=${currentPage}`
      );

      nickgameRandomData.status === 200 && setNickgameRandoms(nickgameRandomData.data.data);
    })();
  }, [currentPage]);

  return (
    <>
      <h4 className="text-sm font-semibold dark:text-zinc-200 underline">DANH MỤC</h4>

      {nickgameC ? (
        nickgameC.title && (
          <h2 className="mb-2 text-red-600 dark:text-red-500 text-lg font-bold uppercase">{nickgameC.title}</h2>
        )
      ) : (
        <div className="mb-2 h-7 w-1/2 bg-zinc-200 animate-pulse" />
      )}

      {nickgameC ? (
        nickgameC.description ? (
          <p className="bg-white dark:bg-zinc-800 dark:text-zinc-200 w-full h-48 rounded-lg font-semibold py-2 px-5 overflow-y-scroll">
            {description}
          </p>
        ) : (
          <p className="bg-white dark:bg-zinc-800 dark:text-zinc-200 w-full h-48 rounded-lg font-semibold py-2 px-5 overflow-y-scroll">
            Vui lòng thêm mô tả...
          </p>
        )
      ) : (
        <div className="w-full h-48 bg-zinc-200 animate-pulse" />
      )}
      <section className="relative mt-5  w-full flex text-red-600 dark:text-red-500 font-bold bg-white dark:bg-zinc-800 rounded-lg overflow-x-hidden">
        <div className="flex justify-center items-center text-xl h-10 w-10 rounded-lg">
          <HiMegaphone />
        </div>

        <MarqueeComponent />
      </section>
      {nickgameRandoms ? (
        nickgameRandoms.length > 0 ? (
          <NickgameList info={nickgameC} data={nickgameRandoms} />
        ) : (
          <div className="h-36 flex justify-center items-center font-semibold text-zinc-400">
            <h2>Không tìm thấy tài khoản hoặc đã được bán hết. Vui lòng quay lại sau!</h2>
          </div>
        )
      ) : (
        <div className="h-36 flex justify-center items-center font-semibold text-zinc-400">
          <h2>Đang tải...</h2>
        </div>
      )}

      <div className="py-8 flex items-center justify-center text-center">
        <Pagination
          currentPage={currentPage}
          nextLabel="Xem tiếp"
          previousLabel="Quay lại"
          onPageChange={(page) => setCurrentPage(page)}
          showIcons
          totalPages={nickgameRandomTotal > 0 ? Math.ceil(nickgameRandomTotal / 8) : 1}
        />
      </div>
    </>
  );
}
