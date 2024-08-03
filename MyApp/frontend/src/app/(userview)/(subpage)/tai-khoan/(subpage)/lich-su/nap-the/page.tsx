"use client";
import { useEffect, useState } from "react";
import SectionHeader from "../../../myaccountComponents/SectionHeader";
import axios from "@/services/axios";
import { formatCurrency } from "@/services/format";
import { UITable } from "@/components/CustomUIs";
import {
  UITableBody,
  UITableBodyCell,
  UITableBodyRow,
  UITableHead,
  UITableHeadCell,
} from "@/components/CustomUIs/UITable";

interface ICountRecharge {
  month_recharge: number;
  all_recharge: number;
}

export default function RechargeHistory() {
  const [monthRecharge, setMonthRecharge] = useState<number>(0);
  const [allRecharge, setAllRecharge] = useState<number>(0);
  const [rechargeData, setRechargeData] = useState<IRechargeByUID[]>([]);

  useEffect(() => {
    (async () => {
      Promise.all([
        await axios.get("/recharge/user/history?limit=20"),
        await axios.get("/recharge/user/history/count"),
      ]).then((res) => {
        if (res[0].status === 200 && res[1].status === 200) {
          const data: ICountRecharge = res[1].data.data;

          setMonthRecharge(data.month_recharge);
          setAllRecharge(data.all_recharge);
          setRechargeData(res[0].data.data);
        }
      });
    })();
  }, []);

  return (
    <SectionHeader
      title="Danh Sách Nạp Thẻ"
      description={`Tháng ${new Date().getMonth() + 1} nạp: ${formatCurrency(
        monthRecharge
      )} - Tổng nạp: ${formatCurrency(allRecharge)}`}
    >
      <UITable>
        <UITableHead>
          <UITableHeadCell responsive>Thẻ Nạp</UITableHeadCell>
          <UITableHeadCell>Mã thẻ</UITableHeadCell>
          <UITableHeadCell responsive>Mệnh giá</UITableHeadCell>
          <UITableHeadCell>Trạng thái</UITableHeadCell>
        </UITableHead>
        <UITableBody>
          {rechargeData?.map((item, index) => (
            <UITableBodyRow key={index}>
              <UITableBodyCell responsive>
                {item.card_type === 1 ? "Viettel" : item.card_type === 2 ? "Mobifone" : "Vinaphone"}
              </UITableBodyCell>
              <UITableBodyCell>{item.code}</UITableBodyCell>
              <UITableBodyCell responsive>{formatCurrency(item.card_value)}</UITableBodyCell>
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
  );
}
