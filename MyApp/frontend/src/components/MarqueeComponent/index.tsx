import Image from "next/image";
export const DataList: { name: string; accountNumber: string; price: number; timeAgo: string }[] = [];

const generateRandomName = () => {
  const names = ["Anh Tiến", "Thị Ngọc", "Đức Anh", "Hương", "Quang", "13989238", "tuanminh08@gmail.com"];
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
};

const generateRandomTimeAgo = () => {
  const randomMinutes = Math.floor(Math.random() * 60);
  return `${randomMinutes} phút`;
};

const generateRandomAccountNumber = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  let accountNumber = "";
  for (let i = 0; i < 6; i++) {
    if (i % 2 === 0) {
      accountNumber += letters[Math.floor(Math.random() * letters.length)];
    } else {
      accountNumber += numbers[Math.floor(Math.random() * numbers.length)];
    }
  }

  return accountNumber;
};

for (let i = 0; i < 10; i++) {
  const randomName = generateRandomName();
  const randomAccountNumber = generateRandomAccountNumber();
  const randomPriceArray = [150000, 50000, 100000];
  const randomPrice = randomPriceArray[Math.floor(Math.random() * randomPriceArray.length)];
  const randomTimeAgo = generateRandomTimeAgo();

  DataList.push({
    name: randomName,
    accountNumber: randomAccountNumber,
    price: randomPrice,
    timeAgo: randomTimeAgo,
  });
}

export default function MarqueeComponent() {
  return (
    <div className="flex items-center px-2 py-1 w-full">
      {/* @ts-ignore */}
      <marquee>
        {DataList.map((data, index) => (
          <div key={index} className="inline-block text-center mx-8 ">
            <Image width={36} className="inline" height={36} src="/images/run.gif" alt="run" />
            <span className="text-success">{data.name}</span> đã mua Tài khoản #{data.accountNumber} giá {data.price}{" "}
            <sup className="text-muted">đ</sup> -{" "}
            <span className="text-muted">
              <i>cách đây {data.timeAgo}</i>
            </span>
          </div>
        ))}
        {/* @ts-ignore */}
      </marquee>
    </div>
  );
}
