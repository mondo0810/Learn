"use client";
import axios from "@/services/axios";
import { Button, Label } from "flowbite-react";
import InputComp from "../InputComp";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function AddForm({ inputArr, linkAdd }: { inputArr: IInputObj[]; linkAdd: string }) {
  const pathname = usePathname();
  const { push } = useRouter();
  const [isHandle, setIsHandle] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsHandle(true);

    const formData = new FormData(e.target as HTMLFormElement);

    (async () => {
      const res = await axios.post(linkAdd, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        toast.success(res.data.message);
        push(pathname.slice(0, pathname.lastIndexOf("/")));
      } else toast.error(res.data.message);

      setIsHandle(false);
    })();
  };

  return (
    <div className="min-h-[50vh] flex">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="m-auto p-5 w-full lg:w-2/3 xl:1/2 flex flex-col gap-4 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 shadow-lg rounded"
      >
        {inputArr.map((input, i) => (
          <div key={i} className="flex items-center gap-2">
            <Label htmlFor={`input${i}`} value={input.label} className="w-2/5" />
            <div className="w-3/5">{InputComp(input, i)}</div>
          </div>
        ))}

        {!isHandle ? (
          <Button type="submit" className="mx-auto w-1/2 uppercase">
            Thêm
          </Button>
        ) : (
          <Button isProcessing disabled className="mx-auto w-1/2 uppercase">
            Đang thêm...
          </Button>
        )}
      </form>
    </div>
  );
}
