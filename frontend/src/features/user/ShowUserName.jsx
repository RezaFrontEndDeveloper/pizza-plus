import { CiUser } from "react-icons/ci";
import { useUserStore } from "../../stores/useUserStore";

export default function ShowUserName() {
    const UserName = useUserStore((state) => state.user);

    return (
        <button className="flex justify-between items-center px-4 py-2 rounded gap-2 bg-stone-200  ">
            <span>{UserName}</span>
            <CiUser size={23} />
        </button>
    );
}
