export default function SubpageTemplate({ children }: { children: React.ReactNode }) {
    return (
        <div className="mx-auto max-w-6xl px-2">
            {children}
        </div>
    )
}