import PageTitle from "@/app/admin/adminComponents/PageTitle";
import EditForm from "@/app/admin/adminComponents/Form/EditForm";
import { inputArr } from "../inputArray";

export default function UserEditPage(route: { params: { username: string } }) {
  const username = route.params.username;

  return (
    <>
      <PageTitle title={`Sửa thông tin người dùng ${username}`} />
      <EditForm inputArr={inputArr} linkUpdate={`/profile/admin/${username}`} />
    </>
  );
}
