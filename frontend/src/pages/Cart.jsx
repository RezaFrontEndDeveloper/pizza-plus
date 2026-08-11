import ReuseTitttle from "../components/ui/ReuseTitttle";
import { SlBasketLoaded } from "react-icons/sl";
import CartSection from "../features/cart/CartSection";
import { useCartStore } from "../stores/useCartStore";
import { toPersianDigits, totalPrice } from "../utils/price";
import Button from "../components/ui/Button";
import { FiCornerDownRight } from "react-icons/fi";
import EmpyCart from "../features/cart/EmpyCart";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function Cart() {
    const cart = useCartStore((state) => state.cart);
    const quantity = cart.length;
    const tPrice = totalPrice(cart);
    const clearCart = useCartStore((state) => state.clearCart);

    if (!cart.length) return <EmpyCart />;

    return (
        <div className="w-full p-8">
            <div className="flex gap-4 flex-col w-full">
                <div className="flex justify-start items-center">
                    <SlBasketLoaded size={30} />
                    <ReuseTitttle>سبد خرید شما </ReuseTitttle>
                </div>
                <p>
                    {toPersianDigits(quantity)} آیتم در سبد خرید شما موجود است
                </p>
            </div>

            <div className="mt-20">
                <CartSection />
            </div>

            <div className="my-10 flex flex-col gap-4  bg-white p-4 rounded border border-stone-200">
                <div className="flex w-full flex-col gap-4 justify-end ">
                    <p className="text-sm font-bold text-stone-700">
                        جمع کل سبد خرید
                    </p>
                    <p className="text-red-500 text-2xl font-bold">
                        {toPersianDigits(tPrice)}
                    </p>
                </div>

                <div className="flex justify-between items-center gap-4 w-full">
                    <Link to="/order/new" className="w-full">
                        <Button variant={"primary"}>
                            <span>
                                <FiCornerDownRight />
                            </span>
                            رفتن به صفحه سفارش
                        </Button>
                    </Link>
                    <Button onClick={clearCart} variant={"secondary"}>
                        خالی کردن سبد خرید
                        <span>
                            <FaRegTrashAlt />
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
export default Cart;
