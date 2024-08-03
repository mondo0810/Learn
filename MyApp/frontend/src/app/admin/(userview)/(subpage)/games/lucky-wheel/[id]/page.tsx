import PageTitle from "@/app/admin/adminComponents/PageTitle";
import EditForm from "@/app/admin/adminComponents/Form/EditForm";
import { getInputArray } from "../inputArray";

export default function LuckyWheelGameEditPage(route: { params: { id: string } }) {
    const id = route.params.id;
    const inputArr = getInputArray();

    return (
        <>
            <PageTitle title={`Sửa vòng quay ${id}`} />
			<EditForm 
                inputArr={inputArr} 
                linkGet={`/luckywheel-game/public/${id}`} 
                linkUpdate={`/luckywheel-game/admin/${id}`} 
            />
        </>
    );
}