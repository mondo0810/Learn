interface IVoucher {
    id: number;
    code: string;
    quantity: number;
    discount: number;
    available: boolean;
}

interface IVoucherByUID {
    code: string;
    quantity: number;
    discount: number;
}