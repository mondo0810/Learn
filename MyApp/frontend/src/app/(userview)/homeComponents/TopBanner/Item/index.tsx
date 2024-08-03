import { formatCurrency } from "@/services/format";
import { HiHeart, HiRocketLaunch, HiStar, HiTrophy } from "react-icons/hi2";

interface IProps {
  data: {
    rank: number;
    username: string;
    amount: number;
  };
}

export default function Item({ data }: IProps) {
  return (
    <div className="flex items-center justify-between px-2 my-1">
      <div className="flex items-center">
        <div className="relative w-7 h-7 text-xl flex-none flex items-center justify-center">
          {data.rank === 1 ? (
            <HiTrophy className="text-red-500" />
          ) : data.rank === 2 ? (
            <p className="bg-red-500 px-2 py-1 rounded-full text-white text-center text-base leading-none font-semibold">
              2
            </p>
          ) : data.rank === 3 ? (
            <p className="bg-green-500 px-2 py-1 rounded-full text-white text-center text-base leading-none font-semibold">
              3
            </p>
          ) : data.rank === 4 ? (
            <p className="bg-amber-500 px-2 py-1 rounded-full text-white text-center text-base leading-none font-semibold">
              4
            </p>
          ) : (
            <p className="bg-amber-500 px-2 py-1 rounded-full text-white text-center text-base leading-none font-semibold">
            5
          </p>
          )}
        </div>
        <span className="relative ml-1 text-black dark:text-zinc-200 w-full font-bold truncate text-sm ">
          {data.username}
        </span>
      </div>
      <div className="font-bold text-lg">
        <span className="bg-red-600 dark:bg-red-500 w-32 py-1 text-white dark:text-zinc-200 rounded text-center inline-block text-sm">
          {formatCurrency(data.amount)}
        </span>
      </div>
    </div>
  );
}
