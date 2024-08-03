"use client";
import PageTitle from "@/app/admin/adminComponents/PageTitle";
import AddForm from "@/app/admin/adminComponents/Form/AddForm";
import { getInputArray } from "../inputArray";
import { useEffect, useState } from "react";

export default function NickgameCategoryAddPage() {
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
      <PageTitle title="Thêm danh mục" />
      {dynamicInputArr ? (
        <AddForm inputArr={dynamicInputArr} linkAdd="/nickgame-category/admin/add" />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
