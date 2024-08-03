"use client";
import { SelectProps } from "flowbite-react";
import Image from "next/image";
import React, { useState } from "react";

interface IProps extends SelectProps {
    data: { img: any, value: string }[];
    label: React.ReactNode;
}

export default function UIRadioImage(props: IProps) {
    const { label, name, data, ...rest } = props;
    const [telco, setTelco] = useState<string | undefined>();

    function handleChange(e: any) {    
        setTelco(e.target.value);
    }

    return (
        <div className="mb-2">
            <fieldset onChange={handleChange} className="mb-2">
                <legend className="text-zinc-800">
                    {label}
                </legend>

                <div className="grid grid-cols-12 gap-2">
                    {data.map((row, index) => (
                        <div 
                            key={index} 
                            className={`col-span-4 border rounded-md cursor-pointer relative  + ${row.value === telco ? "border-red-600" : "border-zinc-200"}`}
                        >
                            <Image
                                src={row.img}
                                width={120}
                                height={20}
                                className={`absolute p-2 top-0 left-0" + ${row.value === telco ? "grayscale-0" : "grayscale"}`} 
                                alt="card-provider"
                            />
                            
                            <input
                                type="radio"
                                name={name}
                                value={row.value}
                                className="h-10 w-full opacity-0 cursor-pointer border-0" required 
                            />
                        </div>
                    ))}
                </div>

            </fieldset>
        </div >
    );
}
