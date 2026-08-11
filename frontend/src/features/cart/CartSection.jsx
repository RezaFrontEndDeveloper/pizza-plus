import { useCartStore } from "../../stores/useCartStore";
import CartItem from "./CartItem";

export default function CartSection() {
    const cart = useCartStore((state) => state.cart);

    return (
        <div className="flex flex-col gap-4 ">
            {cart.map((pizza) => (
                <CartItem pizza={pizza} key={pizza.id} />
            ))}
        </div>
    );
}
