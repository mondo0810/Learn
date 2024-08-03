import PageTitle from "@/app/admin/adminComponents/PageTitle";
import Table from "@/app/admin/adminComponents/Table";

export default function LuckyWheelPrizesPage() {
    const tableHead: string[] = ["ID", "Tên vòng quay", "Tên phần thưởng", "Loại phần thưởng", "Giá trị", "DS nickgame", "Xác suất"];
    const tableBody: string[] = ["id", "wheel_name", "name", "type", "value", "title", "probability"];
    const searchField: ISearchField = {
        title: "tên vòng quay",
        field: "wheel_name"
    };

    return (
        <>
            <PageTitle title="Danh sách phần thưởng vòng quay" />
            <Table
                getLink="/luckywheel-prizes/admin"
                updateLink="prizes/"
                deleteLink="/luckywheel-prizes/admin/"
                searchField={searchField}
                tableHead={tableHead}
                tableBody={tableBody}
            />
        </>
    );
}