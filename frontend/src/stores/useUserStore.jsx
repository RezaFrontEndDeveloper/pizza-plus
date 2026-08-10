import { create } from "zustand";

export const useUserStore = create((set) => ({
    user: "",
    addUser: (newUser) => set(() => ({ user: newUser })),
}));
