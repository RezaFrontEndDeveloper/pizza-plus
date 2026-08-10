import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Applayout from './layouts/AppLayout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import CreateOrder from './pages/CreateOrder';
import Order from './pages/Order';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Applayout />}>
          <Route index element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order/new" element={<CreateOrder />} />
          <Route path="/order/:id" element={<Order />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
