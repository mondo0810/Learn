import PageTitle from "@/app/admin/adminComponents/PageTitle";
import EditForm from "@/app/admin/adminComponents/Form/EditForm";
import { getInputArray } from "../inputArray";

export default async function GiftWithdrawalEditPage(route: { params: { id: string } }) {
  const id = route.params.id;
  const inputArr = getInputArray();

  return (
    <>
      <PageTitle title={`Sửa tài đơn rút vật phẩm ${id}`} />
      <EditForm inputArr={inputArr} linkUpdate={`/gift-withdrawal-history/admin/buyitem/${id}`} />
    </>
  );
}
