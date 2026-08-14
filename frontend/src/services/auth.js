export async function register({ fullName, phone, password }) {
    const res = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            fullName,
            phone,
            password,
        }),
    });

    if (!res.ok) {
        throw new Error(
            'در فرایند ثبت نام شما مشکلی پیش آمده است مجددا تلاش فرمایید '
        );
    }

    const data = await res.json();

    return data;
}

export async function login({ phone, password }) {
    const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            phone,
            password,
        }),
    });

    if (!response.ok) throw new Error('شماره تلفن یا رمز عبور اشتباه است');

    const data = await response.json();
    return data;
}

export async function getProfile() {
    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:8000/api/profile', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Unable to get profile');
    }

    const data = await response.json();

    return data;
}
