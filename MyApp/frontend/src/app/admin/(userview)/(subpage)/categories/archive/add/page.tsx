import PageTitle from "@/app/admin/adminComponents/PageTitle";
import AddForm from "@/app/admin/adminComponents/Form/AddForm";
import { inputArr } from "../inputArray";

export default function ArchiveCategoryAddPage() {
	return (
		<>
			<PageTitle title="Thêm danh mục lưu trữ" />
			<AddForm inputArr={inputArr} linkAdd="/archive/admin/add" />
		</>
	);
}