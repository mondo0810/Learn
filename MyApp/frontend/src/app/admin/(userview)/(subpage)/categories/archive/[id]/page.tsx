import PageTitle from "@/app/admin/adminComponents/PageTitle";
import EditForm from "@/app/admin/adminComponents/Form/EditForm";
import { inputArr } from "../inputArray";

export default function ArchiveCategoryEditPage(route: { params: { id: string } }) {
    const id = route.params.id;

    return (
        <>
            <PageTitle title={`Sửa danh mục lưu trữ ${id}`} />
			<EditForm inputArr={inputArr} linkUpdate={`/archive/admin/${id}`} />
        </>
    );
}