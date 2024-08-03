interface IHomeContext {
    config: IConfigSetting | null;
    contact: IContactSetting | null;
    theme: IThemeSetting | null;
    top5: ITop5[];
    buyItems: IBuyItem[];
    archives: IArchiveWithNickgameC[];
    luckywheelGames: ILuckyWheelGame[];
    themeMode: string;
    toggleThemeMode: Function;
}