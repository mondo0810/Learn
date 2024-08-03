"use client";
import { useState } from "react";
import { useAuth } from "@/contexts/auth.context";
import { Modal, Tooltip } from "flowbite-react";
import UIButton from "@/components/CustomUIs/UIButton";
import MenuPopup from "@/components/Popups/MenuPopup";
import LoginModal from "@/components/Modals/LoginModal";
import { HiUser } from "react-icons/hi2";
import { BsFillCaretDownFill } from "react-icons/bs";
import Image from "next/image";
import { formatCurrency } from "@/services/format";

export default function LoginButton() {
  const { user, status } = useAuth();
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {status === 1 ? (
        <Tooltip
          content={<MenuPopup />}
          className="shadow-xl dark:bg-zinc-800"
          trigger="click"
          style="light"
          arrow={false}
        >
          <UIButton className="transition duration-200 flex items-center pr-6 md:h-10 relative">
            <span>
              {user?.avatar && (
                <Image src={user?.avatar} width={24} height={24} className="rounded-full" alt="avatar login" />
              )}
            </span>
            <span className="relative ml-1 -top-[1px]">|</span>
            <span className="ml-1 font-bold">{formatCurrency(user?.balance)}</span>
            <BsFillCaretDownFill className="top-1/2 -translate-y-1/2 text-lg absolute right-3" />
          </UIButton>
        </Tooltip>
      ) : (
        <UIButton onClick={() => setOpenModal(true)}>
          <HiUser className="mr-2 text-xl" />
          <span className="md:inline">ĐĂNG NHẬP</span>
        </UIButton>
      )}

      <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)}>
        <Modal.Header />
        <Modal.Body>
          <LoginModal setOpenModal={setOpenModal} />
        </Modal.Body>
      </Modal>
    </>
  );
}
