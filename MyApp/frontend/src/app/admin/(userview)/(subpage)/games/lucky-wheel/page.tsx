import PageTitle from "@/app/admin/adminComponents/PageTitle";
import Table from "@/app/admin/adminComponents/Table";

export default function LuckyWheelGamePage() {
    const tableHead: string[] = ["ID", "Tên vòng quay", "Ảnh vòng quay", "Ảnh minh họa", "Mô tả", "Giá 1 lượt", "Giá 3 lượt", "Giá 5 lượt", "Giá 10 lượt"];
    const tableBody: string[] = ["id", "name", "wheel_img", "thumb_img", "description", "price1", "price3", "price5", "price10"];
    const searchField: ISearchField = {
        title: "tên vòng quay",
        field: "name"
    };

    return (
        <>
            <PageTitle title="Danh sách vòng quay" />
            <Table
                getLink="/luckywheel-game/admin"
                updateLink="lucky-wheel/"
                deleteLink="/luckywheel-game/admin/"
                searchField={searchField}
                tableHead={tableHead}
                tableBody={tableBody}
            />
        </>
    );
}