"use client";
import PageTitle from "@/app/admin/adminComponents/PageTitle";
import axios from "@/services/axios";
import { Button, Label, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function ContactPage() {
    const [isHandle, setIsHandle] = useState<boolean>(false);
    const [defaultValue, setDefaultValue] = useState<IContactSetting>({
        hotline: "",
        fanpage_link: "",
        youtube_link: ""
    });
    const inputData = useRef(null);

    useEffect(() => {
        axios.get("/setting/public/contact").then(res => {
            const defaultData = res.data.data;

            if (res.status === 200 && defaultData) setDefaultValue(defaultData);
        });
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsHandle(true);

        const formData = new FormData(inputData?.current || undefined);
        const formDataObject: IFormData = {};
        
        Array.from(formData.entries()).forEach(([name, value]) => {
            formDataObject[name] = value;
        });

        axios.put("/setting/admin/contact", formDataObject).then((response) => {
            if (response.status === 200) toast.success(response.data.message);

            setIsHandle(false);
        });
    }

    return (
        <>
            <PageTitle title="Thiết lập liên hệ" />
            <div className="w-full">
                <form ref={inputData} onSubmit={handleSubmit} className="p-5 flex flex-col gap-4 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 shadow-lg rounded">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="hotline" value="Hotline" className="w-1/4" />
                        <TextInput id="hotline" name="hotline" type="text" defaultValue={defaultValue["hotline"]} placeholder="V.D: 113" className="w-3/4" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Label htmlFor="fanpage-link" value="Trang Fanpage" className="w-1/4" />
                        <TextInput id="fanpage-link" name="fanpage_link" defaultValue={defaultValue["fanpage_link"]} type="text" placeholder="V.D: https://www.facebook.com/fanpege" className="w-3/4" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Label htmlFor="youtube-link" value="Kênh Youtube" className="w-1/4" />
                        <TextInput id="youtube-link" name="youtube_link" defaultValue={defaultValue["youtube_link"]} type="text" placeholder="V.D: https://www.youtube.com/youtube-channel" className="w-3/4" />
                    </div>
                    {!isHandle ? <Button type="submit" className="mx-auto w-1/4 uppercase">
                        Lưu
                    </Button>
                    : <Button isProcessing disabled className="mx-auto w-1/4 uppercase">
                        Đang lưu...
                    </Button>}
                </form>
            </div>
        </>
    );
}
