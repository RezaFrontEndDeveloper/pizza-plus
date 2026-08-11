import { LiaFileInvoiceSolid } from 'react-icons/lia';
import { toPersianDigits } from '../../utils/price';
export default function TotalPriceSection({ data }) {
  return (
    <div className="flex flex-col md:flex-row mt-20 bg-white p-8 rounded border border-red-100 justify-between">
      <div className="flex flex-col gap-4 max-w-100">
        <div className="flex justify-between items-center border-b border-stone-200">
          <p className="text-sm text-stone-700 ">جمع کل کالاها </p>
          <p className="text-sm text-stone-700 ">
            {toPersianDigits(data.orderPrice)}
          </p>
        </div>

        <div className="flex justify-between items-center border-b border-stone-300">
          <p className="text-sm text-stone-700">هزینه ارسال (الویت)</p>
          <p className="text-red-500 text-sm">
            {toPersianDigits(data.priorityPrice)}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-xl font-bold text-stone-700">مبلغ نهایی سفارش</p>
          <p className="text-red-500 text-xl">
            {toPersianDigits(data.totalPrice)}
          </p>
        </div>
      </div>
      <LiaFileInvoiceSolid size={100} color="gray" />
    </div>
  );
}
