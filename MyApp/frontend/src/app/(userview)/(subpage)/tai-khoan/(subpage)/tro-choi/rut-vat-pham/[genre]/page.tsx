"use client";
import { useAuth } from "@/contexts/auth.context";
import FormWithdraw from "../../../../myaccountComponents/Form/FormWithdraw";
import { formatCurrency } from "@/services/format";
import InfoBoard from "@/components/InfoBoard";

export default function WithdrawWithGenre({ params }: { params: { genre: string } }) {
  const { user } = useAuth();

  return (
    <>
      <div className="pb-2 mb-2 border-b border-zinc-400 dark:text-zinc-200 font-bold">
        <h4>
          Hiện có: <b className="text-red-500">{formatCurrency(user?.coin, "xu")}</b>
        </h4>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-6">
          <FormWithdraw genre={params.genre} />
        </div>

        <InfoBoard customClass="col-span-12 md:col-span-6">
          Tăng tỉ lệ {params.genre} nhận thêm khi rút lên tới 80% bạn có cơ hội nhận thêm {params.genre} khi rút.
          <br />
          Lưu ý: Thời gian xử lý đơn trong khoảng 24h kể từ khi thực hiện rút, nếu bạn gặp vấn đề khi rút vật phẩm hãy
          liên hệ chăm sóc khách hàng để được hỗ trợ. Xin cảm ơn!
        </InfoBoard>
      </div>
    </>
  );
}
