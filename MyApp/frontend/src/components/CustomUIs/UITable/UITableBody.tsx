interface IProps {
    children: React.ReactNode;
}

export default function UITableBody({ children }: IProps) {
    return (
        <tbody className="bg-transparent">
            {children}
        </tbody>
    );
}