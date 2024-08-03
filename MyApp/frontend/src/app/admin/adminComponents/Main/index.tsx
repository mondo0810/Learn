"use client";
import { useAdmin } from "@/contexts/admin.context";
import Footer from "../Footer";
import MobileMenu from "../MobileMenu";

export default function Main({ children }: { children: React.ReactNode }) {
    const { wider, menu, setMenu } = useAdmin();

    return (
        <>
            {menu && <MobileMenu setActive={() => setMenu(false)} />}
            <div className={`${wider ? "pr-0 md:pr-64 left-0 md:left-64" : "pr-16 left-16"} relative`}>
                <div className="p-5 bg-gray-200 dark:bg-gray-800 min-h-[calc(100vh-5rem)]">{children}</div>
                <Footer />
            </div>
        </>
    );
}