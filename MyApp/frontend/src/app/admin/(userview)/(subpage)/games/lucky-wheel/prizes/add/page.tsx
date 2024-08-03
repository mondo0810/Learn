"use client";
import { useEffect, useState } from "react";
import PageTitle from "@/app/admin/adminComponents/PageTitle";
import AddForm from "@/app/admin/adminComponents/Form/AddForm";
import { getInputArray } from "../inputArray";

export default function LuckyWheelPrizeAddPage() {
  const [dynamicInputArr, setDynamicInputArr] = useState<IInputObj[] | null>(null);

  const loadInputArray = async () => {
    const inputArr = await getInputArray();
    setDynamicInputArr(inputArr);
  };

  useEffect(() => {
    loadInputArray();
  }, []);

  return (
    <>
      <PageTitle title="Thêm phần thưởng vòng quay" />
      <AddForm linkAdd="/luckywheel-prizes/admin/add" inputArr={dynamicInputArr || []} />
      <div className="flex items-center flex-col mt-5">
        <p>* Hướng dẫn thêm phần thưởng vòng quay</p>
        <p>Thêm ngược chiều kim đồng hồ như hình dưới</p>
        <img className="border-white border-8 lg:w-1/2" src="/huongdan.png" alt="" />
      </div>
    </>
  );
}
