"use client";
import { useEffect, useState } from "react";
import SectionHeader from "../../../myaccountComponents/SectionHeader";
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

export default function ItemHistory() {
  const [withdrawData, setWithdrawData] = useState<IWithdrawByUID[]>([]);

  useEffect(() => {
    axios.get("/gift-withdrawal-history/user/history?limit=20").then((res) => {
      setWithdrawData(res.data.data);
    });
  }, []);

  return (
    <SectionHeader title="Danh Sách Rút Vật Phẩm" description="Lịch sử hòm vật phẩm mà bạn đã mua.">
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
  );
}
