import { useCartStore } from "../../stores/useCartStore";
import { toPersianDigits } from "../../utils/price";
import CartButtons from "../cart/CartButtons";
import Button from "../../components/ui/Button";
import { toast } from "sonner";

export default function MenuCart({ pizza }) {
    const cart = useCartStore((state) => state.cart);
    console.log(cart);
    const addPizza = useCartStore((state) => state.addPizza);
    const { id, name, description, ingredients, price, soldOut } = pizza;
    function handleAddToCart() {
        addPizza(pizza);
        toast.success("pizza added in the cart");
    }

    return (
        <div className="flex border border-stone-200 p-4 rounded-xl bg-white flex-col justify-center items-center gap-2 ">
            <img
                className={soldOut ? "w-full grayscale" : "w-full"}
                src={`http://localhost:8000${pizza.imageUrl}`}
                alt="pizza image"
            />
            <p className="text-xl text-stone-700 font-bold">{name}</p>
            <p className="text-stone-600 text-md">{ingredients}</p>
            {soldOut ? (
                <p>به اتمام رسیده</p>
            ) : (
                <p className="text-red-500 font-bold">
                    {toPersianDigits(price)} تومان
                </p>
            )}

            {!soldOut ? (
                <Button variant={"primary"} onClick={handleAddToCart}>
                    اضافه کن
                </Button>
            ) : null}
        </div>
    );
}
