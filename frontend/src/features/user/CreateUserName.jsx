import { FaRegFaceLaughWink } from "react-icons/fa6";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useUserStore } from "../../stores/useUserStore";

export default function CreateUserName() {
    const updateUser = useUserStore((state) => state.addUser);
    const [user, setUser] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if (!user) return;
        updateUser(user);
        setUser("");
    }

    return (
        <div className="w-full">
            <div className="flex flex-col shadow shadow-[#f9e7d0] justify-center p-3 items-center max-h-auto max-w-60 rounded-xl gap-8 md:mx-50 md:p-4 bg-[#fffdfc]">
                <div className="flex justify-start items-start p-4 w-full gap-4">
                    <div className="bg-red-200 rounded p-2">
                        <FaRegFaceLaughWink size={20} color="red" />
                    </div>
                    <div>
                        <p className="text-stone-700 text-sm">سلام!!</p>
                        <p className="text-stone7500 text-sm">اسم شما چیه؟</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <input
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        type="text"
                        placeholder="نام و نام خانوادگی خودراوارد کنید"
                        className="border border-stone-400 px-2 py-1.5 placeholder:text-stone-400 rounded placeholder:text-sm"
                    />
                </form>
                <Link to="/menu">
                    <Button variant={"secondary"}>بزن بریم</Button>
                </Link>
            </div>
        </div>
    );
}
