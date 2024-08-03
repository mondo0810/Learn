export default function PageTitle({ title }: { title: string }) {
    return <h1 className="my-2 font-bold text-2xl md:text-4xl text-gray-800 dark:text-gray-200 uppercase">{title}</h1>;
}