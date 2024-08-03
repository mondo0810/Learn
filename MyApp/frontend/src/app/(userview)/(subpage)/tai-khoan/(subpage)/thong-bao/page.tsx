"use client";
import { useEffect, useState } from "react";
import SectionHeader from "../../myaccountComponents/SectionHeader";
import axios from "@/services/axios";
import { formatTimeAgo } from "@/services/format";

export default function Notification() {
    const [notiData, setnotiData] = useState<INotification[]>([]);

    useEffect(() => {
        (async () => {
            const getData = await axios.get("/notification/user");

            if (getData.status === 200) setnotiData(getData.data.data);
        })();
    }, []);

    return (
        <SectionHeader
            title="Thông báo"
            description="Những thông báo quá 7 ngày sẽ tự động xóa.">
                <div className="container">
                    {notiData.length > 0 && notiData.map((noti, index) => 
                        <div key={index} className="bg-zinc-200 dark:bg-zinc-600 dark:text-zinc-200 relative rounded-lg p-4 md:pt-4 pb-8 md:px-5 w-full mb-4">
                            {noti.content}
                            <span className="absolute right-1 bottom-1 inline-block px-2 py-1 rounded text-sm cursor-default font-semibold text-white bg-red-500">
                                {formatTimeAgo(new Date(noti.created_at))}
                            </span>
                        </div>    
                    )}
                </div>
        </SectionHeader>
    )
}