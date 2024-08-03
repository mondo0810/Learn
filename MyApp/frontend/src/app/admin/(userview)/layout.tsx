import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Khu vực quản trị"
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    );
}
