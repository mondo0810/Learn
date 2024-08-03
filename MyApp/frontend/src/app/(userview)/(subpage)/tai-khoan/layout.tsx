import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Trang cá nhân"
}

export default function MyAccountLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    )
}