import PageTitle from "@/app/admin/adminComponents/PageTitle";
import EditForm from "@/app/admin/adminComponents/Form/EditForm";
import { getInputArray } from "../inputArray";

export default async function RandomNickgameEditPage(route: { params: { id: string } }) {
    const id = route.params.id;
    const inputArr = await getInputArray();

    return (
        <>
            <PageTitle title={`Sửa tài khoản random ${id}`} />
			<EditForm inputArr={inputArr} linkUpdate={`/nickgame-random/admin/${id}`} />
        </>
    );
}