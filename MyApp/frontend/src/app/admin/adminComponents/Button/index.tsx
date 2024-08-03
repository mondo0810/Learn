import { MouseEventHandler } from "react";

interface IProps {
  className?: string;
  onClickFunc?: MouseEventHandler<HTMLDivElement>;
  children: React.ReactElement[] | React.ReactElement | string;
}

export default function Button({ className, onClickFunc, children }: IProps) {
  return (
    <div className={`${className} m-auto h-fit p-2 flex cursor-pointer `} onClick={onClickFunc}>
      {children}
    </div>
  );
}
