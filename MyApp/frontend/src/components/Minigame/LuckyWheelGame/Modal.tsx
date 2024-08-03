import { MouseEventHandler } from "react";
import { HiXMark } from "react-icons/hi2";

interface IProps {
    result: string;
    onClickFunc: MouseEventHandler<HTMLDivElement>;
}

export default function Modal({ result, onClickFunc }: IProps) {
    return (
        <div className="fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center p-2 bg-stone-600/75 z-10">
            <div className="mt-[15px] w-[450px] rounded">
                <div className="p-4 relative bg-red-700 text-white font-semibold">
                    <h2 className="text-2xl">Kết quả</h2>
                    <div 
                        className="absolute right-4 top-4 text-xl cursor-pointer"
                        onClick={onClickFunc}
                    >
                        <HiXMark />
                    </div>
                </div>
                <div className="max-w-md w-full bg-white">
                    <div className="p-2 md:p-4 font-semibold">
                        Chúc mừng bạn đã trúng: <span className="text-red-700 font-bold">{result}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}