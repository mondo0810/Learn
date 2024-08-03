export default function SubpageLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-full py-4 md:py-10 bg-zinc-200 dark:bg-zinc-600 relative">
            {children}
        </div>
    )
}

