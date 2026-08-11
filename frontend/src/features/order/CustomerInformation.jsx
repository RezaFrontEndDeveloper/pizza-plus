import { FaWpforms } from "react-icons/fa6";
import { toPersianDigits } from "../../utils/price";

export default function CustomerInformation({ data }) {
    return (
        <div className=" bg-red-50 p-8 min-h-100 border border-red-200 flex flex-col justify-between min-w-140 rounded-2xl">
            <div className="flex pb-2 border-b border-red-100 justify-start items-center gap-2">
                <span className="bg-red-700 p-2 rounded-full">
                    <FaWpforms color="white" />
                </span>
                <p className="text-red-700">اطلاعات مشتری</p>
            </div>

            <div className="flex pb-2 border-b border-red-100 justify-between items-center">
                <p className="text-sm text-stone-700">نام مشتری:</p>
                <p className="text-sm text-stone-700">{data.customer}</p>
            </div>

            <div className="flex  pb-2 border-b border-red-100 justify-between items-center">
                <p className="text-sm text-stone-700">شماره مشتری:</p>
                <p className="text-sm text-stone-700">
                    {toPersianDigits(data.phone)}
                </p>
            </div>

            <div className="flex  pb-2 border-b border-red-100 justify-between items-center">
                <p className="text-sm text-stone-700">آدرس:</p>
                <p className="text-sm text-stone-700">{data.address}</p>
            </div>
        </div>
    );
}
