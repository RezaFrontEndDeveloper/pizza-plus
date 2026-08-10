import { useCartStore } from "../../stores/useCartStore";

export default function CartButtons({ pizza }) {
    const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
    const increaseQuantity = useCartStore((state) => state.increaseQuantity);
    return (
        <div className="flex justify-between w-[370px] border border-red-400 p-2 rounded-2xl items-center gap-2">
            <button
                onClick={() => decreaseQuantity(pizza.id)}
                className="flex justify-center items-center px-2 rounded bg-red-100 text-red-500 hover:bg-red-200 border border-red-400">
                -
            </button>

            <button
                onClick={() => increaseQuantity(pizza.id)}
                className="flex justify-center items-center px-2 rounded bg-red-100 text-red-500 hover:bg-red-200 border border-red-400">
                +
            </button>
        </div>
    );
}
