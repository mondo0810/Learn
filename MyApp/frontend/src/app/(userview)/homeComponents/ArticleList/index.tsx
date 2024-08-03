"use client";
import { useHome } from "@/contexts/home.context";
import ArticleBox from "./Article";
import ArchiveBox from "./ArchiveBox";
import { useEffect, useState } from "react";
import { generateRandomNumber } from "@/services/generate";

export default function ArticleList() {
  const { archives, luckywheelGames, buyItems } = useHome();
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const lastCount: string | null = localStorage.getItem("count");
    const newCount = lastCount ? Number(lastCount) + generateRandomNumber(1) : generateRandomNumber(10);

    setCount(newCount);
    localStorage.setItem("count", String(newCount));
  }, []);
  return (
    <>
      {archives.length > 0 ? (
        archives.map((archive, index) => (
          <ArticleBox title={archive.title} key={index}>
            {archive.nickgameCs.map(
              (nickgameC, index) => nickgameC.display && <ArchiveBox key={index} nickgameC={nickgameC} />
            )}
          </ArticleBox>
        ))
      ) : (
        <ArticleBox>
          <ArchiveBox />
          <ArchiveBox />
          <ArchiveBox />
          <ArchiveBox />
        </ArticleBox>
      )}

      {buyItems.length > 0 ? (
        <ArticleBox title="DANH MỤC KHÁC">
          {buyItems.map((buyItem, index) => (
            <ArchiveBox buyItem={buyItem} key={index} />
          ))}
        </ArticleBox>
      ) : (
        <br />
      )}

      {luckywheelGames.length > 0 ? (
        <ArticleBox title="Sân chơi vui có thưởng">
          {luckywheelGames.map((game, index) => (
            <ArchiveBox game={game} key={index} />
          ))}
        </ArticleBox>
      ) : (
        <br />
      )}
    </>
  );
}
