import PageTitle from "@/app/admin/adminComponents/PageTitle";
import Table from "@/app/admin/adminComponents/Table";

export default function AccountSellingPage() {
    const tableHead = ["ID", "Tên người dùng", "NID", "NRID", "P.T thanh toán", "Số tiền bán thực", "Thời gian G.D"];
    const tableBody = ["id", "username", "nid", "nrid", "payment_method", "actual_sold", "created_at"];
    const searchField: ISearchField = {
        title: "tên tài khoản",
        field: "username"
    };

    return (
        <>
            <PageTitle title="Danh sách giao dịch tài khoản" />
            <Table
                getLink="/transaction/admin"
                haveAction={false}
                searchField={searchField}
                tableHead={tableHead}
                tableBody={tableBody}
            />
        </>
    );
}