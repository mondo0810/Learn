interface IProps {
  responsive?: boolean;
  children: string | React.ReactElement;
}

export default function UITableHeadCell({ responsive = false, children }: IProps) {
  return <th className={`px-2 py-2 whitespace-nowrap ${responsive && "hidden md:block"}`}>{children}</th>;
}
