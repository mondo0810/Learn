"use client";
import { Button, ButtonProps } from "flowbite-react";
import React from "react";

interface IProps extends ButtonProps {
    colorType?: "default" | "blue" | "green" | "purple";
    children?: React.ReactNode;
}

export default function UIButton({ colorType = "default", children, ...rest }: IProps) {
    const types = {
        default: "failure",
        blue: "info",
        green: "success",
        purple: "purple"
    }

    return (
        <Button {...rest} gradientMonochrome={types[colorType]}>
            {children}
        </Button>
    )
}