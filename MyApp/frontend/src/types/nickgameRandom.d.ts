interface INickgameRandom {
    nrid: string;
    category_id?: number;
    title: string;
    ingame: string;
    password: string;
    game: string;
    available?: boolean;
};

interface INickgameRandomView {
    nrid: string;
    price: number;
}

interface ICreateNickgameRandom {
    category_id: number;
    ingame: string;
    password: string;
    game: string;
};