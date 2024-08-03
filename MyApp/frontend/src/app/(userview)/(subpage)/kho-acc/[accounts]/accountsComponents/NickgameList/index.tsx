import NickgameBox from "./NickgameBox";

interface IProps {
    data: INickgame[];
}

export default function NickgameList({ data }: IProps) {
    return (
        <section className="py-5 grid grid-cols-12 gap-3">
            {data?.map((item, index) => <NickgameBox key={index} data={item}/>)}
        </section>
    );
}