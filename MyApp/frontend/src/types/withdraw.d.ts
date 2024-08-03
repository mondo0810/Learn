interface IWithdraw {
    id: number;
    username: string;
    type: number;
    value: number;
    idgame?: string;
    game_account?: string;
    game_password?: string;
    status: number;
    created_at: string;
}

interface IWithdrawByUID {
    type: number;
    value: number;
    status: number;
    created_at: string;
}