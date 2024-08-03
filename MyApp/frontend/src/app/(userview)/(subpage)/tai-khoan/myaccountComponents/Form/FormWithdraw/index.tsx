"use client";
import { UILabel, UIPackRow, UITextInput, UIButton } from "@/components/CustomUIs";
import { allPacks } from "./allPacks";
import axios from "@/services/axios";
import { useAuth } from "@/contexts/auth.context";
import { toast } from "react-toastify";
import { useState } from "react";

interface IProps {
  genre: string;
}

export default function FormWithdraw({ genre }: IProps) {
  const { login, user } = useAuth();
  const [isHandle, setIsHandle] = useState<boolean>(false);
  const type = genre === "kc" ? 1 : genre === "qh" ? 2 : 3;
  const packs: IWithdrawPack[] = (allPacks as any)[genre];

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const packId = Number(formData.get("pack"));

    if (user?.coin && packId) {
      setIsHandle(true);
      const pack = packs[packId - 1];

      (async () => {
        const res = await axios.post("/gift-withdrawal-history/user/add", {
          type,
          packId: pack.id,
          idgame: formData.get("idgame"),
          game_account: formData.get("game_account"),
          game_password: formData.get("game_password"),
        });

        if (res.status === 200) {
          toast.success("Rút thành công. Đang chờ xử lý");
          login();
        } else toast.error(res.data.message);

        setIsHandle(false);
      })();
    } else {
      toast.warning("Vui lòng chọn một gói!");
    }

    setIsHandle(false);
  };

  return (
    <form className="px-2 md:px-0" onSubmit={handleSubmit}>
      <div className="mb-5">
        <div className="mb-4">
          <UILabel index={1} title="Chọn gói rút" />
          <div>
            <div className="border-b py-1 px-2 grid grid-cols-12 gap-2 text-center font-bold dark:text-zinc-200">
              <div className="col-span-4">Gói</div>
              <div className="col-span-8">Thông tin gói</div>
            </div>

            <UIPackRow coin={user?.coin || 0} data={packs} />
          </div>
        </div>

        <UILabel index={2} title="Nhập ID game" />
        {type === 2 ? (
          <div>
            <UITextInput placeholder="Nhập tài khoản game" name="game_account" type="text" required />
            <UITextInput placeholder="Nhập mật khẩu game" name="game_password" type="password" required />
          </div>
        ) : (
          <UITextInput
            placeholder="Nhập ID game của bạn"
            name="idgame"
            helperText="Ví dụ: 3098435880"
            type="text"
            required
          />
        )}
      </div>

      {!isHandle ? (
        <UIButton type="submit" fullSized>
          RÚT NGAY
        </UIButton>
      ) : (
        <UIButton isProcessing disabled fullSized>
          ĐANG XỬ LÝ...
        </UIButton>
      )}
    </form>
  );
}
