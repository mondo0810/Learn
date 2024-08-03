import PageTitle from "@/app/admin/adminComponents/PageTitle";
import Table from "@/app/admin/adminComponents/Table";

export default function GiftLuckyWheelHistoryPage() {
    const tableHead: string[] = ["ID", "Tên người dùng", "Tên phần quà", "Trạng thái", "Thời gian"];
    const tableBody: string[] = ["id", "username", "name", "status", "created_at"];
    const searchField: ISearchField = {
        title: "tên người dùng",
        field: "username"
    };

    return (
        <>
            <PageTitle title="Danh sách quay quà vòng quay" />
            <Table
                getLink="/gift-luckywheel-history/admin"
                haveAction={false}
                searchField={searchField}
                tableHead={tableHead}
                tableBody={tableBody}
            />
        </>
    );
}