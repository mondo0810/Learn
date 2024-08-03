"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { BsFillCaretRightFill } from "react-icons/bs";
import { HiPlusCircle, HiTicket, HiXMark } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { TextInput } from "flowbite-react";
import axios from "@/services/axios";
import UIButton from "@/components/CustomUIs/UIButton";
import { useAuth } from "@/contexts/auth.context";
import { formatCurrency } from "@/services/format";

interface IProps {
  nid?: string;
  nrid?: string;
  nickgameData?: ILineData[];
  price: number;
  setOpenState: Dispatch<SetStateAction<boolean>>;
}

export default function BuyModal({ nid = "", nrid = "", nickgameData, price, setOpenState }: IProps) {
  const router = useRouter();
  const { login, user } = useAuth();
  const [isHandle, setIsHandle] = useState<boolean>(false);
  const [showNotice, setShowNotice] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [voucher, setVoucher] = useState<IVoucher>({
    id: -1,
    code: "",
    quantity: 0,
    discount: 0,
    available: false,
  });
  const userBalance = user?.balance || 0;
  const actualPay = price - Math.floor((price / 100) * voucher.discount);

  const handleBuy = (actualPay: number) => {
    if (!user) {
      toast.warning("Vui lòng đăng nhập");
    } else {
      if (userBalance < actualPay) {
        setShowNotice(true);
        toast.warning("Số dư không đủ, vui lòng nạp thêm");
      } else {
        setIsHandle(true);

        (async () => {
          const addTransaction = await axios.post(`/transaction/user/add`, {
            username: user?.username,
            nid: nid,
            nrid: nrid,
            payment_method: "Thẻ cào",
            actual_sold: actualPay,
            voucher_id: voucher.id > -1 ? voucher.id : null,
          });

          if (addTransaction.status === 200) {
            login();
            toast.success(`Bạn đã mua tài khoản #${nid || nrid} thành công!`);
            router.push("/tai-khoan/lich-su/nickgame");
          } else {
            toast.error(addTransaction.data.message);
          }

          setIsHandle(false);
        })();
      }
    }
  };

  const handleVoucher = () => {
    axios.get(`/voucher/public/search?code=${code}`).then((res) => {
      const voucherData = res.data.data as IVoucher;

      if (res.status === 200) {
        setVoucher(voucherData);
        toast.success(`Ngon! Bạn đã áp mã giảm ${voucherData.discount}%`);
      } else toast.error("Mã voucher không hợp lệ!");
    });
  };

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center p-2 bg-stone-600/75 z-30">
      <div className="mt-[15px] w-[450px] rounded">
        <div className="p-4 relative bg-red-600 text-white dark:text-zinc-200 font-semibold">
          <small>XÁC NHẬN MUA TÀI KHOẢN</small>
          <h2 className="text-2xl">#{nid || nrid}</h2>
          <div className="absolute right-4 top-4 text-xl cursor-pointer" onClick={() => setOpenState(false)}>
            <HiXMark />
          </div>
        </div>
        <div className="max-w-md w-full bg-white dark:bg-zinc-800">
          <div className="p-2 md:p-4">
            {nickgameData && (
              <>
                <div className="mb-4">
                  {nickgameData.map((line: ILineData, index: number) => (
                    <div
                      className="grid grid-cols-12 gap-2 py-1 text-dark dark:text-zinc-200 border-b border-zinc-800 dark:border-zinc-200"
                      key={index}
                    >
                      <div className="col-span-2 flex">
                        <BsFillCaretRightFill className="my-auto" />
                        {line.title}
                      </div>
                      <div className="col-span-10 font-semibold capitalize">{line.data}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
            <div className="mb-4">
              <div className="grid grid-cols-12 gap-2 mb-2">
                <div className="relative col-span-6 font-semibold text-base text-dark dark:text-zinc-200">
                  Số dư của bạn:
                </div>
                <div className="col-span-6 flex justify-end font-bold text-red-600 dark:text-red-500">
                  {formatCurrency(userBalance)}
                  <div
                    className="ml-1 my-auto text-lg cursor-pointer"
                    onClick={() => router.push("/tai-khoan/giao-dich/nap-the")}
                  >
                    <HiPlusCircle />
                  </div>
                </div>
                {showNotice && (
                  <small className="col-span-12 text-right text-red-600 font-bold">
                    Số dư không đủ, vui lòng nạp thêm!
                  </small>
                )}
              </div>
              <div className="border-b border-zinc-400 my-2" />
              <div className="my-4">
                <div className="flex font-medium items-center text-dark dark:text-zinc-200 mb-2">
                  <span className="h-5 w-5 top-[1px] flex items-center justify-center rounded bg-red-500 text-white dark:text-zinc-200 relative mr-2">
                    <HiTicket />
                  </span>
                  VOUCHER
                </div>
                <div className="flex items-center">
                  <TextInput
                    id="code"
                    type="text"
                    placeholder="Nhập mã voucher"
                    className="w-2/3"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                  <UIButton className="w-1/3 ml-2" onClick={handleVoucher}>
                    Áp dụng
                  </UIButton>
                </div>
              </div>
              <div className="border-b border-zinc-400 my-2" />
              <div className="grid grid-cols-12 gap-2 font-bold">
                <div className="col-span-6 text-dark dark:text-zinc-200">Giá tài khoản:</div>
                <div className="col-span-6 text-right text-red-600 dark:text-red-500">{formatCurrency(price)}</div>
              </div>
              <div className="grid grid-cols-12 gap-2 font-bold">
                <div className="col-span-6 text-dark dark:text-zinc-200">Tiền phải trả:</div>
                <div className="col-span-6 text-right text-red-600 dark:text-red-500">{formatCurrency(actualPay)}</div>
              </div>
            </div>

            <div className="py-2 flex">
              {!isHandle ? (
                <UIButton colorType="green" className="w-1/2 mr-1" onClick={() => handleBuy(actualPay)}>
                  Chốt đơn
                </UIButton>
              ) : (
                <UIButton colorType="green" className="w-1/2 mr-1" isProcessing disabled>
                  Đang xử lý...
                </UIButton>
              )}
              <UIButton className="w-1/2 ml-1" onClick={() => setOpenState(false)}>
                Hủy
              </UIButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
