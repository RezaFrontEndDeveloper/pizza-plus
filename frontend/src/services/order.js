export async function createOrder(orderData) {
    const response = await fetch("http://localhost:8000/api/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
    });

    if (!response.ok) {
        throw new Error("ثبت سفارش با خطا مواجه شد");
    }

    return response.json();
}

export async function getOrder(id) {
    

    const token = localStorage.getItem('token');

    const res = await fetch(`http://localhost:8000/api/orders/${id}`, {
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

