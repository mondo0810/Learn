"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import SignupForm from "./SignupForm";
import ResetForm from "./ResetForm";
import LoginForm from "./LoginForm";
import { useHome } from "@/contexts/home.context";

export type FormType = "login" | "signup" | "reset" | "close";

interface IProps {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}
export default function LoginModal({ setOpenModal }: IProps) {
  const [formType, setFormType] = useState<FormType>("login");
  const [title, setTitle] = useState<string>("");
  const [render, setRender] = useState<React.ReactNode>();
  const { theme, themeMode } = useHome();

  useEffect(() => {
    switch (formType) {
      case "signup":
        setTitle("ĐĂNG KÝ TÀI KHOẢN");
        setRender(<SignupForm setFormType={setFormType} />);
        break;
      case "reset":
        setTitle("KHÔI PHỤC MẬT KHẨU");
        setRender(<ResetForm setFormType={setFormType} />);
        break;
      case "close":
        setOpenModal(false);
        break;
      default:
        setTitle("ĐĂNG NHẬP TÀI KHOẢN");
        setRender(<LoginForm setFormType={setFormType} />);
        break;
    }
  }, [formType]);

  return (
    <>
      <div className="h-16 p-2">
        {themeMode === "light"
          ? theme?.logo_light && (
              <Image
                src={theme.logo_light}
                width={100}
                height={64}
                className="mx-auto h-full w-auto"
                alt="logo light"
                loading="eager"
              />
            )
          : theme?.logo_dark && (
              <Image
                src={theme.logo_dark}
                width={100}
                height={64}
                className="mx-auto h-full w-auto"
                alt="logo dark"
                loading="eager"
              />
            )}
      </div>

      <h3 className="text-center text-lg font-bold text-blue-900 dark:text-blue-200 mb-8">{title}</h3>

      <div className="mt-5">{render}</div>
    </>
  );
}
