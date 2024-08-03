interface ICardHistory {
    id: number;
    username: string;
    card_type: number;
    serial: string;
    code: string;
    card_value: number;
    actual_received: number;
    status: number;
    notice: string;
    check_url: string;
    created_at: Date;
}