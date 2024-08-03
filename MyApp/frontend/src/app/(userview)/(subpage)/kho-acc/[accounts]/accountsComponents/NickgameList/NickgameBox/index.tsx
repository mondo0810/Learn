import Link from "next/link";
import { formatCurrency } from "@/services/format";
import { usePathname } from "next/navigation";
import { HiFire, HiMiniMagnifyingGlassCircle } from "react-icons/hi2";
import Image from "next/image";

interface IProps {
  data: INickgame;
}

export default function NickgameBox({ data }: IProps) {
  const lineData: ILineData[] = [
    // {
    //   title: " Skin súng: ",
    //   data: data.champs_count || "250",
    // },
    // {
    //   title: " Trang phục: ",
    //   data: data.skins_count || "50",
    // },
    // {
    //   title: " Xếp hạng: ",
    //   data: data.rank || "Chưa rank",
    // },
    {
      title: " Trạng thái: ",
      data: data.status || "Acc trắng thông tin",
    },
  ];
  let pathname = usePathname();
  const subpath = pathname.slice(0, pathname.lastIndexOf("/"));

  if (subpath.length > 8) pathname = subpath;

  return (
    <Link
      href={`${pathname}/${data.nid}`}
      className="col-span-12 md:col-span-3 h-fit bg-white dark:bg-zinc-800 relative border border-transparent hover:border-red-500 rounded-lg shadow-red-500/50 dark:shadow-red-600/50 shadow-lg transition duration-200"
    >
      <div className="h-56 md:h-44">
        {data.thumb_img && (
          <Image
            width={1000}
            height={800}
            src={data.thumb_img}
            className="h-full w-full object-cover object-center rounded-t-md"
            alt="Ảnh minh họa nickgame"
            loading="lazy"
          />
        )}
        <span className="absolute top-2 left-2 bg-[url('/voucher3.png')] bg-[length:105%_80%] bg-center bg-repeat text-[white] font-semibold text-sm leading-4 text-center border cursor-default inline-block p-1 rounded-sm border-[#ff414100]">
          M.Số: #{data.nid}
        </span>
      </div>
      <div className="flex justify-center border-b border-zinc-200 py-2 text-center text-sm text-red-600 dark:text-red-500 px-2">
        <HiFire className="my-auto text-base" />
        <p className="ml-1 uppercase font-semibold">Giảm giá cực sốc!</p>
      </div>
      <div className="my-2 py-1 px-2 relative">
        <div
          className="grid grid-cols-12 gap-y-1 leading-6 text-xs dark:text-zinc-200"
          style={{ fontSize: 15, fontWeight: 500 }}
        >
          {lineData.map((line: ILineData, index: number) => (
            <div className="col-span-12 text-base md:text-sm" key={index}>
              <i className="block md:hidden relative top-[1px]" />
              &rsaquo;{line.title}
              <b className="dark:text-zinc-200">{line.data}</b>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t rounded-b-sm border-zinc-400 px-2 py-1">
        <ul className="rounded-sm w-full font-medium">
          <div className="border-t rounded-b-sm border-gray-100 px-2 py-1">
            <ul className="rounded-sm w-full font-medium">
              <span className="w-full text-center inline-block px-2">
                <span className="text-gray-600 inline-block text-xs line-through">
                  {" "}
                  {formatCurrency(data.price * 3)}
                  <small>đ</small>
                </span>
                <span className="text-red-500 text-lg font-extrabold"> {formatCurrency(data.price)}</span>
              </span>
            </ul>
          </div>

          {/* <span className="w-full text-center text-red-600 dark:text-red-500 inline-block font-extrabold px-2">
            {formatCurrency(data.price)}
          </span> */}
        </ul>
      </div>
      <div className="w-full flex justify-center cursor-pointer rounded-b-md bg-red-600 dark:bg-red-500 hover:bg-red-500 dark:hover:bg-red-600 text-white dark:text-zinc-200 py-1 px-3">
        <HiMiniMagnifyingGlassCircle className="my-auto text-xl" />
        <p className="ml-1 uppercase font-semibold">Chi tiết</p>
      </div>
    </Link>
  );
}
