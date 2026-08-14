import { toPersianDigits } from "../../utils/price";

export default function OrderDetailTable({ data }) {
    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full table-fixed border-collapse border border-stone-200 bg-white">
                <thead>
                    <tr className="bg-red-100 text-stone-700">
                        <th className="w-[40%] border border-red-200 px-4 py-3 text-right text-sm font-bold">
                            محصول
                        </th>

                        <th className="w-[15%] border border-red-200 px-4 py-3 text-center text-sm font-bold">
                            تعداد
                        </th>

                        <th className="w-[20%] border border-red-200 px-4 py-3 text-center text-sm font-bold">
                            قیمت واحد
                        </th>

                        <th className="w-[25%] border border-red-200 px-4 py-3 text-center text-sm font-bold">
                            قیمت کل
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {data.cart.map((item) => (
                        <tr
                            key={item.id}
                            className="transition-colors hover:bg-stone-50">
                            <td className="border border-stone-200 px-4 py-4 text-right font-medium text-stone-700">
                                {item.name}
                            </td>

                            <td className="border border-stone-200 px-4 py-4 text-center text-stone-600">
                                {toPersianDigits(item.quantity)}
                            </td>

                            <td className="border border-stone-200 px-4 py-4 text-center text-stone-600">
                                {toPersianDigits(item.unitPrice)} تومان
                            </td>

                            <td className="border border-stone-200 px-4 py-4 text-center font-bold text-red-500">
                                {toPersianDigits(item.totalPrice)} تومان
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
