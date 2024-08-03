"use client";
import axios from '@/services/axios';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext<IAuth>({
    login: () => void 0,
    loginPassword: () => void 0,
    logout: () => void 0,
    status: 0,
    setDetail: () => void 0
});

export function useAuth() {
    return useContext(AuthContext);
}

function setLocalUser(user: IUser) {
    localStorage.setItem("user", JSON.stringify(user));
}

function getLocalUser(): IUser | undefined {
    const data = localStorage.getItem("user");
    let user: IUser | undefined = undefined;

    try {
        user = JSON.parse(data as string) as IUser;
    } catch (error) {
        console.error(error);
    } finally {
        return user;
    }
}

export function clearLocalUser() {
    localStorage.removeItem("user");
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<IUser | undefined>();
    const [status, setStatus] = useState<number>(0);
    const { push } = useRouter();

    useEffect(() => {
        setUser(getLocalUser());
    }, []);

    const setDetail = (user?: IUser) => {
        if (user) {
            setUser(user);
            setLocalUser(user);
            setStatus(1);
        } else {
            setUser(undefined);
            clearLocalUser();
            setStatus(0);
        }
    }

    const login = async () => {
        const res = await axios.get("/profile/user");
        
        if (res.status === 200) {
            const data = res.data.data;
            const user = {
                uid: data.uid,
                username: data.username,
                balance: data.balance,
                coin: data.coin,
                phone: data.phone,
                avatar: data.avatar,
                email: data.email,
                createdAt: new Date(data.created_at)
            }
            setDetail(user);
        } else {
            setDetail();
        }
    };


    const loginPassword = async (formData: any) => {
        try {
            const res = await axios.post("/auth/public", formData);
            
            if (res.status === 200) {
                const data = res.data;
                // Assume that the response contains the necessary user information
                const user = {
                    uid: data.uid,
                    username: data.username,
                    balance: data.balance,
                    coin: data.coin,
                    phone: data.phone,
                    avatar: data.avatar,
                    email: data.email,
                    createdAt: new Date(data.created_at)
                }
                setDetail(user);
            } else {
                console.error(res.data?.message || "Đăng nhập không thành công");
            }
        } catch (error) {
            console.error((error as any).response?.data?.message || (error as any).message || "Lỗi không xác định");
        }
    };

    const logout = async () => {
        const res = await axios.post("/auth/user/logout", null);
        
        if (res.status === 200) {
            setDetail();
            push('/');
        } else {
            console.error(res.data?.message || res.statusText);
        };
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, setDetail, status, loginPassword }}>
            {children}
        </AuthContext.Provider>
    )
}