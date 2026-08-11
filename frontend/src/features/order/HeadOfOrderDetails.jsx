import { FaPizzaSlice } from "react-icons/fa6";

export default function HeadOfOrderDetails() {
    return (
        <div className="flex justify-start gap-4 items-center">
            <h2 className="text-red-500 font-bold text-lg">جزئیات سفارش</h2>
            <span>
                <FaPizzaSlice size={20} color="red" />
            </span>
        </div>
    );
}
