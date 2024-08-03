interface IUser {
    uid: string;
    username: string;
    name?: string;
    balance: number;
    coin: number;
    phone: string;
    avatar?: string;
    email?: string;
    createdAt: Date;
}