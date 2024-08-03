import PageTitle from "@/app/admin/adminComponents/PageTitle";
import Table from "@/app/admin/adminComponents/Table";

export default function GiftWithdrawalHistoryPage() {
  const tableHead = ["ID", "Tên người dùng", "Ingame", "Gói rút", "Trạng thái", "Thời gian G.D"];
  const tableBody = ["id", "username", "ingame", "pack", "status5", "created_at"];
  const searchField: ISearchField = {
    title: "tên người dùng",
    field: "username",
  };

  return (
    <>
      <PageTitle title="Danh sách cày thuê" />
      <Table
        getLink="/gift-withdrawal-history/admin/buyitem"
        updateLink="buyitem/"
        deleteLink="/gift-withdrawal-history/admin/"
        searchField={searchField}
        tableHead={tableHead}
        tableBody={tableBody}
      />
    </>
  );
}
