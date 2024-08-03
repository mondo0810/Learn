interface ITransaction {
    id: number;
    username: string;
    nid: string;
    nrid: string;
    payment_method: string;
    actual_sold: number;
    created_at: datetime;
}

interface ITransactionByUID {
    id: number;
    payment_method: string;
    actual_sold: number;
    created_at: string;
}