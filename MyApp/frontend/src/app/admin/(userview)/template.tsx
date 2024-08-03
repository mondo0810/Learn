import Main from "../adminComponents/Main";
import AdminNavbar from "../adminComponents/Navbar";
import Sidebar from "../adminComponents/Sidebar";
import { AdminProvider } from "@/contexts/admin.context";

export default async function AdminTemplate({ children }: { children: React.ReactNode }) {
    return (
        <AdminProvider>
            <AdminNavbar />
            <div className="relative top-14 overflow-hidden">
                <Sidebar />
                <Main>
                    {children}
                </Main>
            </div>
        </AdminProvider>
    );
}