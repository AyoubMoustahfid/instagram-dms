type SprinnerProps = {
    color?: string
}


export const Spinner = ({ color }: SprinnerProps) => {
    return (
        <div role="status">
            <svg
                aria-hidden="true"
                className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400"
                fill="none"
                viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="20" fill={color || "#fff"} strokeWidth="5"></circle>
            </svg>
        </div>
    )
}