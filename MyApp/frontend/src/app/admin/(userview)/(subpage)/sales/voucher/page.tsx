import PageTitle from "@/app/admin/adminComponents/PageTitle";
import Table from "@/app/admin/adminComponents/Table";

export default function VoucherPage() {
  const tableHead = ["ID", "Mã giảm giá", "% giảm giá", "Giới hạn dùng", "Trạng thái voucher"];
  const tableBody = ["id", "code", "discount", "quantity", "available"];
  const searchField: ISearchField = {
    title: "mã giảm giá",
    field: "code",
  };

  return (
    <>
      <PageTitle title="Danh sách mã giảm giá" />
      <Table
        getLink="/voucher/admin"
        updateLink="voucher/"
        deleteLink="/voucher/admin/"
        searchField={searchField}
        tableHead={tableHead}
        tableBody={tableBody}
      />
    </>
  );
}
