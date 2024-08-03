"use client";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { FormType } from "..";
import axios from "@/services/axios";
import { toast } from "react-toastify";
import { UITextInput, UIButton } from "@/components/CustomUIs";

interface IProps {
    setFormType: Dispatch<SetStateAction<FormType>>
}

export default function ResetForm({ setFormType }: IProps) {
    const [emailHelper, setEmailHelper] = useState<string | undefined>();
    const [isHandle, setIsHandle] = useState<boolean>(false);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsHandle(true);

        (async () => {
            try {
                const formData = new FormData(e.target as HTMLFormElement);
                const res = await axios.post("/auth/public/requestReset", formData);
                const data = res.data;

                if (res.status === 200) {
                    setEmailHelper(void 0);
                    toast.success("Đã gửi email xác nhận");
                    setFormType("login");
                } else {
                    if (data.name) {
                        setEmailHelper(data.name === "email" ? data.message : void 0);
                    } else {
                        toast.error(data.message);
                    }
                }
            } catch (error: any) {
                toast.error("Gửi không thành công. Vui lòng báo admin");
            }
            setIsHandle(false);
        })();
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-5">
                <UITextInput
                    required
                    label="Email liên kết với tài khoản"
                    type="email"
                    name="email"
                    helperText={emailHelper}
                    valid={!emailHelper}
                />
            </div>
            {!isHandle ? <UIButton type="submit" fullSized>
                GỬI MÃ XÁC NHẬN
            </UIButton>
            : <UIButton isProcessing disabled fullSized>
                ĐANG GỬI MÃ...
            </UIButton>}
            <button
                type="button"
                onClick={() => setFormType("login")}
                className="text-center my-2 text-blue-900 dark:text-blue-200 text-sm font-semibold w-full underline">
                Có tài khoản, đăng nhập
            </button>
        </form>
    )
}