import RandomNickgameBox from "./RandomNickgameBox";

interface IProps {
    info?: INickgameCategory;
    data: INickgameRandomView[];
}

export default function NickgameList({ info, data }: IProps) {
    return (
        <section className="py-5 grid grid-cols-12 gap-3">
            {data?.map((item, index) => <RandomNickgameBox key={index} thumb_img={info?.thumb_img || ''} data={item}/>).sort(() => Math.random() - 0.5)}
        </section>
    );
}