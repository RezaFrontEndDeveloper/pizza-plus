import { toPersianDigits } from "../../utils/price";

export default function OrderFrom({
    register,
    errors,
    handleSubmit,
    onSubmit,
}) {
    return (
        <div className=" w-full bg-white border border-stone-200 p-10 rounded mt-10 ">
            <h2 className="text-md font-bold">جزئیات سفارش </h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full flex flex-col mt-8 gap-4">
                <div className="flex gap-2 justify-between items-center">
                    <div className="flex w-full flex-col gap-2">
                        <label className="text-sm" htmlFor="name">
                            نام
                        </label>
                        <input
                            {...register("customer", { required: true })}
                            id="customer"
                            className="border placeholder:text-gray-300 placeholder:text-sm border-stone-200 px-4 py-1.5 bg-white w-full"
                            type="text"
                            placeholder="نام خودراوارد کنید"
                        />
                        {errors.customer && (
                            <span className="text-sm text-red-500">
                                پر کردن این فیلد الزامی است{" "}
                            </span>
                        )}
                    </div>
                    <div className="flex w-full flex-col gap-2">
                        <label className="text-sm" htmlFor="phone">
                            تلفن
                        </label>
                        <input
                            id="phone"
                            {...register("phone", { required: true })}
                            className="border placeholder:text-gray-300 placeholder:text-sm border-stone-200 px-4 py-1.5 bg-white w-full"
                            type="tel"
                            placeholder="شماره تلفن خودرا وارد کنید"
                        />
                        {errors.phone && (
                            <span className="text-sm text-red-500">
                                پر کردن این فیلد الزامی است{" "}
                            </span>
                        )}
                    </div>
                </div>

                <label className="text-sm" htmlFor="address">
                    آدرس
                </label>
                <input
                    {...register("address", { required: true })}
                    id="address"
                    type="text"
                    placeholder="آدرس خودرا وارد کنید"
                    className="border placeholder:text-gray-300 placeholder:text-sm border-stone-200 px-4 py-1.5 bg-white w-full"
                />
                {errors.address && (
                    <span className="text-sm text-red-500">
                        پر کردن این فیلد الزامی است{" "}
                    </span>
                )}
                <div className="flex gap-4 justify-start items-center">
                    <label htmlFor="priority"> عجله دارم</label>
                    <input
                        {...register("priority")}
                        id="priority"
                        type="checkbox"
                    />
                </div>
                <p className="text-sm text-stone-400 ">
                    با فعال کردن این گزینه {toPersianDigits(20)} درصد به مبلغ
                    سفارش شما اضافه میشود
                </p>

                <label className="text-sm" htmlFor="description">
                    یادداشت سفارش(اختیاری)
                </label>
                <textarea
                    rows={4}
                    id="description"
                    className="border placeholder:text-gray-300 placeholder:text-sm border-stone-200 px-4 py-1.5 bg-white w-full"
                    type="text"
                    placeholder="یاد داشت سفارش خودرا وارد کنید "
                />
                <button type="submit">ارسال</button>
            </form>
        </div>
    );
}
