"use client";
import { useEffect, useState } from "react";
import SectionHeader from "../../../myaccountComponents/SectionHeader";
import Link from "next/link";
import axios from "@/services/axios";
import { UITable } from "@/components/CustomUIs";
import {
  UITableBody,
  UITableBodyCell,
  UITableBodyRow,
  UITableHead,
  UITableHeadCell,
} from "@/components/CustomUIs/UITable";
import InfoBoard from "@/components/InfoBoard";
import { formatDateTime } from "@/services/format";

export default function NickgameHistory() {
  const [nickgameData, setNickgameData] = useState<INickgameByUID[]>([]);

  useEffect(() => {
    axios.get("/transaction/user/nickgame-history?limit=10").then((res) => {
      setNickgameData(res.data.data);
    });
  }, []);

  return (
    <SectionHeader title="Danh Sách Giao Dịch" description="Lịch sử lưu lại giao dịch cộng từ atm/momo.">
      <InfoBoard customClass="mb-4">
        <p className="w-full text-red-600 dark:text-red-500 block text-center">!!! CHÚ Ý !!!</p>
        <p>
          Quý khách vui lòng nhắn tin vào page hỗ trợ góc dưới bên phải màn hình đểđổi thông tin acc. Trường hợp quý
          khách không nhắn tin vào page hỗ trợ, nếu acc lỗi về thông tin shop không hỗ trợ. Thân ái!
        </p>
      </InfoBoard>

      <UITable>
        <UITableHead>
          <UITableHeadCell>Tên tài khoản</UITableHeadCell>
          <UITableHeadCell>Mật khẩu</UITableHeadCell>
          <UITableHeadCell>Trò chơi</UITableHeadCell>
          <UITableHeadCell>Thời gian</UITableHeadCell>
        </UITableHead>
        <UITableBody>
          {nickgameData?.map((item, index) => (
            <UITableBodyRow key={index}>
              <UITableBodyCell>{item.ingame}</UITableBodyCell>
              <UITableBodyCell>{item.password}</UITableBodyCell>
              <UITableBodyCell>
                <div className="text-sm">{item.game}</div>
              </UITableBodyCell>
              <UITableBodyCell>
                <div className="text-sm">{formatDateTime(new Date(item.created_at))}</div>
              </UITableBodyCell>
            </UITableBodyRow>
          ))}
        </UITableBody>
      </UITable>
    </SectionHeader>
  );
}
