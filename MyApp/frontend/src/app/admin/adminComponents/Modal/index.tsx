interface IProps {
    setState: Function;
}

export default function NotificationModal({ setState }: IProps) {
    return (
        <div 
            className="fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center p-2 z-30 bg-zinc-800/75"
            onClick={() => setState()}
        >
            <div className="mt-[15px] w-[450px] rounded pointer-events-none">
                <div className="p-4 relative bg-red-600 text-white dark:text-zinc-200 font-semibold">

                </div>
            </div>
        </div>
    );
}