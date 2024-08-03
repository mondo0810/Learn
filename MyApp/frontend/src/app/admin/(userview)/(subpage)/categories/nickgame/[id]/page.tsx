"use client";
import PageTitle from "@/app/admin/adminComponents/PageTitle";
import EditForm from "@/app/admin/adminComponents/Form/EditForm";
import { getInputArray } from "../inputArray";
import { useEffect, useState } from "react";

export default function NickgameCategoryEditPage(route: { params: { id: string } }) {
  const id = route.params.id;
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
      <PageTitle title={`Sửa danh mục tài khoản ${id}`} />
      {dynamicInputArr ? (
        <EditForm
          inputArr={dynamicInputArr}
          linkGet={`/nickgame-category/public/${id}`}
          linkUpdate={`/nickgame-category/admin/${id}`}
        />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
