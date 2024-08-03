"use client";
import axios from "@/services/axios";
import SectionHeader from "../../../tai-khoan/myaccountComponents/SectionHeader";
import { useEffect, useState } from "react";
import { UITable } from "@/components/CustomUIs";
import { UITableBody, UITableBodyCell, UITableBodyRow, UITableHead, UITableHeadCell } from "@/components/CustomUIs/UITable";

export default function Voucher() {
    const [voucherData, setVoucherData] = useState<IVoucherByUID[]>([]);

    useEffect(() => {
        axios.get("/voucher/public").then(res => {
            setVoucherData(res.data.data);
        });
    }, []);

    return (
        <SectionHeader
            title="Danh Sách Voucher"
            description="Tất cả các voucher nhận được."
        >
            <UITable>
                <UITableHead>
                    <UITableHeadCell>Mã giảm giá</UITableHeadCell>
                    <UITableHeadCell responsive>Số lượng</UITableHeadCell>
                    <UITableHeadCell>% giảm</UITableHeadCell>
                </UITableHead>
                <UITableBody>
                    {voucherData?.map((item, index) => (
                        <UITableBodyRow key={index}>
                            <UITableBodyCell>{item.code}</UITableBodyCell>
                            <UITableBodyCell responsive>{item.quantity} lượt</UITableBodyCell>
                            <UITableBodyCell>{item.discount} %</UITableBodyCell>
                        </UITableBodyRow>
                    ))}
                </UITableBody>
            </UITable>
        </SectionHeader>
    )
}