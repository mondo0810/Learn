"use client";
import UISelect from "@/components/CustomUIs/UISelect";
import UITextInput from "@/components/CustomUIs/UITextInput";
import { HiMegaphone, HiMiniFunnel, HiMiniTrash } from "react-icons/hi2";
import UIButton from "@/components/CustomUIs/UIButton";
import { Dispatch, SetStateAction, useState } from "react";
import { moneyList, rankList } from "./filterLists";
import MarqueeComponent, { DataList } from "@/components/MarqueeComponent";

interface IProps {
  handle: boolean;
  setHandle: Dispatch<SetStateAction<boolean>>;
  setParams: Dispatch<SetStateAction<IAccountsFilterParams>>;
}

export default function SearchFilter({ handle, setHandle, setParams }: IProps) {
  const [showFunc, setShowFunc] = useState<boolean>(false);
  const [formKey, setFormKey] = useState<number>(0);

  const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHandle(true);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const champ = formData.get("champ") as string;
    const skin = formData.get("skin") as string;
    const money = (formData.get("money") as string).split("-");
    const rank = formData.get("rank") as string;

    setParams({
      page: 1,
      champ: champ,
      skin: skin,
      moneyUpper: money[0],
      moneyUnder: money[1],
      rank: rank,
    });
  };

  const handleClearFilter = () => {
    setParams({
      page: 1,
      champ: "",
      skin: "",
      moneyUpper: "",
      moneyUnder: "",
      rank: "",
    });
    setFormKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      <section className="py-5">
        <div className="mb-1">
          <h4 className="text-sm dark:text-zinc-200 font-semibold mb-2">BỘ LỌC TÌM KIẾM</h4>
          <UIButton className="md:hidden" onClick={() => setShowFunc(!showFunc)} fullSized>
            <HiMiniFunnel className="text-xl mr-1" />
            {showFunc ? "Thu lại" : "Tìm kiếm"}
          </UIButton>
        </div>

        <form
          key={formKey}
          className={`${showFunc ? "grid" : "hidden"} md:grid grid-cols-12 gap-3`}
          onSubmit={handleFilter}
        >
          <div className="col-span-12 md:col-span-3">
            <UITextInput
              type="number"
              name="champ"
              placeholder="Không dưới..."
              min={0}
              max={1000}
              label="Số tướng tối thiểu"
            />
          </div>

          <div className="col-span-12 md:col-span-3">
            <UITextInput
              type="number"
              name="skin"
              min={0}
              max={10000}
              placeholder="Không dưới..."
              label="Số trang phục tối thiểu"
            />
          </div>

          <div className="col-span-12 md:col-span-3">
            <UISelect name="money" label="Giá tiền trong khoảng" data={moneyList}></UISelect>
          </div>

          <div className="col-span-12 md:col-span-3">
            <UISelect name="rank" label="Xếp hạng ở" data={rankList}></UISelect>
          </div>

          <div className="col-span-12 md:col-span-3">
            {!handle ? (
              <UIButton type="submit" fullSized>
                <HiMiniFunnel className="text-xl mr-1" />
                <span className="ml-2">Lọc</span>
              </UIButton>
            ) : (
              <UIButton fullSized isProcessing disabled>
                <HiMiniFunnel className="text-xl mr-1" />
                <span className="ml-2">Đang lọc...</span>
              </UIButton>
            )}
          </div>

          <div className="col-span-12 md:col-span-3">
            <UIButton colorType="purple" onClick={handleClearFilter} fullSized>
              <HiMiniTrash className="text-xl mr-1" />
              <span className="ml-2">Xóa lọc</span>
            </UIButton>
          </div>
        </form>
      </section>
      <section className="relative  w-full flex text-red-600 dark:text-red-500 font-bold bg-white dark:bg-zinc-800 rounded-lg overflow-x-hidden">
        <div className="flex justify-center items-center text-xl h-10 w-10 rounded-lg">
          <HiMegaphone />
        </div>
        <MarqueeComponent />
        <div className="scrollable-container"></div>
      </section>
    </>
  );
}
