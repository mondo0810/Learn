export default function Card({ title, count }: { title: string; count: number }) {
  let numStr: string = count.toString();

  for (let i = count.toString().length - 3; i > 0; i -= 3) {
    numStr = numStr.substring(0, i) + "." + numStr.substring(i);
  }

  return (
    <div className="p-1 h-40 flex flex-col justify-center items-center bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300 text-center rounded hover:border-solid hover:border hover:border-gray-700 dark:hover:border-gray-300 hover:scale-105 duration-200 hover:duration-300 cursor-default">
      <h3 className="uppercase font-medium">{title}</h3>
      <div className="text-3xl font-semibold">{numStr}</div>
    </div>
  );
}
