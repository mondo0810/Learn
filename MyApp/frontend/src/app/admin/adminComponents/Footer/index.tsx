"use client";
import { useEffect, useState } from "react";
import axios from "@/services/axios";

export default function Footer() {
    const [config, setConfig] = useState<IConfigSetting | undefined>();

    useEffect(() => {
        axios.get("/setting/public/config").then(res => {
            setConfig(res.data.data);
        });
    }, []);

    return (
        <div className="h-fit md:h-6 flex flex-wrap md:justify-between font-semibold bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            <p>{config?.copyright}</p>
            <p>
                Phiên bản <span className="text-red-600">{config?.version}</span>
            </p>
        </div>
    );
}
