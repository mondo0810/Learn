import Dashboard from "../../adminComponents/Dashboard";
import PageTitle from "../../adminComponents/PageTitle";

export default function DashboardPage() {
    return (
        <>
            <PageTitle title="Bảng điều khiển" />
            <h2 className="my-1 font-semibold text-2xl text-gray-800 uppercase">Thống kê toàn bộ</h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-5">
                <Dashboard />
            </div>
        </>
    );
}
