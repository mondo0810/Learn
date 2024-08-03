import PageTitle from "@/app/admin/adminComponents/PageTitle";
import EditForm from "@/app/admin/adminComponents/Form/EditForm";
import { getInputArray } from "../inputArray";

export default async function LuckyWheelPrizeEditPage(route: { params: { id: string } }) {
    const id = route.params.id;
    const inputArr = await getInputArray();

    return (
        <>
            <PageTitle title={`Sửa phần thưởng vòng quay ${id}`} />
			<EditForm inputArr={inputArr} linkUpdate={`/luckywheel-prizes/admin/${id}`} />
        </>
    );
}