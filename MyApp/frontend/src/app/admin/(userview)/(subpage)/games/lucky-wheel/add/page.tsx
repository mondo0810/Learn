import PageTitle from "@/app/admin/adminComponents/PageTitle";
import AddForm from "@/app/admin/adminComponents/Form/AddForm";
import { getInputArray } from "../inputArray";

export default function LuckyWheelGameAddPage() {
    const inputArr = getInputArray();

    return (
        <>
            <PageTitle title="Thêm vòng quay" />
            <AddForm linkAdd="/luckywheel-game/admin/add" inputArr={inputArr} />
        </>
    );
}
