"use client";
import SectionHeader from "../../../../tai-khoan/myaccountComponents/SectionHeader";
import { useEffect, useState } from "react";
import axios from "@/services/axios";
import { formatCurrency, formatDateTime } from "@/services/format";
import { UITable } from "@/components/CustomUIs";
import { UITableBody, UITableBodyCell, UITableBodyRow, UITableHead, UITableHeadCell } from "@/components/CustomUIs/UITable";

export default function TransactionHistory() {
    const [transactionData, setTransactionData] = useState<ITransactionByUID[]>([]);

    useEffect(() => {
        axios.get(`/transaction/user/history?limit=20`).then(res => {
            setTransactionData(res.data.data);
        });
    }, []);

    return (
        <SectionHeader
            title="Danh Sách Giao Dịch"
            description="Lịch sử lưu lại giao dịch cộng từ atm/momo."
        >
            <UITable>
                <UITableHead>
                    <UITableHeadCell responsive>Mã G.D</UITableHeadCell>
                    <UITableHeadCell>P.T Thanh toán</UITableHeadCell>
                    <UITableHeadCell responsive>Số tiền</UITableHeadCell>
                    <UITableHeadCell>Thời gian G.D</UITableHeadCell>
                </UITableHead>
                <UITableBody>
                    {transactionData?.map((item, index) => (
                        <UITableBodyRow key={index}>
                            <UITableBodyCell responsive>{item.id}</UITableBodyCell>
                            <UITableBodyCell>{item.payment_method}</UITableBodyCell>
                            <UITableBodyCell responsive>{formatCurrency(item.actual_sold)}</UITableBodyCell>
                            <UITableBodyCell>{formatDateTime(new Date(item.created_at))}</UITableBodyCell>
                        </UITableBodyRow>
                    ))}
                </UITableBody>
            </UITable>
        </SectionHeader>
    )
}