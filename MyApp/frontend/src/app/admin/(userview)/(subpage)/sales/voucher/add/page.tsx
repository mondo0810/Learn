import PageTitle from "@/app/admin/adminComponents/PageTitle";
import AddForm from "@/app/admin/adminComponents/Form/AddForm";
import { getInputArray } from "../inputArray";

export default function VoucherAddPage() {
    const inputArr = getInputArray();

    return (
        <>
            <PageTitle title="Thêm mã giảm giá" />
            <AddForm linkAdd="/voucher/admin/add" inputArr={inputArr} />
        </>
    );
}
