"use client";
import axios from "@/services/axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const HomeContext = createContext<IHomeContext>({
  config: null,
  contact: null,
  theme: null,
  top5: [],
  archives: [],
  buyItems: [],
  luckywheelGames: [],
  themeMode: "",
  toggleThemeMode: () => {},
});

export function useHome() {
  return useContext(HomeContext);
}

export function HomeProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<IConfigSetting | null>(null);
  const [contact, setContact] = useState<IContactSetting | null>(null);
  const [theme, setTheme] = useState<IThemeSetting | null>(null);
  const [top5, setTop5] = useState<ITop5[]>([]);
  const [archives, setArchive] = useState<IArchiveWithNickgameC[]>([]);
  const [buyItems, setbuyItems] = useState<ILuckyWheelGame[]>([]);
  const [luckywheelGames, setLuckywheelGames] = useState<ILuckyWheelGame[]>([]);
  const [themeMode, setThemeMode] = useState<string>("");

  useEffect(() => {
    const lastTheme: string | null = localStorage.getItem("theme");
    setThemeMode(lastTheme ? lastTheme : "light");

    (async () => {
      Promise.all([
        await axios.get("/setting/public/config"),
        await axios.get("/setting/public/contact"),
        await axios.get("/setting/public/theme"),
        await axios.get("/recharge/public/top5"),
        await axios.get("/archive/public"),
        await axios.get("/luckywheel-game/getAllBuyItem"),
        await axios.get("/luckywheel-game/public"),
      ])
        .then((res) => {
          setConfig(res[0].data.data);
          setContact(res[1].data.data);
          setTheme(res[2].data.data);
          setTop5(res[3].data.data);
          setArchive(res[4].data.data);
          setbuyItems(res[5].data.data);
          setLuckywheelGames(res[6].data.data);
        })
        .catch(() => {
          toast.error("Máy chủ hiện đang gặp sự cố!");
        });
    })();
  }, []);

  useEffect(() => {
    themeMode === "dark" ? document.body.classList.add("dark") : document.body.classList.remove("dark");
  }, [themeMode]);

  const toggleThemeMode = () => {
    if (themeMode === "dark") {
      setThemeMode("light");
      localStorage.setItem("theme", "light");
    } else {
      setThemeMode("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <HomeContext.Provider
      value={{ config, contact, theme, top5, archives, luckywheelGames, buyItems, themeMode, toggleThemeMode }}
    >
      {children}
    </HomeContext.Provider>
  );
}
