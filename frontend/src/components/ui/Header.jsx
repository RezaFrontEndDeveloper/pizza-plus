import ShowUserName from "../../features/user/ShowUserName";
import { useUserStore } from "../../stores/useUserStore";
import Input from "./Input";
import Logo from "./Logo";

export default function Header() {
    const user = useUserStore((state) => state.user);

    return (
        <section className="flex items-center justify-between h-12.5 w-full px-4 bg-[#fffdfc]">
            <div className="w-1/4 md:w-1/3">
                <Logo />
            </div>

            <div className="w-3/4 md:w-1/3">
                <Input variant="h-10 border border-stone-300 w-full max-w-100" />
            </div>

            <div className="hidden md:flex md:w-1/3 md:justify-end">
                {user !== "" && <ShowUserName />}
            </div>
        </section>
    );
}
