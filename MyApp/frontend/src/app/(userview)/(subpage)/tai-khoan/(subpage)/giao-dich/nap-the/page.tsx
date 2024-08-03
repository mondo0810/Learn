"use client";
import SectionHeader from "../../../myaccountComponents/SectionHeader";
import FormRecharge from "../../../myaccountComponents/Form/FormRecharge";
import { UITable } from "@/components/CustomUIs";
import {
  UITableHead,
  UITableHeadCell,
  UITableBody,
  UITableBodyRow,
  UITableBodyCell,
} from "@/components/CustomUIs/UITable";
import { formatCurrency, formatDateTime } from "@/services/format";
import { useEffect, useState } from "react";
import axios from "@/services/axios";
import InfoBoard from "@/components/InfoBoard";
import { useAuth } from "@/contexts/auth.context";

export default function TransactionRecharge() {
  const [rechargeData, setRechargeData] = useState<IRechargeByUID[]>([]);
  const { login } = useAuth();

  useEffect(() => {
    axios.get("/recharge/user/history?limit=20").then((res) => {
      setRechargeData(res.data.data);
    });
  }, [login]);

  return (
    <>
      <SectionHeader title="Nạp Thẻ Cào" description="Tự động 24/7 - Nhập sai mệnh giá sẽ mất thẻ.">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-6">
            <FormRecharge />
          </div>

          <InfoBoard customClass="col-span-12 md:col-span-6">
            🔥CHÚ Ý: Khi nạp thẻ <br />
            🛑Nạp Đúng Mệnh Giá ( Nạp Sai Mất Thẻ) Ví Dụ:Mua Thẻ 50K Nhớ Chọn Đúng Mệnh Giá 50k
            <br />
            🛑Nạp Bao Nhiêu Nhận Bấy Nhiêu Ví Dụ : Nạp 10K=10K , Nạp 20K=20K,Nạp 50K=50K !
            <br />
            🛑Cực Xịn Và Ưu Đãi Khi Nạp 100K Trở Lên ✅Khi Nạp 100K Trở Lên Được X2 Số Tiền Nạp Nha Anh Em!
            <br />
            Ví Dụ : Nạp 100K = 200K , 200K=400K,500K = 1M
            <br />
            Anh Em Nhanh Tay Tham Gia Sk Nha !
            <br />
            Lưu ý: - Vui lòng nạp đúng mệnh giá, sai mệnh giá sẽ không được cộng tiền vào tài khoản. - Thẻ cào bị treo
            ĐANG XỬ LÝ quá 10p kể từ lúc nạp thẻ xin vui lòng liên hện page để được hỗ trợ.
          </InfoBoard>
        </div>
      </SectionHeader>

      <SectionHeader title="Danh Sách Nạp Thẻ" description="">
        <UITable>
          <UITableHead>
            <UITableHeadCell>Thẻ Nạp</UITableHeadCell>
            <UITableHeadCell>Mã thẻ</UITableHeadCell>
            <UITableHeadCell>Trạng thái</UITableHeadCell>
          </UITableHead>
          <UITableBody>
            {rechargeData?.map((item, index) => (
              <UITableBodyRow key={index}>
                <UITableBodyCell>
                  {item.card_type === 1 ? "Viettel" : item.card_type === 2 ? "Mobifone" : "Vinaphone"}
                  <br />
                  <p className="text-xs">{formatCurrency(item.card_value)}</p>
                  <p className="text-xs"> {formatDateTime(new Date(item.created_at))}</p>
                </UITableBodyCell>
                <UITableBodyCell>
                  <p className="text-sm">
                    Mã Thẻ: {item.code} <br /> Seri: {item.serial}
                  </p>
                </UITableBodyCell>
                <UITableBodyCell>
                  {item.status === 1 ? (
                    <p className="text-white bg-green-500 p-1 font-semibold rounded-md text-sm whitespace-nowrap">
                      Thành công
                    </p>
                  ) : item.status === 2 ? (
                    <p className="text-white bg-purple-500 p-1 font-semibold rounded-md text-sm whitespace-nowrap">
                      Sai Mệnh Giá
                    </p>
                  ) : item.status === 3 ? (
                    <p className="text-white bg-red-500 p-1 font-semibold rounded-md text-sm whitespace-nowrap">
                      Thất Bại
                    </p>
                  ) : item.status === 99 ? (
                    <p className="text-white bg-yellow-500 p-1 font-semibold rounded-md text-sm whitespace-nowrap">
                      Đang chờ
                    </p>
                  ) : (
                    <p className="text-white bg-yellow-900 p-1 font-semibold rounded-md text-sm whitespace-nowrap">
                      Bảo trì
                    </p>
                  )}
                </UITableBodyCell>
              </UITableBodyRow>
            ))}
          </UITableBody>
        </UITable>
      </SectionHeader>
    </>
  );
}
