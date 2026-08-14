import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Applayout from './layouts/AppLayout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import CreateOrder from './pages/CreateOrder';
import Order from './pages/Order';
import Register from './pages/Register';
import Login from './pages/Login';
import ProtectedRoute from './features/user/ProtectedRoute';
import NotFound from './pages/NotFound';
import AuthInitializer from './features/user/AuthInitializer';

export default function App() {
    return (
        <>
            <AuthInitializer />
            <BrowserRouter>
                <Routes>
                    <Route element={<Applayout />}>
                        <Route index element={<Home />} />
                        <Route path="/menu" element={<Menu />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/order/new" element={<CreateOrder />} />
                        <Route
                            path="/order/:id"
                            element={
                                <ProtectedRoute>
                                    <Order />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}
