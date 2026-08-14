import { CiUser } from 'react-icons/ci';
import { useUserStore } from '../../stores/useUserStore';
import useAuthStore from '../../stores/authStore';

export default function ShowUserName() {
    const userName = useAuthStore((state) => state.user.fullName);

    return (
        <button className="flex items-center justify-between gap-2 rounded bg-stone-200 px-4 py-2">
            <span>{userName}</span>
            <CiUser size={23} />
        </button>
    );
}
