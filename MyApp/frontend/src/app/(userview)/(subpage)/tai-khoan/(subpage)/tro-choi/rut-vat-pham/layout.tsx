"use client";
import { useEffect, useState } from "react";
import SectionHeader from "../../../../tai-khoan/myaccountComponents/SectionHeader";
import TabList from "../../../myaccountComponents/TabList";
import axios from "@/services/axios";
import { formatDateTime } from "@/services/format";
import { UITable } from "@/components/CustomUIs";
import {
  UITableHead,
  UITableHeadCell,
  UITableBody,
  UITableBodyRow,
  UITableBodyCell,
} from "@/components/CustomUIs/UITable";
import { useAuth } from "@/contexts/auth.context";

export default function WithdrawLayout({ children }: { children: React.ReactNode }) {
  const { login } = useAuth();
  const [withdrawData, setWithdrawData] = useState<IWithdrawByUID[]>([]);

  useEffect(() => {
    axios.get("/gift-withdrawal-history/user/history?limit=10").then((res) => {
      setWithdrawData(res.data.data);
    });
  }, [login]);

  return (
    <>
      <h2 className="mb-2 font-bold text-xl">RÚT VẬT PHẨM (GAME)</h2>

      <TabList />

      <div className="bg-white dark:bg-zinc-800 rounded-lg p-2 md:py-4 md:px-5 w-full mb-4">{children}</div>

      <SectionHeader title="Danh Sách Rút Vật Phẩm" description="Lịch sử 10 lần rút gần đây nhất.">
        <UITable>
          <UITableHead>
            <UITableHeadCell>Quà nhận được</UITableHeadCell>
            <UITableHeadCell>Trạng thái</UITableHeadCell>
            <UITableHeadCell>Thời gian rút</UITableHeadCell>
          </UITableHead>
          <UITableBody>
            {withdrawData?.map((item, index) => (
              <UITableBodyRow key={index}>
                <UITableBodyCell>{`${item.value} ${
                  item.type === 1 ? "KC" : item.type === 2 ? "QH" : "Robux"
                }`}</UITableBodyCell>
                <UITableBodyCell>
                  {item.status === 1 ? "Thành công" : item.status === -1 ? "Thất bại" : "Đang xử lý"}
                </UITableBodyCell>
                <UITableBodyCell>{formatDateTime(new Date(item.created_at))}</UITableBodyCell>
              </UITableBodyRow>
            ))}
          </UITableBody>
        </UITable>
      </SectionHeader>
    </>
  );
}
