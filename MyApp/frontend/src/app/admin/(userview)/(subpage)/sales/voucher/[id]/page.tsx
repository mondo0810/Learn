import PageTitle from "@/app/admin/adminComponents/PageTitle";
import EditForm from "@/app/admin/adminComponents/Form/EditForm";
import { getInputArray } from "../inputArray";

export default function VoucherEditPage(route: { params: { id: string } }) {
    const id = route.params.id;
    const inputArr = getInputArray();

    return (
        <>
            <PageTitle title={`Sửa mã giảm giá ${id}`} />
			<EditForm inputArr={inputArr} linkUpdate={`/voucher/admin/${id}`} />
        </>
    );
}