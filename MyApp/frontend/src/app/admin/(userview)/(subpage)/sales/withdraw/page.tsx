import PageTitle from "@/app/admin/adminComponents/PageTitle";
import Table from "@/app/admin/adminComponents/Table";

export default function GiftWithdrawalHistoryPage() {
  const tableHead = [
    "ID",
    "Tên người dùng",
    "Loại quà",
    "Giá trị",
    "Idgame",
    "Tài khoản",
    "Mật khẩu",
    "Trạng thái",
    "Thời gian G.D",
  ];
  const tableBody = [
    "id",
    "username",
    "giftType",
    "value",
    "idgame",
    "game_account",
    "game_password",
    "status2",
    "created_at",
  ];
  const searchField: ISearchField = {
    title: "tên người dùng",
    field: "username",
  };

  return (
    <>
      <PageTitle title="Danh sách rút thưởng vật phẩm" />
      <Table
        getLink="/gift-withdrawal-history/admin"
        updateLink="withdraw/"
        deleteLink="/gift-withdrawal-history/admin/"
        searchField={searchField}
        tableHead={tableHead}
        tableBody={tableBody}
      />
    </>
  );
}
