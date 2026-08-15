import { useCartStore } from '../../stores/useCartStore';
import { toPersianDigits } from '../../utils/price';
import CartButtons from '../cart/CartButtons';
import Button from '../../components/ui/Button';
import { toast } from 'sonner';
import baseUrl from '../../services/baseUrl';
export default function MenuCart({ pizza }) {
    const cart = useCartStore((state) => state.cart);
    console.log(cart);
    const addPizza = useCartStore((state) => state.addPizza);
    const { id, name, description, ingredients, price, soldOut } = pizza;

    function handleAddToCart() {
        addPizza(pizza);
        toast.success('pizza added in the cart');
    }

    return (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white p-4">
            <img
                className={soldOut ? 'w-full grayscale' : 'w-full'}
                src={`${baseUrl}${pizza.imageUrl}`}
                alt="pizza image"
            />
            <p className="text-xl font-bold text-stone-700">{name}</p>
            <p className="text-md text-stone-600">{ingredients}</p>
            {soldOut ? (
                <p>به اتمام رسیده</p>
            ) : (
                <p className="font-bold text-red-500">
                    {toPersianDigits(price)} تومان
                </p>
            )}

            {!soldOut ? (
                <Button variant={'primary'} onClick={handleAddToCart}>
                    اضافه کن
                </Button>
            ) : null}
        </div>
    );
}
