import { useForm } from 'react-hook-form';
import { register as registerUser } from '../../services/auth';
import Button from '../../components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/authStore';
import { useState } from 'react';

export default function RegisterForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState('');
    const setUser = useAuthStore((state) => state.setUser);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    async function onSubmit(data) {
        try {
            setIsError('');
            setIsLoading(true);
            const response = await registerUser(data);
            localStorage.setItem('token', response.token);
            setUser(response.user);
            navigate('/');
        } catch (error) {
            setIsError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mx-10 flex w-full max-w-[530px] flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-8 md:mx-auto md:w-1/2"
            >
                <h1 className="text-2xl font-bold text-stone-700">ثبت نام</h1>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-stone-700">
                        نام و نام خانوادگی :
                    </label>
                    <input
                        className="rounded border border-stone-200 px-4 py-1.5 text-sm text-stone-700 placeholder:text-stone-300"
                        {...register('fullName', { required: true })}
                        type="text"
                    />
                    {errors.fullName && (
                        <p className="text-sm text-red-500">
                            پر کردن این فیلد الزامی است
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        className="text-sm font-bold text-stone-700"
                        htmlFor="phone"
                    >
                        شماره تلفن
                    </label>
                    <input
                        className="rounded border border-stone-200 px-4 py-1.5 text-sm text-stone-700 placeholder:text-stone-300"
                        {...register('phone', { required: true })}
                        type="tel"
                        id="phone"
                    />
                    {errors.phone && (
                        <p className="text-sm text-red-500">
                            پر کردن این فیلد الزامی است
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        className="text-sm font-bold text-stone-700"
                        htmlFor="password"
                    >
                        رمز
                    </label>
                    <input
                        className="rounded border border-stone-200 px-4 py-1.5 text-sm text-stone-700 placeholder:text-stone-300"
                        {...register('password', { required: true })}
                        type="password"
                        id="password"
                    />
                    {errors.password && (
                        <p className="text-sm text-red-500">
                            پر کردن این فیلد الزامی است
                        </p>
                    )}
                    <Link
                        className="text-sm text-blue-800 hover:text-blue-500"
                        to="/login"
                    >
                        <p>میخواهید وارد شوید؟</p>
                    </Link>
                </div>

                <Button variant={'secondary'}>
                    {isLoading ? 'درحال ثبت نام' : 'ثبت نام'}
                </Button>
                {isError}
            </form>
        </div>
    );
}
