"use client";
import axios from "@/services/axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import UITable, {
  UITableHead,
  UITableHeadCell,
  UITableBody,
  UITableBodyRow,
  UITableBodyCell,
} from "@/components/CustomUIs/UITable";
import { useAuth } from "@/contexts/auth.context";
import { formatDateTime } from "@/services/format";
import SectionHeader from "../../tai-khoan/myaccountComponents/SectionHeader";

const BuyItemComponent = ({ params }: { params: { buyItemId: string } }) => {
  const [selectedPack, setSelectedPack] = useState<string>("");
  const [robloxAccount, setRobloxAccount] = useState<string>("");
  const [buyItem, setBuyItem] = useState<any | undefined>();

  const [withdrawData, setWithdrawData] = useState<IBuyItemHistory[]>([]);
  const [packOptions, setPackOptions] = useState<any[]>([]);
  const id = params.buyItemId.slice(params.buyItemId.lastIndexOf("-") + 1);
  const { login } = useAuth();

  useEffect(() => {
    (async () => {
      const res = await axios.get(`/gift-withdrawal-history/user/getTitle/${id}`);

      res.status === 200 && setBuyItem(res.data.data);
    })();
  }, []);

  useEffect(() => {
    axios.get(`/gift-withdrawal-history/user/getHistoryBuyItemById?limit=10&buyItemId=${id}`).then((res) => {
      setWithdrawData(res.data.data);
    });
  }, [login]);

  useEffect(() => {
    axios.get("/gift-withdrawal-history/user/getPackBuyItem/" + id).then((res) => {
      setPackOptions(res.data.data);
    });
  }, [login]);

  const handlePackChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPack(event.target.value);
  };

  const handleRobloxAccountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRobloxAccount(event.target.value);
  };

  const handleBuyItem = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevents the default form submission behavior

    try {
      login();
      const res = await axios.post("/gift-withdrawal-history/user/buyItem/" + id, {
        pack: parseInt(selectedPack),
        ingame: robloxAccount,
      });
      const data = res.data;
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error.message || "Lỗi không xác định");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="w-full px-3 my-10  bg-white rounded mx-auto">
        <h4 className="text-sm font-semibold dark:text-zinc-200 underline mt-5 inline-block">DANH MỤC</h4>

        {buyItem ? (
          buyItem.name && (
            <h1 className="mb-2 text-red-600 dark:text-red-500 text-3xl font-bold uppercase">{buyItem.name}</h1>
          )
        ) : (
          <div className="mb-2 h-7 w-1/2 bg-zinc-200 rounded-lg animate-pulse" />
        )}
        {buyItem ? (
          buyItem.description ? (
            <p className="  w-full  font-semibold py-2 ">{buyItem.description}</p>
          ) : (
            <p className="  w-full  font-semibold py-2 ">Vui lòng thêm mô tả...</p>
          )
        ) : (
          <div className="w-full  animate-pulse" />
        )}
        <div className="flex flex-col-reverse md:flex-row justify-between items-start gap-10 py-5">
          {" "}
          <form onSubmit={handleBuyItem} className=" w-full md:w-2/3 ">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Tùy chọn gói kim cương
            </label>
            <select
              className=" w-full bg-gray-200 border border-gray-200  py-3 px-4 pr-8 rounded focus:outline-none focus:bg-white focus:border-gray-500 text-red-500 font-semibold"
              value={selectedPack}
              onChange={handlePackChange}
              required
            >
              <option value="" style={{ display: "none" }}>
                Chọn gói trong danh sách
              </option>
              {packOptions.map((pack) => (
                <option
                  key={pack.value}
                  value={pack.value}
                  data-amount={pack.amount}
                  className="whitespace-nowrap text-sm"
                >
                  {pack.label} - {pack.amount} VNĐ
                </option>
              ))}
            </select>

            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-5">ID GAME</label>
            <input
              type="text"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded  py-3 px-4 "
              placeholder="Nhập ID game"
              value={robloxAccount}
              onChange={handleRobloxAccountChange}
              required
            />

            <button
              type="submit"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 mt-8  w-1/2 rounded focus:outline-none focus:shadow-outline block mx-auto"
            >
              Thanh Toán
            </button>
          </form>
          {buyItem && (
            <Image
              src={buyItem.thumb_img}
              width={273}
              height={160}
              loading="lazy"
              className="h-full md:w-1/3 w-full  object-cover object-center rounded-t-md block"
              alt="Ảnh minh họa nickgame random"
            />
          )}
        </div>
      </div>

      <SectionHeader title="Lịch sử giao dịch" description="Lịch sử 10 đơn gần đây nhất.">
        <UITable>
          <UITableHead>
            <UITableHeadCell>STT</UITableHeadCell>
            <UITableHeadCell>Đơn hàng </UITableHeadCell>
            <UITableHeadCell>Nội dung</UITableHeadCell>
            <UITableHeadCell>Trạng thái</UITableHeadCell>
            <UITableHeadCell>Giá</UITableHeadCell>
            <UITableHeadCell>Thời gian rút</UITableHeadCell>
          </UITableHead>
          <UITableBody>
            {withdrawData?.map((item, index) => (
              <UITableBodyRow key={index}>
                <UITableBodyCell>{index + 1}</UITableBodyCell>
                <UITableBodyCell>
                  {packOptions.find((pack) => pack.value === item.pack)?.label || "Unknown Pack"}
                </UITableBodyCell>
                <UITableBodyCell>{item.ingame}</UITableBodyCell>
                <UITableBodyCell>
                  {item.status === 1 ? (
                    <p className="text-white bg-green-500 p-1 font-semibold rounded-md text-sm whitespace-nowrap">
                      Thành công
                    </p>
                  ) : item.status === -1 ? (
                    <p className="text-white bg-red-500 p-1 font-semibold rounded-md text-sm whitespace-nowrap">
                      Thất Bại
                    </p>
                  ) : (
                    <p className="text-white bg-yellow-500 p-1 font-semibold rounded-md text-sm whitespace-nowrap">
                      Chờ Xử Lý
                    </p>
                  )}
                </UITableBodyCell>
                <UITableBodyCell>
                  {packOptions.find((pack) => pack.value === item.pack)?.amount || "Unknown Amount"}VNĐ
                </UITableBodyCell>
                <UITableBodyCell>{formatDateTime(new Date(item.created_at))}</UITableBodyCell>
              </UITableBodyRow>
            ))}
          </UITableBody>
        </UITable>
      </SectionHeader>
    </>
  );
};

export default BuyItemComponent;
