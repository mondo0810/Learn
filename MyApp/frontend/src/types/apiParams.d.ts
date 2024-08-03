interface IAccountsFilterParams {
    page: number;
    champ: string;
    skin: string;
    moneyUpper: string;
    moneyUnder: string;
    rank: string;
}

interface ITableParams {
    limit: number;
    page: number;
    order: ASC | DESC;
    [key: string]: any;
}