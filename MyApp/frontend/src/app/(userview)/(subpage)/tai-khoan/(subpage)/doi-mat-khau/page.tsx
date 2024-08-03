"use client";
import { FormEvent, useState } from "react";
import axios from "@/services/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import SectionHeader from "../../myaccountComponents/SectionHeader";
import { UIButton, UITextInput } from "@/components/CustomUIs";
import { clearLocalUser } from "@/contexts/auth.context";

export default function Password() {
    const { push } = useRouter();
    const [oldPasswordHelper, setOldPasswordHelper] = useState<string | undefined>();
    const [newPasswordHelper, setNewPasswordHelper] = useState<string | undefined>();
    const [rePasswordHelper, setRePasswordHelper] = useState<string | undefined>();
    const [isHandle, setIsHandle] = useState<boolean>(false);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsHandle(true);

        (async () => {
            try {
                const formData = new FormData(e.target as HTMLFormElement);
                const res = await axios.put("/auth/user/changePassword", formData);
                const data = res.data;

                if (res.status === 200) {
                    setOldPasswordHelper(void 0);
                    setNewPasswordHelper(void 0);
                    setRePasswordHelper(void 0);

                    toast.success(data.message);
                    clearLocalUser();
                    push("/tai-khoan/ho-so");
                } else {
                    if (data.name) {
                        setOldPasswordHelper(data.name === "old_password" ? data.message : void 0);
                        setNewPasswordHelper(data.name === "password" ? data.message : void 0);
                        setRePasswordHelper(data.name === "re_password" ? data.message : void 0);
                    } else {
                        toast.error(data.message);
                    }
                }
            } catch (error: any) {
                toast.error(error.message || "Lỗi không xác định");
            }
            setIsHandle(false);
        })();
    }

    return (
        <SectionHeader
            title="Đổi Mật Khẩu"
            description="Để bảo mật tài khoản, vui lòng không chia sẻ cho người khác.">
            <form className="max-w-sm" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <UITextInput
                        name="old_password"
                        label="Mật khẩu hiện tại"
                        type="password"
                        required minLength={8} maxLength={50}
                        helperText={oldPasswordHelper} valid={!oldPasswordHelper} />
                    <UITextInput
                        name="password"
                        label="Mật khẩu mới"
                        type="password"
                        required minLength={8} maxLength={50}
                        helperText={newPasswordHelper} valid={!newPasswordHelper} />
                    <UITextInput
                        name="re_password"
                        label="Nhập lại mật khẩu mới"
                        type="password"
                        required minLength={8} maxLength={50}
                        helperText={rePasswordHelper} valid={!rePasswordHelper} />
                </div>

                {!isHandle ? <UIButton type="submit" fullSized>
                    Xác nhận
                </UIButton>
                : <UIButton isProcessing disabled fullSized>
                    Đang xác thực...
                </UIButton>}
            </form>
        </SectionHeader>
    )
}