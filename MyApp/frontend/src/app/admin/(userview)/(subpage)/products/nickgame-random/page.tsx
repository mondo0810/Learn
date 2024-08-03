import PageTitle from "@/app/admin/adminComponents/PageTitle";
import Table from "@/app/admin/adminComponents/Table";

export default function RandomNickgamePage() {
  const tableHead: string[] = ["NRID", "Ingame", "Mật khẩu", "Game", "Danh mục", "Tình trạng bán"];
  const tableBody: string[] = ["nrid", "ingame", "password", "game", "title", "available"];
  const searchField: ISearchField = {
    title: "NRID",
    field: "nrid",
  };

  return (
    <>
      <PageTitle title="Danh sách tài khoản ngẫu nhiên" />
      <Table
        getLink="/nickgame-random/admin"
        updateLink="nickgame-random/"
        deleteLink="/nickgame-random/admin/"
        searchField={searchField}
        tableHead={tableHead}
        tableBody={tableBody}
      />
    </>
  );
}
