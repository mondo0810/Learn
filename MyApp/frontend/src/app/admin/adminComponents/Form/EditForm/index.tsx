"use client";
import axios from "@/services/axios";
import { Button, Label } from "flowbite-react";
import { useEffect, useState } from "react";
import InputComp from "../InputComp";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";

interface IProps {
    inputArr: IInputObj[];
    linkGet?: string | undefined;
    linkUpdate: string;
}

export default function EditForm({ inputArr, linkGet, linkUpdate }: IProps) {
    const pathname = usePathname();
    const { push } = useRouter();
    const [inputArray, setInputArray] = useState<IInputObj[]>(inputArr);
    const [isHandle, setIsHandle] = useState<boolean>(false);

    useEffect(() => {
        axios.get(!linkGet ? linkUpdate : linkGet).then(res => {
            const defaultData = res.data.data;

            if (res.status === 200) {
                setInputArray(prevInputArray => 
                    prevInputArray.map(input => ({
                        ...input,
                        defaultValue: defaultData[input.name]
                    }))
                );
            };
        });
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsHandle(true);

        const formData = new FormData(e.target as HTMLFormElement);

        axios.put(linkUpdate, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            if (res.status === 200) {
                toast.success(res.data.message);
                push(pathname.slice(0, pathname.lastIndexOf('/')));
            }
            else toast.error(res.data.message);

            setIsHandle(false);
        });
    };

    return (
        <div className="min-h-[50vh] flex">
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="m-auto p-5 w-full lg:w-2/3 xl:1/2 flex flex-col gap-4 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 shadow-lg rounded"
            >
                {inputArray.map((input, i) => (
                <div key={i} className="flex items-center gap-2">
                    <Label htmlFor={`input${i}`} value={input.label} className="w-2/5" />
                    <div className="w-3/5">
                        {InputComp(input, i, true)}
                    </div>
                </div>
                ))}
                {!isHandle ? <Button type="submit" className="mx-auto w-1/2 uppercase">
                    Lưu chỉnh sửa
                </Button>
                : <Button isProcessing disabled className="mx-auto w-1/2 uppercase">
                    Đang lưu...
                </Button>}
            </form>
        </div>
    );
}