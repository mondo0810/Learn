"use client";
import axios from "@/services/axios";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface IAdminContext {
    wider: boolean;
    menu: boolean;
    isMobile: boolean;
    setWider: Dispatch<SetStateAction<boolean>>;
    setMenu: Dispatch<SetStateAction<boolean>>;
    themeMode: string;
    toggleThemeMode: Function;
}

const AdminContext = createContext<IAdminContext | undefined>(undefined);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
    const [wider, setWider] = useState<boolean>(true);
    const [menu, setMenu] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState(false);
    const [role, setRole] = useState<number>(0);
    const [themeMode, setThemeMode] = useState<string>("");
    const { push } = useRouter();
    
    useEffect(() => {
        (async () => {
            const res = await axios.get("/auth/user/role");

            if (res.status === 200) {
                setRole(res.data.data.role);

                if (res.data.data.role < 2) {
                    toast.error("Truy cập không hợp lệ!");
                    push('/');
                };
            } else {
                console.error(res.data?.message || res.statusText);
                push('/');
            }
        })();

        const lastTheme: string | null = localStorage.getItem("theme");
        setThemeMode(lastTheme ? lastTheme : "light");

        const checkIsMobile = () => {
            setIsMobile(/iPhone|iPad|iPod|Android|Windows Phone/i.test(navigator.userAgent));
        };
        checkIsMobile();

        window.addEventListener("resize", checkIsMobile);
        return () => {
            window.removeEventListener("resize", checkIsMobile);
        };
    }, []);

    useEffect(() => {
        themeMode === "dark" ? document.body.classList.add("dark") : document.body.classList.remove("dark");
    }, [themeMode]);

    const toggleThemeMode = () => {
        if (themeMode === "dark") {
            setThemeMode("light");
            localStorage.setItem("theme", "light");
        } else {
            setThemeMode("dark");
            localStorage.setItem("theme", "dark");
        }
    };
    
    return (
        <AdminContext.Provider value={{ wider, setWider, menu, setMenu, isMobile, themeMode, toggleThemeMode }}>
            {role >= 2 && children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error("useAdmin must be used within a AdminProvider");
    }
    return context;
};
