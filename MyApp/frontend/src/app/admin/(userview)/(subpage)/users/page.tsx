import PageTitle from "@/app/admin/adminComponents/PageTitle";
import Table from "@/app/admin/adminComponents/Table";

export default function UsersPage() {
  const tableHead: string[] = ["ID","Tên người dùng", "Số Dư", "Số Coin", "Vai trò", "Tạo Ngày"];
  const tableBody: string[] = ["id", "username", "balance", "coin", "role", "created_at"];
  const searchField: ISearchField = {
    title: "tên người dùng",
    field: "username",
  };

  return (
    <>
      <PageTitle title="Danh sách người dùng" />
      <Table
        getLink="/profile/admin"
        updateLink="users/"
        deleteLink="/profile/admin/"
        searchField={searchField}
        tableHead={tableHead}
        tableBody={tableBody}
      />
    </>
  );
}
