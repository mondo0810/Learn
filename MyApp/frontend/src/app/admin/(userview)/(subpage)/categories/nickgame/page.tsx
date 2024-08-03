import PageTitle from "@/app/admin/adminComponents/PageTitle";
import Table from "@/app/admin/adminComponents/Table";

export default function NickgameCategoryPage() {
    const tableHead: string[] = ["ID", "Tên danh mục", "Danh mục lưu trữ", "Ảnh thu nhỏ", "Chú thích", "Mô tả", "Chế độ", "Đồng giá", "Xuất hiện"];
    const tableBody: string[] = ["id", "title", "archive", "thumb_img", "notice", "description", "random", "price", "display"];
    const searchField: ISearchField = {
        title: "tên danh mục",
        field: "title"
    };

    return (
        <>
            <PageTitle title="Các danh mục tài khoản" />
            <Table
                getLink="/nickgame-category/admin"
                updateLink="nickgame/"
                deleteLink="/nickgame-category/admin/"
                searchField={searchField}
                tableHead={tableHead}
                tableBody={tableBody}
            />
        </>
    );
}