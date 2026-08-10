import { create } from "zustand";

export const useCartStore = create((set) => ({
    cart: [],

    addPizza: (newPizza) =>
        set((state) => {
            const exists = state.cart.some((item) => item.id === newPizza.id);

            if (exists) {
                return {
                    cart: state.cart.map((item) =>
                        item.id === newPizza.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                };
            }

            if (!exists) {
                const newItem = {
                    ...newPizza,
                    quantity: 1,
                };

                return {
                    cart: [...state.cart, newItem],
                };
            }
        }),

    decreaseQuantity: (pizzaId) =>
        set((state) => ({
            cart: state.cart.map((item) =>
                item.id === pizzaId
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            ),
        })),

    increaseQuantity: (pizzaId) =>
        set((state) => ({
            cart: state.cart.map((item) =>
                item.id === pizzaId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ),
        })),

    deletePizza: (pizza) =>
        set((state) => ({
            cart: state.card.filter((item) => item.id !== pizza.id),
        })),

    clearCart: () => set({ cart: [] }),
}));
