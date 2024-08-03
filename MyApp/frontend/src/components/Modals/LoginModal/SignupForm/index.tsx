"use client";
import { Dispatch, FormEvent, MouseEvent, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { FormType } from "..";
import axios from "@/services/axios";
import { UITextInput, UIButton } from "@/components/CustomUIs";
import { useAuth } from "@/contexts/auth.context";
import { useRouter } from "next/navigation";

interface IProps {
  setFormType: Dispatch<SetStateAction<FormType>>;
}

export default function SignupForm({ setFormType }: IProps) {
  const [isHandle, setIsHandle] = useState<boolean>(false);
  const [usernameHelper, setUsernameHelper] = useState<string | undefined>();
  const [passwordHelper, setPasswordHelper] = useState<string | undefined>();
  const [phoneHelper, setPhoneHelper] = useState<string | undefined>();
  const [repasswordHelper, setRepasswordHelper] = useState<string | undefined>();
  const { loginPassword } = useAuth();
  const { push } = useRouter();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsHandle(true);

    (async () => {
      try {
        const formData = new FormData(e.target as HTMLFormElement);
        const res = await axios.post("/profile/public/create", formData);
        const data = res.data;

        if (res.status === 200) {
          setUsernameHelper(void 0);
          setPhoneHelper(void 0);
          setPasswordHelper(void 0);
          setRepasswordHelper(void 0);
          toast.success(res.data.message);
          loginPassword(formData);
          setFormType("close");
          push("/");
        } else {
          toast.error(res.data.message);
          if (data.name) {
            setUsernameHelper(data.name === "username" ? data.message : void 0);
            setPhoneHelper(data.name === "phone" ? data.message : void 0);
            setPasswordHelper(data.name === "password" ? data.message : void 0);
            setRepasswordHelper(data.name === "repassword" ? data.message : void 0);
          } else {
            toast.error(data.message);
          }
        }
      } catch (error: any) {
        toast.error(error.message || "Lỗi không xác định");
      } finally {
        setIsHandle(false);
      }
    })();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5">
        <UITextInput
          label="Tài khoản"
          type="text"
          className="col-span-1"
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
        <UITextInput
          label="Nhập lại mật khẩu"
          type="password"
          name="re_password"
          required
          minLength={6}
          maxLength={50}
          helperText={repasswordHelper}
          valid={!repasswordHelper}
        />
      </div>
      {!isHandle ? (
        <UIButton type="submit" fullSized>
          ĐĂNG KÝ
        </UIButton>
      ) : (
        <UIButton isProcessing disabled fullSized>
          ĐANG XÁC THỰC...
        </UIButton>
      )}

      <button
        type="button"
        onClick={() => setFormType("login")}
        className="border border-gray-400 rounded h-11 px-3 font-semibold w-full bg-white text-gray-700 mt-2 "
      >
        {" "}
        <span className="relative">ĐĂNG NHẬP</span>{" "}
      </button>
    </form>
  );
}
