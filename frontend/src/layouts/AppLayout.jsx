import { Outlet } from 'react-router-dom';
import Header from '../components/ui/Header';
import CartOverView from '../features/cart/CartOverView';

export default function AppLayout() {
    return (
        <div className="flex h-screen flex-col overflow-hidden">
            <Header />

            <main className="min-h-0 flex-1 overflow-y-auto">
                <Outlet />
            </main>

            <CartOverView />
        </div>
    );
}
