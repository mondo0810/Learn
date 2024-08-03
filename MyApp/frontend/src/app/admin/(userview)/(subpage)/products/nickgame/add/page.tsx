"use client";
import { useEffect, useState } from "react";
import PageTitle from "@/app/admin/adminComponents/PageTitle";
import AddForm from "@/app/admin/adminComponents/Form/AddForm";
import { getInputArray } from "../inputArray";

export default function NickgameAddPage() {
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
      <PageTitle title="Thêm tài khoản thường" />
      {dynamicInputArr ? <AddForm inputArr={dynamicInputArr} linkAdd="/nickgame/admin/add" /> : <p>Loading...</p>}
    </>
  );
}
