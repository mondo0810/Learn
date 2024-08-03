"use client";
import { useEffect, useState } from "react";
import styles from "./LuckyWheel.module.css";
import axios from "@/services/axios";
import spinButton from "@assets/images/game/spin-button.png";
import { useAuth } from "@/contexts/auth.context";
import { Select, Tabs } from "flowbite-react";
import Modal from "./Modal";
import { HiClock, HiMiniBookOpen } from "react-icons/hi2";
import { formatCurrency, formatDateTime, formatTimeAgo } from "@/services/format";
import { toast } from "react-toastify";
import { UITable, UITabs } from "@/components/CustomUIs";
import Image from "next/image";
import {
  UITableBody,
  UITableBodyRow,
  UITableBodyCell,
  UITableHeadCell,
  UITableHead,
} from "@/components/CustomUIs/UITable";

interface IProps {
  id: string;
}

export default function LuckyWheelGame({ id }: IProps) {
  const { login, user } = useAuth();
  const [spinning, setSpinning] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");
  const [game, setGame] = useState<ILuckyWheelGame | undefined>();
  const [prizes, setPrizes] = useState<ILuckyWheelPrizes[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [moneyNeed, setMoneyNeed] = useState<number>(10000);
  const [spinTimes, setSpinTimes] = useState<number>(1);
  const [giftLuckyWheelData, setGiftLuckyWheelData] = useState<IGiftLuckyWheelHistoryByUID[]>([]);
  const [giftLuckyWheelDataAll, setGiftLuckyWheelDataAll] = useState<IGiftLuckyWheelHistoryByUID[]>([]);
  const [received, setReceived] = useState<number[]>([]);
  const initialDiff = 360 / prizes.length / 2;

  useEffect(() => {
    if (spinTimes <= 1) {
      (async () => {
        const res = await axios.get("/gift-luckywheel-history/user/history?limit=10");

        setGiftLuckyWheelData(res.data.data);
        login();
      })();
    }
  }, [result]);

  useEffect(() => {
    if (spinTimes <= 1) {
      (async () => {
        const res = await axios.get("/gift-luckywheel-history/user/history-all?limit=10");

        setGiftLuckyWheelDataAll(res.data.data);
        login();
      })();
    }
  }, [result]);

  useEffect(() => {
    (async () => {
      Promise.all([
        await axios.get(`/luckywheel-game/public/${id}`),
        await axios.get(`/luckywheel-prizes/public/game?luckywheel=${id}`),
      ]).then((res) => {
        if (res[0].status === 200) setGame(res[0].data.data);
        if (res[1].status === 200) setPrizes(res[1].data.data);
      });
    })();
  }, []);

  const getRandomDegree = () => {
    const randomProb = Math.random() * 100;
    let cumulativeProb = 0;

    for (let i = 0; i < prizes.length; i++) {
      cumulativeProb += prizes[i].probability;

      if (randomProb < cumulativeProb) {
        console.log("vào đây" + i);
        return i * 45;
      }
    }

    console.log("ra đây");
    return (prizes.length - 1) * 45;
  };
  console.log(getRandomDegree());
  const handleCloseModal = () => {
    setOpenModal(false);
    handleSpin();
  };

  const handleChange = (e: any) => {
    const dataValue1 = e.target.options[e.target.selectedIndex].getAttribute("data-value1");
    const dataValue2 = e.target.options[e.target.selectedIndex].getAttribute("data-value2");

    setSpinTimes(Number(dataValue1));
    setMoneyNeed(Number(dataValue2));
  };

  const handleSpin = () => {
    const balance = user?.balance || 0;

    if (balance >= moneyNeed && spinTimes > 0) {
      setSpinning(true);

      const initialSpins = (Math.floor(Math.random() * 10) + 30) * 360;
      const degrees = initialSpins + getRandomDegree();

      const wheel = document.getElementById("wheel");
      if (wheel) {
        wheel.style.transition = "transform 5s cubic-bezier(0.22, 0.61, 0.36, 1) 0s";
        wheel.style.transform = `rotate(${degrees}deg)`;
      }

      console.log(prizes);
      setTimeout(() => {
        const positiveDegrees = ((degrees % 360) + 360) % 360;
        const index = Math.floor((positiveDegrees / 360) * prizes.length);
        console.log("index là" + index);
        console.log(prizes[index]);
        if (prizes[index]) {
          if (spinTimes === 1) {
            (async () => {
              await axios.post("/gift-luckywheel-history/user/add", {
                luckyWheel_id: id,
                received: [...received, prizes[index].id].toString(),
              });

              setReceived([]);
            })();
          } else setReceived((prev) => [...prev, prizes[index].id]);
          setResult(prizes[index].name || "");
          setOpenModal(true);
          setSpinTimes((spinTimesBefore) => spinTimesBefore - 1);
        } else {
          toast.error("Có lỗi xảy ra, vui lòng thử lại!");
        }

        setSpinning(false);
      }, 6000);
    } else if (spinTimes === 0) {
      const spinOptions = document.getElementById("spinOptions") as HTMLSelectElement;

      setSpinTimes(Number(spinOptions.options[spinOptions.selectedIndex].getAttribute("data-value1")) || 0);

      const wheel = document.getElementById("wheel");
      if (wheel) {
        wheel.style.transition = "transform 0s";
        wheel.style.transform = "rotate(0deg)";
      }
    } else {
      toast.warning("Số tiền không đủ để thực hiện! Vui lòng nạp thêm.");
    }
  };

  return (
    <>
      {openModal && <Modal result={result} onClickFunc={handleCloseModal} />}
      <div className="container mx-auto  ">
        <h1 className="uppercase text-2xl flex justify-center font-extrabold mb-10 text-red-600 dark:text-zinc-200 ">
          {game?.name}
        </h1>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-7 lg:px-5 ">
          <div className="md:col-span-4">
            <div className="relative">
              {game?.wheel_img && (
                <Image
                  src={game.wheel_img}
                  id="wheel"
                  width={500}
                  height={500}
                  className={`w-full h-auto object-scale-down ${styles.wheel} ${spinning && styles.spinning}`}
                  alt="wheel spin"
                />
              )}
              {user && prizes.length > 0 && (
                <Image
                  src={spinButton}
                  width={96}
                  height={96}
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[18%] duration-200 ${
                    !spinning ? "opacity-100 cursor-pointer" : "opacity-50 cursor-not-allowed"
                  }`}
                  onClick={!spinning ? handleSpin : () => {}}
                  alt="spin button"
                />
              )}
            </div>
            {user ? (
              prizes.length > 0 ? (
                <Select id="spinOptions" className="mx-auto mt-10 w-1/2" onChange={handleChange}>
                  <option data-value1={1} data-value2={game?.price1}>
                    Quay 1 lần - {formatCurrency(game?.price1)}
                  </option>
                  {game?.price3 && (
                    <option data-value1={3} data-value2={game.price3}>
                      Quay 3 lần - {formatCurrency(game.price3)}
                    </option>
                  )}
                  {game?.price5 && (
                    <option data-value1={5} data-value2={game.price5}>
                      Quay 5 lần - {formatCurrency(game.price5)}
                    </option>
                  )}
                  {game?.price10 && (
                    <option data-value1={10} data-value2={game.price10}>
                      Quay 10 lần - {formatCurrency(game.price10)}
                    </option>
                  )}
                </Select>
              ) : (
                <p className="text-xl flex justify-center my-5 text-red-500 px-2 font-extrabold">
                  Không tìm thấy phần thưởng để quay!
                </p>
              )
            ) : (
              <p className="text-xl flex justify-center my-5 text-red-500 px-2 font-extrabold">
                Vui lòng đăng nhập để quay!
              </p>
            )}
          </div>

          <div className="md:col-span-3 bg-white dark:bg-zinc-800 h-fit rounded-lg outline outline-2 outline-zinc-400 overflow-hidden">
            <UITabs style="underline">
              <Tabs.Item active title="GẦN ĐÂY" icon={HiClock}>
                <UITable>
                  <UITableHead>
                    <UITableHeadCell>Tên người dùng</UITableHeadCell>
                    <UITableHeadCell>Phần Thưởng</UITableHeadCell>
                    <UITableHeadCell>Thời Gian</UITableHeadCell>
                  </UITableHead>
                  <UITableBody>
                    {giftLuckyWheelDataAll?.map((item, index) => (
                      <UITableBodyRow key={index}>
                        <UITableBodyCell>
                          {item.username == "mondo0810" ? item.fullname : item.username}
                        </UITableBodyCell>
                        <UITableBodyCell>{item.name}</UITableBodyCell>
                        <UITableBodyCell>{formatTimeAgo(new Date(item.created_at))}</UITableBodyCell>
                      </UITableBodyRow>
                    ))}
                  </UITableBody>
                </UITable>
              </Tabs.Item>
              <Tabs.Item active title="LỊCH SỬ" icon={HiClock}>
                <UITable>
                  <UITableHead>
                    <UITableHeadCell>Phần Thưởng</UITableHeadCell>
                    <UITableHeadCell>Trạng Thái</UITableHeadCell>
                    <UITableHeadCell>Thời Gian</UITableHeadCell>
                  </UITableHead>
                  <UITableBody>
                    {giftLuckyWheelData?.map((item, index) => (
                      <UITableBodyRow key={index}>
                        <UITableBodyCell>{item.name}</UITableBodyCell>
                        <UITableBodyCell>{item.status === 1 ? "Thành công" : "Đang chờ"}</UITableBodyCell>
                        <UITableBodyCell>{formatDateTime(new Date(item.created_at))}</UITableBodyCell>
                      </UITableBodyRow>
                    ))}
                  </UITableBody>
                </UITable>
              </Tabs.Item>
              {/* <Tabs.Item title="THỂ LỆ" icon={HiMiniBookOpen}>
                <p className="px-2 text-center tw-text-gray-700 font-semibold">
                  <span className="text-green-600 dark:text-green-500">
                    KHI BẠN CÓ ĐỦ 10K BẠN SẼ ĐƯỢC 1 LƯỢT QUAY. BẠN SẼ CÓ CƠ HỘI NHẬN ĐƯỢC TỚI 6.999 KIM CƯƠNG VÀ NHIỀU
                    PHẦN QUÀ HẤP DẪN KHÁC
                    <br />
                    QUAY NGAY NÀO!!!
                  </span>
                  <br />
                  _________________________________
                  <br />
                  <span className="text-center text-red-600 dark:text-red-500">
                    LƯU Ý: Phần thưởng là NICK hoặc CODE SKIN thì bạn hãy vào “lịch sử chơi game” để nhận nha!
                  </span>
                </p>
              </Tabs.Item> */}
            </UITabs>
          </div>
        </div>
      </div>
    </>
  );
}
