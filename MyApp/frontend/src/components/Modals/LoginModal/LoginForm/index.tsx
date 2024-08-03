"use client";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { FormType } from "..";
import axios from "@/services/axios";
import { useAuth } from "@/contexts/auth.context";
import { UITextInput, UIButton } from "@/components/CustomUIs";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface IProps {
  setFormType: Dispatch<SetStateAction<FormType>>;
}

export default function LoginForm({ setFormType }: IProps) {
  const [usernameHelper, setUsernameHelper] = useState<string | undefined>();
  const [passwordHelper, setPasswordHelper] = useState<string | undefined>();
  const [isHandle, setIsHandle] = useState<boolean>(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLoginGoogle = async () => {
    try {
      router.push(process.env.NEXT_PUBLIC_HOST + "/auth/public/google");
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsHandle(true);

    (async () => {
      try {
        const formData = new FormData(e.target as HTMLFormElement);
        const res = await axios.post("/auth/public", formData);
        const data = res.data;

        if (res.status === 200) {
          setUsernameHelper(void 0);
          setPasswordHelper(void 0);
          toast.success("Đăng nhập thành công");
          setFormType("close");
          login();
        } else {
          if (data.name) {
            setUsernameHelper(data.name === "username" ? data.message : void 0);
            setPasswordHelper(data.name === "password" ? data.message : void 0);
          } else {
            toast.error(data.message);
          }
        }
      } catch (error: any) {
        toast.error(error.message || "Lỗi không xác định");
        console.error(error);
      }
      setIsHandle(false);
    })();
  }

  return (
    <>
      <div className="flex items-center justify-center dark:bg-gray-800">
        <button
          onClick={handleLoginGoogle}
          className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
        >
          <Image className="w-6 h-6" src="/google-color.svg" loading="lazy" width={10} height={10} alt="google logo" />
          <span>Login with Google</span>
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <UITextInput
            label="Tài khoản"
            type="text"
            name="username"
            required
            maxLength={50}
            helperText={usernameHelper}
            valid={!usernameHelper}
          />
          <UITextInput
            label="Mật khẩu"
            type="password"
            name="password"
            required
            maxLength={50}
            helperText={passwordHelper}
            valid={!passwordHelper}
          />
          {/* <button
            type="button"
            className="block w-full text-right mb-2 text-blue-900 dark:text-blue-200 text-sm font-semibold underline"
            onClick={() => setFormType("reset")}
          >
            Quên mật khẩu
          </button> */}
        </div>

        {!isHandle ? (
          <UIButton type="submit" fullSized>
            ĐĂNG NHẬP
          </UIButton>
        ) : (
          <UIButton isProcessing disabled fullSized>
            ĐANG ĐĂNG NHẬP...
          </UIButton>
        )}

        <button
          type="button"
          onClick={() => setFormType("signup")}
          className="border border-gray-400 rounded h-11 px-3 font-semibold w-full bg-white text-gray-700 mt-2 "
        >
          {" "}
          <span className="relative"> Tạo tài khoản </span>{" "}
        </button>
      </form>
    </>
  );
}
