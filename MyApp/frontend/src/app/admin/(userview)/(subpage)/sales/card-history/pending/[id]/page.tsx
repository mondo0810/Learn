import PageTitle from "@/app/admin/adminComponents/PageTitle";
import EditForm from "@/app/admin/adminComponents/Form/EditForm";
import { getInputArray } from "../../inputArray";

export default function CardHistoryEditPage(route: { params: { id: string } }) {
  const id = route.params.id;
  const inputArr = getInputArray();

  return (
    <>
      <PageTitle title={`Cập nhật trạng thái thẻ cào ${id}`} />
      <EditForm inputArr={inputArr} linkUpdate={`/recharge/admin/card/${id}`} />
    </>
  );
}
