"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "@/services/axios";
import ViettelLogo from "@assets/images/telco/viettel.png";
import VinaphoneLogo from "@assets/images/telco/vinaphone.png";
import MobifoneLogo from "@assets/images/telco/mobifone.png";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { UIRadioImage, UISelect, UITextInput, UIButton } from "@/components/CustomUIs";
import { useAuth } from "@/contexts/auth.context";
import { useRouter } from "next/navigation";
import ModalRecharge from "@/components/Modals/ModalRecharge";
export default function FormRecharge() {
  const [isHandle, setIsHandle] = useState<boolean>(false);
  const { login } = useAuth();
  const router = useRouter();

  const [isModalRechargeOpen, setModalRechargeOpen] = useState(false);

  const openModalRecharge = () => {
    setModalRechargeOpen(true);
  };
  const closeModalRecharge = () => {
    setModalRechargeOpen(false);
  };

  const optionsCards = [
    { title: "Chọn mệnh giá thẻ", value: "" },
    { title: "Thẻ 10,000đ", value: 10000 },
    { title: "Thẻ 20,000đ", value: 20000 },
    { title: "Thẻ 30,000đ", value: 30000 },
    { title: "Thẻ 50,000đ", value: 50000 },
    { title: "Thẻ 100,000đ", value: 100000 },
    { title: "Thẻ 200,000đ", value: 200000 },
    { title: "Thẻ 500,000đ", value: 500000 },
  ];

  const optionTelcoms = [
    { title: "-- Chọn Loại Thẻ/Nhà Mạng --", value: "" },
    { title: "Thẻ Viettel", value: "1" },
    { title: "Thẻ Vinaphone", value: "3" },
    { title: "Thẻ Mobiphone", value: "2" },
    { title: "Thẻ Vietnammobile", value: "4" },
    // { title: "Thẻ Zing", value: "14" },
    // { title: "Thẻ Gate", value: "15" },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    try {
      e.preventDefault();
      setIsHandle(true);

      const formData = new FormData(e.target as HTMLFormElement);
      const res = await axios.post("/recharge/user/card", formData);

      console.log(res.data.message);

      if (res.status === 200) {
        toast.success(res.data.message);
        login();
        router.push("/tai-khoan/giao-dich/nap-the");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error((error as Error).message);
    } finally {
      setIsHandle(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="font-medium text-sm">
      <div className="mb-1">
        {/* <UIRadioImage
          data={optionTelcoms}
          name="card_type"
          defaultValue={1}
          label="Chọn loại thẻ (Ưu tiên Viettel, Vinaphone)"
        /> */}

        {/* <div
          onClick={openModalRecharge}
          className="text-center py-2 px-3 border rounded text-sm w-full block font-semibold bg-yellow-100 border-yellow-300 text-amber-500 my-2 cursor-pointer hover:bg-yellow-200"
        >
          Hướng Dẫn Nạp Thẻ Tự Động Tại Đây
        </div> */}
        <UISelect sizing={16} data={optionTelcoms} label="" name="card_type" required />
        <UISelect sizing={16} data={optionsCards} label="" name="card_value" required />

        {/* <ModalRecharge
          content={`<div class="aspect-w-16 aspect-h-9">
          <iframe
            class="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/I8wDHUZSWWg?si=46G2Wx9DiVJcOpUj"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
        `}
          isModalRechargeOpen={isModalRechargeOpen}
          closeModalRecharge={closeModalRecharge}
        /> */}
        <div className="text-center py-2 px-3 border rounded text-sm w-full block font-semibold bg-red-100 border-red-300 text-red-500 my-2">
          Chọn Đúng Mệnh Giá Thẻ, Sai Mất Thẻ!
        </div>

        <UITextInput
          sizing={16}
          type="number"
          name="serial"
          placeholder="Nhập Số Serial Thẻ (In Trên Thẻ)..."
          maxLength={20}
          pattern="\d*"
          required
        />
        <UITextInput
          sizing={16}
          type="number"
          name="code"
          placeholder="Nhập Mã Số Thẻ Cào (Cào Lớp Tráng Bạc)..."
          maxLength={20}
          pattern="\d*"
          required
        />
      </div>

      {!isHandle ? (
        <UIButton type="submit" className="mt-1" fullSized>
          NẠP THẺ
        </UIButton>
      ) : (
        <UIButton isProcessing disabled fullSized>
          Đang xử lý...
        </UIButton>
      )}
    </form>
  );
}
