import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";
import { IoIosReturnRight } from "react-icons/io";
import { BsBasket3 } from "react-icons/bs";
import { toPersianDigits, totalPrice } from "../../utils/price";
import { useCartStore } from "../../stores/useCartStore";

export default function CartOverView() {
    const cart = useCartStore((state) => state.cart);
    const cartLength = cart.length;
    const total = totalPrice(cart);
    console.log(total);

    return (
        <div className="flex max-h-16.25 justify-between items-center bg-[#fffdfc] p-4">
            <div>
                <Link to="./cart">
                    <Button variant={"primary"}>
                        <IoIosReturnRight size={20} />
                        <span>سبد خرید </span>
                    </Button>
                </Link>
            </div>
            {!cart.length ? (
                <p className="text-stone-700 font-bold text-sm">
                    سبد خرید شما خالی است{" "}
                </p>
            ) : (
                <div className="flex  justify-center items-center gap-8">
                    <div>
                        <p className="text-sm sm:md md:lg">
                            {toPersianDigits(cartLength)} آیتم در سبد خرید شما
                        </p>

                        <div className="flex items-center gap-1">
                            <p className="text-red-500 text-sm sm:md md:lg md:text-lg font-bold">
                                {toPersianDigits(total)}
                            </p>
                            <span className="text-sm font-bold text-red-500">
                                تومان
                            </span>
                        </div>
                    </div>

                    <div>
                        <div className="bg-red-200 rounded p-4 relative hover:bg-red-100 transition-all duration-300">
                            <p className="absolute flex justify-center itemc text-sm top-0 right-0 bg-red-500 px-2 py-0.5 text-white rounded-full">
                                {toPersianDigits(cartLength)}
                            </p>
                            <BsBasket3 size={25} color="red" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
