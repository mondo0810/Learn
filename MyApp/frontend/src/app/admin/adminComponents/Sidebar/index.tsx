"use client";
import {
  HiTicket,
  HiBanknotes,
  HiShoppingCart,
  HiUsers,
  HiFolder,
  HiHome,
  HiCog,
  HiWindow,
  HiPlus,
  HiListBullet,
  HiCurrencyDollar,
  HiLifebuoy,
  HiGift,
  HiClock,
  HiMiniCursorArrowRipple,
} from "react-icons/hi2";
import { AiFillDashboard } from "react-icons/ai";
import { FaGamepad, FaRandom } from "react-icons/fa";
import Item from "./ItemGroup/Item";
import ItemGroup from "./ItemGroup";
import NestedItem from "./ItemGroup/NestedItem";
import { useAdmin } from "@/contexts/admin.context";

export default function Sidebar() {
  const { wider, menu } = useAdmin();

  return (
    <div
      className={`${menu ? "w-64" : wider ? "pr-0 hover:pr-0 md:pr-[6px] w-0 md:w-64" : "w-0 md:w-16"} 
            h-[calc(100vh-3.5rem)] bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 shadow-lg fixed scroll-smooth ${
              menu ? "overflow-y-auto" : "overflow-hidden hover:overflow-auto"
            }`}
    >
      <ItemGroup>
        {menu && <Item href="/" icon={<HiHome />} label="Trang chủ" />}
        <Item href="/admin/dashboard" icon={<AiFillDashboard />} label="Bảng điều khiển" />
      </ItemGroup>

      <ItemGroup label="Quản lý đăng acc">
        <NestedItem href="/admin/products/nickgame" label="Tài khoản thường" icon={<FaGamepad />}>
          <Item href="/admin/products/nickgame/add" icon={<HiPlus />} label="Thêm tài Khoản" />
          <Item href="/admin/products/nickgame" icon={<HiListBullet />} label="DS tài khoản" />
        </NestedItem>
        <NestedItem href="/admin/products/nickgame-random" label="Tài khoản random" icon={<FaRandom />}>
          <Item href="/admin/products/nickgame-random/add" icon={<HiPlus />} label="Thêm tài Khoản" />
          <Item href="/admin/products/nickgame-random" icon={<HiListBullet />} label="DS tài khoản" />
        </NestedItem>
      </ItemGroup>
      <ItemGroup label="Quản lý bán hàng">
        <Item href="/admin/users" icon={<HiUsers />} label="Thành Viên" />
        <Item href="/admin/sales/card-history/pending" icon={<HiCurrencyDollar />} label="Thẻ chờ xử lý" />
        <Item href="/admin/sales/card-history/done" icon={<HiListBullet />} label="Lịch sử nạp thẻ" />
        <Item href="/admin/sales/withdraw" icon={<HiBanknotes />} label="Đơn rút xu chờ xử lý" />
        <Item href="/admin/sales/buyitem" icon={<HiBanknotes />} label="Đơn cày thuê chờ xử lý" />
        <NestedItem href="/admin/sales/product-history" icon={<HiClock />} label="Nhật Ký Sản Phẩm">
          <Item
            href="/admin/sales/product-history/account-selling"
            icon={<HiShoppingCart />}
            label="Lịch sử bán Tài Khoản"
          />
          <Item href="/admin/sales/product-history/luckywheel" icon={<HiBanknotes />} label="Lịch sử Vòng Quay" />
        </NestedItem>
        <NestedItem href="/admin/sales/voucher" icon={<HiTicket />} label="Mã Giảm Giá">
          <Item href="/admin/sales/voucher/add" icon={<HiPlus />} label="Thêm mã giảm giá" />
          <Item href="/admin/sales/voucher" icon={<HiListBullet />} label="DS mã giảm giá" />
        </NestedItem>
      </ItemGroup>

      <ItemGroup label="Quản lý trò chơi">
        <NestedItem href="/admin/games/lucky-wheel" icon={<HiLifebuoy />} label="Vòng quay may mắn">
          <Item href="/admin/games/lucky-wheel/add" icon={<HiPlus />} label="Thêm vòng quay" />
          <Item href="/admin/games/lucky-wheel" icon={<HiListBullet />} label="DS vòng quay" />
          <NestedItem href="/admin/games/lucky-wheel/prizes" icon={<HiGift />} label="Phần thưởng">
            <Item href="/admin/games/lucky-wheel/prizes/add" icon={<HiPlus />} label="Thêm phần thưởng" />
            <Item href="/admin/games/lucky-wheel/prizes" icon={<HiListBullet />} label="DS phần thưởng" />
          </NestedItem>
        </NestedItem>
      </ItemGroup>
      <ItemGroup label="Quản lý danh mục">
        <NestedItem href="/admin/categories/archive" label="Danh mục lưu trữ" icon={<HiFolder />}>
          <Item href="/admin/categories/archive/add" icon={<HiPlus />} label="Thêm danh mục" />
          <Item href="/admin/categories/archive" icon={<HiListBullet />} label="DS danh mục" />
        </NestedItem>
        <NestedItem href="/admin/categories/nickgame" label="Danh mục tài khoản" icon={<HiFolder />}>
          <Item href="/admin/categories/nickgame/add" icon={<HiPlus />} label="Thêm danh mục" />
          <Item href="/admin/categories/nickgame" icon={<HiListBullet />} label="DS danh mục" />
        </NestedItem>
      </ItemGroup>
      <ItemGroup label="Thiết lập chung">
        <Item href="/admin/settings/configuration" icon={<HiCog />} label="Cấu hình" />
        <Item href="/admin/settings/theme" icon={<HiWindow />} label="Giao diện" />
        <Item href="/admin/settings/contact" icon={<HiMiniCursorArrowRipple />} label="Liên hệ" />
      </ItemGroup>
      <hr className="mt-5" />
      <p className="text-center text-xs text-gray-500 dark:text-gray-400 py-10">© 2023 WebGame</p>
    </div>
  );
}
