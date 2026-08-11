import CartSection from "../features/cart/CartSection";
import HeadOfOrderPage from "../features/order/HeadOfOrderPage";
import OrderFrom from "../features/order/OrderFrom";
import SendOrder from "../features/order/SendOrder";
import { useForm } from "react-hook-form";
import { useCartStore } from "../stores/useCartStore";
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../services/order";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CreateOrder() {
    const globalCart = useCartStore((state) => state.cart);

    const navigation = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationFn: createOrder,
        onSuccess: (data) => {
            toast.success("سفارش شما ثبت شد ");
            navigation(`/order/${data.id}`);
        },
    });

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    function onSubmit(data) {
        const cart = globalCart.map((pizza) => ({
            pizzaId: pizza.id,
            name: pizza.name,
            quantity: pizza.quantity,
            unitPrice: pizza.price,
        }));

        mutate({ ...data, cart });

        console.log({
            ...data,
            cart: cart,
        });
    }

    return (
        <div className="w-full p-8">
            <div>
                <HeadOfOrderPage />
            </div>
            <div className="lg:flex lg:justify-between lg:mt-4 lg:items-center">
                <div className="flex flex-col p-4 justify-center items-center">
                    <OrderFrom
                        register={register}
                        errors={errors}
                        handleSubmit={handleSubmit}
                        onSubmit={onSubmit}
                    />
                </div>
                <div className="lg:w-1/2 border border-stone-200 rounded bg-white p-4 ">
                    <h2 className="mb-4 text-lg font-bold">جزئیات سفارش</h2>
                    <CartSection />
                </div>
            </div>
            <div>
                <SendOrder handleSubmit={handleSubmit} onSubmit={onSubmit} />
            </div>
        </div>
    );
}

export default CreateOrder;
