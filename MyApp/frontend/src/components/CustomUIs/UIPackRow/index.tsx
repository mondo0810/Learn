"use client";
import { Label, Radio } from "flowbite-react";

interface IProps {
  coin: number;
  data: IWithdrawPack[];
}

export default function UIPackRow({ coin, data }: IProps) {
  return (
    <fieldset>
      {data.map((row, index) => (
        <div key={index} className="p-2 grid grid-cols-11 gap-2 items-center border-b">
          <Radio
            name="pack"
            id={row.coin + "xu"}
            value={row.id}
            className="col-span-1 border-black text-red-500 focus:ring-red-500"
          />
          <Label htmlFor={row.coin + "xu"} className="col-span-3">
            {row.coin + " xu"}
          </Label>
          <Label htmlFor={row.coin + "xu"} className="col-span-7">
            {row.description}
          </Label>
        </div>
      ))}
    </fieldset>
  );
}
