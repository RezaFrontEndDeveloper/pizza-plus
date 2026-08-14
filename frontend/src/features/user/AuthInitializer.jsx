import { useEffect } from 'react';
import { getProfile } from '../../services/auth';
import useAuthStore from '../../stores/authStore';

export default function AuthInitializer() {
    const setUser = useAuthStore((state) => state.setUser);
    const setIsLoading = useAuthStore((state) => state.setIsLoading);

    useEffect(() => {
        async function loadUser() {
            const token = localStorage.getItem('token');

            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const user = await getProfile();

                setUser(user);
            } catch {
                localStorage.removeItem('token');
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        }

        loadUser();
    }, [setUser, setIsLoading]);

    return null;
}
