"use client";
import PageTitle from "@/app/admin/adminComponents/PageTitle";
import Table from "@/app/admin/adminComponents/Table";
import axios from "@/services/axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function NormalNickgamePage() {
  const router = useRouter();
  const handleUpdateClick = async () => {
    const isConfirmed = window.confirm("Bạn có chắc muốn đăng lại 25 tài khoản đã bán?");

    if (isConfirmed) {
      try {
        const res = await axios.put("/nickgame/admin/updateAvailableAll");
        const data = res.data;
        toast.success(data.message);
        router.push("/admin/products/nickgame");
      } catch (error) {
        console.log("error", error);
      }
    } else {
      console.log("Update cancelled by user.");
    }
  };

  const tableHead: string[] = ["NID", "Ảnh thu nhỏ", "Ingame", "Giá", "Xếp hạng", "Game", "Danh mục", "Tình trạng bán"];
  const tableBody: string[] = ["nid", "thumb_img", "ingame", "price", "rank", "game", "title", "available"];
  const searchField: ISearchField = {
    title: "NID",
    field: "nid",
  };

  return (
    <>
      <PageTitle title="Danh sách tài khoản thường" />
      <button className="px-2 py-2 bg-red-500 rounded-lg m-2 text-white hover:bg-red-600" onClick={handleUpdateClick}>
        Đăng lại 25 tk đã bán
      </button>
      <Table
        getLink="/nickgame/admin"
        updateLink="nickgame/"
        deleteLink="/nickgame/admin/"
        searchField={searchField}
        tableHead={tableHead}
        tableBody={tableBody}
      />
    </>
  );
}
