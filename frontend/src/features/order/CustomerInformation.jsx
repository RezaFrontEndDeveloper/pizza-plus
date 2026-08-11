import { FaWpforms } from 'react-icons/fa6';
import { toPersianDigits } from '../../utils/price';

export default function CustomerInformation({ data }) {
  return (
    <div className="flex min-h-100 flex-col gap-4 rounded-2xl border border-red-200 bg-red-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-red-100 pb-3">
        <span className="rounded-full bg-red-700 p-2">
          <FaWpforms color="white" />
        </span>

        <p className="text-sm font-medium text-red-700 sm:text-base">
          اطلاعات مشتری
        </p>
      </div>

      {/* Customer Name */}
      <div className="flex justify-between items-center gap-1 border-b border-red-100 pb-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <p className="text-xs text-stone-500 sm:text-sm">نام مشتری:</p>

        <p className="break-words text-sm text-stone-700 sm:max-w-[60%] sm:text-left">
          {data.customer}
        </p>
      </div>

      {/* Phone */}
      <div className="flex justify-between items-center gap-1 border-b border-red-100 pb-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <p className="text-xs text-stone-500 sm:shrink-0 sm:text-sm">
          شماره مشتری:
        </p>

        <p className="text-sm text-stone-700 sm:text-left">
          {toPersianDigits(data.phone)}
        </p>
      </div>

      {/* Address */}
      <div className="flex justify-between items-center gap-1 border-b border-red-100 pb-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <p className="text-xs text-stone-500 sm:shrink-0 sm:text-sm">آدرس:</p>

        <p className="break-words text-sm text-stone-700 sm:max-w-[60%] sm:text-left">
          {data.address}
        </p>
      </div>

      {/* Order ID */}
      <div className="flex justify-between items-center gap-1 border-b border-red-100 pb-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <p className="text-xs text-stone-500 sm:shrink-0 sm:text-sm">
          کد پیگیری سفارش:
        </p>

        <p className="font-semibold text-red-700 sm:text-left">
          {toPersianDigits(data.id)}
        </p>
      </div>
    </div>
  );
}
