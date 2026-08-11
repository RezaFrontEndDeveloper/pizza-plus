import { FaWpforms } from "react-icons/fa6";
import { toPersianDigits } from "../../utils/price";

export default function OrderInformations({ data }) {
    return (
        <div className=" bg-red-50 p-8 min-h-100 flex flex-col justify-between min-w-140 rounded-2xl border border-red-200">
            <div className="flex pb-2 border-b border-red-100 justify-start items-center gap-2">
                <span className="bg-red-700 p-2 rounded-full">
                    <FaWpforms color="white" />
                </span>
                <p className="text-red-700">اطلاعات سفارش</p>
            </div>

            <div className="flex pb-2 border-b border-red-100 justify-between items-center">
                <p className="text-sm text-stone-700">تاریخ ثبت سفارش:</p>
                <p className="text-sm text-stone-700">{data.createdAt}</p>
            </div>

            <div className="flex  pb-2 border-b border-red-100 justify-between items-center">
                <p className="text-sm text-stone-700">وضعیت سفارش:</p>
                <p className="text-sm text-stone-700">{data.status}</p>
            </div>

            <div className="flex  pb-2 border-b border-red-100 justify-between items-center">
                <p className="text-sm text-stone-700">الویت سفارش:</p>
                <p className="text-sm text-stone-700">
                    {data.priority ? "⭐دارد" : "ندارد"}
                </p>
            </div>

            <div className="flex pb-2 border-b border-red-100 justify-between items-center">
                <p className="text-sm text-stone-700"> روش ارسال:</p>
                <p className="text-sm text-stone-700">
                    {data.priority ? "ارسال سریع" : "ارسال معمولی"}
                </p>
            </div>

            <div className="flex pb-2 border-b border-red-100 justify-between items-center">
                <p className="text-sm text-stone-700"> هزینه الویت:</p>
                <p className="text-sm text-stone-700">
                    {toPersianDigits(data.priorityPrice)}
                </p>
            </div>
        </div>
    );
}
