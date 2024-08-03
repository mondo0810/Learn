"use client";
import GroupLink from "../../GroupLink";
import _nav from "./nav.json";
import { useAuth } from "@/contexts/auth.context";
import { formatCurrency } from "@/services/format";
import { useEffect, useState } from "react";
import axios from "@/services/axios";
import { UIButton } from "@/components/CustomUIs";
import Image from "next/image";
import { Tooltip } from "flowbite-react";

interface INav {
    title: string;
    links: {
        title: string,
        href: string,
        role?: string,
        new?: boolean
    }[]
}

const nav = _nav as INav[];

export default function MenuPopup() {
    const { logout, user } = useAuth();
    const [role, setRole] = useState<string>("");

    useEffect(() => {
        axios.get("/auth/user/role").then(res => {
            setRole(res.data.data?.role || '');
        });
    }, [role]);

    return (
        <div className="w-[290px]">
            <div className="border-b border-zinc-200 grid grid-cols-12 gap-2 p-2 dark:text-zinc-200">
                <div className="col-span-2 flex items-center justify-content ">
                    {user?.avatar && <Image 
                        src={user.avatar} 
                        width={39}
                        height={39}
                        className="rounded-full" 
                        alt="avatar img" 
                    />}
                </div>
                <div className="col-span-9">
                    <p><b>User: </b>{user?.username}</p>
                    <Tooltip content={"Số dư là số tiền nạp dùng để thanh toán trực tiếp"}>
                        <p><b>Số dư:</b> <span className="text-red-600 font-bold">{formatCurrency(user?.balance)}</span></p>
                    </Tooltip>
                    <Tooltip content={"Xu khóa dùng để rút vật phẩm trong mục trò chơi"}>
                        <p><b>Xu khóa:</b> <span className="text-red-600 font-bold">{formatCurrency(user?.coin, "xu")}</span></p>
                    </Tooltip>
                </div>
            </div>

            {nav.map((group, index) => (
                <GroupLink title={group.title} links={group.links} role={role} key={index} />
            ))}

            <UIButton
                onClick={() => logout()}
                className="mt-2 h-8"
                fullSized
            >
                Đăng xuất
            </UIButton>
        </div>
    )
}