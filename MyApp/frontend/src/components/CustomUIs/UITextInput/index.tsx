"use client"

import { Label, TextInput, TextInputProps } from "flowbite-react";

interface IProps extends TextInputProps {
    valid?: boolean;
    label?: string;
}

export default function UITextInput(props: IProps) {
    const { className = "", valid = true, label, ...rest } = props;

    return (
        <div className={"mb-2 " + className}>
            <Label
                className="text-gray-700"
                htmlFor={props.name}
                value={label}
            />
            <TextInput
                className="w-full"
                color={valid ? "gray" : "failure"}
                {...rest}
            />
        </div>
    )
}