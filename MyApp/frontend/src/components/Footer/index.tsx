"use client";
import Link from "next/link";
import Image from "next/image";
import PageAction from "./PageAction";
import MessengerIcon from "@assets/images/funcIcon/messenger-button.png";
import YoutubeIcon from "@assets/images/funcIcon/youtube-button.png";
import { useHome } from "@/contexts/home.context";
import axios from "@/services/axios";
import { toast } from "react-toastify";
import { useState } from "react";

export default function Footer() {
  const { config, theme, contact } = useHome();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const handleGift = async () => {
    try {
      const response = await axios.post("/profile/user/registerGift", {});
      const result = response.data;
      setModalMessage(result.message); // Set the message for the modal
      setShowModal(true); // Open the modal
    } catch (error: any) {
      toast.error(error.message || "Lỗi không xác định");
      console.error("Error:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <footer className="py-5 bg-gray-900 relative">
      <button onClick={handleGift}>
        {theme?.thumbgift && (
          <Image
            src={theme.thumbgift}
            height={20}
            width={20}
            className="fixed bottom-1 left-1 w-3/12 md:w-1/12 z-50 cursor-pointer"
            alt="gift"
          />
        )}
      </button>

      {showModal && (
        <div className=" fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-start pt-20 z-50 px-5">
          <div className="fixed inset-2 flex items-center justify-center  ">
            <div className="bg-white p-4 rounded-md shadow-md ">
              <div className="flex flex-col items-center justify-center gap-10 max-w-xs">
                <p className="font-bold text-3xl underline text-slate-600">Thông báo</p>
                <p className="font-semibold px-6 text-red-500">{modalMessage}</p>
                <button className="mt-2 w-2/3 bg-red-500 text-white px-2 py-1 rounded-md " onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <PageAction />
      <div className="py-5">
        <div className="mb-12 md:mb-0 px-4 md:px-0 max-w-6xl mx-auto text-white dark:text-zinc-200 grid grid-cols-12 md:gap-8 font-semibold">
          <div className="col-span-12 md:col-span-4 ">
            <div className="border-2 border-white-100 p-2">
              {theme?.logo_light && (
                <Image
                  src={theme.logo_light}
                  height={96}
                  width={242}
                  className="mx-auto w-2/3 object-contain mb-1"
                  alt="logo"
                />
              )}
              <p className="uppercase text-center font-bold">
                {config?.name} - {config?.description}
              </p>
            </div>
            <nav>
              <ul className="flex flex-col justify-center font-medium mt-2">
                <li>
                  {" "}
                  <Link className="flex items-center" href="/dieu-khoan">
                    <svg
                      className="fill-white inline mr-2 "
                      xmlns="http://www.w3.org/2000/svg"
                      height={10}
                      width={10}
                      viewBox="0 0 512 512"
                    >
                      <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z" />
                    </svg>
                    <span>Điều Khoản Sử Dụng</span>
                  </Link>
                </li>
                <li>
                  <Link className="flex items-center" href="/chinh-sach-bao-mat">
                    {" "}
                    <svg
                      className="fill-white inline mr-2 "
                      xmlns="http://www.w3.org/2000/svg"
                      height={10}
                      width={10}
                      viewBox="0 0 512 512"
                    >
                      <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z" />
                    </svg>
                    <span>Chính sách bảo mật</span>
                  </Link>
                </li>
                <li>
                  <Link className="flex items-center" href="/dieu-khoan">
                    <svg
                      className="fill-white inline mr-2 "
                      xmlns="http://www.w3.org/2000/svg"
                      height={10}
                      width={10}
                      viewBox="0 0 512 512"
                    >
                      <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z" />
                    </svg>
                    <span>Xóa Dữ Liệu Người Dùng</span>{" "}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="col-span-12 md:col-span-4 pt-10 md:pt-0">
            <h2 className="text-2xl mb-8">VỀ CHÚNG TÔI</h2>
            <p className="mb-4">
              Chúng Tôi Làm Việc Một Cách Chuyên Nghiệp, Uy Tín, Nhanh Chóng Và Luôn Đặt Quyền Lợi Của Bạn Lên Hàng Đầu
              Với Tiêu Chí Khách Hàng Là Trên Hết Shop Chúng Tôi Sẽ Mang Đến Khách Hàng Những Trải Nghiệm Ưng Ý Nhất.
            </p>
            <p>
              Tổng đài:{" "}
              {(contact?.hotline && (
                <Link href={`tel:${contact.hotline}`} className="hover:underline">
                  {contact.hotline}
                </Link>
              )) ||
                "chưa hỗ trợ"}
              <br />
            </p>
            <p>
              Thời Gian Làm Việc:
              <br />
              <span className="font-medium">
                T2 - T7: 08:00 - 21:00 | CN: 09:00 - 18:00
                <br />
                Làm Việc Kể Cả Ngày Lễ Tết.
              </span>
            </p>
          </div>

          <div className="col-span-12 md:col-span-4 pt-10 md:pt-0">
            <h3 className="text-2xl uppercase mb-3">
              {config?.name} - Shop Mua Bán Acc Uy Tín Chất Lượng Hàng Đầu Việt Nam.
            </h3>

            <p className="mb-8">
              HỆ THỐNG BÁN ACC TỰ ĐỘNG <br />
              ĐẢM BẢO UY TÍN VÀ CHẤT LƯỢNG.
            </p>

            <div className="flex flex-col md:flex-row">
              <Link href={contact?.fanpage_link || "/"} target="_blank">
                <Image
                  src={"/messenger.svg"}
                  width={200}
                  height={62}
                  className="mx-auto object-scale-down w-2/3 md:w-full"
                  alt="fanpage chat"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="text-white font-medium">
        <div className="max-w-6xl mx-auto text-center select-none">
          {config?.copyright} - [Phiên bản <span className="text-red-500">v{config?.version}</span>]
        </div>
      </div> */}
    </footer>
  );
}
