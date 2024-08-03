import LuckyWheelGame from "@/components/Minigame/LuckyWheelGame";

export default function LuckyWheelPage({ params }: { params: { luckyWheel: string } }) {
    const id = params.luckyWheel.slice(params.luckyWheel.lastIndexOf('-') + 1);

    return (
        <LuckyWheelGame id={id} />
    );
}