"use client";
import Image from "next/image";
import axios from "@/services/axios";
import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { UIButton, UITextInput } from "@/components/CustomUIs";
import { useHome } from "@/contexts/home.context";
import { useAuth } from "@/contexts/auth.context";

export default function ResetPassword() {
  const { get } = useSearchParams();
  const { push } = useRouter();
  const { theme, themeMode } = useHome();
  const { user } = useAuth();
  const [newPasswordHelper, setNewPasswordHelper] = useState<string | undefined>();
  const [rePasswordHelper, setRePasswordHelper] = useState<string | undefined>();
  const [isHandle, setIsHandle] = useState<boolean>(false);
  const TIME_TO_LIVE = Number(get("ttl")) || 120;
  const [timer, setTimer] = useState<number>(TIME_TO_LIVE);

  if (timer <= 1) push("/");

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) setTimer((timer) => timer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsHandle(true);

    (async () => {
      try {
        const formData = new FormData(e.target as HTMLFormElement);
        const res = await axios.put("/auth/public/resetPassword", formData);
        const data = res.data.data;

        if (res.status === 200) {
          setNewPasswordHelper(void 0);
          setRePasswordHelper(void 0);

          toast.success(data.message);
          push("/");
        } else {
          if (data.name) {
            setNewPasswordHelper(data.name === "password" ? data.message : void 0);
            setRePasswordHelper(data.name === "re_password" ? data.message : void 0);
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
  };

  return (
    <div className="m-auto w-96 shadow-lg shadow-zinc-800/50 dark:shadow-zinc-200/50 rounded-lg p-10 border border-zinc-800 dark:border-zinc-200 bg-white dark:bg-zinc-800">
      {theme?.logo_light && (
        <Image src={theme?.logo_light} width={100} height={64} className="mx-auto" alt="logo light" loading="eager" />
      )}
      <div className="mb-10">
        <h2 className="text-center text-3xl text-blue-900 dark:text-blue-200 font-bold">Nhập mật khẩu mới</h2>
        <p className="text-center text-zinc-400">
          {"Yêu cầu sẽ hết hạn sau "}
          <span className="underline font-bold text-red-500">{timer + "s"}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <UITextInput name="username" className="hidden" defaultValue={user?.username || ""} />
          <UITextInput
            name="password"
            label="Mật khẩu mới"
            type="password"
            required
            minLength={8}
            maxLength={50}
            helperText={newPasswordHelper}
            valid={!newPasswordHelper}
          />
          <UITextInput
            name="re_password"
            label="Nhập lại mật khẩu mới"
            type="password"
            required
            minLength={8}
            maxLength={50}
            helperText={rePasswordHelper}
            valid={!rePasswordHelper}
          />
        </div>
        {!isHandle ? (
          <UIButton type="submit" fullSized>
            ĐỔI MẬT KHẨU
          </UIButton>
        ) : (
          <UIButton fullSized isProcessing disabled>
            ĐANG XÁC THỰC...
          </UIButton>
        )}
      </form>
    </div>
  );
}
