interface IBuyItem {
    id: number;
    name: string;
    wheel_img: string;
    thumb_img?: string;
    description?: string;
    price1: number;
    price3?: number;
    price5?: number;
    price10?: number;
}

interface IBuyItemHistory {
    pack: number;
    ingame: string;
    status: number;
    created_at: string;
}