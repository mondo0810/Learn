"use client";
import { useAuth } from "@/contexts/auth.context";
import { formatCurrency, formatDateTime } from "@/services/format";
import InfoBloc from "../../myaccountComponents/InfoBlock";

interface IInfo {
    title: string,
    value?: string
}

export default function Profile() {
    const { user } = useAuth();

    const info: IInfo[] = [
        { title: "Tên tài khoản", value: user?.username },
        { title: "Họ và Tên", value: user?.name },
        { title: "Số điện thoại", value: user?.phone },
        { title: "Email", value: user?.email },
        { title: "Số dư", value: formatCurrency(user?.balance) },
        { title: "Số xu khóa", value: formatCurrency(user?.coin) },
        { title: "Ngày tham gia", value: formatDateTime(user?.createdAt) }
    ]

    return (
        <div className="col-span-12">
            {info.map((field, index) => (
                <InfoBloc
                    title={field.title}
                    value={field.value}
                    key={index} />
            ))}
        </div>
    )
}