import ShowUserName from '../../features/user/ShowUserName';

import Logo from './Logo';
import useAuthStore from '../../stores/authStore';
import SearchOrder from './SearchOrder';

export default function Header() {
    const user = useAuthStore((state) => state.user);

    return (
        <section className="flex h-12.5 w-full items-center justify-between bg-[#fffdfc] px-4">
            <div className="w-1/4 md:w-1/3">
                <Logo />
            </div>

            <div className="w-3/4 md:w-1/3">
                <SearchOrder variant="h-10 border border-stone-300 w-full max-w-100" />
            </div>

            {!user ? null : (
                <div className="hidden md:flex md:w-1/3 md:justify-end">
                    {user !== '' && <ShowUserName />}
                </div>
            )}
        </section>
    );
}
