import PageTitle from "@/app/admin/adminComponents/PageTitle";
import Table from "@/app/admin/adminComponents/Table";

export default function DoneCardHistoryPage() {
    const tableHead: string[] = ["ID", "Tên người dùng", "Loại thẻ", "Serial thẻ", "Mã thẻ", "Giá trị thẻ", "Giá trị thực", "Trạng thái", "Thời gian G.D"];
    const tableBody: string[] = ["id", "username", "card_type", "serial", "code", "card_value", "actual_received", "status3", "created_at"];
    const searchField: ISearchField = {
        title: "tên người dùng",
        field: "username"
    };

    return (
        <>
            <PageTitle title="Lịch sử nạp thẻ" />
            <Table
                getLink="/recharge/admin/card?status=done"
                getCount="/recharge/admin/card/count?status=done"
                searchField={searchField}
                haveAction={false}
                tableHead={tableHead} 
                tableBody={tableBody} />
        </>
    );
}
