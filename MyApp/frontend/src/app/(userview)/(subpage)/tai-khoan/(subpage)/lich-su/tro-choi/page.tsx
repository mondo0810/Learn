"use client";
import { UITable } from "@/components/CustomUIs";
import { UITableHead, UITableHeadCell, UITableBody, UITableBodyRow, UITableBodyCell } from "@/components/CustomUIs/UITable";
import { formatDateTime } from "@/services/format";
import SectionHeader from "../../../../tai-khoan/myaccountComponents/SectionHeader";
import { useEffect, useState } from "react";
import axios from "@/services/axios";

export default function GameHistory() {
    const [giftLuckyWheelData, setGiftLuckyWheelData] = useState<IGiftLuckyWheelHistoryByUID[]>([]);

    useEffect(() => {
        axios.get(`/gift-luckywheel-history/user/history?limit=20`).then(res => {
            setGiftLuckyWheelData(res.data.data);
        });
    }, []);

    return (
        <SectionHeader
            title="Danh Sách Chơi Game"
            description="Lịch sử chơi 20 lần gần nhất."
        >
            <UITable>
                <UITableHead>
                    <UITableHeadCell>Phần thưởng</UITableHeadCell>
                    <UITableHeadCell>Trạng thái</UITableHeadCell>
                    <UITableHeadCell responsive>Thời gian</UITableHeadCell>
                </UITableHead>
                <UITableBody>
                    {giftLuckyWheelData?.map((item, index) => (
                        <UITableBodyRow key={index}>
                            <UITableBodyCell>{item.name}</UITableBodyCell>
                            <UITableBodyCell>{item.status === 1 ? "Thành công" : "Đang chờ"}</UITableBodyCell>
                            <UITableBodyCell responsive>{formatDateTime(new Date(item.created_at))}</UITableBodyCell>
                        </UITableBodyRow>
                    ))}
                </UITableBody>
            </UITable>
        </SectionHeader>
    )
}