import Button from "../../components/ui/Button";
import { VscCopilotSuccess } from "react-icons/vsc";
import { toPersianDigits, totalPrice } from "../../utils/price";
import { useCartStore } from "../../stores/useCartStore";
export default function SendOrder({ handleSubmit, onSubmit, isPending }) {
    const cart = useCartStore((state) => state.cart);
    const total = totalPrice(cart);

    return (
        <div className="w-full bg-white border border-stone-200 p-4 rounded">
            <div>
                <p className="text-sm text-stone-700">جمع کل سفارش</p>
                <p className="text-red-500 text-xl font-bold">
                    {toPersianDigits(total)}
                </p>
            </div>
            <div>
                <Button variant={"secondary"} onClick={handleSubmit(onSubmit)}>
                    ثبت سفارش
                    <span>
                        <VscCopilotSuccess size={20} />
                    </span>
                </Button>
            </div>
        </div>
    );
}
