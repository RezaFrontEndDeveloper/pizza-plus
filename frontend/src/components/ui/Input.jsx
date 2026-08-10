export default function Input({ variant }) {
    const basicStyle =
        "px-4 py-2 w-[500px] focus:w-[700px] focus:shadow focus:shadow-stone-200 treansition-all duration-300 rounded bg-white placeholder:text-stone-400 outline-none px-4 py-2 transition-all duration-300";
    return (
        <input
            type="text"
            placeholder="کد سفارش خودرا وارد کنید..."
            className={`${basicStyle} ${variant}`}
        />
    );
}
