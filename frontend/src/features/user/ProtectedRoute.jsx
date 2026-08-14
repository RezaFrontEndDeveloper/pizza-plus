import Loading from '../../components/ui/Loading';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../../stores/authStore';

export default function ProtectedRoute({ children }) {
    const user = useAuthStore((state) => state.user);
    const isLoading = useAuthStore((state) => state.isLoading);

    if (isLoading) return <Loading />;
    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
}
