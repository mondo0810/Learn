"use client";
import { useEffect } from 'react';
import { useAuth } from "@/contexts/auth.context";

export default function RootTemplate({ children }: { children: React.ReactNode }) {
    const { login } = useAuth();

    useEffect(() => {
        login();
    }, []);

    return (
        <>
            {children}
        </>
    );
}