import { Outlet } from "react-router-dom";
import Header from "../components/ui/Header";
import CartOverView from "../features/cart/CartOverView";

export default function AppLayout() {
    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <Header />

            <main className="flex-1 min-h-0 overflow-y-auto">
                <Outlet />
            </main>

            <CartOverView />
        </div>
    );
}
