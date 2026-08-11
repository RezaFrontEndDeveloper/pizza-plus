import { MdDeleteSweep } from "react-icons/md";
import { toPersianDigits } from "../../utils/price";
import { useCartStore } from "../../stores/useCartStore";

export default function CartItem({ pizza }) {
    const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
    const increaseQuantity = useCartStore((state) => state.increaseQuantity);
    const deletePizza = useCartStore((state) => state.deletePizza);

    const { id, name, ingredients, price, quantity } = pizza;

    const totalPrice = quantity * price;

    return (
        <div className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-3 shadow shadow-white sm:p-4 md:flex-row md:items-center md:justify-between">
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                <img
                    className="w-20 shrink-0 sm:w-24 md:w-30"
                    src={`http://localhost:8000${pizza.imageUrl}`}
                    alt={name}
                />

                <div className="flex min-w-0 flex-col gap-2">
                    <h4 className="truncate text-sm font-bold text-stone-700 sm:text-md">
                        {name}
                    </h4>

                    <p className="truncate text-xs text-stone-500 sm:text-sm">
                        {ingredients}
                    </p>

                    <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-red-500 sm:text-md">
                            {toPersianDigits(price)}
                        </p>

                        <span>*</span>

                        <p className="text-sm">{toPersianDigits(quantity)}</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between gap-3 sm:gap-5 md:justify-center">
                <div className="flex items-center">
                    <button
                        onClick={() => increaseQuantity(id)}
                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-stone-200 text-red-500 hover:bg-red-200">
                        +
                    </button>

                    <p className="flex h-9 min-w-9 items-center justify-center rounded border border-stone-200 px-2 text-stone-700">
                        {toPersianDigits(quantity)}
                    </p>

                    <button
                        onClick={() => decreaseQuantity(id)}
                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-stone-200 text-red-500 hover:bg-red-200">
                        -
                    </button>
                </div>

                <div className="flex items-center gap-1">
                    <p className="text-base font-bold text-stone-700 sm:text-lg">
                        {toPersianDigits(totalPrice)}
                    </p>

                    <span className="text-xs text-stone-700 sm:text-sm">
                        تومان
                    </span>
                </div>

                <button
                    onClick={() => deletePizza(id)}
                    className="rounded bg-stone-200 p-2 hover:bg-white">
                    <MdDeleteSweep size={22} className="cursor-pointer" />
                </button>
            </div>
        </div>
    );
}
