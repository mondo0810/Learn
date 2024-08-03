"use client";
import { Label, Select, SelectProps } from "flowbite-react";

interface IProps extends SelectProps {
    label: string
    data: { title: string, value: number | string }[]
}

export default function UISelect(props: IProps) {
    const { label, name, data, ...rest } = props;

    return (
        <div className="mb-2">
            <Label
                className="text-gray-700"
                htmlFor={name}
                value={label}
            />
            <Select {...rest} name={name}>
                {data.map((card, index) => (
                    <option
                        value={card.value}
                        key={index}>
                        {card.title}
                    </option>
                ))}
            </Select>
        </div>
    )
}