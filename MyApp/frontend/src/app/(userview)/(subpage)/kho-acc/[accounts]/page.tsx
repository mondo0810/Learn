"use client";
import { useEffect, useState } from "react";
import { Pagination } from "flowbite-react";
import axios from "@/services/axios";
import NickgameList from "./accountsComponents/NickgameList";
import parse from "html-react-parser";
import SearchFilter from "./accountsComponents/SearchFilter";

export default function NickgameListPage({ params }: { params: { accounts: string } }) {
  const [isHandle, setIsHandle] = useState<boolean>(false);
  const [nickgameC, setNickgameC] = useState<INickgameCategory | undefined>();
  const [nickgames, setNickgames] = useState<INickgame[] | undefined>();
  const [nickgameTotal, setNickgameTotal] = useState<number>(0);
  const [apiParams, setApiParams] = useState<IAccountsFilterParams>({
    page: 1,
    champ: "",
    skin: "",
    moneyUpper: "",
    moneyUnder: "",
    rank: "",
  });
  const nickgameCId = params.accounts.slice(params.accounts.lastIndexOf("-") + 1);
  const description = nickgameC?.description ? parse(nickgameC?.description) : <></>;

  useEffect(() => {
    (async () => {
      const nickgameCData = await axios.get(`/nickgame-category/public/${nickgameCId}`);

      nickgameCData.status === 200 && setNickgameC(nickgameCData.data.data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const nickgameTotalData = await axios.get(`/nickgame-category/public/${nickgameCId}/nickgame/total`, {
        params: apiParams,
      });

      nickgameTotalData.status === 200 && setNickgameTotal(nickgameTotalData.data.data.count);
    })();
  }, [apiParams.champ, apiParams.skin, apiParams.moneyUpper, apiParams.moneyUnder, apiParams.rank]);

  useEffect(() => {
    (async () => {
      const nickgameData = await axios.get(`/nickgame-category/public/${nickgameCId}/nickgame`, {
        params: apiParams,
      });

      nickgameData.status === 200 && setNickgames(nickgameData.data.data);
    })();

    setIsHandle(false);
  }, [apiParams]);

  return (
    <>
      <h4 className="text-sm font-semibold dark:text-zinc-200 underline">DANH MỤC</h4>

      {nickgameC ? (
        nickgameC.title && (
          <h2 className="mb-2 text-red-600 dark:text-red-500 text-lg font-bold uppercase">{nickgameC.title}</h2>
        )
      ) : (
        <div className="mb-2 h-7 w-1/2 bg-zinc-200 rounded-lg animate-pulse" />
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
        <div className="w-full h-48 bg-zinc-200 rounded-lg animate-pulse" />
      )}

      {nickgameC && <SearchFilter handle={isHandle} setHandle={setIsHandle} setParams={setApiParams} />}

      {nickgames ? (
        nickgames.length > 0 ? (
          <NickgameList data={nickgames} />
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

      <div className="py-8 flex items-center justify-center text-center overflow-auto ">
        <Pagination
          currentPage={apiParams.page}
          nextLabel="Xem tiếp"
          previousLabel="Quay lại"
          onPageChange={(page) =>
            setApiParams((pre: IAccountsFilterParams) => ({
              ...pre,
              page,
            }))
          }
          showIcons
          totalPages={nickgameTotal > 0 ? Math.ceil(nickgameTotal / 8) : 1}
        />
      </div>
    </>
  );
}
