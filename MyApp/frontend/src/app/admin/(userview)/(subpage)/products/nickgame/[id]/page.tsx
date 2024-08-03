import PageTitle from "@/app/admin/adminComponents/PageTitle";
import EditForm from "@/app/admin/adminComponents/Form/EditForm";
import { getInputArray } from "../inputArray";

export default async function NickgameEditPage(route: { params: { id: string } }) {
    const id = route.params.id;
    const inputArr = await getInputArray();

    return (
        <>
            <PageTitle title={`Sửa tài khoản thường ${id}`} />
			<EditForm inputArr={inputArr} linkGet={`/nickgame/public/${id}`} linkUpdate={`/nickgame/admin/${id}`} />
        </>
    );
}