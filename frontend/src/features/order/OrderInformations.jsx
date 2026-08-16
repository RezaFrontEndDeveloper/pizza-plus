import { FaWpforms } from 'react-icons/fa6';
import { toPersianDigits } from '../../utils/price';

export default function OrderInformations({ data }) {
    return (
        <div className="flex min-h-100 flex-col justify-between gap-4 rounded-2xl border border-red-200 bg-red-50 p-4 sm:gap-5 sm:p-6 lg:p-8">
            <div className="flex items-center justify-start gap-2 border-b border-red-100 pb-3">
                <span className="rounded-full bg-red-700 p-2">
                    <FaWpforms color="white" />
                </span>

                <p className="text-sm font-medium text-red-700 sm:text-base">
                    اطلاعات سفارش
                </p>
            </div>

            <div className="flex items-center justify-between gap-4 border-b border-red-100 pb-3">
                <p className="text-xs text-stone-700 sm:text-sm">
                    تاریخ ثبت سفارش:
                </p>

                <p className="text-left text-xs text-stone-700 sm:text-sm">
                    {data.createdAt}
                </p>
            </div>

            <div className="flex items-center justify-between gap-4 border-b border-red-100 pb-3">
                <p className="text-xs text-stone-700 sm:text-sm">
                    وضعیت سفارش:
                </p>

                <p className="text-xs text-stone-700 sm:text-sm">
                    {data.status}
                </p>
            </div>

            <div className="flex items-center justify-between gap-4 border-b border-red-100 pb-3">
                <p className="text-xs text-stone-700 sm:text-sm">
                    اولویت سفارش:
                </p>

                <p className="text-xs text-stone-700 sm:text-sm">
                    {data.priority ? '⭐ دارد' : 'ندارد'}
                </p>
            </div>

            <div className="flex items-center justify-between gap-4 border-b border-red-100 pb-3">
                <p className="text-xs text-stone-700 sm:text-sm">روش ارسال:</p>

                <p className="text-xs text-stone-700 sm:text-sm">
                    {data.priority ? 'ارسال سریع' : 'ارسال معمولی'}
                </p>
            </div>

            <div className="flex items-center justify-between gap-4 border-b border-red-100 pb-3">
                <p className="text-xs text-stone-700 sm:text-sm">
                    هزینه اولویت:
                </p>

                <p className="text-xs text-stone-700 sm:text-sm">
                    {toPersianDigits(data.priorityPrice)}
                </p>
            </div>
        </div>
    );
}
