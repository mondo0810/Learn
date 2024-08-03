import PageTitle from "@/app/admin/adminComponents/PageTitle";
import Table from "@/app/admin/adminComponents/Table";

export default function ArchivePage() {
    const tableHead: string[] = ["ID", "Tên danh mục", "Mô tả danh mục"];
    const tableBody: string[] = ["id", "title", "description"];
    const searchField: ISearchField = {
        title: "tên danh mục",
        field: "title"
    };

    return (
        <>
            <PageTitle title="Các danh mục lưu trữ" />
            <Table
                getLink="/archive/admin"
                updateLink="archive/"
                deleteLink="/archive/admin/"
                searchField={searchField}
                tableHead={tableHead}
                tableBody={tableBody}
            />
        </>
    );
}