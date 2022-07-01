import { useState, ReactNode, useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// hooks
import useAuth from '../hooks/useAuth';
import Login from '../pages/auth/login';
// components
import LoadingScreen from '../components/LoadingScreen';
import { PATH_DASHBOARD } from "../routes/paths"
// ----------------------------------------------------------------------

type Props = {
    children: ReactNode;
};

export default function AuthGuard({ children }: Props) {

    const { isAuthenticated, isInitialized, user } = useAuth();

    const { pathname, push } = useRouter();
    const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

    const getRole = () => {
        const role = user.role.toLowerCase();
        if (!role || (pathname.match(/(?<=dashboard\/)(.*?)(?=\/)/)[0] === role)) return;

        //push((pathname.replace(/(?<=dashboard\/)(.*?)(?=\/)/, role)))
        push(PATH_DASHBOARD[role].root)

    }
    useEffect(() => {
        if (requestedLocation && pathname !== requestedLocation) {
            setRequestedLocation(null);
            push(requestedLocation);
        }
    }, [pathname, push, requestedLocation]);

    if (!isInitialized) {
        return <LoadingScreen />;
    }

    if (!isAuthenticated) {
        if (pathname !== requestedLocation) {
            setRequestedLocation(pathname);
        }
        return <Login />;
    }

    getRole()
    return <>{children}</>;
}
