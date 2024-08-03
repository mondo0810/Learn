interface IArchive {
    id: number;
    title: string;
    description: string;
}

interface IArchiveWithNickgameC extends IArchive {
    nickgameCs: INickgameCategory[];
}

interface IArchiveTitle {
    id: number;
    title: string;
}