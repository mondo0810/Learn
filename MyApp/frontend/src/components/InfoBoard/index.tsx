interface IProps {
    customClass?: string;
    children: React.ReactNode;
}

export default function InfoBoard({ customClass, children }: IProps) {
    return (
        <div className={`px-3 py-1 h-full border border-amber-300 dark:text-zinc-200 bg-transparent font-bold text-sm leading-7 rounded-lg overflow-y-auto ${customClass}`}>
            {children}
        </div>
    );
}