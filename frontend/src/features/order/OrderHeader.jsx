import { GiFullPizza } from 'react-icons/gi';

export default function OrderHeader() {
  return (
    <div className=" items-center flex flex-col gap-8  p-8 rounded">
      <div>
        <GiFullPizza size={70} />
      </div>
      <h1 className="text-2xl text-center md:text-3xl font-bold text-stone-700 ">
        سفارش شما با موفقیت ثبت شد
      </h1>
      <p className="text-sm text-stone-600 ">
        سفارش شما ثبت شد و در حال آماده سازی میباشد و در سریعترین زمان ممکن به
        دست شما میرسد
      </p>
    </div>
  );
}
