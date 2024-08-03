import Sidebar from "../Sidebar";

interface IProps {
    setActive: Function;
}

export default function MobileMenu({ setActive }: IProps) {
    return (
        <div className="fixed top-14 right-0 left-0 bottom-0 z-20">
            <Sidebar />
            <div className="h-full w-full bg-zinc-400/50 touch-none" onClick={() => setActive()} />
        </div>
    );
}