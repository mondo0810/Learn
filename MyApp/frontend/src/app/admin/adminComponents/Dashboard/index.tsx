"use client";
import axios from "@/services/axios";
import { useEffect, useState } from "react";
import Card from "./Card";

export default function Dashboard() {
  const [statisticsData, setStatisticsData] = useState<IStatisticData | null>(null);

  useEffect(() => {
    axios.get("/dashboard/admin").then((res) => {
      setStatisticsData(res.data.data);
    });
  }, []);

  let statisticsList: IStatistic[] = [
    {
      title: "Số tiền nạp hôm nay",
      count: statisticsData?.rechargeToday || 0,
    },
    {
      title: "Doanh thu bán tài khoản hôm nay",
      count: statisticsData?.nickgameRevenueToday || 0,
    },

    {
      title: "Số thành viên đăng ký hôm nay",
      count: statisticsData?.accountToday || 0,
    },
    {
      title: "Số thẻ cào hợp lệ hôm nay",
      count: statisticsData?.cardToday || 0,
    },
    {
      title: "Số tài khoản đã bán hôm nay",
      count: statisticsData?.nickgameSellToday || 0,
    },

    {
      title: "Tổng số thành viên",
      count: statisticsData?.accountTotal || 0,
    },
    {
      title: "Tổng số dư của thành viên",
      count: statisticsData?.balanceTotal || 0,
    },
    {
      title: "Tổng số xu của thành viên",
      count: statisticsData?.cointTotal || 0,
    },
    {
      title: "Tổng tài khoản đang bán",
      count: statisticsData?.nickgameAvailable || 0,
    },
    {
      title: "Tổng tài khoản đã bán",
      count: statisticsData?.nickgameNonAvailable || 0,
    },

    {
      title: "Tổng số tiền đã nạp",
      count: statisticsData?.rechargeTotal || 0,
    },

    {
      title: "Tổng số thẻ cào hợp lệ",
      count: statisticsData?.cardTotal || 0,
    },
  ];

  return (
    <>
      {statisticsList.map((item: IStatistic, i: number) => (
        <Card key={i} title={item.title} count={item.count} />
      ))}
    </>
  );
}
