import baseUrl from './baseUrl';

export async function createOrder(orderData) {
    const token = localStorage.getItem('token');

    const response = await fetch(`${baseUrl}/api/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
    });

    if (!response.ok) {
        throw new Error('ثبت سفارش با خطا مواجه شد');
    }

    return response.json();
}
export async function getOrder(id) {
    const token = localStorage.getItem('token');

    const res = await fetch(`${baseUrl}/api/orders/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error(
            'مشکلی در دریافت اطلاعات پیش آمد، لطفاً مجدد سعی نمایید.'
        );
    }

    return res.json();
}
