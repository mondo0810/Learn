import GroupLink from "./GroupLink";
import _nav from "./nav.json";
import { HiBell, HiClipboard, HiClock, HiCreditCard, HiIdentification, HiPuzzlePiece, HiTicket } from "react-icons/hi2";
import { useAuth } from "@/contexts/auth.context";
import Image from "next/image";
import { toast } from "react-toastify";
import { Tooltip } from "flowbite-react";

interface ISidebarNav {
  title: string;
  links: {
    title: string;
    href: string;
  }[];
}

const icons = [
  <HiIdentification key={1} className="text-xl" />,
  <HiBell key={2} className="text-xl" />,
  <HiPuzzlePiece key={3} className="text-xl" />,
  <HiCreditCard key={4} className="text-xl" />,
  <HiTicket key={5} className="text-xl" />,
  <HiClock key={6} className="text-xl" />,
];
const navigation = (_nav as ISidebarNav[]).map((item, index) => ({ ...item, key: index, icon: icons[index] }));

export default function Sidebar() {
  const { user } = useAuth();

  const saveToClipboard = () => {
    navigator.clipboard.writeText(user?.uid || "");
    toast.success("Đã sao chép!");
  };

  return (
    <div className="w-full p-2 md:p-0">
      <div className="grid grid-cols-12 gap-2 pr-2 pb-2">
        <div className="col-span-3 flex items-center justify-content">
          {user?.avatar && (
            <Image
              src={user.avatar}
              width={47}
              height={47}
              loading="lazy"
              alt="user avatar"
              className="w-full h-auto rounded-full border"
            />
          )}
        </div>
        <div className="col-span-9">
          <p className="flex items-center dark:text-zinc-200">
            <b className="mr-1">ID:</b> {user?.uid || ""}
            <button className="ml-2 flex text-zinc-500 dark:text-zinc-100 cursor-pointer" onClick={saveToClipboard}>
              <div className="m-auto text-sm">
                <HiClipboard />
              </div>
            </button>
          </p>
          <p className="text-sm dark:text-zinc-200">
            <Tooltip content={"Số dư là số tiền nạp dùng để thanh toán trực tiếp"}>
              <b>Số dư: </b>
              <span className="text-red-600 dark:text-red-500 font-bold">{user?.balance || 0} đ</span>
              <br />
            </Tooltip>
            <Tooltip content={"Xu khóa dùng để rút vật phẩm trong mục trò chơi"}>
              <b>Xu khóa: </b>
              <span className="text-red-600 dark:text-red-500 font-bold">{user?.coin || 0} xu</span>
            </Tooltip>
          </p>
        </div>
      </div>
      <div className="mb-4 w-full border-b border-gray-200"></div>
      <div>
        {navigation.map((item, index) => (
          <GroupLink key={index} icon={item.icon} links={item.links} title={item.title} />
        ))}
      </div>
    </div>
  );
}
