export default function Button({ children, variant, onClick }) {
    const baseStyle =
        "px-4 py-2 flex justify-center transition-all gap-2 cursor-pointer duration-300 w-40 items-center rounded border border-red-500";

    const variantStyle = {
        primary: "bg-white text-red-500 hover:bg-red-500 hover:text-white ",
        secondary: "bg-red-500 text-white hover:bg-white hover:text-red-500",
    };

    if (!onClick)
        return (
            <button className={`${baseStyle} ${variantStyle[variant]}`}>
                {children}
            </button>
        );

    return (
        <button
            onClick={onClick}
            className={`${baseStyle} ${variantStyle[variant]}`}>
            {children}
        </button>
    );
}
