import PageTitle from "@/app/admin/adminComponents/PageTitle";
import Table from "@/app/admin/adminComponents/Table";

export default function PendingCardHistoryPage() {
  const tableHead: string[] = [
    "ID",
    "Tên người dùng",
    "Loại thẻ",
    "Serial thẻ",
    "Mã thẻ",
    "Giá trị thẻ",
    "Trạng Thái",
    "Thời gian G.D",
  ];
  const tableBody: string[] = ["id", "username", "card_type", "serial", "code", "card_value", "status3", "created_at"];
  const searchField: ISearchField = {
    title: "tên người dùng",
    field: "username",
  };

  return (
    <>
      <PageTitle title="Danh sách nạp thẻ chờ xử lý" />
      <Table
        getLink="/recharge/admin/card?status=pending"
        getCount="/recharge/admin/card/count?status=pending"
        haveAction={true}
        updateLink="pending/"
        deleteLink="/recharge/admin/card/"
        searchField={searchField}
        tableHead={tableHead}
        tableBody={tableBody}
      />
    </>
  );
}
