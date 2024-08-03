import TabItem from "./TabItem";
import FFImg from "@assets/images/tabIcon/icon-game-big.png";
import LQImg from "@assets/images/tabIcon/icon_lq.png";
import LMImg from "@assets/images/tabIcon/icon_roblox.jpg";

export default function TabList() {
  return (
    <div className=" mb-4 bg-white dark:bg-zinc-800 rounded-lg overflow-hidden">
      {/* <TabItem
        game_name="Roblox"
        fulltext="Robux"
        shorttext="Robux"
        icon_src={LMImg}
        href="/tai-khoan/tro-choi/rut-vat-pham/robux"
      /> */}
      {/* <TabItem
        game_name="Huyền thoại hải tặc"
        fulltext="Kim Cương"
        shorttext="Kc "
        icon_src={FFImg}
        href="/tai-khoan/tro-choi/rut-vat-pham/kc"
      /> */}

      <TabItem
        game_name="Liên Quân"
        fulltext="Quân Huy"
        shorttext="QH"
        icon_src={LQImg}
        href="/tai-khoan/tro-choi/rut-vat-pham/qh"
      />
    </div>
  );
}
