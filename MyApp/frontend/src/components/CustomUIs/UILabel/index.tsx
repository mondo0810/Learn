interface IProps {
    title: string,
    index: number
}

export default function UILabel({ title, index }: IProps) {
    return (
        <label className="block mb-2 text-sm font-semibold dark:text-zinc-200"><b>Bước {index}:</b> {title}</label>
    )
}